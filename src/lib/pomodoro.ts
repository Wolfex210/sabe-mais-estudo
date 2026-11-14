export type PomodoroConfig = { study: number; short: number; long: number; cycles: number };
export type PomodoroState = {
  config: PomodoroConfig; preset: string; mode: "foco" | "pausa curta" | "pausa longa";
  cycle: number; remainingMs: number; deadline: number | null; focusMs: number;
};
export const initialPomodoro: PomodoroState = {
  config: { study: 25, short: 5, long: 15, cycles: 4 }, preset: "25/5",
  mode: "foco", cycle: 1, remainingMs: 25 * 60000, deadline: null, focusMs: 0,
};
export function resetPomodoro(state: PomodoroState): PomodoroState {
  return { ...state, mode: "foco", cycle: 1, remainingMs: state.config.study * 60000, deadline: null, focusMs: 0 };
}
/** Absolute deadlines keep the clock accurate when browser timers are throttled. */
export function advancePomodoro(state: PomodoroState, now: number) {
  let next = state;
  let studySeconds = 0;
  let sessions = 0;
  let message = "";
  while (next.deadline !== null) {
    const remainingMs = Math.max(0, next.deadline - now);
    const consumed = Math.max(0, next.remainingMs - remainingMs);
    next = { ...next, remainingMs, focusMs: next.focusMs + (next.mode === "foco" ? consumed : 0) };
    if (remainingMs > 0) break;
    const boundary = next.deadline;
    if (next.mode === "foco") {
      studySeconds += Math.floor(next.focusMs / 1000);
      sessions++;
      message = "Tempo de estudo concluído! Hora de descansar. 🌿";
      const mode = next.cycle >= next.config.cycles ? "pausa longa" : "pausa curta";
      const duration = (mode === "pausa longa" ? next.config.long : next.config.short) * 60000;
      next = { ...next, mode, remainingMs: duration, deadline: boundary + duration, focusMs: 0 };
    } else if (next.cycle >= next.config.cycles) {
      message = "Pomodoro concluído! Todos os ciclos terminaram. 🌿";
      next = resetPomodoro(next);
    } else {
      message = "Pausa concluída! Hora de voltar aos estudos. 🌿";
      const duration = next.config.study * 60000;
      next = { ...next, mode: "foco", cycle: next.cycle + 1, remainingMs: duration, deadline: boundary + duration };
    }
  }
  return { state: next, studySeconds, sessions, message };
}