import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader, Card, AdSlot } from "@/components/SiteLayout";
import { challenges, dailyChallenge, type Challenge } from "@/lib/content";
import { useAppState, actions, levelOf, LEVELS } from "@/lib/store";

export const Route = createFileRoute("/desafios")({
  head: () => ({
    meta: [
      { title: "Desafios — Sabe Mais" },
      {
        name: "description",
        content: "Desafios de matemática, português, lógica e conhecimentos gerais valendo 10 pontos cada.",
      },
      { property: "og:title", content: "Desafios — Sabe Mais" },
      { property: "og:description", content: "Ganhe pontos e suba de nível resolvendo desafios diários." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Desafios,
});

function Desafios() {
  const state = useAppState();
  const { current, next, progress } = levelOf(state.points);
  const daily = dailyChallenge();

  return (
    <SiteLayout>
      <PageHeader
        title="Desafios"
        subtitle="Cada desafio concluído vale +10 pontos e ajuda você a subir de nível."
      />
      <div className="mx-auto w-full max-w-5xl px-4 py-12">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Seu nível</p>
              <p className="text-2xl font-bold text-foreground">{current.name}</p>
            </div>
            <p className="text-2xl font-bold text-primary">{state.points} pontos</p>
          </div>
          <div className="mt-4 h-2 rounded-full bg-secondary">
            <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {next ? `Faltam ${next.min - state.points} pontos para ${next.name}.` : "Nível máximo alcançado!"}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {LEVELS.map((l) => (
              <span
                key={l.name}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  state.points >= l.min ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                }`}
              >
                {l.name} · {l.min} pts
              </span>
            ))}
          </div>
        </Card>

        <h2 className="mt-12 text-xl font-bold text-foreground">🎯 Desafio do dia</h2>
        <div className="mt-4">
          <ChallengeCard challenge={daily} highlight />
        </div>

        <h2 className="mt-12 text-xl font-bold text-foreground">Todos os desafios</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {challenges.map((c) => (
            <ChallengeCard key={c.id} challenge={c} />
          ))}
        </div>

        <div className="mt-12">
          <AdSlot />
        </div>
      </div>
    </SiteLayout>
  );
}

function ChallengeCard({ challenge, highlight = false }: { challenge: Challenge; highlight?: boolean }) {
  const state = useAppState();
  const done = state.challenges.includes(challenge.id);
  const [chosen, setChosen] = useState<number | null>(null);

  function pick(i: number) {
    if (chosen !== null) return;
    setChosen(i);
    if (i === challenge.answer) actions.completeChallenge(challenge.id);
  }

  return (
    <Card className={highlight ? "border-primary/40 bg-primary/5" : ""}>
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
          {challenge.category}
        </span>
        {done && <span className="text-xs font-semibold text-success">Concluído +10</span>}
      </div>
      <h3 className="mt-3 font-semibold text-foreground">{challenge.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{challenge.question}</p>
      <div className="mt-4 space-y-2">
        {challenge.options.map((o, i) => {
          const cls =
            chosen === null
              ? "border-border hover:border-primary"
              : i === challenge.answer
                ? "border-success bg-success/10"
                : i === chosen
                  ? "border-destructive bg-destructive/10"
                  : "border-border opacity-60";
          return (
            <button
              key={o}
              onClick={() => pick(i)}
              className={`w-full rounded-xl border px-4 py-2.5 text-left text-sm transition-colors ${cls}`}
            >
              {o}
            </button>
          );
        })}
      </div>
      {chosen !== null && (
        <p className="mt-3 text-sm font-semibold">
          {chosen === challenge.answer ? "✅ Isso mesmo!" : "❌ Não foi dessa vez. Tente outro desafio."}
        </p>
      )}
    </Card>
  );
}
