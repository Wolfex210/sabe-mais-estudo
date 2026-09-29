import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader, Card } from "@/components/SiteLayout";
import { actions, useAppState } from "@/lib/store";
import { subjects } from "@/lib/content";

export const Route = createFileRoute("/plano-estudos")({ head: () => ({ meta: [{ title: "Plano de estudos — Sabe Mais" }] }), component: PlanoEstudos });

function PlanoEstudos() {
  const s = useAppState();
  const [minutes, setMinutes] = useState(s.studyPlan?.dailyMinutes ?? 60);
  const [goal, setGoal] = useState(s.studyPlan?.goal ?? "Melhorar meu desempenho escolar");
  const [selected, setSelected] = useState<string[]>(s.studyPlan?.subjects ?? subjects.slice(0, 4).map(x => x.slug));
  function toggle(slug: string) { setSelected(v => v.includes(slug) ? v.filter(x => x !== slug) : [...v, slug]); }
  const each = selected.length ? Math.max(5, Math.floor(minutes / selected.length)) : minutes;
  return <SiteLayout><PageHeader title="Plano de estudos personalizado" subtitle="Escolha seu tempo, objetivo e matérias. O Sabe Mais monta uma rotina simples para você seguir." />
    <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-10 lg:grid-cols-2">
      <Card>
        <label className="block text-sm font-semibold">Quanto tempo por dia?</label>
        <select value={minutes} onChange={e => setMinutes(Number(e.target.value))} className="mt-2 w-full rounded-xl border border-border bg-background p-3">{[30,45,60,90,120].map(x => <option key={x} value={x}>{x} minutos</option>)}</select>
        <label className="mt-5 block text-sm font-semibold">Seu objetivo</label>
        <input value={goal} onChange={e => setGoal(e.target.value)} className="mt-2 w-full rounded-xl border border-border bg-background p-3" />
        <p className="mt-5 text-sm font-semibold">Matérias</p>
        <div className="mt-2 grid max-h-72 gap-2 overflow-auto sm:grid-cols-2">{subjects.map(sub => <button key={sub.slug} onClick={() => toggle(sub.slug)} className={"rounded-xl border p-3 text-left text-sm " + (selected.includes(sub.slug) ? "border-primary bg-primary/10" : "border-border")}>{sub.emoji} {sub.name}</button>)}</div>
        <button onClick={() => actions.setStudyPlan({dailyMinutes:minutes, subjects:selected, goal, updatedAt:new Date().toISOString()})} className="mt-6 w-full rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">Salvar meu plano</button>
      </Card>
      <Card>
        <h2 className="text-xl font-bold">📅 Sua rotina</h2>
        <p className="mt-2 text-sm text-muted-foreground">Objetivo: {goal}</p>
        {selected.length ? <div className="mt-5 space-y-3">{selected.map((slug,i) => { const sub=subjects.find(x=>x.slug===slug)!; return <div key={slug} className="flex items-center justify-between rounded-xl border border-border p-4"><span className="font-semibold">{sub.emoji} {sub.name}</span><span className="text-sm text-muted-foreground">{each} min</span></div> })}</div> : <p className="mt-5 text-sm text-muted-foreground">Selecione pelo menos uma matéria.</p>}
        <div className="mt-6 rounded-xl bg-secondary p-4 text-sm"><strong>Como usar:</strong> estude a página indicada, faça exercícios e finalize com um quiz. Se errar, o conteúdo vai para o seu caderno de erros.</div>
      </Card>
    </div>
  </SiteLayout>;
}
