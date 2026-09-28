import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader, Card, AdSlot } from "@/components/SiteLayout";
import { getSubject } from "@/lib/content";
import { actions } from "@/lib/store";

export const Route = createFileRoute("/materias/$slug")({
  loader: ({ params }) => {
    const subject = getSubject(params.slug);
    if (!subject) throw notFound();
    return { name: subject.name, intro: subject.intro };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Matéria não encontrada — Sabe Mais" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} — Sabe Mais`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.intro },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.intro },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: SubjectPage,
});

function SubjectPage() {
  const { slug } = Route.useParams();
  const subject = getSubject(slug)!;
  const [open, setOpen] = useState<number | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const q = subject.questions[qIndex]!;
  const finished = qIndex >= subject.questions.length;

  function pick(i: number) {
    if (chosen !== null) return;
    setChosen(i);
    const ok = i === q.answer;
    if (ok) setScore((s) => s + 1);
    actions.answer(ok);
  }

  return (
    <SiteLayout>
      <PageHeader title={`${subject.emoji} ${subject.name}`} subtitle={subject.intro} />
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <section>
            <h2 className="text-xl font-bold text-foreground">Resumos e explicações</h2>
            <div className="mt-4 space-y-4">
              {subject.summaries.map((s) => (
                <Card key={s.title}>
                  <h3 className="font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </Card>
              ))}
            </div>
          </section>

          {subject.formulas && (
            <section>
              <h2 className="text-xl font-bold text-foreground">Fórmulas importantes</h2>
              <Card className="mt-4">
                <ul className="space-y-2 text-sm text-foreground">
                  {subject.formulas.map((f) => (
                    <li key={f} className="rounded-lg bg-secondary px-3 py-2 font-medium">
                      {f}
                    </li>
                  ))}
                </ul>
              </Card>
            </section>
          )}

          <section>
            <h2 className="text-xl font-bold text-foreground">Exemplos</h2>
            <Card className="mt-4">
              <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                {subject.examples.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">Exercícios</h2>
            <div className="mt-4 space-y-3">
              {subject.exercises.map((ex, i) => (
                <Card key={ex.q} className="p-4">
                  <p className="text-sm font-medium text-foreground">{ex.q}</p>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="mt-2 text-xs font-semibold text-primary hover:underline"
                  >
                    {open === i ? "Ocultar resposta" : "Ver resposta"}
                  </button>
                  {open === i && (
                    <p className="mt-2 rounded-lg bg-secondary px-3 py-2 text-sm text-foreground">
                      {ex.a}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">Quiz de {subject.name}</h2>
            <Card className="mt-4">
              {finished ? (
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">
                    Você acertou {score} de {subject.questions.length} questões.
                  </p>
                  <button
                    onClick={() => {
                      setQIndex(0);
                      setChosen(null);
                      setScore(0);
                    }}
                    className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                  >
                    Tentar novamente
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">
                    Questão {qIndex + 1} de {subject.questions.length}
                  </p>
                  <p className="mt-2 font-medium text-foreground">{q.q}</p>
                  <div className="mt-4 space-y-2">
                    {q.options.map((o, i) => {
                      const state =
                        chosen === null
                          ? "border-border hover:border-primary"
                          : i === q.answer
                            ? "border-success bg-success/10"
                            : i === chosen
                              ? "border-destructive bg-destructive/10"
                              : "border-border opacity-60";
                      return (
                        <button
                          key={o}
                          onClick={() => pick(i)}
                          className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ${state}`}
                        >
                          {o}
                        </button>
                      );
                    })}
                  </div>
                  {chosen !== null && (
                    <button
                      onClick={() => {
                        setQIndex((i) => i + 1);
                        setChosen(null);
                      }}
                      className="mt-4 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                    >
                      Próxima
                    </button>
                  )}
                </>
              )}
            </Card>
          </section>
        </div>

        <aside className="space-y-6">
          <Card>
            <h3 className="font-semibold text-foreground">Estudar mais</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Faça um quiz completo escolhendo o nível de dificuldade.
            </p>
            <Link
              to="/quiz"
              className="mt-4 inline-block rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Ir para o Quiz
            </Link>
          </Card>
          <AdSlot label="Publicidade" />
        </aside>
      </div>
    </SiteLayout>
  );
}
