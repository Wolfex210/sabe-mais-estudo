import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { SiteLayout, PageHeader, Card } from "@/components/SiteLayout";
import { actions, useAppState } from "@/lib/store";
import { subjects, type Question } from "@/lib/content";

export const Route = createFileRoute("/simulados")({ head: () => ({ meta: [{ title: "Simulados — Sabe Mais" }, { name: "description", content: "Treine com simulados cronometrados, explicações e relatório por matéria." }] }), component: Simulados });

type SimQ = Question & { subject: string; subjectName: string };
type AnswerRecord = { q: string; ok: boolean; selected: string; expected: string; explanation: string; subjectName: string };
function Simulados() {
  const s = useAppState();
  const [size, setSize] = useState(20);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [remaining, setRemaining] = useState(size * 90);
  const recorded = useRef(false);
  const pool = useMemo<SimQ[]>(() => subjects.flatMap(sub => sub.questions.map(q => ({ ...q, subject: sub.slug, subjectName: sub.name }))).sort(() => Math.random() - 0.5), [started]);
  const questions = pool.slice(0, size);
  const finished = started && (index >= questions.length || remaining <= 0);
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  useEffect(() => {
    if (!started || finished) return;
    const id = window.setInterval(() => setRemaining(v => Math.max(0, v - 1)), 1000);
    return () => window.clearInterval(id);
  }, [started, finished]);

  useEffect(() => {
    if (!finished || recorded.current) return;
    recorded.current = true;
    actions.recordSimulation({
      id: "sim-" + Date.now(),
      title: "Simulado geral" + (remaining <= 0 ? " · tempo encerrado" : ""),
      total: questions.length,
      correct,
      date: new Date().toISOString(),
      subjects: Array.from(new Set(questions.map(q => q.subjectName))),
    });
  }, [finished, correct, questions, remaining]);

  function start() {
    recorded.current = false;
    setStarted(true); setIndex(0); setChosen(null); setCorrect(0); setAnswers([]); setRemaining(size * 90);
  }
  function pick(i: number) {
    if (chosen !== null || finished) return;
    const q = questions[index];
    if (!q) return;
    const ok = i === q.answer;
    if (ok) setCorrect(v => v + 1);
    setChosen(i);
    setAnswers(v => [...v, {
      q: q.q, ok, selected: q.options[i] ?? "", expected: q.options[q.answer] ?? "",
      explanation: q.explanation ?? "Revise o conceito relacionado a esta questão e tente explicá-lo com suas próprias palavras.",
      subjectName: q.subjectName,
    }]);
  }
  function next() {
    setIndex(i => i + 1);
    setChosen(null);
  }
  const subjectResults = useMemo(() => {
    const map = new Map<string, { total: number; correct: number }>();
    answers.forEach(a => {
      const prev = map.get(a.subjectName) ?? { total: 0, correct: 0 };
      map.set(a.subjectName, { total: prev.total + 1, correct: prev.correct + (a.ok ? 1 : 0) });
    });
    return [...map.entries()].map(([name, value]) => ({ name, ...value })).sort((a,b) => a.correct / a.total - b.correct / b.total);
  }, [answers]);

  return <SiteLayout>
    <PageHeader title="Simulados" subtitle="Treine com tempo controlado, confira as explicações e descubra quais matérias merecem mais revisão." />
    <div className="mx-auto w-full max-w-4xl space-y-5 px-4 py-10">
      {!started && <Card>
        <h2 className="text-xl font-bold">📝 Prepare seu simulado</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">As questões são selecionadas entre as matérias cadastradas. O tempo sugerido é de 90 segundos por questão; ao terminar, você recebe um relatório do que respondeu.</p>
        <div className="mt-5 flex flex-wrap gap-2">{[10,20,30].map(n => <button type="button" key={n} onClick={() => setSize(n)} className={"rounded-xl border px-5 py-3 font-semibold " + (size === n ? "border-primary bg-primary text-primary-foreground" : "border-border")}>{n} questões</button>)}</div>
        <p className="mt-3 text-xs text-muted-foreground">Duração sugerida: {Math.floor(size * 1.5)} minutos. Você pode encerrar antes.</p>
        <button type="button" onClick={start} disabled={pool.length === 0} className="mt-6 w-full rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:opacity-50">Começar simulado</button>
      </Card>}
      {started && !finished && questions[index] && <Card>
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold uppercase text-muted-foreground"><span>Questão {index + 1} de {questions.length}</span><span>{correct} acertos</span><span className={remaining < 60 ? "font-bold text-destructive" : ""}>Tempo: {mm}:{ss}</span></div>
        <div className="mt-3 h-2 rounded-full bg-secondary"><div className="h-2 rounded-full bg-primary transition-all" style={{ width: ((index / questions.length) * 100) + "%" }} /></div>
        <p className="mt-6 text-lg font-semibold">{questions[index]?.q}</p><p className="mt-2 text-xs text-muted-foreground">{questions[index]?.subjectName}</p>
        <div className="mt-5 space-y-2">{questions[index]?.options.map((o,i)=><button type="button" key={o} disabled={chosen !== null} onClick={() => pick(i)} className={"w-full rounded-xl border p-3 text-left text-sm " + (chosen === null ? "border-border hover:border-primary" : i === questions[index]?.answer ? "border-success bg-success/10" : i === chosen ? "border-destructive bg-destructive/10" : "border-border opacity-60")}>{o}</button>)}</div>
        {chosen !== null && <div className="mt-4 rounded-xl bg-secondary p-4 text-sm leading-6"><p className="font-bold">{chosen === questions[index]?.answer ? "✓ Resposta correta" : "✕ Revise este conceito"}</p><p className="mt-2"><strong>Explicação:</strong> {questions[index]?.explanation ?? "Revise o conceito relacionado a esta questão."}</p></div>}
        <div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={() => {setIndex(questions.length);setChosen(null);}} className="rounded-xl border border-border px-4 py-3 text-sm font-semibold">Encerrar simulado</button>{chosen !== null && <button type="button" onClick={next} className="ml-auto rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">{index + 1 === questions.length ? "Ver relatório" : "Próxima questão"}</button>}</div>
      </Card>}
      {finished && <Card>
        <div className="text-center"><p className="text-5xl">🎯</p><h2 className="mt-3 text-2xl font-bold">Relatório do simulado</h2><p className="mt-2 text-lg">{correct} de {questions.length} questões corretas</p><p className="mt-1 text-sm text-muted-foreground">{answers.length} respondidas · {Math.round((correct / Math.max(1, questions.length)) * 100)}% de aproveitamento {remaining <= 0 ? "· tempo encerrado" : ""}</p></div>
        <div className="mt-6"><h3 className="font-bold">Desempenho por matéria</h3>{subjectResults.length ? <div className="mt-3 space-y-3">{subjectResults.map(r=><div key={r.name} className="rounded-xl border border-border p-3"><div className="flex justify-between gap-3 text-sm"><span className="font-medium">{r.name}</span><span>{r.correct}/{r.total} · {Math.round(r.correct/r.total*100)}%</span></div><div className="mt-2 h-2 rounded-full bg-secondary"><div className="h-2 rounded-full bg-primary" style={{width:(r.correct/r.total*100)+"%"}} /></div></div>)}</div> : <p className="mt-2 text-sm text-muted-foreground">Nenhuma questão foi respondida nesta tentativa.</p>}</div>
        <div className="mt-6"><h3 className="font-bold">Correção das respostas</h3><div className="mt-3 space-y-3">{answers.map((a,i)=><div key={i} className="rounded-xl border border-border p-4 text-sm leading-6"><p className="font-semibold">{i+1}. {a.ok ? "✓" : "✕"} {a.q}</p><p className="mt-2 text-muted-foreground">Matéria: {a.subjectName}</p><p className="mt-2"><strong>Sua resposta:</strong> {a.selected}</p><p><strong>Resposta correta:</strong> {a.expected}</p><p className="mt-2 text-muted-foreground"><strong>Explicação:</strong> {a.explanation}</p></div>)}</div></div>
        <button type="button" onClick={() => setStarted(false)} className="mt-6 w-full rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">Novo simulado</button>
      </Card>}
      {s.simulationHistory.length > 0 && <Card><h2 className="font-bold">Histórico de simulados</h2><div className="mt-3 space-y-2">{[...s.simulationHistory].reverse().slice(0,10).map(r=><div key={r.id} className="rounded-lg border border-border p-3 text-sm"><div className="flex flex-wrap justify-between gap-2"><strong>{r.title}</strong><span>{r.correct}/{r.total} · {Math.round(r.correct/r.total*100)}%</span></div><p className="mt-1 text-xs text-muted-foreground">{new Date(r.date).toLocaleDateString("pt-BR")} · {r.subjects.join(", ")}</p></div>)}</div></Card>}
    </div>
  </SiteLayout>;
}
