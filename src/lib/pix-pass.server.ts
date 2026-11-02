import type { StripeEnv } from '@/lib/stripe.server';
import { STRIPE_PLANS } from '@/lib/stripe-plans';

const DAY = 24 * 60 * 60 * 1000;

type PixSession = {
  id: string;
  mode?: string | null;
  livemode?: boolean;
  payment_status: string;
  amount_total?: number | null;
  currency?: string | null;
  customer?: string | { id: string } | null;
  metadata?: Record<string, string> | null;
  created?: number;
};

/** Validate a signed Stripe Checkout Session before granting a Pix entitlement. */
export function isValidPixPassSession(session: PixSession, environment: StripeEnv): boolean {
  const meta = session.metadata ?? {};
  const plan = Object.values(STRIPE_PLANS).find(item => item.lookupKey === meta['lookupKey']);
  return Boolean(
    /^cs_[a-zA-Z0-9_]+$/.test(session.id) &&
    session.payment_status === 'paid' &&
    session.mode === 'payment' &&
    session.livemode === (environment === 'live') &&
    session.currency === 'brl' &&
    plan &&
    session.amount_total === plan.amount &&
    meta['kind'] === 'pix_30d' &&
    meta['productId'] &&
    meta['userId'] &&
    /^[a-f0-9-]{36}$/i.test(meta['userId'])
  );
}

/** Registra um passe de 30 dias pago via Pix. Idempotente pelo id da sessão. */
export async function recordPixPass(session: PixSession, environment: StripeEnv) {
  if (!isValidPixPassSession(session, environment)) {
    if (session.payment_status !== 'paid') return;
    throw new Error('Checkout Pix inválido: pagamento, ambiente, moeda, valor ou plano não confere');
  }

  const meta = session.metadata ?? {};
  const userId = meta['userId'];
  const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;
  if (!customerId) throw new Error('Pix sem cliente Stripe válido');

  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { data: existing, error: lookupError } = await supabaseAdmin.from('subscriptions').select('id')
    .eq('stripe_subscription_id', session.id).maybeSingle();
  if (lookupError) throw lookupError;
  if (existing) return;

  const start = new Date();
  const { error } = await supabaseAdmin.from('subscriptions').insert({
    user_id: userId, stripe_subscription_id: session.id, stripe_customer_id: customerId,
    product_id: meta['productId']!, price_id: meta['lookupKey']!,
    status: 'canceled', cancel_at_period_end: true,
    current_period_start: start.toISOString(),
    current_period_end: new Date(start.getTime() + 30 * DAY).toISOString(),
    environment,
  });
  if (error && error.code !== '23505') throw error;
}
