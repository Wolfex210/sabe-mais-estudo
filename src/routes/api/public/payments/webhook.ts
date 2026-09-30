import { createFileRoute } from '@tanstack/react-router';
import { verifyWebhook, type StripeEnv } from '@/lib/stripe.server';

export const Route = createFileRoute('/api/public/payments/webhook')({
  server: { handlers: {
    POST: async ({ request }) => {
      const rawEnv = new URL(request.url).searchParams.get('env');
      if (rawEnv !== 'sandbox' && rawEnv !== 'live') return new Response('Invalid environment', { status: 400 });
      const environment: StripeEnv = rawEnv;
      let event;
      try { event = await verifyWebhook(request, environment); }
      catch { return new Response('Invalid signature', { status: 400 }); }
      if (!['customer.subscription.created','customer.subscription.updated','customer.subscription.deleted'].includes(event.type)) {
        return Response.json({ received: true });
      }
      try {
        const subscription = event.data.object as {
          id: string; customer: string | { id: string }; status: string; metadata?: { userId?: string };
          cancel_at_period_end?: boolean; current_period_start?: number; current_period_end?: number;
          items?: { data?: Array<{ price?: { id: string; lookup_key?: string | null; metadata?: { lovable_external_id?: string }; product?: string | { id: string } }; current_period_start?: number; current_period_end?: number }> };
        };
        const userId = subscription.metadata?.userId;
        const item = subscription.items?.data?.[0];
        const price = item?.price;
        const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer?.id;
        const productId = typeof price?.product === 'string' ? price.product : price?.product?.id;
        if (!userId || !/^[a-f0-9-]{36}$/i.test(userId) || !customerId || !price || !productId) throw new Error('Missing subscription fields');
        const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
        const start = item?.current_period_start ?? subscription.current_period_start;
        const end = item?.current_period_end ?? subscription.current_period_end;
        const { error } = await supabaseAdmin.from('subscriptions').upsert({
          user_id: userId, stripe_subscription_id: subscription.id, stripe_customer_id: customerId,
          product_id: productId, price_id: price.lookup_key || price.metadata?.lovable_external_id || price.id,
          status: event.type === 'customer.subscription.deleted' ? 'canceled' : subscription.status,
          current_period_start: start ? new Date(start * 1000).toISOString() : null,
          current_period_end: end ? new Date(end * 1000).toISOString() : null,
          cancel_at_period_end: subscription.cancel_at_period_end ?? false,
          environment,
        }, { onConflict: 'stripe_subscription_id' });
        if (error) throw error;
        return Response.json({ received: true });
      } catch (error) {
        console.error('Subscription update failed', error);
        return new Response('Subscription update failed', { status: 500 });
      }
    },
  } },
});
