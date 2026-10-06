import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, ChevronDown, GraduationCap, LockKeyhole } from "lucide-react";
import { SiteLayout, Card } from "@/components/SiteLayout";
import { getFacultyCourse } from "@/lib/faculty";

export const Route = createFileRoute("/faculdade/$slug")({
  loader: ({params}) => {
    const course=getFacultyCourse(params.slug);
    if(!course) throw notFound();
    return course;
  },
  head: ({loaderData}) => ({meta:[
    {title: loaderData ? `${loaderData.name} — Faculdade | Sabe Mais` : "Curso — Sabe Mais"},
    {name:"description",content:loaderData?.description ?? "Trilha educacional de graduação do Sabe Mais."}
  ]}),
  component: FaculdadeCurso,
});

function FaculdadeCurso(){
  const course=Route.useLoaderData();
  const [open,setOpen]=useState<string|null>(null);
  const [completed,setCompleted]=useState<string[]>([]);
  const toggle=(id:string)=>setOpen(v=>v===id?null:id);
  const mark=(id:string)=>setCompleted(v=>v.includes(id)?v.filter(x=>x!==id):[...v,id]);
  const total=course.semesters.reduce((n,s)=>n+s.disciplines.length,0);
  const progress=total?Math.round(completed.length/total*100):0;

  return <SiteLayout>
    <div className="border-b border-border bg-gradient-hero">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <Link to="/faculdade" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4"/> Voltar para Faculdade</Link>
        <div className="mt-6 flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><GraduationCap className="h-7 w-7"/></span>
          <div>
            <p className="text-sm font-semibold text-primary">{course.area}</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{course.name}</h1>
            <p className="mt-3 max-w-3xl text-muted-foreground">{course.description}</p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-background">
          <div className="flex min-h-44 items-center gap-5 bg-gradient-to-br from-primary/15 via-secondary to-background p-6">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-primary/10 text-7xl" role="img" aria-label={course.coverAlt}>{course.coverEmoji}</div>
            <div><p className="text-xs font-bold uppercase tracking-wider text-primary">Imagem do curso</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{course.coverAlt}. Ilustração temática criada para identificar visualmente esta trilha.</p></div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>

    <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_320px]">
      <main className="space-y-6">
        <Card>
          <div className="flex items-center justify-between gap-4">
            <div><p className="text-sm font-semibold text-foreground">Seu progresso</p><p className="mt-1 text-xs text-muted-foreground">{completed.length} de {total} disciplinas concluídas</p></div>
            <strong className="text-2xl text-primary">{progress}%</strong>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary transition-all" style={{width:`${progress}%`}}/></div>
        </Card>

        <section>
          <h2 className="text-2xl font-bold text-foreground">10 exemplos sobre este curso</h2>
          <p className="mt-2 text-sm text-muted-foreground">Exemplos práticos e temas que ajudam a visualizar o que pode ser estudado ao longo da trilha.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {course.examples.map((example,i)=><div key={example} className="rounded-xl border border-border bg-background p-4">
              <span className="text-xs font-bold text-primary">EXEMPLO {i+1}</span>
              <p className="mt-1 text-sm leading-6 text-foreground">{example.replace(/^Exemplo \d+: /,"")}</p>
            </div>)}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground">Currículo em 8 semestres</h2>
          <p className="mt-2 text-sm text-muted-foreground">Abra cada disciplina para estudar objetivos, módulos e aplicação prática.</p>
          <div className="mt-5 space-y-4">
            {course.semesters.map((semester,si)=><Card key={semester.period} className="p-0 overflow-hidden">
              <button type="button" onClick={()=>toggle(semester.period)} className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-secondary/60">
                <div><p className="text-xs font-bold uppercase tracking-wide text-primary">{semester.period}</p><h3 className="mt-1 font-bold text-foreground">{semester.theme}</h3></div>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${open===semester.period?"rotate-180":""}`}/>
              </button>
              {open===semester.period&&<div className="border-t border-border p-4 sm:p-5">
                <div className="grid gap-4 md:grid-cols-2">
                  {semester.disciplines.map((d,di)=>{
                    const id=`${si}-${di}`;
                    const done=completed.includes(id);
                    return <article key={id} className="rounded-xl border border-border bg-background p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div><span className="text-xs font-semibold text-muted-foreground">Disciplina {di+1}</span><h4 className="mt-1 font-bold text-foreground">{d.name}</h4></div>
                        {done?<CheckCircle2 className="h-5 w-5 shrink-0 text-primary"/>:<LockKeyhole className="h-4 w-4 shrink-0 text-muted-foreground"/>}
                      </div>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{d.overview}</p>
                      <div className="mt-4 space-y-2">{d.modules.map(m=><div key={m} className="rounded-lg bg-secondary px-3 py-2 text-sm text-foreground">• {m}</div>)}</div>
                      <div className="mt-4 rounded-lg border border-primary/15 bg-primary/5 p-3"><p className="text-xs font-bold uppercase tracking-wide text-primary">Aplicação</p><p className="mt-1 text-sm leading-6 text-muted-foreground">{d.practice}</p></div>
                      <button type="button" onClick={()=>mark(id)} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">{done?"Marcar como não concluída":"Concluir disciplina"}</button>
                    </article>
                  })}
                </div>
              </div>}
            </Card>)}
          </div>
        </section>
      </main>

      <aside className="space-y-5">
        <Card>
          <h2 className="font-bold text-foreground">Perfil do curso</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{course.profile}</p>
        </Card>
        <Card>
          <h2 className="font-bold text-foreground">Competências</h2>
          <ul className="mt-3 space-y-2">{course.competencies.map(x=><li key={x} className="flex gap-2 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary"/>{x}</li>)}</ul>
        </Card>
        <Card>
          <h2 className="font-bold text-foreground">Possibilidades de carreira</h2>
          <ul className="mt-3 space-y-2">{course.careers.map(x=><li key={x} className="text-sm leading-6 text-muted-foreground">• {x}</li>)}</ul>
        </Card>
        <div className="rounded-2xl border border-border bg-secondary/50 p-5 text-xs leading-5 text-muted-foreground">
          Esta é uma trilha educacional do Sabe Mais. Ela não confere diploma de graduação nem substitui curso superior reconhecido.
        </div>
      </aside>
    </div>
  </SiteLayout>;
}
