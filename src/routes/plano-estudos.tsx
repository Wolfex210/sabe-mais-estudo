import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout, PageHeader, Card } from "@/components/SiteLayout";
import { actions, useAppState } from "@/lib/store";
import { subjects } from "@/lib/content";

export const Route = createFileRoute("/plano-estudos")({
  head: () => ({ meta: [{ title: "Plano de estudos — Sabe Mais" }, { name: "description", content: "Monte uma rotina semanal adaptada ao seu tempo, objetivos e desempenho nos quizzes." }] }),
  component: PlanoEstudos,
});

const weekdays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
function PlanoEstudos() {
  const s = useAppState();
  const [minutes, setMinutes] = useState(s.studyPlan?.dailyMinutes ?? 60);
  const [goal, setGoal] = useState(s.studyPlan?.goal ?? "Melhorar meu desempenho escolar");
  const [selected, setSelected] = useState<string[]>(s.studyPlan?.subjects ?? subjects.slice(0, 4).map(x => x.slug));
  const [priority, setPriority] = useState<"weak" | "balanced">("weak");
  const [saved, setSaved] = useState(false);
  function toggle(slug: string) {
    setSelected(v => v.includes(slug) ? v.filter(x => x !== slug) : [...v, slug]);
    setSaved(false);
  }
  const ranked = useMemo(() => {
    const stats = new Map<string, { total: number; correct: number }>();
    s.quizHistory.forEach(q => {
      const old = stats.get(q.subject) ?? { total: 0, correct: 0 };
      stats.set(q.subject, { total: old.total + q.total, correct: old.correct + q.correct });
    });
    return [...selected].sort((a,b) => {
      const aa = stats.get(a), bb = stats.get(b);
      const ra = aa && aa.total ? aa.correct / aa.total : 0.5;
      const rb = bb && bb.total ? bb.correct / bb.total : 0.5;
      return priority === "weak" ? ra - rb : a.localeCompare(b);
    });
  }, [selected, s.quizHistory, priority]);
  const each = selected.length ? Math.max(5, Math.floor(minutes / Math.min(selected.length, 3))) : minutes;
  const weekly = useMemo(() => weekdays.map((day,i) => {
    if (!ranked.length) return { day, subjects: [] as string[] };
    const count = i === 6 ? 1 : Math.min(3, ranked.length);
    const items = Array.from({length: count},(_,j)=>ranked[(i * count + j) % ranked.length]!);
    return { day, subjects: [...new Set(items)] };
  }), [ranked]);
  function save() {
    actions.setStudyPlan({ dailyMinutes: minutes, subjects: selected, goal, updatedAt: new Date().toISOString() });
    setSaved(true);
  }
  return <SiteLayout>
    <PageHeader title="Plano de estudos personalizado" subtitle="Organize sua semana com base no tempo disponível, no seu objetivo e nas matérias que precisam de mais atenção." />
    <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 lg:grid-cols-[1fr_1fr]">
      <Card>
        <h2 className="text-xl font-bold">Configure sua rotina</h2>
        <label className="mt-5 block text-sm font-semibold">Quanto tempo por dia?</label>
        <select value={minutes} onChange={e => {setMinutes(Number(e.target.value));setSaved(false);}} className="mt-2 w-full rounded-xl border border-border bg-background p-3">{[30,45,60,90,120].map(x => <option key={x} value={x}>{x} minutos</option>)}</select>
        <label className="mt-5 block text-sm font-semibold">Seu objetivo</label>
        <input value={goal} maxLength={120} onChange={e => {setGoal(e.target.value);setSaved(false);}} className="mt-2 w-full rounded-xl border border-border bg-background p-3" placeholder="Ex.: preparar-me para o ENEM" />
        <label className="mt-5 block text-sm font-semibold">Como distribuir as matérias?</label>
        <select value={priority} onChange={e => setPriority(e.target.value as "weak" | "balanced")} className="mt-2 w-full rounded-xl border border-border bg-background p-3">
          <option value="weak">Priorizar matérias com menor aproveitamento</option>
          <option value="balanced">Distribuição equilibrada</option>
        </select>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">A priorização usa seus resultados de quizzes registrados. Matérias sem histórico ficam como prioridade neutra até você responder questões.</p>
        <p className="mt-5 text-sm font-semibold">Matérias para incluir</p>
        <div className="mt-2 grid max-h-72 gap-2 overflow-auto sm:grid-cols-2">{subjects.map(sub => <button type="button" key={sub.slug} aria-pressed={selected.includes(sub.slug)} onClick={() => toggle(sub.slug)} className={"rounded-xl border p-3 text-left text-sm " + (selected.includes(sub.slug) ? "border-primary bg-primary/10" : "border-border")}>{selected.includes(sub.slug) ? "✓ " : ""}{sub.emoji} {sub.name}</button>)}</div>
        {!selected.length && <p className="mt-2 text-sm text-destructive">Selecione pelo menos uma matéria para gerar a rotina.</p>}
        <button disabled={!selected.length || !goal.trim()} onClick={save} className="mt-6 w-full rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:opacity-50">Salvar meu plano</button>
        {saved && <p role="status" className="mt-3 text-sm font-medium text-primary">Plano salvo com sucesso.</p>}
      </Card>
      <div className="space-y-5">
        <Card>
          <h2 className="text-xl font-bold">📅 Sua rotina semanal</h2>
          <p className="mt-2 text-sm text-muted-foreground">Objetivo: {goal || "Defina um objetivo para seus estudos."}</p>
          <div className="mt-4 space-y-3">
            {weekly.map(({day,subjects:daySubjects})=><div key={day} className="rounded-xl border border-border p-4">
              <div className="flex items-center justify-between gap-3"><h3 className="font-semibold">{day}</h3><span className="text-xs text-muted-foreground">{daySubjects.length ? minutes : 0} min</span></div>
              {daySubjects.length ? <div className="mt-3 space-y-2">{daySubjects.map(slug=>{const sub=subjects.find(x=>x.slug===slug);const results=s.quizHistory.filter(q=>q.subject===slug);const total=results.reduce((n,q)=>n+q.total,0);const correct=results.reduce((n,q)=>n+q.correct,0);return <div key={slug} className="flex flex-wrap items-center justify-between gap-2 text-sm"><span>{sub?.emoji} {sub?.name ?? slug}</span><span className="text-muted-foreground">{Math.max(5,Math.floor(minutes/daySubjects.length))} min{total ? " · "+Math.round(correct/total*100)+"% nos quizzes" : " · faça um quiz diagnóstico"}</span></div>})}</div> : <p className="mt-2 text-sm text-muted-foreground">Escolha matérias para montar a rotina.</p>}
            </div>)}
          </div>
        </Card>
        <Card>
          <h2 className="font-bold">Método recomendado para cada sessão</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
            <li>Revise a explicação da matéria por 5–10 minutos.</li>
            <li>Resolva questões sem consultar a resposta antes.</li>
            <li>Leia a explicação completa, inclusive quando acertar por dúvida.</li>
            <li>Registre os erros e retorne a eles na revisão inteligente.</li>
            <li>Faça pausas e ajuste o plano se a rotina ficar pesada.</li>
          </ol>
        </Card>
      </div>
    </div>
  </SiteLayout>;
}
