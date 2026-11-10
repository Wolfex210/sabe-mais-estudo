import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { STRIPE_PLANS, isPlanId } from './stripe-plans';

/** Pix dos planos via Mercado Pago: passe de 30 dias, liberado só após o servidor confirmar o pagamento. */
const DAY = 24 * 60 * 60 * 1000;
type Payment = {
  id: number; status: string; transaction_amount: number; currency_id: string;
  external_reference: string; payment_method_id: string; live_mode: boolean; date_of_expiration?: string;
  point_of_interaction?: { transaction_data?: { qr_code?: string; qr_code_base64?: string } };
};

async function mercadoPago(path: string, init?: RequestInit): Promise<Payment> {
  const token = process.env['MERCADO_PAGO_ACCESS_TOKEN'];
  if (!token) throw new Error('O Pix ainda não está disponível.');
  const response = await fetch(`https://api.mercadopago.com${path}`, {
    ...init, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...init?.headers },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({})) as { message?: string };
    throw new Error(`Mercado Pago (${response.status}): ${body.message ?? 'Não foi possível processar o pagamento.'}`);
  }
  return response.json();
}

export const createPlanPix = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { planId: string }) => { if (!isPlanId(data.planId)) throw new Error('Plano inválido'); return data as { planId: keyof typeof STRIPE_PLANS }; })
  .handler(async ({ data, context }) => {
    try {
      const { data: { user } } = await context.supabase.auth.getUser();
      if (!user?.email || user.id !== context.userId) return { error: 'Entre na sua conta para continuar.' };
      const plan = STRIPE_PLANS[data.planId];
      const reference = `sm_plan_${crypto.randomUUID()}`;
      const payment = await mercadoPago('/v1/payments', {
        method: 'POST', headers: { 'X-Idempotency-Key': reference },
        body: JSON.stringify({ transaction_amount: plan.amount / 100, description: `Sabe Mais ${data.planId} — 30 dias`, payment_method_id: 'pix', payer: { email: user.email }, external_reference: reference }),
      });
      const qr = payment.point_of_interaction?.transaction_data;
      if (!payment.live_mode || !qr?.qr_code) throw new Error('O Mercado Pago não retornou um Pix válido.');
      const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
      const { error } = await supabaseAdmin.from('subscriptions').insert({
        user_id: context.userId, stripe_subscription_id: `mp_${payment.id}`, stripe_customer_id: reference,
        product_id: 'mercadopago_pix', price_id: plan.lookupKey, status: 'pending', environment: 'live',
      });
      if (error) throw new Error('Não foi possível salvar o Pix.');
      return { paymentId: String(payment.id), qrCode: qr.qr_code, qrImage: qr.qr_code_base64 ?? '' };
    } catch (error) { return { error: error instanceof Error ? error.message : 'Não foi possível iniciar o Pix.' }; }
  });

export const checkPlanPix = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { paymentId: string }) => { if (!/^\d{1,20}$/.test(data.paymentId)) throw new Error('Pagamento inválido'); return data; })
  .handler(async ({ data, context }) => {
    try {
      const { data: row, error } = await context.supabase.from('subscriptions').select('*')
        .eq('user_id', context.userId).eq('stripe_subscription_id', `mp_${data.paymentId}`).maybeSingle();
      if (error || !row) return { error: 'Pagamento não encontrado.' };
      if (row.status !== 'pending') return { paid: true };
      const payment = await mercadoPago(`/v1/payments/${data.paymentId}`);
      const plan = Object.values(STRIPE_PLANS).find(p => p.lookupKey === row.price_id);
      const paid = !!plan && payment.status === 'approved' && String(payment.id) === data.paymentId &&
        payment.transaction_amount === plan.amount / 100 && payment.currency_id === 'BRL' &&
        payment.payment_method_id === 'pix' && payment.live_mode === true && payment.external_reference === row.stripe_customer_id;
      if (!paid) return { paid: false, status: payment.status };
      const start = new Date();
      const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
      const { error: updateError } = await supabaseAdmin.from('subscriptions').update({
        status: 'canceled', cancel_at_period_end: true, current_period_start: start.toISOString(),
        current_period_end: new Date(start.getTime() + 30 * DAY).toISOString(),
      }).eq('id', row.id).eq('status', 'pending');
      if (updateError) throw new Error('Não foi possível liberar o acesso. Tente novamente.');
      return { paid: true };
    } catch (error) { return { error: error instanceof Error ? error.message : 'Não foi possível confirmar o Pix.' }; }
  });
