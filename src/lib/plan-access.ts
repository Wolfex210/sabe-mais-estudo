import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { getCurrentSubscriptionPlan } from "@/lib/payments.functions";
import { useAppState, trialDaysLeft } from "@/lib/store";
import type { PlanId } from "@/lib/stripe-plans";
import { limitsForPlan, isTrialActive } from "@/lib/plan-rules";
export { TRIAL_DAYS, limitsForPlan, isTrialActive, type PlanLimits } from "@/lib/plan-rules";

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

  // O plano pago vem só do servidor; o teste grátis usa a data de criação da conta (não editável pelo navegador).
  const trialActive = user
    ? isTrialActive(user.created_at)
    : trialDaysLeft(state) > 0;
  const plan: PlanId | "trial" | null = subscriptionPlan ?? (trialActive ? "trial" : null);
  const limits = limitsForPlan(plan);
  return { plan, limits, resolved };
}
