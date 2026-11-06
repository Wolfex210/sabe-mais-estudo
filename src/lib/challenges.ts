/** Desafios diários gratuitos, seguros para o navegador. */
export type Challenge = {
  id: string;
  title: string;
  category: string;
  question: string;
  options: string[];
  answer: number;
};

export const challenges: Challenge[] = [
  {
    id: "mat-1",
    title: "Desafio de Matemática",
    category: "Matemática",
    question: "Se 3 cadernos custam R$ 24, quanto custam 7 cadernos?",
    options: ["R$ 48", "R$ 56", "R$ 64", "R$ 72"],
    answer: 1,
  },
  {
    id: "port-1",
    title: "Desafio de Português",
    category: "Português",
    question: "Qual frase está corretamente escrita?",
    options: ["Fazem dois anos que estudo", "Faz dois anos que estudo", "Fazem dois ano que estudo", "Faz dois anos que estudam eu"],
    answer: 1,
  },
  {
    id: "logica-1",
    title: "Desafio de Lógica",
    category: "Lógica",
    question: "Complete a sequência: 2, 4, 8, 16, ...",
    options: ["18", "24", "32", "64"],
    answer: 2,
  },
  {
    id: "geral-1",
    title: "Desafio de Conhecimentos Gerais",
    category: "Conhecimentos Gerais",
    question: "Qual é o oceano que banha o litoral brasileiro?",
    options: ["Pacífico", "Índico", "Atlântico", "Ártico"],
    answer: 2,
  },
  {
    id: "logica-2",
    title: "Desafio de Lógica",
    category: "Lógica",
    question: "Se todo A é B e todo B é C, então:",
    options: ["Todo C é A", "Todo A é C", "Nenhum A é C", "Nada se conclui"],
    answer: 1,
  },
];

/** Desafio do dia: muda a cada dia do ano. */
export function dailyChallenge(): Challenge {
  const day = Math.floor(Date.now() / 86400000);
  return challenges[day % challenges.length]!;
}
