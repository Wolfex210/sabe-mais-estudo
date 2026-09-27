import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  Timer,
  ListChecks,
  Calculator,
  Brain,
  CalendarDays,
  Target,
  BarChart3,
} from "lucide-react";
import { SiteLayout, Card, AdSlot } from "@/components/SiteLayout";
import { subjects } from "@/lib/content";
import heroImg from "@/assets/hero-estudos.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sabe Mais — Plataforma brasileira de estudos" },
      {
        name: "description",
        content:
          "Ferramentas, exercícios, resumos e desafios para estudantes do ensino fundamental e médio estudarem de um jeito mais simples.",
      },
      { property: "og:title", content: "Sabe Mais — Aprenda mais. Entenda melhor. Vá mais longe." },
      {
        property: "og:description",
        content: "Resumos, quiz, pomodoro, desafios e progresso em uma só plataforma de estudos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const tools = [
  { icon: BookOpen, emoji: "📚", title: "Resumos", desc: "Resumos simples e organizados de diferentes matérias.", to: "/materias" },
  { icon: Timer, emoji: "⏱️", title: "Pomodoro", desc: "Organize períodos de estudo e descanso.", to: "/ferramentas" },
  { icon: ListChecks, emoji: "✅", title: "Lista de tarefas", desc: "Crie, conclua e exclua tarefas. Fica salvo no navegador.", to: "/ferramentas" },
  { icon: Calculator, emoji: "🧮", title: "Calculadora", desc: "Calculadora matemática funcional.", to: "/ferramentas" },
  { icon: Brain, emoji: "🧠", title: "Quiz", desc: "Perguntas com pontuação por matéria e dificuldade.", to: "/quiz" },
  { icon: CalendarDays, emoji: "📅", title: "Cronograma", desc: "Monte seu cronograma semanal de estudos.", to: "/ferramentas" },
  { icon: Target, emoji: "🎯", title: "Desafio do dia", desc: "Uma pergunta nova para resolver todo dia.", to: "/desafios" },
  { icon: BarChart3, emoji: "📊", title: "Meu progresso", desc: "Acompanhe suas estatísticas de estudo.", to: "/progresso" },
] as const;

function Index() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-gradient-hero">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              Plataforma brasileira de estudos
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
              Sabe Mais
            </h1>
            <p className="mt-3 text-xl font-semibold text-primary">
              Aprenda mais. Entenda melhor. Vá mais longe.
            </p>
            <p className="mt-4 max-w-lg text-base text-muted-foreground">
              Ferramentas, exercícios, resumos e desafios para você estudar de um jeito mais
              simples.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/quiz"
                className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
              >
                Começar agora
              </Link>
              <Link
                to="/materias"
                className="rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Explorar matérias
              </Link>
            </div>
          </div>
          <img
            src={heroImg}
            alt="Estudante usando o Sabe Mais"
            width={1024}
            height={1024}
            className="mx-auto w-full max-w-md"
          />
        </div>
      </section>

      {/* Ferramentas */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Ferramentas de estudo</h2>
        <p className="mt-2 text-muted-foreground">Tudo funciona direto no navegador.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((t) => (
            <Link key={t.title} to={t.to}>
              <Card className="h-full">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-xl">
                  {t.emoji}
                </span>
                <h3 className="mt-4 font-semibold text-foreground">{t.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 pb-16">
        <AdSlot />
      </div>

      {/* Matérias */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Matérias</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {subjects.map((s) => (
              <Link key={s.slug} to="/materias/$slug" params={{ slug: s.slug }}>
                <Card className="flex h-full items-center gap-3 p-4">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}>
                    {s.emoji}
                  </span>
                  <span className="font-semibold text-foreground">{s.name}</span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Premium */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Sabe Mais Premium</h2>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          Teste tudo por 3 dias grátis e depois escolha o plano que combina com a sua rotina de
          estudos.
        </p>
        <Link
          to="/planos"
          className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
        >
          Ver planos
        </Link>
      </section>
    </SiteLayout>
  );
}
