import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout, PageHeader, Card, AdSlot } from "@/components/SiteLayout";
import { subjects, type Question } from "@/lib/content";
import { actions } from "@/lib/store";
import { lessons } from "@/lib/lessons";

export const Route = createFileRoute("/quiz")({
  validateSearch: (search: Record<string, unknown>) => ({
    ...(typeof search['subject'] === "string" ? { subject: search['subject'] } : {}),
    ...(typeof search['year'] === "string" ? { year: search['year'] } : {}),
    ...(typeof search['topic'] === "string" ? { topic: search['topic'] } : {}),
    ...(search['level'] === "facil" || search['level'] === "medio" || search['level'] === "dificil" ? { level: search['level'] as Question['level'] } : {}),
  }),
  head: () => ({
    meta: [
      { title: "Quiz — Sabe Mais" },
      {
        name: "description",
        content: "Responda quizzes por matéria e nível de dificuldade, com pontuação e resultado final.",
      },
      { property: "og:title", content: "Quiz — Sabe Mais" },
      { property: "og:description", content: "Escolha matéria e dificuldade e teste seus conhecimentos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuizPage,
});

const levels = [
  { id: "facil", label: "Fácil" },
  { id: "medio", label: "Médio" },
  { id: "dificil", label: "Difícil" },
] as const;

function QuizPage() {
  const search = Route.useSearch();
  const [slug, setSlug] = useState(search.subject ?? subjects[0]!.slug);
  const [level, setLevel] = useState<Question["level"]>(search.level ?? "facil");
  const [topic, setTopic] = useState(search.topic ?? "");
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ question: string; selected: string; expected: string; correct: boolean; explanation?: string }[]>([]);

  const topicLessons = lessons.filter(l => l.subject === slug && Object.values(l.quizzes ?? {}).some(list => list?.length === 10));

  const questions = useMemo(
    () => {
      const lesson = topicLessons.find(l => l.title === topic && (!search.year || search.year === l.year));
      return lesson?.quizzes?.[level]?.length === 10 ? lesson.quizzes[level] : (subjects.find(s => s.slug === slug)?.questions ?? []).filter(q => q.level === level);
    },
    [slug, level, topic],
  );

  function restart() {
    setStarted(false);
    setIndex(0);
    setChosen(null);
    setScore(0);
    setAnswers([]);
  }

  function pick(i: number) {
    if (chosen !== null) return;
    setChosen(i);
    const ok = i === questions[index]!.answer;
    if (ok) setScore((s) => s + 1);
    const question = questions[index];
    if (question) setAnswers(a => [...a, { question: question.q, selected: question.options[i] ?? "", expected: question.options[question.answer] ?? "", correct: ok, ...(question.explanation ? { explanation: question.explanation } : {}) }]);
    actions.answer(ok);
    if (index === questions.length - 1) actions.recordQuiz({ subject: slug, ...(topic ? { topic } : {}), level, correct: score + (ok ? 1 : 0), total: questions.length, date: new Date().toISOString() });
  }

  const finished = started && index >= questions.length;

  return (
    <SiteLayout>
      <PageHeader title="Quiz" subtitle="Escolha a matéria e a dificuldade para começar." />
      <div className="mx-auto w-full max-w-3xl px-4 py-12">
        {!started && (
          <Card>
            <label htmlFor="quiz-subject" className="text-sm font-semibold text-foreground">Matéria</label>
            <select
              id="quiz-subject"
              value={slug}
              onChange={(e) => { setSlug(e.target.value); setTopic(""); }}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            >
              {subjects.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.emoji} {s.name}
                </option>
              ))}
            </select>
            {topicLessons.length > 0 && <><label htmlFor="quiz-topic" className="mt-5 block text-sm font-semibold text-foreground">Assunto</label><select id="quiz-topic" value={topic} onChange={e => setTopic(e.target.value)} className="mt-2 w-full rounded-lg border border-border bg-background p-3"><option value="">Questões gerais da matéria</option>{topicLessons.map(l => <option key={`${l.year}-${l.title}`} value={l.title}>{l.title} · {l.year}</option>)}</select></>}

            <p className="mt-6 text-sm font-semibold text-foreground">Dificuldade</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {levels.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLevel(l.id)}
                  className={`rounded-xl border px-5 py-2.5 text-sm font-semibold transition-colors ${
                    level === l.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <button
              disabled={questions.length === 0}
              onClick={() => setStarted(true)}
              className="mt-8 w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              {questions.length === 0
                ? "Sem questões nesse nível ainda"
                : `Começar (${questions.length} questões)`}
            </button>
          </Card>
        )}

        {started && !finished && (
          <Card>
            <div className="flex items-center justify-between text-xs font-semibold uppercase text-muted-foreground">
              <span>
                Questão {index + 1} de {questions.length}
              </span>
              <span>Pontuação: {score}</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-secondary">
              <div
                className="h-2 rounded-full bg-primary transition-all"
                style={{ width: `${(index / questions.length) * 100}%` }}
              />
            </div>
            <p className="mt-6 text-lg font-medium text-foreground">{questions[index]!.q}</p>
            <div className="mt-5 space-y-2">
              {questions[index]!.options.map((o, i) => {
                const cls =
                  chosen === null
                    ? "border-border hover:border-primary"
                    : i === questions[index]!.answer
                      ? "border-success bg-success/10"
                      : i === chosen
                        ? "border-destructive bg-destructive/10"
                        : "border-border opacity-60";
                return (
                  <button
                    key={o}
                    onClick={() => pick(i)}
                    className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ${cls}`}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
            {chosen !== null && (
              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">
                  {chosen === questions[index]!.answer ? "✅ Acertou!" : "❌ Errou"}
                </p>
                <button
                  onClick={() => {
                    setIndex((i) => i + 1);
                    setChosen(null);
                  }}
                  className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  {index + 1 === questions.length ? "Ver resultado" : "Próxima"}
                </button>
              </div>
            )}
          </Card>
        )}

        {finished && (
          <Card className="text-center">
            <p className="text-5xl">🎉</p>
            <h2 className="mt-4 text-2xl font-bold text-foreground">Resultado</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Você acertou {score} de {questions.length} questões.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{questions.length - score} erros · {questions.length ? Math.round(score / questions.length * 100) : 0}% de acerto · {score * 5} pontos</p>
            <div className="mt-6 space-y-3 text-left"><h3 className="font-semibold">Revisão das respostas</h3>{answers.map((answer, i) => <div key={i} className="rounded-lg border border-border p-3 text-sm"><p className="font-semibold">{i + 1}. {answer.question}</p><p className="mt-1">Sua resposta: {answer.selected} · {answer.correct ? "Correta" : "Incorreta"}</p><p className="text-muted-foreground">Resposta certa: {answer.expected}</p>{answer.explanation && <p className="mt-2 text-muted-foreground">{answer.explanation}</p>}</div>)}</div>
            <button
              onClick={restart}
              className="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Tentar novamente
            </button>
          </Card>
        )}

        <div className="mt-10">
          <AdSlot />
        </div>
      </div>
    </SiteLayout>
  );
}
