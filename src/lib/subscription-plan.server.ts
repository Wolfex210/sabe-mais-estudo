import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { createStripeClient, getStripeErrorMessage, type StripeEnv } from '@/lib/stripe.server';
import { STRIPE_PLANS, type PlanId } from '@/lib/stripe-plans';

/** Plano pago ativo do aluno, conferido no banco de assinaturas e na Stripe. */
export async function resolveSubscriptionPlan(supabase: SupabaseClient<Database>, userId: string): Promise<PlanId | null> {
    const { data: rows, error } = await supabase.from('subscriptions')
      .select('price_id,status,current_period_end,environment')
      .eq('user_id', userId)
      .in('status', ['active', 'trialing', 'past_due', 'canceled'])
      .order('created_at', { ascending: false });
    if (error || !rows?.length) return null;

    for (const row of rows) {
      const validStatus = row.status === 'active' || row.status === 'trialing' ||
        (row.status === 'canceled' && row.current_period_end && new Date(row.current_period_end).getTime() > Date.now());
      if (!validStatus) continue;
      try {
        const stripe = createStripeClient(row.environment as StripeEnv);
        for (const planId of Object.keys(STRIPE_PLANS) as (keyof typeof STRIPE_PLANS)[]) {
          const plan = STRIPE_PLANS[planId];
          const prices = await stripe.prices.list({ lookup_keys: [plan.lookupKey], active: true, limit: 10 });
          if (row.price_id === plan.lookupKey || prices.data.some((price) => price.id === row.price_id)) return planId;
        }
      } catch (error) {
        console.error('Não foi possível identificar o plano ativo:', getStripeErrorMessage(error));
      }
    }
    return null;
}
