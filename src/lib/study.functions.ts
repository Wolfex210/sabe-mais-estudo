import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Question, Subject, DeepStudySection } from "@/lib/content";
import type { Lesson } from "@/lib/lessons";
import type { FacultyCourse } from "@/lib/faculty";
import type { Year } from "@/lib/years";
import type { PlanId } from "@/lib/stripe-plans";

/**
 * Conteúdo de estudo protegido: só sai do servidor depois de conferir login e plano.
 * Os módulos de conteúdo são carregados dentro dos handlers para não irem ao navegador.
 */
export type StudyPlan = PlanId | "trial" | null;
export type StudyResult<T> = { status: "ok"; data: T } | { status: "locked"; plan: StudyPlan } | { status: "not_found" };

const slugOk = (v: unknown): v is string => typeof v === "string" && v.length > 0 && v.length < 120;

async function access(context: { supabase: Parameters<typeof import("@/lib/study-access.server").resolveStudyAccess>[0]; userId: string }) {
  const mod = await import("@/lib/study-access.server");
  return { mod, access: await mod.resolveStudyAccess(context.supabase, context.userId) };
}

export type SubjectTopic = { title: string; text: string; hasLesson: boolean };
export type SubjectStudy = {
  subject: Subject;
  deep: DeepStudySection | null;
  exam: { title: string; text: string }[];
  help: string[];
  curriculum: Partial<Record<Year, string[]>>;
  topics: Partial<Record<Year, SubjectTopic[]>>;
};

export const getSubjectStudy = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { slug: string }) => { if (!slugOk(input?.slug)) throw new Error("Matéria inválida"); return { slug: input.slug }; })
  .handler(async ({ data, context }): Promise<StudyResult<SubjectStudy>> => {
    const content = await import("@/lib/content");
    const subject = content.getSubject(data.slug);
    if (!subject) return { status: "not_found" };
    const { mod, access: a } = await access(context);
    if (!mod.canOpenSubject(a, data.slug)) return { status: "locked", plan: a.plan };
    const { curriculum, YEARS } = await import("@/lib/curriculum");
    const { getTopics } = await import("@/lib/lessons");
    const topics: SubjectStudy["topics"] = {};
    for (const year of YEARS) topics[year] = getTopics(data.slug, year).map((t) => ({ title: t.title, text: t.text, hasLesson: !!t.lesson }));
    return { status: "ok", data: {
      subject, deep: content.getDeepStudy(data.slug), exam: content.getExamPrep(data.slug) as { title: string; text: string }[],
      help: content.getStudyHelpLines(data.slug), curriculum: curriculum[data.slug] ?? {}, topics,
    } };
  });

export const getLessonStudy = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { slug: string; year: string; topic: string }) => {
    if (!slugOk(input?.slug) || !slugOk(input?.year) || typeof input?.topic !== "string" || input.topic.length > 300) throw new Error("Aula inválida");
    return { slug: input.slug, year: input.year, topic: input.topic };
  })
  .handler(async ({ data, context }): Promise<StudyResult<Lesson>> => {
    const { lessons } = await import("@/lib/lessons");
    const lesson = lessons.find((l) => l.subject === data.slug && l.year === data.year && l.title === data.topic);
    if (!lesson) return { status: "not_found" };
    const { mod, access: a } = await access(context);
    if (!mod.canOpenSubject(a, data.slug)) return { status: "locked", plan: a.plan };
    return { status: "ok", data: lesson };
  });

export type QuizBank = { questions: Question[]; topicLessons: { title: string; year: string; quizzes: Lesson["quizzes"] }[] };

export const getQuizBank = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { slug: string }) => { if (!slugOk(input?.slug)) throw new Error("Matéria inválida"); return { slug: input.slug }; })
  .handler(async ({ data, context }): Promise<StudyResult<QuizBank>> => {
    const { getSubject } = await import("@/lib/content");
    const subject = getSubject(data.slug);
    if (!subject) return { status: "not_found" };
    const { mod, access: a } = await access(context);
    if (!mod.canOpenSubject(a, data.slug)) return { status: "locked", plan: a.plan };
    const { lessons } = await import("@/lib/lessons");
    const topicLessons = lessons
      .filter((l) => l.subject === data.slug && Object.values(l.quizzes ?? {}).some((list) => list?.length === 10))
      .map((l) => ({ title: l.title, year: l.year, quizzes: l.quizzes }));
    return { status: "ok", data: { questions: subject.questions, topicLessons } };
  });

export type SimQuestion = Question & { subject: string; subjectName: string };

export const getSimuladoBank = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<StudyResult<SimQuestion[]>> => {
    const { subjects } = await import("@/lib/content");
    const { mod, access: a } = await access(context);
    const allowed = subjects.filter((s) => mod.canOpenSubject(a, s.slug));
    if (!allowed.length) return { status: "locked", plan: a.plan };
    return { status: "ok", data: allowed.flatMap((s) => s.questions.map((q) => ({ ...q, subject: s.slug, subjectName: s.name }))) };
  });

export type SearchEntry = { title: string; detail: string; slug: string; year: string; kind: "Matéria" | "Assunto" | "Resumo" | "Exercício" | "Quiz" | "Aula"; searchable: string };

export const getSearchIndex = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<SearchEntry[]> => {
    const { subjects } = await import("@/lib/content");
    const { curriculum, YEARS, YEAR_LABEL, parseTopic } = await import("@/lib/curriculum");
    const { lessons } = await import("@/lib/lessons");
    const { mod, access: a } = await access(context);
    return subjects.filter((s) => mod.canOpenSubject(a, s.slug)).flatMap((s): SearchEntry[] => [
      ...YEARS.flatMap((y) => (curriculum[s.slug]?.[y] ?? []).map((item) => {
        const title = parseTopic(item).title;
        return { title, detail: `${s.name} · ${YEAR_LABEL[y]}`, slug: s.slug, year: y, kind: "Assunto" as const, searchable: `${title} ${s.name} ${YEAR_LABEL[y]}` };
      })),
      ...s.summaries.map((item) => ({ title: item.title, detail: `${s.name} · Resumo`, slug: s.slug, year: "", kind: "Resumo" as const, searchable: `${item.title} ${s.name} ${item.text}` })),
      ...s.exercises.map((item) => ({ title: item.q, detail: `${s.name} · Exercício`, slug: s.slug, year: "", kind: "Exercício" as const, searchable: `${item.q} ${s.name} ${item.a}` })),
      ...s.questions.map((item) => ({ title: item.q, detail: `${s.name} · Quiz`, slug: s.slug, year: "", kind: "Quiz" as const, searchable: `${item.q} ${s.name} ${item.options.join(" ")} ${item.explanation ?? ""}` })),
      ...lessons.filter((l) => l.subject === s.slug).map((l) => ({ title: l.title, detail: `${s.name} · Aula`, slug: s.slug, year: l.year, kind: "Aula" as const, searchable: `${l.title} ${s.name} ${l.year}` })),
    ]);
  });

export const getFacultyCourseStudy = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { slug: string }) => { if (!slugOk(input?.slug)) throw new Error("Curso inválido"); return { slug: input.slug }; })
  .handler(async ({ data, context }): Promise<StudyResult<FacultyCourse>> => {
    const { getFacultyCourse } = await import("@/lib/faculty");
    const course = getFacultyCourse(data.slug);
    if (!course) return { status: "not_found" };
    const { mod, access: a } = await access(context);
    if (!mod.canOpenCourse(a, data.slug)) return { status: "locked", plan: a.plan };
    return { status: "ok", data: course };
  });
