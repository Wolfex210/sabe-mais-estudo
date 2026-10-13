import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { subjects } from "@/lib/content";
import { curriculum, YEARS, YEAR_LABEL, parseTopic } from "@/lib/curriculum";
import { lessons } from "@/lib/lessons";
import { Search, Sparkles, BookOpen, ArrowRight, X } from "lucide-react";

export const Route = createFileRoute("/pesquisa")({
  head: () => ({ meta: [{ title: "Busca inteligente — Sabe Mais" }, { name: "description", content: "Encontre rapidamente matérias, assuntos, aulas, exercícios e quizzes no Sabe Mais." }, { property: "og:title", content: "Busca inteligente — Sabe Mais" }, { property: "og:description", content: "Encontre matérias, assuntos e atividades para estudar." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Pesquisa,
});

type SearchEntry = { title: string; detail: string; slug: string; year: string; kind: "Matéria" | "Assunto" | "Resumo" | "Exercício" | "Quiz" | "Aula"; searchable: string };

const entries: SearchEntry[] = subjects.flatMap((s) => [
  { title: s.name, detail: "Matéria", slug: s.slug, year: "", kind: "Matéria" as const, searchable: `${s.name} ${s.intro}` },
  ...YEARS.flatMap((y) => (curriculum[s.slug]?.[y] ?? []).map((item) => {
    const title = parseTopic(item).title;
    return { title, detail: `${s.name} · ${YEAR_LABEL[y]}`, slug: s.slug, year: y, kind: "Assunto" as const, searchable: `${title} ${s.name} ${YEAR_LABEL[y]}` };
  })),
  ...s.summaries.map((item) => ({ title: item.title, detail: `${s.name} · Resumo`, slug: s.slug, year: "", kind: "Resumo" as const, searchable: `${item.title} ${s.name} ${item.text}` })),
  ...s.exercises.map((item) => ({ title: item.q, detail: `${s.name} · Exercício`, slug: s.slug, year: "", kind: "Exercício" as const, searchable: `${item.q} ${s.name} ${item.a}` })),
  ...s.questions.map((item) => ({ title: item.q, detail: `${s.name} · Quiz`, slug: s.slug, year: "", kind: "Quiz" as const, searchable: `${item.q} ${s.name} ${item.options.join(" ")} ${item.explanation ?? ""}` })),
  ...lessons.filter((l) => l.subject === s.slug).map((l) => ({ title: l.title, detail: `${s.name} · Aula`, slug: s.slug, year: l.year, kind: "Aula" as const, searchable: `${l.title} ${s.name} ${l.year}` })),
]);

const suggestions = ["frações", "interpretação de texto", "Revolução Industrial", "porcentagem", "ecologia", "ENEM"];

const synonymGroups: string[][] = [
  ["matemática", "matematica", "conta", "cálculo", "calculo", "números", "numeros"],
  ["português", "portugues", "gramática", "gramatica", "redação", "redacao", "interpretação", "interpretacao", "texto"],
  ["história", "historia", "passado", "guerra", "revolução", "revolucao"],
  ["geografia", "mapa", "países", "paises", "clima", "relevo"],
  ["ciências", "ciencias", "biologia", "corpo humano", "natureza", "ecologia"],
  ["exercício", "exercicio", "prática", "pratica", "questão", "questao", "atividade"],
  ["quiz", "teste", "perguntas", "simulado", "prova", "enem", "vestibular"],
  ["aula", "lição", "licao", "aprender", "estudar", "conteúdo", "conteudo"],
];

function normalize(value: string) {
  return value.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function expandTerms(value: string) {
  const base = normalize(value).split(" ").filter((word) => word.length > 1);
  const expanded = new Set(base);
  for (const group of synonymGroups) {
    const normalizedGroup = group.map(normalize);
    if (normalizedGroup.some((term) => term === normalize(value) || base.some((word) => term.split(" ").includes(word)))) {
      for (const term of normalizedGroup) term.split(" ").forEach((word) => { if (word.length > 1) expanded.add(word); });
    }
  }
  return [...expanded];
}

function scoreEntry(entry: SearchEntry, query: string) {
  const title = normalize(entry.title);
  const detail = normalize(entry.detail);
  const searchable = normalize(entry.searchable);
  const q = normalize(query);
  const terms = normalize(query).split(" ").filter((word) => word.length > 1);
  const expanded = expandTerms(query);
  let score = 0;
  if (title === q) score += 120;
  if (title.startsWith(q)) score += 70;
  if (title.includes(q)) score += 45;
  if (detail.includes(q)) score += 24;
  for (const term of terms) {
    if (title.split(" ").includes(term)) score += 18;
    else if (title.includes(term)) score += 10;
    if (detail.includes(term)) score += 7;
    if (searchable.includes(term)) score += 3;
  }
  for (const term of expanded) {
    if (terms.includes(term)) continue;
    if (title.includes(term)) score += 6;
    else if (detail.includes(term)) score += 4;
    else if (searchable.includes(term)) score += 1;
  }
  if (entry.kind === "Matéria") score += 2;
  return score;
}

function Pesquisa() {
  const [query, setQuery] = useState("");
  const [selectedKind, setSelectedKind] = useState("Todos");
  const normalized = normalize(query);
  const results = useMemo(() => {
    if (!normalized) return [];
    return entries
      .map((entry) => ({ ...entry, score: scoreEntry(entry, query) }))
      .filter((entry) => entry.score > 0 && (selectedKind === "Todos" || entry.kind === selectedKind))
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, "pt-BR"))
      .slice(0, 60);
  }, [normalized, query, selectedKind]);

  function clearSearch() {
    setQuery("");
    setSelectedKind("Todos");
  }

  return (
    <SiteLayout>
      <PageHeader title="Busca inteligente" subtitle="Encontre matérias, assuntos, aulas e atividades com resultados organizados pela relevância." />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-6">
          <label htmlFor="study-search" className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Search className="h-4 w-4 text-primary" /> O que você quer estudar?
          </label>
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-background px-3 focus-within:border-primary">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input id="study-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") clearSearch(); }} placeholder="Ex.: como calcular porcentagem, fotossíntese, ENEM…" className="min-w-0 flex-1 bg-transparent py-4 text-sm text-foreground outline-none placeholder:text-muted-foreground" />
            {query && <button type="button" onClick={clearSearch} aria-label="Limpar busca" className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"><X className="h-4 w-4" /></button>}
          </div>
          {!normalized ? (
            <div className="mt-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground"><Sparkles className="h-4 w-4 text-primary" /> Pesquisas populares</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestions.map((item) => <button key={item} type="button" onClick={() => setQuery(item)} className="rounded-full border border-border px-3 py-2 text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5">{item}</button>)}
              </div>
              <p className="mt-5 text-sm text-muted-foreground">A busca entende palavras sem acentos, combina termos relacionados e prioriza os resultados mais relevantes.</p>
            </div>
          ) : (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-semibold text-muted-foreground">Filtrar:</span>
              {["Todos", "Matéria", "Assunto", "Aula", "Resumo", "Exercício", "Quiz"].map((kind) => <button key={kind} type="button" onClick={() => setSelectedKind(kind)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${selectedKind === kind ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>{kind}</button>)}
            </div>
          )}
        </div>

        {normalized && <section className="mt-6" aria-live="polite">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="font-semibold text-foreground">{results.length ? `${results.length} resultados relevantes` : "Nenhum resultado exato encontrado"}</h2>
            <span className="text-xs text-muted-foreground">Busca inteligente</span>
          </div>
          {results.length ? <div className="grid gap-3 sm:grid-cols-2">
            {results.map((entry, index) => {
              const isLesson = entry.kind === "Aula";
              return <Link key={`${entry.slug}-${entry.kind}-${entry.title}-${index}`} to={isLesson ? "/aula/$slug/$year/$topic" : "/materias/$slug"} params={isLesson ? { slug: entry.slug, year: entry.year, topic: entry.title } : { slug: entry.slug }} className="group flex min-w-0 items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-primary/[0.03]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><BookOpen className="h-5 w-5" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-foreground">{entry.title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{entry.detail}</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">{entry.kind} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" /></span>
                </span>
              </Link>;
            })}
          </div> : <div className="rounded-xl border border-dashed border-border p-6 text-center">
            <p className="font-semibold text-foreground">Tente pesquisar de outro jeito</p>
            <p className="mt-2 text-sm text-muted-foreground">Use palavras mais curtas, o nome da matéria ou uma destas sugestões.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">{suggestions.slice(0, 4).map((item) => <button key={item} type="button" onClick={() => setQuery(item)} className="rounded-full border border-border px-3 py-2 text-sm hover:border-primary/50">{item}</button>)}</div>
          </div>}
        </section>}
      </div>
    </SiteLayout>
  );
}
