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

export const lessons: Lesson[] = [
  {
    subject: "matematica", year: "1º EF", title: "Contagem até 100",
    explanation: "Contar é associar cada objeto a um número, em ordem, sem pular ou repetir. O último número falado indica a quantidade total. Para escrever números de dois algarismos, separamos dezenas e unidades. Por exemplo, 24 é formado por duas dezenas (20) e quatro unidades (4). Na reta numérica, os números aumentam para a direita.",
    summary: "Conte os objetos um a um. Agrupe de dez em dez para reconhecer dezenas e unidades.",
    examples: ["Há 12 lápis: um grupo de dez e mais dois lápis.", "O número depois de 39 é 40; o número antes de 39 é 38."],
    solvedExamples: [{ problem: "Quantos objetos há em três grupos de dez e mais quatro?", steps: ["Cada grupo de dez tem 10 objetos: 10 + 10 + 10 = 30.", "Somamos os quatro restantes: 30 + 4 = 34.", "Resposta: 34 objetos."] }],
    formulas: ["Quantidade = dezenas × 10 + unidades"],
    finalSummary: "A ordem dos números ajuda a comparar quantidades. Uma dezena equivale a dez unidades.",
    exercises: [{ prompt: "Qual número tem 5 dezenas e 2 unidades?", answer: "52." }, { prompt: "Qual número vem depois de 69?", answer: "70." }],
    review: ["Como você pode conferir se contou todos os objetos?", "Quantas unidades formam uma dezena?"],
    quizzes: {
      facil: [
        ["Qual número vem depois de 4?", ["3", "5", "6", "8"], 1],
        ["Quantos dedos há em uma mão?", ["4", "5", "6", "10"], 1],
        ["Qual número vem antes de 10?", ["8", "9", "11", "12"], 1],
        ["Qual é maior?", ["2", "4", "7", "5"], 2],
        ["Quanto é 1 + 1?", ["1", "2", "3", "4"], 1],
        ["Qual número representa seis objetos?", ["5", "6", "7", "8"], 1],
        ["Qual é o menor número?", ["9", "3", "5", "7"], 1],
        ["Qual número vem depois de 19?", ["18", "19", "20", "21"], 2],
        ["Quanto é 3 + 2?", ["4", "5", "6", "7"], 1],
        ["Qual número fica entre 7 e 9?", ["6", "8", "10", "11"], 1],
      ],
      medio: [
        ["Uma dezena vale quantas unidades?", ["5", "10", "20", "100"], 1],
        ["Duas dezenas e três unidades formam:", ["203", "32", "23", "13"], 2],
        ["Qual número vem depois de 49?", ["48", "50", "51", "59"], 1],
        ["Quanto é 12 + 3?", ["13", "14", "15", "16"], 2],
        ["Quanto é 20 - 5?", ["10", "12", "15", "25"], 2],
        ["Qual é maior: 36 ou 63?", ["36", "63", "São iguais", "Nenhum"], 1],
        ["Quatro dezenas representam:", ["4", "14", "40", "400"], 2],
        ["Qual número está entre 28 e 30?", ["27", "29", "31", "32"], 1],
        ["Quanto é 10 + 10 + 2?", ["12", "20", "22", "30"], 2],
        ["Qual é a sequência correta?", ["22, 21, 23", "21, 22, 23", "23, 21, 22", "21, 23, 22"], 1],
      ],
      dificil: [
        ["Tenho 3 dezenas e 7 unidades. Qual é meu número?", ["73", "30", "37", "17"], 2],
        ["Se você contar de 10 em 10 a partir de 15, qual é o terceiro número falado?", ["25", "35", "45", "55"], 1],
        ["Ana tinha 18 figurinhas e ganhou 12. Quantas tem agora?", ["20", "28", "30", "32"], 2],
        ["Qual é a diferença entre 50 e 35?", ["10", "15", "20", "25"], 1],
        ["Entre 47, 74, 49 e 69, qual é o maior?", ["47", "74", "49", "69"], 1],
        ["Complete: 24, 26, 28, ...", ["29", "30", "31", "32"], 1],
        ["Quanto falta para 63 chegar a 70?", ["6", "7", "8", "9"], 1],
        ["Em 86, qual é o valor do algarismo 8?", ["8", "6", "80", "86"], 2],
        ["Qual número tem 9 dezenas e nenhuma unidade?", ["9", "19", "90", "99"], 2],
        ["Pedro tem 32 blocos. Usa 14. Quantos sobraram?", ["16", "17", "18", "20"], 2],
      ],
    } as unknown as Lesson["quizzes"],
  },
];

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