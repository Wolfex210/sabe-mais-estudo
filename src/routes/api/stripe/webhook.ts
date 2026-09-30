import { createFileRoute } from "@tanstack/react-router";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

function env(name: string) {
  return process.env[name] ?? "";
}

function getStripe() {
  const key = env("STRIPE_SECRET_KEY");
  if (!key) throw new Error("STRIPE_SECRET_KEY não configurada.");
  return new Stripe(key);
}

function planFromPrice(priceId: string) {
  if (priceId === env("STRIPE_PRICE_BASICO")) return "basico";
  if (priceId === env("STRIPE_PRICE_MEDIO")) return "medio";
  if (priceId === env("STRIPE_PRICE_MASTER")) return "master";
  return null;
}

async function saveSubscription(subscription: Stripe.Subscription, admin: ReturnType<typeof createClient>) {
  const userId = subscription.metadata?.user_id;
  if (!userId) return;

  const item = subscription.items.data[0];
  const priceId = item?.price?.id;
  if (!priceId) return;

  const productId = typeof item.price.product === "string" ? item.price.product : item.price.product.id;

  await admin.from("subscriptions").upsert({
    user_id: userId,
    stripe_customer_id: typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id,
    stripe_subscription_id: subscription.id,
    price_id: priceId,
    product_id: productId,
    status: subscription.status,
    cancel_at_period_end: subscription.cancel_at_period_end,
    current_period_start: item.current_period_start ? new Date(item.current_period_start * 1000).toISOString() : null,
    current_period_end: item.current_period_end ? new Date(item.current_period_end * 1000).toISOString() : null,
    environment: env("STRIPE_ENVIRONMENT") || (subscription.livemode ? "live" : "test"),
  }, { onConflict: "stripe_subscription_id" });
}

export const Route = createFileRoute("/api/stripe/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = env("STRIPE_WEBHOOK_SECRET");
        const signature = request.headers.get("stripe-signature");
        if (!secret || !signature) return new Response("Webhook não configurado.", { status: 400 });

        try {
          const body = await request.text();
          const stripe = getStripe();
          const event = stripe.webhooks.constructEvent(body, signature, secret);

          const supabaseUrl = env("SUPABASE_URL");
          const serviceKey = env("SUPABASE_SERVICE_ROLE_KEY");
          if (!supabaseUrl || !serviceKey) return new Response("Supabase servidor não configurado.", { status: 500 });

          const admin = createClient(supabaseUrl, serviceKey, {
            auth: { autoRefreshToken: false, persistSession: false },
          });

          if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
            if (session.subscription) {
              const subscription = await stripe.subscriptions.retrieve(
                typeof session.subscription === "string" ? session.subscription : session.subscription.id,
              );
              await saveSubscription(subscription, admin);
            }
          }

          if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
            await saveSubscription(event.data.object as Stripe.Subscription, admin);
          }

          return Response.json({ received: true });
        } catch (error) {
          console.error("[Stripe webhook]", error);
          return new Response("Webhook inválido.", { status: 400 });
        }
      },
    },
  },
});
