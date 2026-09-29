import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { lessons } from "@/lib/lessons";
import { YEAR_LABEL, YEARS, type Year } from "@/lib/curriculum";
import { subjects } from "@/lib/content";
import { actions, useAppState } from "@/lib/store";

export const Route = createFileRoute("/aula/$slug/$year/$topic")({
  loader: ({ params }) => {
    const lesson = lessons.find(l => l.subject === params.slug && l.year === params.year && l.title === params.topic);
    if (!lesson) throw notFound();
    return lesson;
  },
  head: ({ loaderData }) => ({ meta: [
    { title: loaderData ? `${loaderData.title} — Sabe Mais` : "Aula não encontrada — Sabe Mais" },
    { name: "description", content: loaderData?.summary ?? "Aula e atividades de estudo no Sabe Mais." },
    { property: "og:title", content: loaderData ? `${loaderData.title} — Sabe Mais` : "Aula — Sabe Mais" },
    { property: "og:description", content: loaderData?.summary ?? "Aula e atividades de estudo no Sabe Mais." },
    { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Aula,
});

function Aula() {
  const lesson = Route.useLoaderData();
  const s = useAppState();
  const id = `${lesson.subject}:${lesson.year}:${lesson.title}`;
  const label = subjects.find(subject => subject.slug === lesson.subject)?.name ?? lesson.subject;
  return <SiteLayout><PageHeader title={lesson.title} subtitle={`${label} · ${YEAR_LABEL[lesson.year as Year]}`} /><article className="mx-auto max-w-3xl space-y-9 px-4 py-10">
    <Link to="/materias/$slug" params={{ slug: lesson.subject }} className="text-sm font-semibold text-primary">← Voltar para {label}</Link>
    <section><h2 className="text-xl font-bold">Explicação</h2><p className="mt-3 whitespace-pre-line leading-relaxed text-foreground">{lesson.explanation}</p></section>
    {lesson.summary && <section><h2 className="text-xl font-bold">Resumo</h2><p className="mt-3 text-muted-foreground">{lesson.summary}</p></section>}
    {lesson.image && <figure><img src={lesson.image.src} alt={lesson.image.alt} className="w-full rounded-lg" /><figcaption className="mt-2 text-xs text-muted-foreground">{lesson.image.credit}</figcaption></figure>}
    {!!lesson.examples?.length && <section><h2 className="text-xl font-bold">Exemplos práticos</h2><ul className="mt-3 list-inside list-disc space-y-2">{lesson.examples.map(x => <li key={x}>{x}</li>)}</ul></section>}
    {!!lesson.solvedExamples?.length && <section><h2 className="text-xl font-bold">Passo a passo</h2>{lesson.solvedExamples.map(ex => <div key={ex.problem} className="mt-3 border-l-2 border-primary pl-4"><p className="font-semibold">{ex.problem}</p><ol className="mt-2 list-inside list-decimal space-y-1">{ex.steps.map(step => <li key={step}>{step}</li>)}</ol></div>)}</section>}
    {!!lesson.formulas?.length && <section><h2 className="text-xl font-bold">Fórmulas</h2><ul className="mt-3 space-y-2">{lesson.formulas.map(f => <li key={f}>{f}</li>)}</ul></section>}
    {!!lesson.exercises?.length && <section><h2 className="text-xl font-bold">Exercícios</h2>{lesson.exercises.map(ex => <details key={ex.prompt} className="mt-3 rounded-lg border border-border p-4"><summary className="cursor-pointer font-semibold">{ex.prompt}</summary><p className="mt-3">{ex.answer}</p></details>)}</section>}
    {!!lesson.review?.length && <section><h2 className="text-xl font-bold">Questões de revisão</h2><ol className="mt-3 list-inside list-decimal space-y-2">{lesson.review.map(q => <li key={q}>{q}</li>)}</ol></section>}
    {lesson.finalSummary && <section><h2 className="text-xl font-bold">Para lembrar</h2><p className="mt-3">{lesson.finalSummary}</p></section>}
    {(["facil", "medio", "dificil"] as const).map(level => lesson.quizzes?.[level]?.length === 10 && <Link key={level} to="/quiz" search={{ subject: lesson.subject, year: lesson.year, topic: lesson.title, level }} className="mr-3 inline-block rounded-lg border border-primary px-4 py-2 font-semibold text-primary">Quiz {level}</Link>)}
    <Button onClick={() => actions.completeTopic(id)} disabled={s.completedTopics.includes(id)}>{s.completedTopics.includes(id) ? "Assunto concluído" : "Concluir assunto"}</Button>
  </article></SiteLayout>;
}