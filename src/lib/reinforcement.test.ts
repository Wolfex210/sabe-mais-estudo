import { test, expect } from "bun:test";
import { getReinforcement, worksheetRows } from "./reinforcement";
test("nine core subjects have substantial explanations and varied exercises", () => {
  for (const slug of ["portugues", "matematica", "ciencias", "biologia", "historia", "geografia", "ingles", "fisica", "quimica"]) {
    const sheet = getReinforcement(slug);
    expect(sheet).not.toBeNull(); if (!sheet) throw new Error(slug);
    expect(sheet.topicos.length).toBe(3); expect(sheet.exercicios.length).toBe(6);
    expect(new Set(sheet.exercicios.map(ex => ex.enunciado)).size).toBe(6);
    expect(sheet.gabarito.length).toBe(6); expect(worksheetRows(sheet).length).toBe(13);
  }
});
test("math answer key uses correct successive discounts", () => {
  expect(getReinforcement("matematica")?.gabarito.find(x => x.n === 2)?.resposta).toContain("108");
});