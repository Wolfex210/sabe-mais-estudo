import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { subjects } from "@/lib/catalog";
import { getSearchIndex, type SearchEntry } from "@/lib/study.functions";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { findSearchResults, normalizeSearch } from "@/lib/search";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, BookOpen, ArrowRight, X } from "lucide-react";

export const Route = createFileRoute("/pesquisa")({
  head: () => ({ meta: [{ title: "Busca inteligente — Sabe Mais" }, { name: "description", content: "Encontre rapidamente matérias, assuntos, aulas, exercícios e quizzes no Sabe Mais." }, { property: "og:title", content: "Busca inteligente — Sabe Mais" }, { property: "og:description", content: "Encontre matérias, assuntos e atividades para estudar." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Pesquisa,
});

// Matérias são públicas; assuntos, aulas, resumos e questões vêm do servidor conforme o plano.
const subjectEntries: SearchEntry[] = subjects.map((s) => ({ id: s.slug, title: s.name, detail: "Matéria", slug: s.slug, year: "", kind: "Matéria" as const, searchable: `${s.name} ${s.intro}` }));

const suggestions = ["frações", "interpretação de texto", "Revolução Industrial", "porcentagem", "ecologia", "ENEM"];

function Pesquisa() {
  const [query, setQuery] = useState("");
  const [selectedKind, setSelectedKind] = useState("Todos");
  const normalized = normalizeSearch(query);
  const { user } = useAuth();
  const fetchIndex = useServerFn(getSearchIndex);
  const { data: studyEntries, isLoading, isError } = useQuery({ queryKey: ["study", user?.id, "search-v2"], queryFn: () => fetchIndex(), enabled: !!user, staleTime: 5 * 60_000 });
  const entries = useMemo(() => [...subjectEntries, ...(studyEntries ?? [])], [studyEntries]);
  const results = useMemo(() => {
    if (!normalized) return [];
    return findSearchResults(entries, query, selectedKind);
  }, [normalized, query, selectedKind, entries]);

  const [visibleCount, setVisibleCount] = useState(30);

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
          {isLoading && <p className="mb-3 text-sm text-muted-foreground">Buscando conteúdos…</p>}
          {isError && <p role="alert" className="mb-3 text-sm text-destructive">Não foi possível consultar as aulas. Tente novamente.</p>}
          {!user && <p className="mb-3 text-sm text-muted-foreground">Entre na sua conta para pesquisar também aulas e atividades.</p>}
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="font-semibold text-foreground">{results.length ? `${results.length} resultados relevantes` : "Nenhum resultado exato encontrado"}</h2>
            <span className="text-xs text-muted-foreground">Busca inteligente</span>
          </div>
          {results.length ? <div className="grid gap-3 sm:grid-cols-2">
            {results.slice(0, visibleCount).map((entry, index) => {
              const isLesson = entry.kind === "Aula";
              return <Link key={`${entry.slug}-${entry.kind}-${entry.title}-${index}`} to={isLesson ? "/aula/$slug/$year/$topic" : "/materias/$slug"} params={isLesson ? { slug: entry.slug, year: entry.year, topic: entry.title } : { slug: entry.slug }} search={isLesson || entry.kind === "Matéria" ? {} : { year: entry.year, result: entry.id }} hash={isLesson || entry.kind === "Matéria" ? undefined : entry.id} className="group flex min-w-0 items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-primary/[0.03]">
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
          {results.length > visibleCount && <Button variant="outline" className="mt-5" onClick={() => setVisibleCount(count => count + 30)}>Mostrar mais resultados</Button>}
        </section>}
      </div>
    </SiteLayout>
  );
}
