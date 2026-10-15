import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, CreditCard, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteLayout, PageHeader, Card } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { STRIPE_PLANS, type PlanId } from "@/lib/stripe-plans";
import { paymentsAvailable, isTestPayment } from "@/lib/stripe";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";
import { getCurrentSubscriptionPlan } from "@/lib/payments.functions";

export const Route = createFileRoute("/pagamento")({
  head: () => ({
    meta: [
      { title: "Pagamento — Sabe Mais" },
      { name: "description", content: "Escolha seu plano e conclua o pagamento para liberar seu acesso ao Sabe Mais." },
      { property: "og:title", content: "Pagamento — Sabe Mais" },
      { property: "og:description", content: "Conclua o pagamento para liberar seu acesso ao Sabe Mais." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Pagamento,
});

const plans: Array<{ id: PlanId; name: string; price: string; featured?: boolean; features: string[] }> = [
  {
    id: "basico",
    name: "Básico",
    price: "R$ 19,99",
    features: ["Até 25 matérias do catálogo", "Até 25 trilhas de cursos de faculdade", "Ferramentas de estudo da plataforma"],
  },
  {
    id: "medio",
    name: "Médio",
    price: "R$ 49,99",
    featured: true,
    features: ["Até 60 matérias do catálogo", "Até 70 trilhas de cursos de faculdade", "Ferramentas de estudo da plataforma"],
  },
  {
    id: "master",
    name: "Master",
    price: "R$ 89,99",
    features: ["Todas as matérias do catálogo", "Todas as trilhas de cursos de faculdade", "Ferramentas de estudo da plataforma"],
  },
];

function Pagamento() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);
  const [activePlan, setActivePlan] = useState<PlanId | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      void navigate({ to: "/conta" });
      return;
    }
    let active = true;
    getCurrentSubscriptionPlan()
      .then((result) => {
        if (active) setActivePlan(result.plan);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setChecking(false);
      });
    return () => {
      active = false;
    };
  }, [user, loading, navigate]);

  if (loading || checking || !user) {
    return (
      <SiteLayout>
        <PageHeader title="Pagamento" subtitle="Preparando sua área de pagamento…" />
      </SiteLayout>
    );
  }

  if (activePlan) {
    return (
      <SiteLayout>
        <PageHeader title="Pagamento" subtitle="Sua assinatura já está ativa." />
        <div className="mx-auto max-w-lg px-4 py-12">
          <Card className="text-center">
            <p className="text-4xl">🎉</p>
            <p className="mt-3 text-lg font-bold text-foreground">Você já tem um plano ativo</p>
            <p className="mt-1 text-sm text-muted-foreground">Seu acesso ao painel do estudante já está liberado.</p>
            <Button asChild className="mt-6 w-full">
              <Link to="/dashboard">Ir para o dashboard</Link>
            </Button>
          </Card>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      {isTestPayment() && (
        <div className="border-b border-primary/30 bg-primary/10 px-4 py-2 text-center text-sm text-foreground">
          Os pagamentos nesta prévia são apenas de teste. Nenhum valor real será cobrado.
        </div>
      )}
      <PageHeader
        title="Conclua seu pagamento"
        subtitle="Escolha um plano para liberar seu acesso completo ao dashboard e às ferramentas de estudo."
      />
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <Card key={p.id} className={`flex h-full flex-col ${p.featured ? "border-primary ring-2 ring-primary/30" : ""}`}>
              {p.featured && (
                <span className="mb-3 w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Mais escolhido
                </span>
              )}
              <h2 className="text-xl font-bold text-foreground">{p.name}</h2>
              <p className="mt-1 text-3xl font-extrabold text-primary">
                {p.price}
                <span className="text-sm font-medium text-muted-foreground">/mês</span>
              </p>
              <ul className="mt-5 flex-1 space-y-2 text-sm text-foreground">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => {
                  setSelectedPlan(p.id);
                  window.setTimeout(() => document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" }), 100);
                }}
                disabled={!paymentsAvailable()}
                className="mt-6 w-full"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Pagar com Stripe
              </Button>
            </Card>
          ))}
        </div>

        {selectedPlan && (
          <div className="mx-auto max-w-3xl" key={selectedPlan}>
            <StripeEmbeddedCheckout priceId={STRIPE_PLANS[selectedPlan].lookupKey} />
          </div>
        )}

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
          <Lock className="h-3.5 w-3.5" />
          Pagamento processado com segurança pela Stripe. Seu acesso é liberado assim que o pagamento é confirmado.
        </p>
      </div>
    </SiteLayout>
  );
}
