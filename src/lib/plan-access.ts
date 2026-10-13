import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { getCurrentSubscriptionPlan } from "@/lib/payments.functions";
import { useAppState } from "@/lib/store";
import type { PlanId } from "@/lib/stripe-plans";

export type PlanLimits = { subjects: number; courses: number; isUnlimited: boolean };

export function limitsForPlan(plan: PlanId | null): PlanLimits {
  if (plan === "basico") return { subjects: 25, courses: 25, isUnlimited: false };
  if (plan === "medio") return { subjects: 60, courses: 70, isUnlimited: false };
  return { subjects: Number.POSITIVE_INFINITY, courses: Number.POSITIVE_INFINITY, isUnlimited: true };
}

/** Resolve o plano pago no banco de assinaturas; durante o teste grátis, libera o catálogo inteiro. */
export function usePlanAccess() {
  const { user } = useAuth();
  const state = useAppState();
  const [subscriptionPlan, setSubscriptionPlan] = useState<PlanId | null>(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    let active = true;
    if (!user) {
      setSubscriptionPlan(null);
      setResolved(true);
      return () => { active = false; };
    }
    setResolved(false);
    getCurrentSubscriptionPlan()
      .then(({ plan }) => {
        if (active) setSubscriptionPlan(plan);
      })
      .catch((error) => {
        console.error("Não foi possível carregar o plano da assinatura:", error);
        if (active) setSubscriptionPlan(null);
      })
      .finally(() => {
        if (active) setResolved(true);
      });
    return () => { active = false; };
  }, [user?.id]);

  const plan = subscriptionPlan ?? state.plan;
  const limits = limitsForPlan(plan);
  return { plan, limits, resolved };
}
