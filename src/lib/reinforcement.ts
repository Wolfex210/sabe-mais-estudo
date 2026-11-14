import data from "./reinforcement-data.json";
export type Reinforcement = typeof data[number];
export const getReinforcement = (slug: string) => data.find(item => item.id === slug) ?? null;
export function worksheetRows(sheet: Reinforcement) {
  return [
    ["Matéria", "Etapa", "Tipo", "Título / enunciado", "Conteúdo / gabarito"],
    ...sheet.topicos.flatMap(topic => [
      [sheet.nome, sheet.etapa_sugerida, "Conteúdo", topic.titulo, topic.explicacao],
      [sheet.nome, sheet.etapa_sugerida, "Exemplo resolvido", topic.exemplo_resolvido.enunciado, topic.exemplo_resolvido.resolucao],
    ]),
    ...sheet.exercicios.map(ex => [sheet.nome, sheet.etapa_sugerida, `${ex.tipo} · ${ex.dificuldade}`, ex.enunciado, sheet.gabarito.find(answer => answer.n === ex.n)?.resposta ?? ""]),
  ];
}