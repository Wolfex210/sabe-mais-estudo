import type { PlanId } from "@/lib/stripe-plans";

export const TRIAL_DAYS = 4;

export type PlanLimits = { subjects: number; courses: number; isUnlimited: boolean };

export function limitsForPlan(plan: PlanId | "trial" | null): PlanLimits {
  // Sem assinatura e com o teste grátis encerrado, nenhuma matéria ou curso fica liberado.
  if (plan === null) return { subjects: 0, courses: 0, isUnlimited: false };
  if (plan === "basico") return { subjects: 25, courses: 25, isUnlimited: false };
  if (plan === "medio") return { subjects: 60, courses: 70, isUnlimited: false };
  return { subjects: Number.POSITIVE_INFINITY, courses: Number.POSITIVE_INFINITY, isUnlimited: true };
}

/** Teste grátis conta a partir da criação da conta (dado confiável do login). */
export function isTrialActive(createdAt: string | undefined, now = Date.now()) {
  return !!createdAt && now - new Date(createdAt).getTime() < TRIAL_DAYS * 86400000;
}
