/**
 * Estado global do Sabe Mais, salvo no localStorage do navegador.
 * Sem servidor e sem banco de dados: tudo fica no dispositivo do estudante.
 */
import { useSyncExternalStore } from "react";

export type Task = { id: string; text: string; done: boolean };
export type ScheduleItem = { id: string; day: string; time: string; subject: string };

export type AppState = {
  name: string;
  answered: number;
  correct: number;
  wrong: number;
  points: number;
  challenges: string[]; // ids dos desafios concluídos
  studySeconds: number;
  days: string[]; // dias (YYYY-MM-DD) em que estudou
  achievements: string[];
  tasks: Task[];
  schedule: ScheduleItem[];
  trialStart: string | null; // início dos 3 dias grátis
  plan: "trial" | "basico" | "medio" | "master" | null;
};

const KEY = "sabe-mais:v1";

const initial: AppState = {
  name: "Estudante",
  answered: 0,
  correct: 0,
  wrong: 0,
  points: 0,
  challenges: [],
  studySeconds: 0,
  days: [],
  achievements: [],
  tasks: [],
  schedule: [],
  trialStart: null,
  plan: null,
};

let state: AppState = initial;
let hydrated = false;
const listeners = new Set<() => void>();

function read(): AppState {
  if (typeof window === "undefined") return initial;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...initial, ...(JSON.parse(raw) as Partial<AppState>) } : initial;
  } catch {
    return initial;
  }
}

function emit() {
  listeners.forEach((l) => l());
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* armazenamento indisponível */
  }
  emit();
}

function subscribe(cb: () => void) {
  if (!hydrated && typeof window !== "undefined") {
    hydrated = true;
    state = read();
    if (!state.trialStart) state = { ...state, trialStart: today() };
  }
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function today() {
  return new Date().toISOString().slice(0, 10);
}

/** Conquistas desbloqueadas a partir dos números atuais. */
export const ACHIEVEMENTS: { id: string; label: string; test: (s: AppState) => boolean }[] = [
  { id: "first", label: "🏆 Primeira questão", test: (s) => s.answered >= 1 },
  { id: "q10", label: "🏆 10 questões respondidas", test: (s) => s.answered >= 10 },
  { id: "q50", label: "🏆 50 questões respondidas", test: (s) => s.answered >= 50 },
  { id: "challenge1", label: "🏆 Primeiro desafio", test: (s) => s.challenges.length >= 1 },
  { id: "days7", label: "🏆 7 dias estudando", test: (s) => s.days.length >= 7 },
  { id: "points100", label: "🏆 100 pontos", test: (s) => s.points >= 100 },
];

export const LEVELS = [
  { name: "Iniciante", min: 0 },
  { name: "Aprendiz", min: 50 },
  { name: "Estudante", min: 150 },
  { name: "Expert", min: 400 },
];

export function levelOf(points: number) {
  let current = LEVELS[0]!;
  let next: (typeof LEVELS)[number] | null = null;
  LEVELS.forEach((l, i) => {
    if (points >= l.min) {
      current = l;
      next = LEVELS[i + 1] ?? null;
    }
  });
  const nx = next as { name: string; min: number } | null;
  const progress = nx ? Math.round(((points - current.min) / (nx.min - current.min)) * 100) : 100;
  return { current, next: nx, progress: Math.min(100, Math.max(0, progress)) };
}

function update(patch: (s: AppState) => AppState) {
  state = patch(state);
  // marca presença do dia e recalcula conquistas
  if (!state.days.includes(today())) state = { ...state, days: [...state.days, today()] };
  const unlocked = ACHIEVEMENTS.filter((a) => a.test(state)).map((a) => a.id);
  state = { ...state, achievements: Array.from(new Set([...state.achievements, ...unlocked])) };
  persist();
}

export const actions = {
  answer(isCorrect: boolean) {
    update((s) => ({
      ...s,
      answered: s.answered + 1,
      correct: s.correct + (isCorrect ? 1 : 0),
      wrong: s.wrong + (isCorrect ? 0 : 1),
      points: s.points + (isCorrect ? 5 : 0),
    }));
  },
  completeChallenge(id: string) {
    update((s) =>
      s.challenges.includes(id)
        ? s
        : { ...s, challenges: [...s.challenges, id], points: s.points + 10 },
    );
  },
  addStudySeconds(sec: number) {
    update((s) => ({ ...s, studySeconds: s.studySeconds + sec }));
  },
  setName(name: string) {
    update((s) => ({ ...s, name }));
  },
  setTasks(tasks: Task[]) {
    update((s) => ({ ...s, tasks }));
  },
  setSchedule(schedule: ScheduleItem[]) {
    update((s) => ({ ...s, schedule }));
  },
  choosePlan(plan: AppState["plan"]) {
    update((s) => ({ ...s, plan }));
  },
  reset() {
    state = { ...initial, trialStart: today() };
    persist();
  },
};

/** Dias restantes do período de teste de 3 dias. */
export function trialDaysLeft(s: AppState) {
  if (!s.trialStart) return 3;
  const start = new Date(s.trialStart + "T00:00:00").getTime();
  const passed = Math.floor((Date.now() - start) / 86400000);
  return Math.max(0, 3 - passed);
}

/** Sequência de dias consecutivos estudando. */
export function streakOf(s: AppState) {
  const set = new Set(s.days);
  let streak = 0;
  const d = new Date();
  for (;;) {
    const key = d.toISOString().slice(0, 10);
    if (set.has(key)) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else break;
  }
  return streak;
}

export function useAppState(): AppState {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => initial,
  );
}
