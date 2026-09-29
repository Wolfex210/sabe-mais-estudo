import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader, Card } from "@/components/SiteLayout";
import { useAppState, levelOf, streakOf } from "@/lib/store";
import { subjects } from "@/lib/content";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Sabe Mais" }, { name: "description", content: "Central do estudante com desempenho, plano, erros, revisões e simulados." }] }),
  component: Dashboard,
});

function Dashboard() {
  const s = useAppState();
  const level = levelOf(s.points);
  const accuracy = s.answered ? Math.round((s.correct / s.answered) * 100) : 0;
  const pending = s.errors.filter(e => !e.resolved).length;
  const studiedNames = Array.from(new Set(s.quizHistory.map(q => q.subject))).map(slug => subjects.find(x => x.slug === slug)?.name ?? slug);
  return (
    <SiteLayout>
      <PageHeader title="Dashboard do aluno" subtitle="Tudo o que você precisa para acompanhar e organizar seus estudos em um só lugar." />
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[["🎯","Aproveitamento",accuracy + "%"],["📝","Questões",String(s.answered)],["⭐","Pontos",String(s.points)],["🔥","Sequência",streakOf(s) + " dia(s)"]].map(([icon,label,value]) => (
            <Card key={label} className="p-5"><p className="text-2xl">{icon}</p><p className="mt-3 text-sm text-muted-foreground">{label}</p><p className="text-3xl font-extrabold text-primary">{value}</p></Card>
          ))}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between gap-3"><div><h2 className="text-xl font-bold">Seu desempenho</h2><p className="mt-1 text-sm text-muted-foreground">{level.current.name} · {s.correct} acertos · {s.wrong} erros</p></div><span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{accuracy}%</span></div>
            <div className="mt-5 h-3 rounded-full bg-secondary"><div className="h-3 rounded-full bg-primary transition-all" style={{width: accuracy + "%"}} /></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Link to="/plano-estudos" className="rounded-xl border border-border p-4 hover:bg-secondary"><p className="font-semibold">📅 Plano de estudos</p><p className="mt-1 text-xs text-muted-foreground">Organize sua rotina.</p></Link>
              <Link to="/caderno-erros" className="rounded-xl border border-border p-4 hover:bg-secondary"><p className="font-semibold">❌ Caderno de erros</p><p className="mt-1 text-xs text-muted-foreground">{pending} para revisar.</p></Link>
              <Link to="/revisao" className="rounded-xl border border-border p-4 hover:bg-secondary"><p className="font-semibold">🔄 Revisão inteligente</p><p className="mt-1 text-xs text-muted-foreground">Revise o que mais precisa.</p></Link>
            </div>
          </Card>
          <Card>
            <h2 className="font-bold">🎓 Seu nível</h2><p className="mt-2 text-2xl font-bold">{level.current.name}</p>
            <div className="mt-4 h-2 rounded-full bg-secondary"><div className="h-2 rounded-full bg-primary" style={{width: level.progress + "%"}} /></div>
            <p className="mt-2 text-xs text-muted-foreground">{level.next ? "Faltam " + (level.next.min - s.points) + " pontos para " + level.next.name : "Nível máximo alcançado."}</p>
            <Link to="/simulados" className="mt-6 block rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground">Fazer um simulado</Link>
          </Card>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card><h2 className="font-bold">📚 Matérias estudadas</h2><p className="mt-3 text-sm text-muted-foreground">{studiedNames.length ? studiedNames.join(" · ") : "Você ainda não registrou matérias. Comece um quiz ou aula."}</p></Card>
          <Card><h2 className="font-bold">⏱️ Tempo de estudo</h2><p className="mt-3 text-3xl font-extrabold text-primary">{Math.floor(s.studySeconds/3600)}h {Math.floor((s.studySeconds%3600)/60)}min</p><p className="text-sm text-muted-foreground">{s.studySessions} sessões registradas.</p></Card>
        </div>
      </div>
    </SiteLayout>
  );
}
