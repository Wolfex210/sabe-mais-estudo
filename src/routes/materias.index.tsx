import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { SiteLayout, PageHeader, Card, AdSlot } from "@/components/SiteLayout";
import { subjects } from "@/lib/content";
import { subjectCoverImages } from "@/lib/subject-images";
import { usePlanAccess } from "@/lib/plan-access";

export const Route = createFileRoute("/materias/")({
  head: () => ({
    meta: [
      { title: "Matérias — Sabe Mais" },
      {
        name: "description",
        content: "Estude matérias fundamentais e áreas complementares com conteúdos por ano, explicações, exemplos, exercícios e quizzes.",
      },
      { property: "og:title", content: "Matérias — Sabe Mais" },
      { property: "og:description", content: "Matérias fundamentais e catálogo completo de estudos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Materias,
});

const fundamentalSlugs = new Set(["portugues", "matematica", "ciencias", "biologia", "historia", "geografia", "ingles"]);

function Materias() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"fundamentais" | "todas">("fundamentais");
  const { limits, plan } = usePlanAccess();
  const catalogSubjects = subjects;
  const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const filteredSubjects = catalogSubjects.filter((subject) => {
    const matchesQuery = normalize(subject.name).includes(normalize(query.trim()));
    return matchesQuery && (category === "todas" || fundamentalSlugs.has(subject.slug));
  });
  const availableCount = Math.min(limits.subjects, subjects.length);

  return (
    <SiteLayout>
      <PageHeader
        title="Matérias"
        subtitle={plan === "basico" ? "Plano Básico: 25 matérias disponíveis. Faça upgrade para ampliar o catálogo." : plan === "medio" ? "Plano Médio: 60 matérias disponíveis. O Master libera o catálogo completo." : "Comece pelas matérias fundamentais ou explore o catálogo completo."}
      />
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="mb-6 flex flex-wrap gap-3" role="tablist" aria-label="Categorias de matérias">
          <button
            type="button"
            role="tab"
            aria-selected={category === "fundamentais"}
            onClick={() => setCategory("fundamentais")}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${category === "fundamentais" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-muted"}`}
          >
            ⭐ Fundamentais
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={category === "todas"}
            onClick={() => setCategory("todas")}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${category === "todas" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-muted"}`}
          >
            Todas as matérias
          </button>
        </div>
        {category === "fundamentais" && (
          <div className="mb-8 rounded-xl border border-border bg-card p-5">
            <h2 className="text-lg font-bold text-foreground">Trilha Fundamentais</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Português, Matemática, Ciências, Biologia, História, Geografia e Inglês com oito unidades aprofundadas, exemplos, exercícios, quiz e conteúdo organizado para os 12 anos escolares.
            </p>
          </div>
        )}
        <div className="mb-8 max-w-sm">
          <label htmlFor="subject-search" className="mb-2 block text-sm font-semibold text-foreground">Buscar matéria</label>
          <div className="relative">
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              id="subject-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Digite o nome da matéria"
              className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">Exibindo {availableCount} de {catalogSubjects.length} matérias liberadas neste plano. As demais aparecem bloqueadas.</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredSubjects.map((s) => {
            const locked = subjects.findIndex((item) => item.slug === s.slug) >= limits.subjects;
            const contents = <Card className={`h-full ${locked ? "opacity-80" : ""}`}>
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={subjectCoverImages[s.slug]}
                  alt={`Imagem ilustrativa de ${s.name}`}
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={360}
                  className="h-36 w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <div className="absolute left-3 top-3 flex items-center gap-2">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-2xl shadow-sm ${s.color}`}>{s.emoji}</span>
                </div>
                {locked && <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/95 px-2 py-1 text-xs font-bold text-muted-foreground shadow-sm">🔒 Bloqueada</span>}
              </div>
              <h2 className="mt-4 text-lg font-semibold text-foreground">{s.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{s.intro}</p>
              <span className={`mt-3 inline-block text-sm font-semibold ${locked ? "text-muted-foreground" : "text-primary"}`}>{locked ? "Fazer upgrade para acessar →" : "Abrir matéria →"}</span>
            </Card>;
            return locked
              ? <Link key={s.slug} to="/planos" aria-label={`${s.name} bloqueada. Ver planos para liberar.`}>{contents}</Link>
              : <Link key={s.slug} to="/materias/$slug" params={{ slug: s.slug }}>{contents}</Link>;
          })}
        </div>
        {!limits.isUnlimited && (
          <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm text-foreground">
            <p className="font-semibold">Quer estudar mais matérias?</p>
            <p className="mt-1 text-muted-foreground">O Básico libera 25 matérias, o Médio 60 e o Master libera todas.</p>
            <Link to="/planos" className="mt-3 inline-flex font-semibold text-primary hover:underline">Comparar planos →</Link>
          </div>
        )}
        {filteredSubjects.length === 0 && (
          <p role="status" className="py-8 text-sm text-muted-foreground">Nenhuma matéria encontrada para “{query.trim()}”.</p>
        )}
        <div className="mt-12">
          <AdSlot />
        </div>
      </div>
    </SiteLayout>
  );
}
