import { test, expect } from "bun:test";
import { limitsForPlan } from "./plan-access";
test("Básico: 25 matérias e 25 cursos", () => { expect(limitsForPlan("basico")).toMatchObject({ subjects: 25, courses: 25 }); });
test("Médio: 60 matérias e 70 cursos", () => { expect(limitsForPlan("medio")).toMatchObject({ subjects: 60, courses: 70 }); });
