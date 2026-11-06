/** Anos escolares e utilitários leves, seguros para o navegador. */
export const YEARS = [
  "1º EF", "2º EF", "3º EF", "4º EF", "5º EF", "6º EF", "7º EF", "8º EF", "9º EF",
  "1º EM", "2º EM", "3º EM",
] as const;
export type Year = (typeof YEARS)[number];

export const YEAR_LABEL: Record<Year, string> = {
  "1º EF": "1º ano – Fundamental", "2º EF": "2º ano – Fundamental", "3º EF": "3º ano – Fundamental",
  "4º EF": "4º ano – Fundamental", "5º EF": "5º ano – Fundamental", "6º EF": "6º ano – Fundamental",
  "7º EF": "7º ano – Fundamental", "8º EF": "8º ano – Fundamental", "9º EF": "9º ano – Fundamental",
  "1º EM": "1º ano – Ensino Médio", "2º EM": "2º ano – Ensino Médio", "3º EM": "3º ano – Ensino Médio",
};

export function parseTopic(t: string) {
  const [title, text] = t.split(" | ");
  return { title: title ?? t, text: text ?? "" };
}
