import { curriculum, parseTopic, type Year } from "@/lib/curriculum";
import { subjects, type Question } from "@/lib/content";

/** Aulas são opcionais: novos assuntos podem ser cadastrados aos poucos. */
export type Lesson = {
  subject: string;
  year: Year;
  title: string;
  explanation: string;
  summary?: string;
  examples?: string[];
  solvedExamples?: { problem: string; steps: string[] }[];
  image?: { src: string; alt: string; credit: string };
  formulas?: string[];
  finalSummary?: string;
  exercises?: { prompt: string; answer: string }[];
  review?: string[];
  quizzes?: Partial<Record<Question["level"], Question[]>>;
};

export const lessons: Lesson[] = [];

export function getTopics(subject: string, year: Year) {
  const outlines = (curriculum[subject]?.[year] ?? []).map((line) => {
    const topic = parseTopic(line);
    return { ...topic, lesson: lessons.find((lesson) => lesson.subject === subject && lesson.year === year && lesson.title === topic.title) };
  });
  const extra = lessons.filter((lesson) => lesson.subject === subject && lesson.year === year && !outlines.some((topic) => topic.title === lesson.title))
    .map((lesson) => ({ title: lesson.title, text: lesson.summary ?? lesson.explanation, lesson }));
  return [...outlines, ...extra];
}

export const availableSubjects = [
  ...subjects.map((subject) => ({ slug: subject.slug, name: subject.name, available: true })),
  ...["Artes", "Educação Física", "Literatura", "Redação", "Biologia", "Filosofia", "Sociologia"].map((name) => ({ slug: name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-"), name, available: false })),
];