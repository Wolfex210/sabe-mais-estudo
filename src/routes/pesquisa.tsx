import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { subjects } from "@/lib/content";
import { curriculum, YEARS, YEAR_LABEL, parseTopic } from "@/lib/curriculum";
import { lessons } from "@/lib/lessons";

export const Route = createFileRoute("/pesquisa")({
  head: () => ({ meta: [{ title: "Pesquisar matérias e aulas — Sabe Mais" }, { name: "description", content: "Encontre matérias, assuntos, aulas, exercícios e quizzes disponíveis no Sabe Mais." }, { property: "og:title", content: "Pesquisar — Sabe Mais" }, { property: "og:description", content: "Encontre matérias, assuntos e atividades para estudar." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Pesquisa,
});

const entries = subjects.flatMap((s) => [
  { title: s.name, detail: "Matéria", slug: s.slug, year: "" },
  ...YEARS.flatMap((y) => (curriculum[s.slug]?.[y] ?? []).map((item) => ({ title: parseTopic(item).title, detail: `${s.name} · ${YEAR_LABEL[y]}`, slug: s.slug, year: y }))),
  ...s.summaries.map((item) => ({ title: item.title, detail: `${s.name} · Resumo`, slug: s.slug, year: "" })),
  ...s.exercises.map((item) => ({ title: item.q, detail: `${s.name} · Exercício`, slug: s.slug, year: "" })),
  ...s.questions.map((item) => ({ title: item.q, detail: `${s.name} · Quiz`, slug: s.slug, year: "" })),
  ...lessons.filter(l => l.subject === s.slug).map(l => ({ title: l.title, detail: `${s.name} · Aula`, slug: s.slug, year: l.year })),
]);

function Pesquisa() {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLocaleLowerCase("pt-BR");
  const results = normalized ? entries.filter(e => `${e.title} ${e.detail}`.toLocaleLowerCase("pt-BR").includes(normalized)).slice(0, 80) : [];
  return <SiteLayout><PageHeader title="Pesquisar" subtitle="Encontre o que você quer estudar." /><div className="mx-auto max-w-4xl px-4 py-10">
    <label htmlFor="study-search" className="text-sm font-semibold">Buscar matérias, assuntos, aulas, exercícios ou quizzes</label>
    <input id="study-search" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Ex.: frações" className="mt-2 w-full rounded-lg border border-border bg-background p-4" />
    <div aria-live="polite" className="mt-6 space-y-2">{normalized && (results.length ? results.map((e, i) => <Link key={`${e.slug}-${e.title}-${i}`} to={e.detail.endsWith("· Aula") ? "/aula/$slug/$year/$topic" : "/materias/$slug"} params={e.detail.endsWith("· Aula") ? { slug: e.slug, year: e.year, topic: e.title } : { slug: e.slug }} className="block rounded-lg border border-border bg-card p-4 hover:border-primary"><span className="font-semibold text-foreground">{e.title}</span><span className="block text-sm text-muted-foreground">{e.detail}</span></Link>) : <p className="text-sm text-muted-foreground">Nenhum conteúdo encontrado.</p>)}</div>
  </div></SiteLayout>;
}