import { createFileRoute, Link } from "@tanstack/react-router";
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
  return (
    <SiteLayout>
      <PageHeader
        title="Matérias"
        subtitle="Escolha uma matéria para estudar por ano escolar, do Fundamental ao Ensino Médio."
      />
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {subjects.map((s) => (
            <Link key={s.slug} to="/materias/$slug" params={{ slug: s.slug }}>
              <Card className="h-full">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${s.color}`}>
                  {s.emoji}
                </span>
                <h2 className="mt-4 text-lg font-semibold text-foreground">{s.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{s.intro}</p>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-12">
          <AdSlot />
        </div>
      </div>
    </SiteLayout>
  );
}
