import { STRIPE_PLANS } from './stripe-plans';

/** Confirmação do Pix de planos, compartilhada entre a consulta da página e o aviso (webhook) do Mercado Pago. */
const DAY = 24 * 60 * 60 * 1000;
export const MP_WEBHOOK_URL = 'https://sabe-mais-estudo.lovable.app/api/public/mercadopago-webhook';

export type MpPayment = {
  id: number; status: string; transaction_amount: number; currency_id: string;
  external_reference: string; payment_method_id: string; live_mode: boolean; date_of_expiration?: string;
  point_of_interaction?: { transaction_data?: { qr_code?: string; qr_code_base64?: string } };
};

export async function mercadoPago(path: string, init?: RequestInit): Promise<MpPayment> {
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

/** Busca o pagamento direto no Mercado Pago (nunca confia no aviso recebido) e libera 30 dias se tudo conferir. */
export async function confirmPlanPix(paymentId: string, userId?: string): Promise<{ paid: boolean; status?: string; found: boolean }> {
  if (!/^\d{1,20}$/.test(paymentId)) return { paid: false, found: false };
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  let query = supabaseAdmin.from('subscriptions').select('*').eq('stripe_subscription_id', `mp_${paymentId}`);
  if (userId) query = query.eq('user_id', userId);
  const { data: row, error } = await query.maybeSingle();
  if (error || !row) return { paid: false, found: false };
  if (row.status !== 'pending') return { paid: true, found: true };
  const payment = await mercadoPago(`/v1/payments/${paymentId}`);
  const plan = Object.values(STRIPE_PLANS).find(p => p.lookupKey === row.price_id);
  const paid = !!plan && payment.status === 'approved' && String(payment.id) === paymentId &&
    payment.transaction_amount === plan.amount / 100 && payment.currency_id === 'BRL' &&
    payment.payment_method_id === 'pix' && payment.live_mode === true && payment.external_reference === row.stripe_customer_id;
  if (!paid) return { paid: false, status: payment.status, found: true };
  const start = new Date();
  const { error: updateError } = await supabaseAdmin.from('subscriptions').update({
    status: 'canceled', cancel_at_period_end: true, current_period_start: start.toISOString(),
    current_period_end: new Date(start.getTime() + 30 * DAY).toISOString(),
  }).eq('id', row.id).eq('status', 'pending');
  if (updateError) throw new Error('Não foi possível liberar o acesso. Tente novamente.');
  return { paid: true, found: true };
}
