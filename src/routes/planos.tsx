import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteLayout, PageHeader, Card } from "@/components/SiteLayout";
import { useAppState, trialDaysLeft } from "@/lib/store";

export const Route = createFileRoute("/planos")({
  head: () => ({
    meta: [
      { title: "Planos e Sabe Mais Premium" },
      {
        name: "description",
        content: "Conheça os planos Básico (R$ 19,99), Médio (R$ 49,99) e Master (R$ 89,99). Pagamentos ainda indisponíveis.",
      },
      { property: "og:title", content: "Planos e Sabe Mais Premium" },
      { property: "og:description", content: "Teste 3 dias grátis e escolha o plano ideal para seus estudos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Planos,
});

const plans = [
  {
    id: "basico" as const,
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
    id: "medio" as const,
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
    id: "master" as const,
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
            Durante o teste, todas as ferramentas ficam liberadas.
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
              <button
                onClick={() => actions.choosePlan(p.id)}
                className={`mt-6 rounded-xl px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                  p.featured
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-foreground hover:bg-secondary"
                }`}
              >
                {s.plan === p.id ? "Plano escolhido" : "Escolher plano"}
              </button>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">Os planos estão disponíveis para consulta. Pagamentos e assinaturas ainda não estão ativos; nenhum valor será cobrado.</p>
      </div>
    </SiteLayout>
  );
}
