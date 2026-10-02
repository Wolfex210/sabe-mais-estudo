import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SiteLayout, PageHeader, Card } from "@/components/SiteLayout";
import { useAppState, trialDaysLeft } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { STRIPE_PLANS, type PlanId } from "@/lib/stripe-plans";
import { paymentsAvailable, isTestPayment } from "@/lib/stripe";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";

export const Route = createFileRoute("/planos")({
  head: () => ({
    meta: [
      { title: "Planos e Sabe Mais Premium" },
      {
        name: "description",
        content: "Conheça os planos Básico (R$ 19,99), Médio (R$ 49,99) e Master (R$ 89,99).",
      },
      { property: "og:title", content: "Planos e Sabe Mais Premium" },
      { property: "og:description", content: "Teste 4 dias grátis e escolha um plano mensal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Planos,
});

const plans: Array<{
  id: PlanId;
  name: string;
  price: string;
  desc: string;
  featured?: boolean;
  features: string[];
}> = [
  {
    id: "basico",
    name: "Básico",
    price: "R$ 19,99",
    desc: "Poucos recursos, mas o suficiente para estudar todo dia.",
    features: [
      "Todas as matérias e resumos",
      "Quiz no nível fácil e médio",
      "Pomodoro e lista de tarefas",
      "Estatísticas básicas",
    ],
  },
  {
    id: "medio",
    name: "Médio",
    price: "R$ 49,99",
    desc: "Bons métodos de estudo para quem quer evoluir mais rápido.",
    featured: true,
    features: [
      "Tudo do Básico",
      "Quiz difícil e mais exercícios",
      "Cronograma personalizável",
      "Desafios extras semanais",
      "Sem anúncios",
    ],
  },
  {
    id: "master",
    name: "Master",
    price: "R$ 89,99",
    desc: "As melhores ferramentas de estudo do Sabe Mais.",
    features: [
      "Tudo do Médio",
      "Materiais exclusivos e simulados",
      "Estatísticas avançadas de desempenho",
      "Plano de estudos personalizado",
      "Suporte prioritário",
    ],
  },
];

function Planos() {
  const s = useAppState();
  const left = trialDaysLeft(s);
  const { user, loading } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);

  return (
    <SiteLayout>
      {!paymentsAvailable() && <div className="border-b border-destructive/30 bg-destructive/10 px-4 py-2 text-center text-sm text-destructive">Pagamentos ainda não estão configurados neste site. Conclua a ativação antes de assinar.</div>}
      {isTestPayment() && <div className="border-b border-primary/30 bg-primary/10 px-4 py-2 text-center text-sm text-foreground">Os pagamentos nesta prévia são apenas de teste. Nenhum valor real será cobrado.</div>}
      <PageHeader
        title="Sabe Mais Premium"
        subtitle="Comece com 4 dias grátis e depois escolha o plano que combina com a sua rotina."
      />
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <Card className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Teste grátis</p>
          <p className="mt-2 text-2xl font-bold text-foreground">
            {left > 0 ? `Você tem ${left} dia(s) grátis restantes` : "Seu período grátis terminou"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            A assinatura só é registrada no Sabe Mais após a confirmação do pagamento.
          </p>
        </Card>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <Card
              key={p.id}
              className={`flex h-full flex-col ${p.featured ? "border-primary ring-2 ring-primary/30" : ""}`}
            >
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
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <ul className="mt-5 flex-1 space-y-2 text-sm text-foreground">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => void startCheckout(p.id)}
                disabled={loading || !paymentsAvailable()}
                className="mt-6 w-full"
              >
                {loading ? "Carregando..." : user ? "Assinar com Stripe" : "Entrar para assinar"}
              </Button>
            </Card>
          ))}
        </div>

        {selectedPlan && user && <div className="mx-auto max-w-3xl" key={selectedPlan}>
          <StripeEmbeddedCheckout priceId={STRIPE_PLANS[selectedPlan].lookupKey} />
        </div>}

        {!user && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            <Link to="/conta" className="font-semibold text-primary hover:underline">Entre ou crie sua conta</Link> para iniciar o checkout.
          </p>
        )}

        <p className="mt-8 text-center text-xs text-muted-foreground">
          A conta Stripe que receberá os pagamentos e as configurações de cobrança devem ser administradas por um responsável elegível. Nunca coloque a chave secreta do Stripe no código, no GitHub ou no navegador.
        </p>
      </div>
    </SiteLayout>
  );
}
