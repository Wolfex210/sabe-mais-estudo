import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout, PageHeader, Card } from "@/components/SiteLayout";
import { actions, useAppState } from "@/lib/store";
import { subjects, type Question } from "@/lib/content";

export const Route = createFileRoute("/simulados")({ head: () => ({ meta: [{ title: "Simulados — Sabe Mais" }] }), component: Simulados });

type SimQ = Question & { subject: string; subjectName: string };
function Simulados() {
  const s=useAppState(); const [size,setSize]=useState(20); const [started,setStarted]=useState(false); const [index,setIndex]=useState(0); const [chosen,setChosen]=useState<number|null>(null); const [correct,setCorrect]=useState(0); const [answers,setAnswers]=useState<{q:string,ok:boolean,selected:string,expected:string}[]>([]);
  const pool=useMemo<SimQ[]>(()=>subjects.flatMap(sub=>sub.questions.map(q=>({...q,subject:sub.slug,subjectName:sub.name}))).sort(()=>Math.random()-.5),[started]);
  const questions=pool.slice(0,size); const finished=started && index>=questions.length;
  function start(){setStarted(true);setIndex(0);setChosen(null);setCorrect(0);setAnswers([]);}
  function pick(i:number){if(chosen!==null)return;const q=questions[index];if(!q)return;const ok=i===q.answer;if(ok)setCorrect(v=>v+1);setChosen(i);setAnswers(v=>[...v,{q:q.q,ok,selected:q.options[i]??"",expected:q.options[q.answer]??""}]);}
  function next(){if(index+1>=questions.length){actions.recordSimulation({id:"sim-"+Date.now(),title:"Simulado geral",total:questions.length,correct:correct+(chosen===questions[index]?.answer?1:0),date:new Date().toISOString(),subjects:Array.from(new Set(questions.map(q=>q.subjectName)))});setIndex(i=>i+1);setChosen(null);}else{setIndex(i=>i+1);setChosen(null);}}
  return <SiteLayout><PageHeader title="Simulados" subtitle="Faça uma prova completa com questões variadas e veja seu desempenho no final." />
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      {!started && <Card><h2 className="text-xl font-bold">📝 Escolha o tamanho</h2><p className="mt-2 text-sm text-muted-foreground">As questões são selecionadas entre as matérias disponíveis.</p><div className="mt-5 flex gap-2">{[10,20,30].map(n=><button key={n} onClick={()=>setSize(n)} className={"rounded-xl border px-5 py-3 font-semibold " + (size===n ? "border-primary bg-primary text-primary-foreground" : "border-border")}>{n} questões</button>)}</div><button onClick={start} className="mt-6 w-full rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">Começar simulado</button></Card>}
      {started && !finished && <Card><div className="flex justify-between text-xs font-semibold uppercase text-muted-foreground"><span>Questão {index+1} de {questions.length}</span><span>{correct} acertos</span></div><div className="mt-3 h-2 rounded-full bg-secondary"><div className="h-2 rounded-full bg-primary" style={{width:((index/questions.length)*100)+"%"}} /></div><p className="mt-6 text-lg font-semibold">{questions[index]?.q}</p><p className="mt-2 text-xs text-muted-foreground">{questions[index]?.subjectName}</p><div className="mt-5 space-y-2">{questions[index]?.options.map((o,i)=><button key={o} onClick={()=>pick(i)} className={"w-full rounded-xl border p-3 text-left text-sm " + (chosen===null ? "border-border hover:border-primary" : i===questions[index]?.answer ? "border-success bg-success/10" : i===chosen ? "border-destructive bg-destructive/10" : "border-border opacity-60")}>{o}</button>)}</div>{chosen!==null&&<button onClick={next} className="mt-5 w-full rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">{index+1===questions.length?"Ver resultado":"Próxima"}</button>}</Card>}
      {finished && <Card className="text-center"><p className="text-5xl">🎯</p><h2 className="mt-3 text-2xl font-bold">Resultado do simulado</h2><p className="mt-2 text-lg">{correct} de {questions.length} acertos</p><p className="mt-1 text-sm text-muted-foreground">{Math.round((correct/questions.length)*100)}% de aproveitamento</p><div className="mt-6 space-y-2 text-left">{answers.map((a,i)=><div key={i} className="rounded-lg border border-border p-3 text-sm"><strong>{i+1}. {a.ok?"✓":"✕"}</strong> {a.q}<p className="text-muted-foreground">Sua resposta: {a.selected} · Correta: {a.expected}</p></div>)}</div><button onClick={()=>setStarted(false)} className="mt-6 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">Novo simulado</button></Card>}
      {s.simulationHistory.length>0 && <Card className="mt-5"><h2 className="font-bold">Histórico de simulados</h2><div className="mt-3 space-y-2">{[...s.simulationHistory].reverse().slice(0,10).map(r=><div key={r.id} className="rounded-lg border border-border p-3 text-sm">{r.title} · {r.correct}/{r.total} · {Math.round(r.correct/r.total*100)}% · {new Date(r.date).toLocaleDateString("pt-BR")}</div>)}</div></Card>}
    </div>
  </SiteLayout>;
}
