export type PlanId = "basico" | "medio" | "master";

export const STRIPE_PLANS: Record<PlanId, { lookupKey: string; amount: number }> = {
  basico: { lookupKey: "sabe_mais_basico_mensal", amount: 1999 },
  medio: { lookupKey: "sabe_mais_medio_mensal", amount: 4999 },
  master: { lookupKey: "sabe_mais_master_mensal", amount: 8999 },
};

export function isPlanId(value: unknown): value is PlanId {
  return value === "basico" || value === "medio" || value === "master";
}
