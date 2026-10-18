import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { createStripeClient, getStripeErrorMessage, type StripeEnv } from '@/lib/stripe.server';
import { STRIPE_PLANS } from '@/lib/stripe-plans';

const PRICES = Object.values(STRIPE_PLANS);
export const PIX_KIND = 'pix_30d';
const validEnv = (value: unknown): value is StripeEnv => value === 'sandbox' || value === 'live';

async function resolveOrCreateCustomer(
  stripe: ReturnType<typeof createStripeClient>,
  options: { email?: string; userId?: string },
): Promise<string> {
  if (options.userId && !/^[a-zA-Z0-9_-]+$/.test(options.userId)) throw new Error('Invalid userId');
  if (options.userId) {
    const found = await stripe.customers.search({ query: `metadata['userId']:'${options.userId}'`, limit: 1 });
    const matched = found.data[0];
    if (matched) return matched.id;
  }
  if (options.email) {
    const existing = await stripe.customers.list({ email: options.email, limit: 1 });
    const customer = existing.data[0];
    if (customer) {
      if (options.userId && customer.metadata?.['userId'] !== options.userId) {
        await stripe.customers.update(customer.id, { metadata: { ...customer.metadata, userId: options.userId } });
      }
      return customer.id;
    }
  }
  const created = await stripe.customers.create({
    ...(options.email && { email: options.email }),
    ...(options.userId && { metadata: { userId: options.userId } }),
  });
  return created.id;
}

export const createCheckoutSession = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { priceId: string; environment: StripeEnv; method?: 'card' | 'pix' }) => {
    if (!PRICES.some(price => price.lookupKey === data.priceId) || !validEnv(data.environment)) throw new Error('Plano inválido');
    if (data.method !== undefined && data.method !== 'card' && data.method !== 'pix') throw new Error('Forma de pagamento inválida');
    return data;
  })
  .handler(async ({ data, context }): Promise<{ clientSecret: string } | { error: string }> => {
    try {
      const { data: { user }, error: authError } = await context.supabase.auth.getUser();
      if (authError || !user || user.id !== context.userId) return { error: 'Entre na sua conta para assinar.' };
      const { data: existing, error: readError } = await context.supabase.from('subscriptions')
        .select('price_id,status,current_period_end').eq('user_id', context.userId).eq('environment', data.environment);
      if (readError) return { error: readError.message };
      if (existing?.some(s => ['active','trialing','past_due'].includes(s.status) || (s.status === 'canceled' && s.current_period_end && new Date(s.current_period_end).getTime() > Date.now()))) {
        return { error: 'Você já possui uma assinatura. Gerencie seu plano no perfil antes de assinar novamente.' };
      }
      const stripe = createStripeClient(data.environment);
      const prices = await stripe.prices.list({ lookup_keys: [data.priceId] });
      const price = prices.data[0];
      const expected = PRICES.find(plan => plan.lookupKey === data.priceId);
      if (!price || !price.active || price.type !== 'recurring' || price.recurring?.interval !== 'month' || price.currency !== 'brl' || price.unit_amount !== expected?.amount) {
        return { error: 'O preço deste plano não corresponde ao cadastro. Entre em contato com o suporte.' };
      }
      const customerId = await resolveOrCreateCustomer(stripe, { userId: context.userId, ...(user.email ? { email: user.email } : {}) });
      const origin = new URL(getRequest().url).origin;
      if (data.method === 'pix') {
        const productId = typeof price.product === 'string' ? price.product : price.product.id;
        const product = await stripe.products.retrieve(productId);
        const description = `${product.name} — acesso de 30 dias (Pix)`;
        const pixSession = await stripe.checkout.sessions.create({
          line_items: [{ price_data: { currency: 'brl', unit_amount: price.unit_amount!, product: productId }, quantity: 1 }],
          mode: 'payment', ui_mode: 'embedded_page', payment_method_types: ['pix'],
          payment_method_options: { pix: { expires_after_seconds: 3600 } },
          return_url: `${origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
          customer: customerId,
          metadata: { userId: context.userId, kind: PIX_KIND, lookupKey: data.priceId, productId },
          payment_intent_data: { description, metadata: { userId: context.userId, kind: PIX_KIND } },
        });
        if (!pixSession.client_secret) return { error: 'Não foi possível iniciar o Pix. Tente novamente.' };
        return { clientSecret: pixSession.client_secret };
      }
      const session = await stripe.checkout.sessions.create({
        line_items: [{ price: price.id, quantity: 1 }], mode: 'subscription', ui_mode: 'embedded_page',
        adaptive_pricing: { enabled: false },
        return_url: `${origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
        customer: customerId, metadata: { userId: context.userId },
        subscription_data: { metadata: { userId: context.userId } },
      });
      if (!session.client_secret) return { error: 'Não foi possível iniciar o pagamento. Tente novamente.' };
      return { clientSecret: session.client_secret };
    } catch (error) { return { error: getStripeErrorMessage(error) }; }
  });

export const getCheckoutStatus = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { sessionId: string; environment: StripeEnv }) => {
    if (!/^cs_[a-zA-Z0-9_]+$/.test(data.sessionId) || !validEnv(data.environment)) throw new Error('Pagamento inválido');
    return data;
  })
  .handler(async ({ data, context }): Promise<{ status: string; paymentStatus: string } | { error: string }> => {
    try {
      const session = await createStripeClient(data.environment).checkout.sessions.retrieve(data.sessionId);
      if (session.metadata?.['userId'] !== context.userId) return { error: 'Este pagamento não pertence à sua conta.' };
      if (session.metadata?.['kind'] === PIX_KIND && session.payment_status === 'paid') {
        const { recordPixPass } = await import('@/lib/pix-pass.server');
        await recordPixPass(session, data.environment);
      }
      return { status: session.status ?? 'open', paymentStatus: session.payment_status };
    } catch (error) { return { error: getStripeErrorMessage(error) }; }
  });

