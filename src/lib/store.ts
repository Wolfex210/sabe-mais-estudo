/** Estado global do Sabe Mais. */
import { useSyncExternalStore } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Task = { id: string; text: string; done: boolean };
export type ScheduleItem = { id: string; day: string; time: string; subject: string };
export type ErrorItem = { id: string; subject: string; topic?: string; question: string; selected: string; expected: string; explanation?: string; date: string; resolved: boolean };
export type StudyPlan = { dailyMinutes: number; subjects: string[]; goal: string; updatedAt: string };
export type SimulationResult = { id: string; title: string; total: number; correct: number; date: string; subjects: string[] };

export type AppState = {
  name: string; answered: number; correct: number; wrong: number; points: number; challenges: string[];
  studySeconds: number; days: string[]; achievements: string[]; tasks: Task[]; schedule: ScheduleItem[];
  schoolYear: string; avatar: string; completedTopics: string[];
  quizHistory: { subject: string; topic?: string; level: string; correct: number; total: number; date: string }[];
  studySessions: number; trialStart: string | null; plan: "trial" | "basico" | "medio" | "master" | null;
  joinedAt: string | null; errors: ErrorItem[]; studyPlan: StudyPlan | null; simulationHistory: SimulationResult[];
};

const KEY = "sabe-mais:v1";
const initial: AppState = {
  name: "Estudante", answered: 0, correct: 0, wrong: 0, points: 0, challenges: [],
  studySeconds: 0, days: [], achievements: [], tasks: [], schedule: [], schoolYear: "", avatar: "📚",
  completedTopics: [], quizHistory: [], studySessions: 0, trialStart: null, plan: null, joinedAt: null,
  errors: [], studyPlan: null, simulationHistory: [],
};
let state: AppState = initial;
let hydrated = false;
let connectedUser: string | null = null;
let revision = 0;
let syncTimer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

function read(): AppState {
  if (typeof window === "undefined") return initial;
  try {
    const raw = window.localStorage.getItem(connectedUser ? KEY + ":" + connectedUser : KEY);
    return raw ? { ...initial, ...(JSON.parse(raw) as Partial<AppState>) } : initial;
  } catch { return initial; }
}
function emit() { listeners.forEach((l) => l()); }
function persist() {
  revision++;
  try { window.localStorage.setItem(connectedUser ? KEY + ":" + connectedUser : KEY, JSON.stringify(state)); } catch {}
  emit();
  if (connectedUser) {
    clearTimeout(syncTimer);
    const userId = connectedUser; const snapshot = state;
    syncTimer = setTimeout(async () => {
      if (connectedUser !== userId) return;
      const { error } = await supabase.from("student_study_data").upsert({ user_id: userId, progress: JSON.parse(JSON.stringify(snapshot)) });
      if (error) console.error("Não foi possível salvar o progresso:", error.message);
      await supabase.from("student_profiles").upsert({ user_id: userId, name: snapshot.name, school_year: snapshot.schoolYear || null, avatar: snapshot.avatar });
    }, 500);
  }
}
export async function connectUser(userId: string | null, email?: string, metadata?: { name?: string; school_year?: string; avatar?: string }) {
  if (connectedUser === userId) return;
  clearTimeout(syncTimer);
  const previousUser = connectedUser;
  const guestState = previousUser === null ? state : read();
  connectedUser = userId;
  if (!userId) { state = read(); emit(); return; }
  const version = ++revision;
  const [{ data, error }, { data: profile }] = await Promise.all([
    supabase.from("student_study_data").select("progress").eq("user_id", userId).maybeSingle(),
    supabase.from("student_profiles").select("name, school_year, avatar").eq("user_id", userId).maybeSingle(),
  ]);
  if (connectedUser !== userId || revision !== version) return;
  if (error) console.error("Não foi possível carregar o progresso:", error.message);
  const cached = (() => { try { return JSON.parse(window.localStorage.getItem(KEY + ":" + userId) || "null") as Partial<AppState> | null; } catch { return null; } })();
  const cloud = data?.progress as Partial<AppState> | undefined;
  const firstLogin = !cloud && !cached && previousUser === null;
  const base = cloud ?? cached ?? (firstLogin ? guestState : initial);
  state = {
    ...initial, ...base,
    name: cloud?.name ?? cached?.name ?? metadata?.name ?? profile?.name ?? (firstLogin && guestState.name !== "Estudante" ? guestState.name : email?.split("@")[0] ?? "Estudante"),
    schoolYear: cloud?.schoolYear ?? cached?.schoolYear ?? metadata?.school_year ?? profile?.school_year ?? (firstLogin ? guestState.schoolYear : ""),
    avatar: cloud?.avatar ?? cached?.avatar ?? metadata?.avatar ?? profile?.avatar ?? (firstLogin ? guestState.avatar : "📚"),
    joinedAt: cloud?.joinedAt ?? cached?.joinedAt ?? guestState.joinedAt ?? new Date().toISOString(),
  };
  persist();
}
function subscribe(cb: () => void) {
  if (!hydrated && typeof window !== "undefined") {
    hydrated = true; state = read();
    if (!state.trialStart) state = { ...state, trialStart: today() };
    if (!state.joinedAt) state = { ...state, joinedAt: new Date().toISOString() };
  }
  listeners.add(cb); return () => listeners.delete(cb);
}
export function today() { return new Date().toISOString().slice(0, 10); }

