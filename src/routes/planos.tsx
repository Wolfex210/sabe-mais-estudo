import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SiteLayout, PageHeader, Card } from "@/components/SiteLayout";
import { useAppState, trialDaysLeft } from "@/lib/store";
import { supabase } from "@/integrations/supabase/client";
import type { PlanId } from "@/lib/stripe-plans";

export const Route = createFileRoute("/planos")({
  head: () => ({
    meta: [
      { title: "Planos e Sabe Mais Premium" },
      {
        name: "description",
        content: "Conheça os planos Básico (R$ 19,99), Médio (R$ 49,99) e Master (R$ 89,99).",
      },
      { property: "og:title", content: "Planos e Sabe Mais Premium" },
      { property: "og:description", content: "Teste 3 dias grátis e escolha um plano mensal." },
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
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [loadingPlan, setLoadingPlan] = useState<PlanId | null>(null);
  useEffect(() => {
    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (active) setUser(data.session?.user ? { id: data.session.user.id } : null);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setUser(session?.user ? { id: session.user.id } : null);
    });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);
  const [error, setError] = useState("");

  async function startCheckout(plan: PlanId) {
    setError("");
    if (!user) {
      window.location.href = "/conta";
      return;
    }

    setLoadingPlan(plan);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) throw new Error("Sua sessão expirou. Entre novamente para continuar.");

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan }),
      });

      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) throw new Error(data.error || "Não foi possível iniciar o checkout.");

      window.location.assign(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível iniciar o checkout.");
      setLoadingPlan(null);
    }
  }

  return (
    <SiteLayout>
      <PageHeader
        title="Sabe Mais Premium"
        subtitle="Comece com 3 dias grátis e depois escolha o plano que combina com a sua rotina."
      />
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <Card className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Teste grátis</p>
          <p className="mt-2 text-2xl font-bold text-foreground">
            {left > 0 ? `Você tem ${left} dia(s) grátis restantes` : "Seu período grátis terminou"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            O checkout é hospedado pelo Stripe e a assinatura só é registrada no Sabe Mais após a confirmação do webhook.
          </p>
        </Card>

        {error && (
          <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

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
                disabled={loadingPlan !== null}
                className="mt-6 w-full"
              >
                {loadingPlan === p.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {user ? "Assinar com Stripe" : "Entrar para assinar"}
              </Button>
            </Card>
          ))}
        </div>

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
