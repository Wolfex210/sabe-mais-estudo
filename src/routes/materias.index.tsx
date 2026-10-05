import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { SiteLayout, PageHeader, Card, AdSlot } from "@/components/SiteLayout";
import { subjects } from "@/lib/content";

export const Route = createFileRoute("/materias/")({
  head: () => ({
    meta: [
      { title: "Matérias — Sabe Mais" },
      {
        name: "description",
        content:
          "Matemática, Português, História, Geografia, Ciências, Inglês, Física e Química com roteiros por ano, resumos, exemplos, exercícios e quiz.",
      },
      { property: "og:title", content: "Matérias — Sabe Mais" },
      { property: "og:description", content: "Resumos, fórmulas, exemplos e exercícios de 8 matérias." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Materias,
});

function Materias() {
  const [query, setQuery] = useState("");
  const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const filteredSubjects = subjects.filter((subject) => normalize(subject.name).includes(normalize(query.trim())));

  return (
    <SiteLayout>
      <PageHeader
        title="Matérias"
        subtitle="Escolha uma matéria para estudar por ano escolar, do Fundamental ao Ensino Médio."
      />
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredSubjects.map((s) => (
            <Link key={s.slug} to="/materias/$slug" params={{ slug: s.slug }}>
              <Card className="h-full">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${s.color}`}>
                  {s.emoji}
                </span>
                <h2 className="mt-4 text-lg font-semibold text-foreground">{s.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{s.intro}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-primary">Abrir matéria →</span>
              </Card>
            </Link>
          ))}
        </div>
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
