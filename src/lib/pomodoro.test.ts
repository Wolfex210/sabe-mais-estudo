import { test, expect } from "bun:test";
import { advancePomodoro, initialPomodoro } from "./pomodoro";

test("study clock continues after leaving the page for two minutes", () => {
  const timer = { ...initialPomodoro, deadline: 1500000 };
  const result = advancePomodoro(timer, 120000);
  expect(result.state.remainingMs).toBe(1380000);
  expect(result.state.focusMs).toBe(120000);
});
test("study completion reports an alert and records the full 25 minute session once", () => {
  const result = advancePomodoro({ ...initialPomodoro, deadline: 1500000 }, 1502000);
  expect(result.sessions).toBe(1);
  expect(result.studySeconds).toBe(1500);
  expect(result.message.length).toBeGreaterThan(0);
  expect(result.state.mode).toBe("pausa curta");
  expect(result.state.remainingMs).toBe(298000);
  expect(advancePomodoro(result.state, 1502000).sessions).toBe(0);
});
test("paused clock does not advance", () => {
  expect(advancePomodoro(initialPomodoro, 9000000).state.remainingMs).toBe(1500000);
});
test("background throttling catches up through focus and short break", () => {
  const result = advancePomodoro({ ...initialPomodoro, deadline: 1500000 }, 1860000);
  expect(result.state.cycle).toBe(2);
  expect(result.state.mode).toBe("foco");
  expect(result.state.remainingMs).toBe(1440000);
  expect(result.sessions).toBe(1);
});