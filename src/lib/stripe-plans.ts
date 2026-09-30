export type PlanId = "basico" | "medio" | "master";

export const STRIPE_PLANS: Record<PlanId, { name: string; price: string; envKey: string }> = {
  basico: { name: "Básico", price: "R$ 19,99", envKey: "STRIPE_PRICE_BASICO" },
  medio: { name: "Médio", price: "R$ 49,99", envKey: "STRIPE_PRICE_MEDIO" },
  master: { name: "Master", price: "R$ 89,99", envKey: "STRIPE_PRICE_MASTER" },
};

export function isPlanId(value: unknown): value is PlanId {
  return value === "basico" || value === "medio" || value === "master";
}
