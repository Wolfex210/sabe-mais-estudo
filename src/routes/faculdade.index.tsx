import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, GraduationCap, Clock3, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteLayout, PageHeader, Card } from "@/components/SiteLayout";
import { facultyCourses } from "@/lib/faculty";

export const Route = createFileRoute("/faculdade/")({
  head: () => ({ meta: [
    { title: "Faculdade — Sabe Mais" },
    { name: "description", content: "40 trilhas educacionais aprofundadas de graduação, organizadas por semestres, disciplinas, projetos e competências." }
  ]}),
  component: Faculdade,
});

function Faculdade() {
  const [query,setQuery]=useState("");
  const [area,setArea]=useState("Todas");
  const areas=["Todas",...Array.from(new Set(facultyCourses.map(c=>c.area)))];
  const filtered=useMemo(()=>{
    const q=query.trim().toLowerCase();
    return facultyCourses.filter(c=>(area==="Todas"||c.area===area)&&(!q||c.name.toLowerCase().includes(q)||c.description.toLowerCase().includes(q)));
  },[query,area]);

  return <SiteLayout>
    <PageHeader title="Faculdade" subtitle="Explore 40 trilhas educacionais aprofundadas, do primeiro semestre ao projeto final." />
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"/>
          <input aria-label="Buscar curso" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar curso..." className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"/>
        </div>
        <select aria-label="Filtrar por área" value={area} onChange={e=>setArea(e.target.value)} className="h-12 rounded-xl border border-input bg-background px-4 text-sm text-foreground">
          {areas.map(a=><option key={a}>{a}</option>)}
        </select>
      </div>

      <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5">
        <div className="flex gap-3">
          <GraduationCap className="mt-0.5 h-6 w-6 shrink-0 text-primary"/>
          <div>
            <p className="font-semibold text-foreground">Como funciona</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">Cada trilha tem 8 semestres, disciplinas, módulos aprofundados, práticas e projeto integrador. É material educacional do Sabe Mais e não substitui graduação, diploma ou certificação oficial de uma instituição de ensino superior.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(course=><Link key={course.slug} to="/faculdade/$slug" params={{slug:course.slug}}>
          <Card className="h-full">
            <div className="flex items-start justify-between gap-3">
              <span className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{course.area}</span>
              <Clock3 className="h-4 w-4 text-muted-foreground"/>
            </div>
            <h2 className="mt-4 text-xl font-bold text-foreground">{course.name}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{course.description}</p>
            <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
              <span>{course.duration}</span><span className="font-semibold text-primary">Começar →</span>
            </div>
          </Card>
        </Link>)}
      </div>
      {filtered.length===0&&<p className="py-12 text-center text-sm text-muted-foreground">Nenhum curso encontrado.</p>}
    </div>
  </SiteLayout>;
}