export const ACHIEVEMENTS: { id: string; label: string; test: (s: AppState) => boolean }[] = [
  { id: "first", label: "🏆 Primeira questão", test: s => s.answered >= 1 },
  { id: "q10", label: "🏆 10 questões respondidas", test: s => s.answered >= 10 },
  { id: "q50", label: "🏆 50 questões respondidas", test: s => s.answered >= 50 },
  { id: "challenge1", label: "🏆 Primeiro desafio", test: s => s.challenges.length >= 1 },
  { id: "days7", label: "🏆 7 dias estudando", test: s => s.days.length >= 7 },
  { id: "points100", label: "🏆 100 pontos", test: s => s.points >= 100 },
  { id: "quiz1", label: "🏆 Primeiro quiz concluído", test: s => s.quizHistory.length >= 1 },
  { id: "quiz10", label: "🏆 10 quizzes concluídos", test: s => s.quizHistory.length >= 10 },
  { id: "q100", label: "🏆 100 questões respondidas", test: s => s.answered >= 100 },
  { id: "perfect", label: "🏆 100% de acerto em um quiz", test: s => s.quizHistory.some(q => q.total > 0 && q.correct === q.total) },
  { id: "hour1", label: "🏆 Primeira hora estudada", test: s => s.studySeconds >= 3600 },
  { id: "hour10", label: "🏆 10 horas estudadas", test: s => s.studySeconds >= 36000 },
];
export const LEVELS = [{ name: "Iniciante", min: 0 }, { name: "Aprendiz", min: 50 }, { name: "Estudante", min: 150 }, { name: "Expert", min: 400 }];
export function levelOf(points: number) {
  let current = LEVELS[0]!; let next: (typeof LEVELS)[number] | null = null;
  LEVELS.forEach((l, i) => { if (points >= l.min) { current = l; next = LEVELS[i + 1] ?? null; } });
  const nx = next as { name: string; min: number } | null;
  const progress = nx ? Math.round(((points - current.min) / (nx.min - current.min)) * 100) : 100;
  return { current, next: nx, progress: Math.min(100, Math.max(0, progress)) };
}
function update(patch: (s: AppState) => AppState) {
  state = patch(state);
  if (!state.days.includes(today())) state = { ...state, days: [...state.days, today()] };
  const unlocked = ACHIEVEMENTS.filter(a => a.test(state)).map(a => a.id);
  state = { ...state, achievements: Array.from(new Set([...state.achievements, ...unlocked])) };
  persist();
}
export const actions = {
  answer(isCorrect: boolean) { update(s => ({ ...s, answered: s.answered + 1, correct: s.correct + (isCorrect ? 1 : 0), wrong: s.wrong + (isCorrect ? 0 : 1), points: s.points + (isCorrect ? 5 : 0) })); },
  recordError(error: Omit<ErrorItem, "id" | "resolved">) { update(s => ({ ...s, errors: [...s.errors, { ...error, id: "error-" + Date.now() + "-" + s.errors.length, resolved: false }] })); },
  resolveError(id: string) { update(s => ({ ...s, errors: s.errors.map(e => e.id === id ? { ...e, resolved: true } : e) })); },
  completeChallenge(id: string) { update(s => s.challenges.includes(id) ? s : { ...s, challenges: [...s.challenges, id], points: s.points + 10 }); },
  addStudySeconds(sec: number) { update(s => ({ ...s, studySeconds: s.studySeconds + sec })); },
  setName(name: string) { update(s => ({ ...s, name })); },
  setSchoolYear(schoolYear: string) { update(s => ({ ...s, schoolYear })); },
  setAvatar(avatar: string) { update(s => ({ ...s, avatar })); },
  completeTopic(id: string) { update(s => ({ ...s, completedTopics: s.completedTopics.includes(id) ? s.completedTopics : [...s.completedTopics, id] })); },
  recordQuiz(result: AppState["quizHistory"][number]) { update(s => ({ ...s, quizHistory: [...s.quizHistory, result] })); },
  recordSimulation(result: SimulationResult) { update(s => ({ ...s, simulationHistory: [...s.simulationHistory, result] })); },
  finishStudySession() { update(s => ({ ...s, studySessions: s.studySessions + 1 })); },
  setTasks(tasks: Task[]) { update(s => ({ ...s, tasks })); },
  setSchedule(schedule: ScheduleItem[]) { update(s => ({ ...s, schedule })); },
  choosePlan(plan: AppState["plan"]) { update(s => ({ ...s, plan })); },
  setStudyPlan(plan: StudyPlan) { update(s => ({ ...s, studyPlan: plan })); },
  reset() { state = { ...initial, trialStart: today(), joinedAt: new Date().toISOString() }; persist(); },
};
export function trialDaysLeft(s: AppState) { if (!s.trialStart) return 3; const start = new Date(s.trialStart + "T00:00:00").getTime(); const passed = Math.floor((Date.now() - start) / 86400000); return Math.max(0, 3 - passed); }
export function streakOf(s: AppState) {
  const set = new Set(s.days); let streak = 0; const d = new Date();
  for (;;) { const key = d.toISOString().slice(0, 10); if (set.has(key)) { streak++; d.setDate(d.getDate() - 1); } else break; }
  return streak;
}
export function useAppState(): AppState { return useSyncExternalStore(subscribe, () => state, () => initial); }
