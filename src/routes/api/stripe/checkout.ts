import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { isPlanId, STRIPE_PLANS, type PlanId } from "@/lib/stripe-plans";
import { createStripeClient } from "@/lib/stripe.server";
import type { Database } from "@/integrations/supabase/types";

function env(name: string) {
  return process.env[name] ?? "";
}

function json(data: unknown, status = 200) {
  return Response.json(data, { status });
}

function getStripe() {
  return createStripeClient("sandbox");
}

async function getAuthenticatedUser(request: Request) {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;

  const token = auth.slice("Bearer ".length);
  const supabaseUrl = env("SUPABASE_URL");
  const serviceKey = env("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) throw new Error("Credenciais do Supabase no servidor não configuradas.");

  const admin = createClient<Database>(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) return null;
  return { user: data.user, admin };
}

export const Route = createFileRoute("/api/stripe/checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { plan?: PlanId };
          if (!isPlanId(body.plan)) return json({ error: "Plano inválido." }, 400);

          const authenticated = await getAuthenticatedUser(request);
          if (!authenticated) return json({ error: "Faça login antes de assinar um plano." }, 401);

          const { user, admin } = authenticated;
          const plan = STRIPE_PLANS[body.plan];
          const priceId = env(plan.envKey);
          if (!priceId) {
            return json({ error: `O preço do plano ${plan.name} ainda não foi configurado no servidor.` }, 503);
          }

          const stripe = getStripe();
          const origin = new URL(request.url).origin;

          const { data: existing } = await admin
            .from("subscriptions")
            .select("stripe_customer_id")
            .eq("user_id", user.id)
            .eq("environment", env("STRIPE_ENVIRONMENT") || "test")
            .limit(1)
            .maybeSingle();

          let customerId = existing?.stripe_customer_id as string | undefined;

          if (!customerId) {
            const customer = await stripe.customers.create({
              ...(user.email ? { email: user.email } : {}),
              metadata: { user_id: user.id },
            });
            customerId = customer.id;
          }

          const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            customer: customerId,
            line_items: [{ price: priceId, quantity: 1 }],
            subscription_data: {
              trial_period_days: 4,
              metadata: { user_id: user.id, plan: body.plan },
            },
            metadata: { user_id: user.id, plan: body.plan },
            allow_promotion_codes: true,
            success_url: `${origin}/pagamento-sucesso?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/pagamento-cancelado`,
          });

          if (!session.url) return json({ error: "O Stripe não retornou a página de checkout." }, 502);
          return json({ url: session.url });
        } catch (error) {
          console.error("[Stripe checkout]", error);
          return json({ error: error instanceof Error ? error.message : "Não foi possível iniciar o checkout." }, 500);
        }
      },
    },
  },
});
