import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { createStripeClient, getStripeErrorMessage, type StripeEnv } from '@/lib/stripe.server';

const PRICES = ['sabe_mais_basico_mensal', 'sabe_mais_medio_mensal', 'sabe_mais_master_mensal'] as const;
const validEnv = (value: unknown): value is StripeEnv => value === 'sandbox' || value === 'live';

async function resolveOrCreateCustomer(
  stripe: ReturnType<typeof createStripeClient>,
  options: { email?: string; userId?: string },
): Promise<string> {
  if (options.userId && !/^[a-zA-Z0-9_-]+$/.test(options.userId)) throw new Error('Invalid userId');
  if (options.userId) {
    const found = await stripe.customers.search({ query: `metadata['userId']:'${options.userId}'`, limit: 1 });
    if (found.data.length) return found.data[0].id;
  }
  if (options.email) {
    const existing = await stripe.customers.list({ email: options.email, limit: 1 });
    if (existing.data.length) {
      const customer = existing.data[0];
      if (options.userId && customer.metadata?.userId !== options.userId) {
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
  .inputValidator((data: { priceId: string; environment: StripeEnv }) => {
    if (!PRICES.some(price => price === data.priceId) || !validEnv(data.environment)) throw new Error('Plano inválido');
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
      if (!price || price.type !== 'recurring') return { error: 'Este plano ainda não está disponível.' };
      const customerId = await resolveOrCreateCustomer(stripe, { userId: context.userId, email: user.email });
      const origin = new URL(getRequest().url).origin;
      const session = await stripe.checkout.sessions.create({
        line_items: [{ price: price.id, quantity: 1 }], mode: 'subscription', ui_mode: 'embedded_page',
        return_url: `${origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
        customer: customerId, metadata: { userId: context.userId },
        subscription_data: { metadata: { userId: context.userId } },
        automatic_tax: { enabled: true },
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
      if (session.metadata?.userId !== context.userId) return { error: 'Este pagamento não pertence à sua conta.' };
      return { status: session.status ?? 'open', paymentStatus: session.payment_status };
    } catch (error) { return { error: getStripeErrorMessage(error) }; }
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
