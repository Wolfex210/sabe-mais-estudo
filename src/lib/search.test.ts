import { test, expect } from "bun:test";
import { findSearchResults } from "./search";
import type { SearchEntry } from "./study.functions";
const entry = (title: string): SearchEntry => ({ title, slug: "matematica", detail: "Matemática", year: "", kind: "Resumo", searchable: title, id: title });
test("unrelated subjects are not counted as search matches", () => {
  expect(findSearchResults([entry("Frações"), entry("Equação")], "fotossíntese")).toHaveLength(0);
});
test("search reports all 75 real matches rather than capping total at 60", () => {
  expect(findSearchResults(Array.from({ length: 75 }, (_, i) => entry(`Frações ${i}`)), "frações")).toHaveLength(75);
});
test("accents and natural question words do not hide relevant results", () => {
  expect(findSearchResults([entry("Porcentagem"), entry("Frações")], "como calcular porcentagem")).toHaveLength(1);
});