export const getCurrentSubscriptionPlan = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ plan: import('@/lib/stripe-plans').PlanId | null }> => {
    const { data: rows, error } = await context.supabase.from('subscriptions')
      .select('price_id,status,current_period_end,environment')
      .eq('user_id', context.userId)
      .in('status', ['active', 'trialing', 'past_due', 'canceled'])
      .order('created_at', { ascending: false });
    if (error || !rows?.length) return { plan: null };

    for (const row of rows) {
      const validStatus = row.status === 'active' || row.status === 'trialing' ||
        (row.status === 'canceled' && row.current_period_end && new Date(row.current_period_end).getTime() > Date.now());
      if (!validStatus) continue;
      try {
        const stripe = createStripeClient(row.environment as StripeEnv);
        for (const planId of Object.keys(STRIPE_PLANS) as (keyof typeof STRIPE_PLANS)[]) {
          const plan = STRIPE_PLANS[planId];
          const prices = await stripe.prices.list({ lookup_keys: [plan.lookupKey], active: true, limit: 10 });
          if (row.price_id === plan.lookupKey || prices.data.some((price) => price.id === row.price_id)) return { plan: planId };
        }
      } catch (error) {
        console.error('Não foi possível identificar o plano ativo:', getStripeErrorMessage(error));
      }
    }
    return { plan: null };
  });

export const createPortalSession = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { environment: StripeEnv }) => {
    if (!validEnv(data.environment)) throw new Error('Ambiente inválido');
    return data;
  })
  .handler(async ({ data, context }): Promise<{ url: string } | { error: string }> => {
    try {
      const { data: sub, error } = await context.supabase.from('subscriptions').select('stripe_customer_id')
        .eq('user_id', context.userId).eq('environment', data.environment).order('created_at', { ascending: false }).limit(1).maybeSingle();
      if (error) return { error: error.message };
      if (!sub) return { error: 'Nenhuma assinatura encontrada.' };
      const portal = await createStripeClient(data.environment).billingPortal.sessions.create({
        customer: sub.stripe_customer_id, return_url: `${new URL(getRequest().url).origin}/perfil`,
      });
      return { url: portal.url };
    } catch (error) { return { error: getStripeErrorMessage(error) }; }
  });
