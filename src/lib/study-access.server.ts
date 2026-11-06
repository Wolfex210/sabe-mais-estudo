import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { subjects, facultyCatalog } from "@/lib/catalog";
import { isTrialActive, limitsForPlan, type PlanLimits } from "@/lib/plan-rules";
import { resolveSubscriptionPlan } from "@/lib/subscription-plan.server";
import type { PlanId } from "@/lib/stripe-plans";

export type StudyPlan = PlanId | "trial" | null;
export type StudyAccess = { plan: StudyPlan; limits: PlanLimits };

/** Decide no servidor o que o aluno pode estudar: assinatura paga ou teste grátis pela data da conta. */
export async function resolveStudyAccess(supabase: SupabaseClient<Database>, userId: string): Promise<StudyAccess> {
  const paid = await resolveSubscriptionPlan(supabase, userId);
  if (paid) return { plan: paid, limits: limitsForPlan(paid) };
  const { data } = await supabase.auth.getUser();
  const plan: StudyPlan = isTrialActive(data.user?.created_at) ? "trial" : null;
  return { plan, limits: limitsForPlan(plan) };
}

export function canOpenSubject(access: StudyAccess, slug: string) {
  const index = subjects.findIndex((s) => s.slug === slug);
  return index >= 0 && index < access.limits.subjects;
}

export function canOpenCourse(access: StudyAccess, slug: string) {
  const index = facultyCatalog.findIndex((c) => c.slug === slug);
  return index >= 0 && index < access.limits.courses;
}
