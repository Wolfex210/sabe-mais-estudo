import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout, PageHeader, Card, AdSlot } from "@/components/SiteLayout";
import { challenges, dailyChallenge, type Challenge } from "@/lib/content";
import { useAppState, actions, levelOf, LEVELS } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { usePlanAccess } from "@/lib/plan-access";

export const Route = createFileRoute("/desafios")({
  head: () => ({
    meta: [
      { title: "Gamificação — Sabe Mais" },
      {
        name: "description",
        content: "Ganhe pontos, desbloqueie conquistas e acompanhe seus níveis com desafios de estudo.",
      },
      { property: "og:title", content: "Gamificação — Sabe Mais" },
      { property: "og:description", content: "Ganhe pontos e suba de nível resolvendo desafios diários." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Desafios,
});

const DAILY_FREE_INTERACTIONS = 5;

function localDay() {
  const d = new Date();
  return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, "0"), String(d.getDate()).padStart(2, "0")].join("-");
}

function Desafios() {
  const state = useAppState();
  const { current, next, progress } = levelOf(state.points);
  const daily = dailyChallenge();
  const { user } = useAuth();
  const { plan } = usePlanAccess();
  const hasPaidPlan = Boolean(plan && plan !== "trial");
  const [used, setUsed] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const storageKey = `sabe-mais:gamificacao:${user?.id ?? "guest"}:${localDay()}`;

  useEffect(() => {
    try {
      const saved = Number(window.localStorage.getItem(storageKey) || 0);
      const safeCount = Number.isFinite(saved) ? Math.max(0, Math.min(DAILY_FREE_INTERACTIONS, saved)) : 0;
      setUsed(safeCount);
      setShowPaywall(!hasPaidPlan && safeCount >= DAILY_FREE_INTERACTIONS);
    } catch {
      setUsed(0);
    }
  }, [storageKey, hasPaidPlan]);

  function registerInteraction() {
    if (hasPaidPlan) return true;
    if (used >= DAILY_FREE_INTERACTIONS) {
      setShowPaywall(true);
      return false;
    }
    const nextUsed = used + 1;
    setUsed(nextUsed);
    try { window.localStorage.setItem(storageKey, String(nextUsed)); } catch {}
    if (nextUsed >= DAILY_FREE_INTERACTIONS) setShowPaywall(true);
    return true;
  }

  return (
    <SiteLayout>
      <PageHeader
        title="Gamificação"
        subtitle="Transforme seus estudos em conquistas: ganhe pontos, suba de nível e mantenha sua sequência."
      />
      <div className="mx-auto w-full max-w-5xl px-4 py-12">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Seu nível</p>
              <p className="text-2xl font-bold text-foreground">{current.name}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{state.points} pontos</p>
              <p className="text-xs text-muted-foreground">
                {hasPaidPlan ? "Interações ilimitadas no seu plano" : `${Math.max(0, DAILY_FREE_INTERACTIONS - used)} de 5 interações grátis hoje`}
              </p>
            </div>
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
                className={`rounded-full px-3 py-1 text-xs font-semibold ${state.points >= l.min ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}
              >
                {l.name} · {l.min} pts
              </span>
            ))}
          </div>
        </Card>

        <h2 className="mt-12 text-xl font-bold text-foreground">🏅 Suas conquistas</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { id: "first", title: "Primeira questão", description: "Responda sua primeira questão.", unlocked: state.answered >= 1 },
            { id: "q10", title: "Mente ativa", description: "Responda 10 questões.", unlocked: state.answered >= 10 },
            { id: "q50", title: "Persistência", description: "Responda 50 questões.", unlocked: state.answered >= 50 },
            { id: "quiz1", title: "Quiz concluído", description: "Finalize seu primeiro quiz.", unlocked: state.quizHistory.length >= 1 },
            { id: "perfect", title: "Perfeição", description: "Acerte todas as questões de um quiz.", unlocked: state.quizHistory.some(q => q.total > 0 && q.correct === q.total) },
            { id: "points100", title: "100 pontos", description: "Acumule 100 pontos.", unlocked: state.points >= 100 },
          ].map((a) => (
            <Card key={a.id} className={a.unlocked ? "border-primary/40 bg-primary/5" : "opacity-80"}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{a.unlocked ? "🏆" : "🔒"}</span>
                <div>
                  <h3 className="font-semibold text-foreground">{a.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
                  <p className="mt-2 text-xs font-semibold">{a.unlocked ? "Conquista desbloqueada" : "Ainda não desbloqueada"}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <h2 className="mt-12 text-xl font-bold text-foreground">🎯 Desafio do dia</h2>
        <p className="mt-1 text-sm text-muted-foreground">Cada resposta conta como uma interação gratuita.</p>
        <div className="mt-4">
          <ChallengeCard challenge={daily} highlight onInteraction={registerInteraction} blocked={!hasPaidPlan && used >= DAILY_FREE_INTERACTIONS} />
        </div>

        <h2 className="mt-12 text-xl font-bold text-foreground">Todos os desafios</h2>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {challenges.map((c) => (
            <ChallengeCard key={c.id} challenge={c} onInteraction={registerInteraction} blocked={!hasPaidPlan && used >= DAILY_FREE_INTERACTIONS} />
          ))}
        </div>

        <div className="mt-12"><AdSlot /></div>
      </div>

      {showPaywall && !hasPaidPlan && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-background/90 px-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="gamification-paywall-title">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-7 text-center shadow-lift sm:p-9">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl">🏆</div>
            <p className="mt-4 text-xs font-extrabold uppercase tracking-widest text-primary">Limite diário atingido</p>
            <h2 id="gamification-paywall-title" className="mt-2 text-2xl font-extrabold text-foreground">Você usou suas 5 interações grátis de hoje</h2>
            <p className="mt-3 text-sm text-muted-foreground">Assine um plano do Sabe Mais para continuar participando dos desafios e usando a gamificação sem esse limite. Sua cota gratuita volta amanhã.</p>
            <Link to="/planos" className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground hover:opacity-90">Ver planos e continuar</Link>
            <button type="button" onClick={() => setShowPaywall(false)} className="mt-3 w-full rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground hover:bg-secondary">Voltar amanhã</button>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}

function ChallengeCard({ challenge, highlight = false, onInteraction, blocked = false }: { challenge: Challenge; highlight?: boolean; onInteraction: () => boolean; blocked?: boolean }) {
  const state = useAppState();
  const done = state.challenges.includes(challenge.id);
  const [chosen, setChosen] = useState<number | null>(null);

  function pick(i: number) {
    if (chosen !== null || blocked) return;
    if (!onInteraction()) return;
    setChosen(i);
    if (i === challenge.answer) actions.completeChallenge(challenge.id);
  }

  return (
    <Card className={highlight ? "border-primary/40 bg-primary/5" : ""}>
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">{challenge.category}</span>
        {done && <span className="text-xs font-semibold text-success">Concluído +10</span>}
      </div>
      <h3 className="mt-3 font-semibold text-foreground">{challenge.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{challenge.question}</p>
      <div className="mt-4 space-y-2">
        {challenge.options.map((o, i) => {
          const cls = chosen === null
            ? "border-border hover:border-primary"
            : i === challenge.answer
              ? "border-success bg-success/10"
              : i === chosen
                ? "border-destructive bg-destructive/10"
                : "border-border opacity-60";
          return (
            <button
              key={o}
              type="button"
              onClick={() => pick(i)}
              disabled={chosen !== null || blocked}
              className={`w-full rounded-xl border px-4 py-2.5 text-left text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${cls}`}
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
