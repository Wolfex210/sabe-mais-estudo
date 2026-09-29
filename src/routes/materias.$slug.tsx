import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader, Card, AdSlot } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { getExamPrep, getSubject, getStudyHelpLines } from "@/lib/content";
import { curriculum, YEARS, YEAR_LABEL, type Year } from "@/lib/curriculum";
import { getTopics } from "@/lib/lessons";
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
  const subject = getSubject(slug);
  const availableYears = YEARS.filter((year) => (curriculum[slug]?.[year]?.length ?? 0) > 0);
  const [year, setYear] = useState<Year>(availableYears[0] ?? "1º EF");
  const activeYear = availableYears.includes(year) ? year : (availableYears[0] ?? "1º EF");
  const [open, setOpen] = useState<number | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [studyPage, setStudyPage] = useState(0);\n  const studyImages = [\n    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",\n    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",\n    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",\n    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",\n  ];

  if (!subject) return null;
  const topics = getTopics(slug, activeYear);
  const q = subject.questions[qIndex];
  const helpLines = getStudyHelpLines(slug);\n  const examPrep = getExamPrep(slug);
  const finished = qIndex >= subject.questions.length || !q;

  function pick(i: number) {
    if (chosen !== null || !q) return;
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
          <section aria-labelledby="year-heading">
            <h2 id="year-heading" className="text-xl font-bold text-foreground">Estude por ano escolar</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Selecione seu ano para ver um roteiro introdutório dos principais assuntos. A ordem pode variar conforme a escola.
              {(slug === "fisica" || slug === "quimica") && " Antes do 9º ano, estes temas aparecem principalmente em Ciências."}
            </p>
            <label htmlFor="school-year" className="mt-5 block text-sm font-semibold text-foreground">Ano escolar</label>
            <select
              id="school-year"
              value={activeYear}
              onChange={(event) => setYear(event.target.value as Year)}
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:max-w-sm"
            >
              {availableYears.map((item) => <option key={item} value={item}>{YEAR_LABEL[item]}</option>)}
            </select>
            <div className="mt-5 space-y-3" aria-live="polite">
              <h3 className="text-base font-semibold text-foreground">{YEAR_LABEL[activeYear]}</h3>
              <ol className="space-y-3">
                {topics.map((topic, index) => {
                  return (
                    <li key={`${activeYear}-${index}`} className="rounded-lg border border-border bg-card px-4 py-4 shadow-soft">
                      <h4 className="font-semibold text-foreground">{topic.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{topic.text}</p>
                      {topic.lesson && <Link to="/aula/$slug/$year/$topic" params={{ slug, year: activeYear, topic: topic.title }} className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">Abrir aula e atividades →</Link>}
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>

          <section aria-labelledby="study-pages-heading">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 id="study-pages-heading" className="text-xl font-bold text-foreground">📚 Abas de estudo</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Explore cada parte da matéria com uma imagem temática, explicação, tópicos principais e aplicação em provas.
                </p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Aba {studyPage + 1} de {subject.studyPages.length}</span>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-4" role="tablist" aria-label={`Abas de estudo de ${subject.name}`}>
              {subject.studyPages.map((page, i) => (
                <button
                  key={page.title}
                  role="tab"
                  aria-selected={i === studyPage}
                  onClick={() => setStudyPage(i)}
                  className={`group overflow-hidden rounded-xl border text-left transition-all ${i === studyPage ? "border-primary bg-primary/10 shadow-soft ring-2 ring-primary/20" : "border-border bg-card hover:border-primary/50"}`}
                >
                  <img
                    src={studyImages[i % studyImages.length]}
                    alt={`Imagem ilustrativa sobre ${page.title}`}
                    className="h-24 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="p-3">
                    <span className="text-xs font-semibold text-primary">Página {i + 1}</span>
                    <p className="mt-1 line-clamp-2 text-sm font-semibold text-foreground">{page.title}</p>
                  </div>
                </button>
              ))}
            </div>

            <Card className="mt-4 overflow-hidden">
              <img
                src={studyImages[studyPage % studyImages.length]}
                alt={`Imagem ilustrativa sobre ${subject.studyPages[studyPage]?.title ?? subject.name}`}
                className="h-52 w-full object-cover sm:h-64"
              />
              <div className="p-5 sm:p-6">
                <div className="h-1.5 overflow-hidden rounded-full bg-primary/15">
                  <div className="h-full bg-primary transition-all duration-300" style={{ width: `${((studyPage + 1) / subject.studyPages.length) * 100}%` }} />
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground">{subject.studyPages[studyPage]?.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{subject.studyPages[studyPage]?.text}</p>

                <div className="mt-5 grid gap-2 sm:grid-cols-3">
                  {subject.studyPages[studyPage]?.topics.map((item) => (
                    <div key={item} className="rounded-lg bg-secondary px-3 py-3 text-sm font-medium text-foreground">• {item}</div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <p className="text-sm font-semibold text-foreground">🎯 Como estudar esta parte</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Leia a explicação, revise os tópicos e tente explicar o conteúdo sem consultar a página. Depois, pratique questões relacionadas a este assunto.
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <Button variant="outline" disabled={studyPage === 0} onClick={() => setStudyPage((p) => Math.max(0, p - 1))}>← Anterior</Button>
                  <div className="hidden text-xs font-medium text-muted-foreground sm:block">Aba {studyPage + 1} de {subject.studyPages.length}</div>
                  <Button disabled={studyPage === subject.studyPages.length - 1} onClick={() => setStudyPage((p) => Math.min(subject.studyPages.length - 1, p + 1))}>Próxima →</Button>
                </div>
              </div>
            </Card>
          </section>

          <section aria-labelledby="exam-prep-heading">
            <div>
              <h2 id="exam-prep-heading" className="text-xl font-bold text-foreground">🎓 ENEM e Vestibulares</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Conteúdo complementar para transformar o que você já estuda em preparação para provas. Nada das matérias, páginas, resumos, exemplos, exercícios ou quizzes anteriores foi removido.
              </p>
            </div>
            <div className="mt-4 space-y-4">
              {examPrep.map((section) => (
                <Card key={section.title}>
                  <h3 className="font-semibold text-foreground">{section.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{section.explanation}</p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {section.topics.map((topic) => (
                      <div key={topic} className="rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-foreground">• {topic}</div>
                    ))}
                  </div>
                  <p className="mt-4 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm leading-6 text-foreground">
                    <span className="font-semibold text-primary">Como praticar:</span> {section.practice}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          <section aria-labelledby="help-heading">
            <h2 id="help-heading" className="text-xl font-bold text-foreground">📘 Como esta matéria pode ajudar você</h2>
            <p className="mt-2 text-sm text-muted-foreground">Uma página extensa com explicações para entender o que é a matéria, o que você aprende nela e como usar o conteúdo nos estudos.</p>
            <Card className="mt-4">
              <div className="space-y-3">
                {helpLines.map((line, index) => (
                  <p key={index} className="text-sm leading-7 text-muted-foreground">
                    <span className="mr-2 font-semibold text-primary">{index + 1}.</span>{line}
                  </p>
                ))}
              </div>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">Resumos e explicações complementares</h2>
            <p className="mt-2 text-sm text-muted-foreground">Materiais gerais da disciplina, não específicos do ano selecionado.</p>
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
                  <Button variant="link"
                    onClick={() => setOpen(open === i ? null : i)}
                    className="mt-2 h-auto p-0 text-xs"
                  >
                    {open === i ? "Ocultar resposta" : "Ver resposta"}
                  </Button>
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
                  <Button
                    onClick={() => {
                      setQIndex(0);
                      setChosen(null);
                      setScore(0);
                    }}
                    className="mt-4"
                  >
                    Tentar novamente
                  </Button>
                </div>
              ) : q ? (
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
                        <Button
                          key={o}
                          variant="outline"
                          onClick={() => pick(i)}
                          className={`h-auto min-h-11 w-full justify-start whitespace-normal px-4 py-3 text-left text-sm ${state}`}
                        >
                          {o}
                        </Button>
                      );
                    })}
                  </div>
                  {chosen !== null && q.explanation && (
                    <div className={chosen === q.answer ? "quiz-feedback-correct mt-4 rounded-xl border border-success/30 bg-success/10 p-4" : "quiz-feedback-wrong mt-4 rounded-xl border border-destructive/30 bg-destructive/10 p-4"}>
                      <p className="font-semibold text-foreground">{chosen === q.answer ? "✓ Resposta correta!" : "✕ Vamos entender o erro"}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{q.explanation}</p>
                    </div>
                  )}
                  {chosen !== null && (
                    <Button
                      onClick={() => {
                        setQIndex((i) => i + 1);
                        setChosen(null);
                      }}
                      className="mt-4"
                    >
                      Próxima
                    </Button>
                  )}
                </>
              ) : null}
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
