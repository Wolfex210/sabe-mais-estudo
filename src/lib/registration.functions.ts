import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { REGISTRATION_AMOUNT_CENTS, isRegistrationPaymentApproved } from './registration-payment';

type Payment = {
  id: number; status: string; transaction_amount: number; currency_id: string;
  external_reference: string; payment_method_id: string; live_mode: boolean; date_of_expiration?: string;
  point_of_interaction?: { transaction_data?: { qr_code?: string; qr_code_base64?: string } };
};
async function mercadoPago(path: string, init?: RequestInit): Promise<Payment> {
  const token = process.env['MERCADO_PAGO_ACCESS_TOKEN'];
  if (!token) throw new Error('O Pix ainda não está disponível. A configuração do Mercado Pago está pendente.');
  const response = await fetch(`https://api.mercadopago.com${path}`, {
    ...init, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...init?.headers },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({ message: 'Resposta inválida' })) as { message?: string };
    throw new Error(`Mercado Pago (${response.status}): ${body.message ?? 'Não foi possível processar o pagamento.'}`);
  }
  return response.json();
}

export const getRegistrationAccess = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.from('registration_payments').select('paid_at,status').eq('user_id', context.userId).maybeSingle();
    if (error) return { allowed: false, error: 'Não foi possível verificar o pagamento. Tente novamente.' };
    return { allowed: data?.status === 'approved' && Boolean(data.paid_at), error: '' };
  });

export const createRegistrationPix = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    try {
      if (!process.env['MERCADO_PAGO_ACCESS_TOKEN']) return { error: 'O Pix ainda não está disponível. A configuração do Mercado Pago está pendente.' };
      const { data: { user }, error: authError } = await context.supabase.auth.getUser();
      if (authError || !user?.email) return { error: 'Confirme seu e-mail e entre na conta para continuar.' };
      // Privileged writes are limited to the authenticated caller's payment order.
      const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
      const { error: insertError } = await supabaseAdmin.from('registration_payments').upsert({ user_id: context.userId }, { onConflict: 'user_id', ignoreDuplicates: true });
      if (insertError) throw new Error('Não foi possível preparar o pagamento.');
      const { data: order, error } = await context.supabase.from('registration_payments').select('*').eq('user_id', context.userId).single();
      if (error || !order) throw new Error('Não foi possível consultar o pagamento.');
      if (order.paid_at && order.status === 'approved') return { paid: true };
      if (order.provider_payment_id && order.qr_code) return { paid: false, qrCode: order.qr_code, qrImage: order.qr_code_base64 ?? '', expiresAt: order.expires_at ?? '' };
      const payment = await mercadoPago('/v1/payments', {
        method: 'POST', headers: { 'X-Idempotency-Key': order.id },
        body: JSON.stringify({ transaction_amount: REGISTRATION_AMOUNT_CENTS / 100, description: 'Cadastro Sabe Mais', payment_method_id: 'pix', payer: { email: user.email }, external_reference: order.id }),
      });
      const qr = payment.point_of_interaction?.transaction_data;
      if (!payment.live_mode || !qr?.qr_code) throw new Error('O Mercado Pago não retornou um Pix de produção válido.');
      const { error: saveError } = await supabaseAdmin.from('registration_payments').update({ provider_payment_id: String(payment.id), qr_code: qr.qr_code, qr_code_base64: qr.qr_code_base64 ?? null, expires_at: payment.date_of_expiration ?? null }).eq('id', order.id).eq('user_id', context.userId);
      if (saveError) throw new Error('Não foi possível salvar o Pix. Tente novamente para recuperar o mesmo pagamento.');
      return { paid: false, qrCode: qr.qr_code, qrImage: qr.qr_code_base64 ?? '', expiresAt: payment.date_of_expiration ?? '' };
    } catch (error) { return { error: error instanceof Error ? error.message : 'Não foi possível iniciar o Pix.' }; }
  });

export const checkRegistrationPix = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    try {
      const { data: order, error } = await context.supabase.from('registration_payments').select('*').eq('user_id', context.userId).maybeSingle();
      if (error) throw new Error('Não foi possível consultar seu pagamento.');
      if (!order?.provider_payment_id) return { paid: false, status: 'pending' };
      const payment = await mercadoPago(`/v1/payments/${encodeURIComponent(order.provider_payment_id)}`);
      const paid = String(payment.id) === order.provider_payment_id && isRegistrationPaymentApproved(payment, order.id);
      const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
      const { error: updateError } = await supabaseAdmin.from('registration_payments').update({ status: paid ? 'approved' : payment.status === 'approved' ? 'invalid' : payment.status, paid_at: paid ? order.paid_at ?? new Date().toISOString() : null }).eq('id', order.id).eq('user_id', context.userId);
      if (updateError) throw new Error('Não foi possível registrar a confirmação. Tente novamente.');
      return { paid, status: payment.status };
    } catch (error) { return { error: error instanceof Error ? error.message : 'Não foi possível confirmar o Pix.' }; }
  });