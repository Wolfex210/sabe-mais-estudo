import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader, Card } from "@/components/SiteLayout";
import { actions, useAppState } from "@/lib/store";

export const Route = createFileRoute("/revisao")({ head: () => ({ meta: [{ title: "Revisão inteligente — Sabe Mais" }] }), component: Revisao });

function Revisao() {
  const s=useAppState();
  const pending=[...s.errors].filter(e=>!e.resolved).sort((a,b)=>new Date(a.date).getTime()-new Date(b.date).getTime());
  const due=pending.slice(0,5);
  return <SiteLayout><PageHeader title="Revisão inteligente" subtitle="O sistema prioriza seus erros pendentes e apresenta uma sessão curta de revisão." />
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <Card><h2 className="text-xl font-bold">🔄 Revisão de hoje</h2><p className="mt-2 text-sm text-muted-foreground">Comece pelos assuntos que você errou e ainda não marcou como revisados.</p><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="rounded-xl bg-secondary p-4"><p className="text-xs">Pendentes</p><p className="text-2xl font-bold">{pending.length}</p></div><div className="rounded-xl bg-secondary p-4"><p className="text-xs">Nesta sessão</p><p className="text-2xl font-bold">{due.length}</p></div><div className="rounded-xl bg-secondary p-4"><p className="text-xs">Total revisado</p><p className="text-2xl font-bold">{s.errors.filter(e=>e.resolved).length}</p></div></div></Card>
      <div className="mt-5 space-y-4">{due.length ? due.map(e=><Card key={e.id}><p className="text-xs font-semibold uppercase text-primary">{e.subject}</p><h3 className="mt-2 font-semibold">{e.question}</h3><p className="mt-3 text-sm"><strong>Resposta correta:</strong> {e.expected}</p>{e.explanation && <p className="mt-2 text-sm leading-6 text-muted-foreground">{e.explanation}</p>}<button onClick={()=>actions.resolveError(e.id)} className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Entendi — marcar revisado</button></Card>) : <Card><p className="text-center text-muted-foreground">🎉 Você não tem erros pendentes. Faça novos quizzes para alimentar sua revisão.</p></Card>}</div>
    </div>
  </SiteLayout>;
}
