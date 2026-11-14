import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { actions } from "@/lib/store";
import { advancePomodoro, initialPomodoro, resetPomodoro, type PomodoroState, type PomodoroConfig } from "@/lib/pomodoro";

type TimerContext = {
  state: PomodoroState; toggle: () => void; reset: () => void; endSession: () => void;
  setDuration: (key: keyof PomodoroConfig, value: number) => void;
  choosePreset: (study: number, short: number, name: string) => void;
};
const Context = createContext<TimerContext | null>(null);
export function usePomodoro() {
  const value = useContext(Context);
  if (!value) throw new Error("Pomodoro provider missing");
  return value;
}

export function PomodoroProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initialPomodoro);
  const current = useRef(state);
  const [notice, setNotice] = useState("");
  const audio = useRef<AudioContext | null>(null);
  const sound = useRef<GainNode | null>(null);
  function update(next: PomodoroState) { current.current = next; setState(next); }
  function stopSound() { if (sound.current && audio.current) sound.current.gain.setTargetAtTime(0, audio.current.currentTime, 0.1); }
  function playNature() {
    const ctx = audio.current;
    if (!ctx || ctx.state !== "running") return;
    stopSound();
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.16, ctx.currentTime);
    gain.gain.setTargetAtTime(0, ctx.currentTime + 5, 0.5);
    gain.connect(ctx.destination); sound.current = gain;
    // Soft filtered wind with short, gently modulated bird calls.
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 7, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.25;
    const wind = ctx.createBufferSource(); wind.buffer = buffer;
    const filter = ctx.createBiquadFilter(); filter.type = "lowpass"; filter.frequency.value = 650;
    wind.connect(filter); filter.connect(gain); wind.start();
    for (let i = 0; i < 12; i++) {
      const start = ctx.currentTime + 0.2 + i * 0.4;
      const bird = ctx.createOscillator(); const envelope = ctx.createGain();
      bird.type = "sine";
      bird.frequency.setValueAtTime(1800 + (i % 3) * 400, start);
      bird.frequency.exponentialRampToValueAtTime(3200, start + 0.09);
      bird.frequency.exponentialRampToValueAtTime(2100, start + 0.23);
      envelope.gain.setValueAtTime(0, start);
      envelope.gain.linearRampToValueAtTime(0.3, start + 0.03);
      envelope.gain.exponentialRampToValueAtTime(0.001, start + 0.26);
      bird.connect(envelope); envelope.connect(gain); bird.start(start); bird.stop(start + 0.28);
    }
  }
  function tick() {
    const result = advancePomodoro(current.current, Date.now());
    if (result.state !== current.current) update(result.state);
    if (result.studySeconds) actions.addStudySeconds(result.studySeconds);
    for (let i = 0; i < result.sessions; i++) actions.finishStudySession();
    if (result.message) { setNotice(result.message); playNature(); }
  }
  useEffect(() => {
    const id = window.setInterval(tick, 250);
    const onVisible = () => { if (document.visibilityState === "visible") tick(); };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", tick);
    return () => { clearInterval(id); document.removeEventListener("visibilitychange", onVisible); window.removeEventListener("focus", tick); void audio.current?.close(); };
  }, []);
  const value: TimerContext = {
    state,
    toggle() {
      if (!audio.current) { try { audio.current = new AudioContext(); } catch { /* The visual alert still works without audio support. */ } }
      void audio.current?.resume().catch(() => {});
      tick(); const next = current.current;
      update({ ...next, deadline: next.deadline === null ? Date.now() + next.remainingMs : null });
    },
    reset() { stopSound(); setNotice(""); update(resetPomodoro(current.current)); },
    endSession() {
      tick(); const next = current.current;
      if (next.focusMs > 0) { actions.addStudySeconds(Math.floor(next.focusMs / 1000)); actions.finishStudySession(); }
      stopSound(); setNotice(""); update(resetPomodoro(next));
    },
    setDuration(key, value) {
      const next = current.current;
      if (next.deadline !== null) return;
      const safe = Math.min(key === "cycles" ? 12 : 180, Math.max(1, value || 1));
      update({ ...next, config: { ...next.config, [key]: safe }, preset: "Personalizado", ...(key === "study" && next.mode === "foco" ? { remainingMs: safe * 60000, focusMs: 0 } : {}) });
    },
    choosePreset(study, short, preset) { stopSound(); setNotice(""); update(resetPomodoro({ ...current.current, config: { ...current.current.config, study, short }, preset })); },
  };
  return <Context.Provider value={value}>
    {children}
    {notice && <div role="alert" className="fixed bottom-4 left-4 right-4 z-50 mx-auto flex max-w-lg items-center gap-4 rounded-lg border border-border bg-background p-4 text-foreground shadow-lg">
      <p className="flex-1 text-sm font-semibold">{notice}</p>
      <Button size="sm" variant="outline" onClick={() => { stopSound(); setNotice(""); }}>Entendi</Button>
    </div>}
  </Context.Provider>;
}