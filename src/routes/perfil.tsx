import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader, Card, AdSlot } from "@/components/SiteLayout";
import { useAppState, actions, levelOf, ACHIEVEMENTS, streakOf } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { YEARS, YEAR_LABEL, type Year } from "@/lib/curriculum";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { subjects } from "@/lib/content";

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
  const { user } = useAuth();

  return (
    <SiteLayout>
      <PageHeader title="Perfil" subtitle="Seu espaço no Sabe Mais." />
      <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-12 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-bold text-primary">
              {s.avatar || s.name.slice(0, 1).toUpperCase()}
            </span>
            <div>
              <p className="text-xl font-bold text-foreground">{s.name}</p>
              <p className="text-sm text-muted-foreground">
                {current.name} · {s.points} pontos · {streakOf(s)} dia(s) seguidos
              </p>
              {user && <p className="text-sm text-muted-foreground">{user.email}</p>}
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
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-semibold">Ano escolar<select value={s.schoolYear} onChange={e => actions.setSchoolYear(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background p-2"><option value="">Selecionar ano</option>{YEARS.map(y => <option key={y} value={y}>{YEAR_LABEL[y]}</option>)}</select></label>
            <label className="text-sm font-semibold">Avatar<select value={s.avatar} onChange={e => actions.setAvatar(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background p-2">{["📚", "🎓", "⭐", "🧠", "🚀"].map(a => <option key={a} value={a}>{a}</option>)}</select></label>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">{user ? <><Button variant="outline" asChild><Link to="/alterar-senha">Alterar senha</Link></Button><Button variant="outline" onClick={() => void supabase.auth.signOut()}>Sair</Button></> : <Button asChild><Link to="/conta">Criar conta ou entrar</Link></Button>}</div>
        </Card>

        <Card>
          <h2 className="font-semibold text-foreground">Resumo</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Questões respondidas: <strong className="text-foreground">{s.answered}</strong></li>
            <li>Acertos: <strong className="text-foreground">{s.correct}</strong></li>
            <li>Erros: <strong className="text-foreground">{s.wrong}</strong></li>
            <li>Pontos: <strong className="text-foreground">{s.points}</strong></li>
            <li>Tempo de estudo: <strong className="text-foreground">{Math.floor(s.studySeconds / 3600)}h {Math.floor(s.studySeconds % 3600 / 60)}min</strong></li>
            <li>Desafios: <strong className="text-foreground">{s.challenges.length}</strong></li>
            <li>Assuntos concluídos: <strong className="text-foreground">{s.completedTopics.length}</strong></li>
            <li>Exercícios realizados: <strong className="text-foreground">{s.answered}</strong></li>
            <li>Quizzes concluídos: <strong className="text-foreground">{s.quizHistory.length}</strong></li>
            <li>Sessões de estudo: <strong className="text-foreground">{s.studySessions}</strong></li>
          </ul>
          <button
            onClick={() => actions.reset()}
            className="mt-6 w-full rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-secondary"
          >
            Zerar meus dados
          </button>
        </Card>

        <div className="lg:col-span-3">
          <h2 className="text-xl font-bold text-foreground">Matérias estudadas</h2>
          <p className="mt-3 text-sm text-muted-foreground">{Array.from(new Set([...s.quizHistory.map(q => q.subject), ...s.completedTopics.map(t => t.split(":")[0])])).map(slug => subjects.find(subject => subject.slug === slug)?.name ?? slug).join(", ") || "Comece uma aula ou quiz para registrar suas matérias."}</p>
          <h2 className="mt-6 text-xl font-bold text-foreground">Assuntos concluídos</h2>
          <p className="mt-3 text-sm text-muted-foreground">{s.completedTopics.map(t => t.split(":").slice(2).join(":")).join(", ") || "Nenhum assunto concluído ainda."}</p>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-xl font-bold text-foreground">Histórico de quizzes</h2>
          {s.quizHistory.length ? <ul className="mt-4 space-y-2">{[...s.quizHistory].reverse().slice(0, 20).map((result, i) => <li key={i} className="rounded-lg border border-border bg-card p-4 text-sm">{result.subject}{result.topic ? ` · ${result.topic}` : ""} · {result.level} — {result.correct}/{result.total} acertos · {new Date(result.date).toLocaleDateString("pt-BR")}</li>)}</ul> : <p className="mt-3 text-sm text-muted-foreground">Nenhum quiz concluído ainda.</p>}
        </div>

        <div className="lg:col-span-3"><h2 className="text-xl font-bold text-foreground">Histórico de compras</h2><p className="mt-3 text-sm text-muted-foreground">Nenhuma compra realizada. Os pagamentos ainda não estão disponíveis.</p></div>

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
