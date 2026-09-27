import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader, Card, AdSlot } from "@/components/SiteLayout";
import { useAppState, actions, levelOf, ACHIEVEMENTS, streakOf } from "@/lib/store";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil — Sabe Mais" },
      {
        name: "description",
        content: "Seu nome, nível, pontos, progresso e conquistas desbloqueadas no Sabe Mais.",
      },
      { property: "og:title", content: "Perfil — Sabe Mais" },
      { property: "og:description", content: "Veja seu nível, seus pontos e suas conquistas." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Perfil,
});

function Perfil() {
  const s = useAppState();
  const { current, next, progress } = levelOf(s.points);
  const [name, setName] = useState(s.name);

  return (
    <SiteLayout>
      <PageHeader title="Perfil" subtitle="Seu espaço no Sabe Mais." />
      <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-12 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-bold text-primary">
              {s.name.slice(0, 1).toUpperCase()}
            </span>
            <div>
              <p className="text-xl font-bold text-foreground">{s.name}</p>
              <p className="text-sm text-muted-foreground">
                {current.name} · {s.points} pontos · {streakOf(s)} dia(s) seguidos
              </p>
            </div>
          </div>

          <div className="mt-6 h-2 rounded-full bg-secondary">
            <div className="h-2 rounded-full bg-primary" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {next ? `Faltam ${next.min - s.points} pontos para ${next.name}.` : "Nível máximo!"}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
            <button
              onClick={() => actions.setName(name.trim() || "Estudante")}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Salvar nome
            </button>
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold text-foreground">Resumo</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Questões respondidas: <strong className="text-foreground">{s.answered}</strong></li>
            <li>Acertos: <strong className="text-foreground">{s.correct}</strong></li>
            <li>Desafios: <strong className="text-foreground">{s.challenges.length}</strong></li>
          </ul>
          <button
            onClick={() => actions.reset()}
            className="mt-6 w-full rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-secondary"
          >
            Zerar meus dados
          </button>
        </Card>

        <div className="lg:col-span-3">
          <h2 className="text-xl font-bold text-foreground">Conquistas</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ACHIEVEMENTS.map((a) => {
              const got = s.achievements.includes(a.id);
              return (
                <Card key={a.id} className={`p-4 ${got ? "" : "opacity-55"}`}>
                  <p className="font-semibold text-foreground">{a.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {got ? "Desbloqueada" : "Ainda bloqueada"}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-3">
          <AdSlot />
        </div>
      </div>
    </SiteLayout>
  );
}
