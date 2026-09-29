export type QuizEntry = {
  q: string;
  options: string[];
  answer: number;
  level: "facil" | "medio" | "dificil";
  explanation: string;
};
