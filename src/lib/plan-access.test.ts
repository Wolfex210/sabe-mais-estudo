import { test, expect } from "bun:test";
import { limitsForPlan } from "./plan-access";
test("Básico: 25 matérias e 25 cursos", () => { expect(limitsForPlan("basico")).toMatchObject({ subjects: 25, courses: 25 }); });
test("Médio: 60 matérias e 70 cursos", () => { expect(limitsForPlan("medio")).toMatchObject({ subjects: 60, courses: 70 }); });
test("Teste grátis encerrado sem plano: nenhuma matéria nem curso", () => { expect(limitsForPlan(null)).toMatchObject({ subjects: 0, courses: 0 }); });
test("Durante o teste grátis: catálogo completo", () => { expect(limitsForPlan("trial").isUnlimited).toBe(true); });
