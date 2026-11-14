import type { SearchEntry } from "./study.functions";
export function normalizeSearch(value: string) {
  return value.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}
const stopwords = new Set(["a", "o", "as", "os", "de", "da", "do", "das", "dos", "e", "em", "um", "uma", "como", "para", "por", "que", "qual", "quero", "aprender", "estudar", "sobre", "calcular"]);
export function scoreSearch(entry: SearchEntry, query: string) {
  const q = normalizeSearch(query);
  const terms = q.split(" ").filter(word => !stopwords.has(word));
  if (!terms.length) return 0;
  const title = normalizeSearch(entry.title);
  const searchable = normalizeSearch(entry.searchable);
  // Each meaningful word must actually occur; a subject-wide synonym is not a match.
  if (!terms.every(term => searchable.includes(term))) return 0;
  return (title === q ? 120 : title.includes(q) ? 80 : 0) + terms.reduce((score, term) => score + (title.includes(term) ? 20 : 1), 0);
}
export function findSearchResults(entries: SearchEntry[], query: string, kind = "Todos") {
  return entries.map(entry => ({ ...entry, score: scoreSearch(entry, query) }))
    .filter(entry => entry.score > 0 && (kind === "Todos" || kind === entry.kind))
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, "pt-BR"));
}