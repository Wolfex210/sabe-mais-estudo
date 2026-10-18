import type { StripeEnv } from '@/lib/stripe.server';

const DAY = 24 * 60 * 60 * 1000;

type PixSession = {
  id: string;
  payment_status: string;
  customer?: string | { id: string } | null;
  metadata?: Record<string, string> | null;
  created?: number;
};

/** Registra um passe de 30 dias pago via Pix. Idempotente pelo id da sessão. */
export async function recordPixPass(session: PixSession, environment: StripeEnv) {
  const meta = session.metadata ?? {};
  const userId = meta['userId'];
  if (session.payment_status !== 'paid' || meta['kind'] !== 'pix_30d') return;
  if (!userId || !/^[a-f0-9-]{36}$/i.test(userId)) throw new Error('Pix sem usuário válido');
  const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { data: existing } = await supabaseAdmin.from('subscriptions').select('id')
    .eq('stripe_subscription_id', session.id).maybeSingle();
  if (existing) return;
  const start = new Date();
  const { error } = await supabaseAdmin.from('subscriptions').insert({
    user_id: userId, stripe_subscription_id: session.id, stripe_customer_id: customerId ?? 'pix',
    product_id: meta['productId'] ?? 'pix', price_id: meta['lookupKey'] ?? 'pix',
    status: 'canceled', cancel_at_period_end: true,
    current_period_start: start.toISOString(),
    current_period_end: new Date(start.getTime() + 30 * DAY).toISOString(),
    environment,
  });
  if (error && error.code !== '23505') throw error;
}
