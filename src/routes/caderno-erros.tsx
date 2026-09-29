import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader, Card } from "@/components/SiteLayout";
import { actions, useAppState } from "@/lib/store";

export const Route = createFileRoute("/caderno-erros")({ head: () => ({ meta: [{ title: "Caderno de erros — Sabe Mais" }] }), component: CadernoErros });

function CadernoErros() {
  const s=useAppState(); const errors=[...s.errors].reverse(); const pending=errors.filter(e=>!e.resolved);
  return <SiteLayout><PageHeader title="Caderno de erros" subtitle="Toda questão que você erra fica registrada para entender o motivo e revisar depois." />
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <Card><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-bold">📒 Erros para revisar</h2><p className="text-sm text-muted-foreground">{pending.length} pendente(s) · {errors.length} registrado(s)</p></div><span className="rounded-full bg-destructive/10 px-3 py-1 text-sm font-semibold">{pending.length} pendentes</span></div></Card>
      <div className="mt-5 space-y-4">{errors.length ? errors.map(e=><Card key={e.id} className={e.resolved ? "opacity-65" : ""}><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase text-primary">{e.subject}{e.topic ? " · " + e.topic : ""}</p><h3 className="mt-2 font-semibold">{e.question}</h3></div><span>{e.resolved ? "✅" : "🔴"}</span></div><div className="mt-3 rounded-xl bg-secondary p-3 text-sm"><p><strong>Sua resposta:</strong> {e.selected}</p><p className="mt-1"><strong>Resposta correta:</strong> {e.expected}</p>{e.explanation && <p className="mt-2 text-muted-foreground"><strong>Explicação:</strong> {e.explanation}</p>}</div>{!e.resolved && <button onClick={()=>actions.resolveError(e.id)} className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Marcar como revisado</button>}</Card>) : <Card><p className="text-center text-muted-foreground">Seu caderno ainda está vazio. Faça quizzes e os erros aparecerão aqui automaticamente.</p></Card>}</div>
    </div>
  </SiteLayout>;
}
