import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteLayout, PageHeader, Card, AdSlot } from "@/components/SiteLayout";
import { useAppState, actions, type Task, type ScheduleItem } from "@/lib/store";

export const Route = createFileRoute("/ferramentas")({
  head: () => ({
    meta: [
      { title: "Ferramentas de estudo — Sabe Mais" },
      {
        name: "description",
        content: "Pomodoro, lista de tarefas, calculadora e cronograma de estudos funcionando direto no navegador.",
      },
      { property: "og:title", content: "Ferramentas de estudo — Sabe Mais" },
      { property: "og:description", content: "Pomodoro, tarefas, calculadora e cronograma em um só lugar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Ferramentas,
});

function Ferramentas() {
  return (
    <SiteLayout>
      <PageHeader
        title="Ferramentas"
        subtitle="Tudo funciona de verdade e fica salvo no seu navegador."
      />
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-12 lg:grid-cols-2">
        <Pomodoro />
        <Tarefas />
        <Calculadora />
        <Cronograma />
        <div className="lg:col-span-2">
          <AdSlot />
        </div>
      </div>
    </SiteLayout>
  );
}

/* ---------------- Pomodoro ---------------- */
function Pomodoro() {
  const FOCUS = 25 * 60;
  const BREAK = 5 * 60;
  const [mode, setMode] = useState<"foco" | "pausa">("foco");
  const [left, setLeft] = useState(FOCUS);
  const [running, setRunning] = useState(false);
  const tick = useRef(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setLeft((v) => {
        if (mode === "foco") {
          tick.current += 1;
          if (tick.current >= 60) {
            // registra o tempo estudado a cada minuto
            actions.addStudySeconds(60);
            tick.current = 0;
          }
        }
        if (v <= 1) {
          const next = mode === "foco" ? "pausa" : "foco";
          setMode(next);
          return next === "foco" ? FOCUS : BREAK;
        }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, mode, FOCUS, BREAK]);

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <Card>
      <h2 className="text-lg font-bold text-foreground">⏱️ Pomodoro</h2>
      <p className="text-sm text-muted-foreground">25 minutos de estudo e 5 de descanso.</p>
      <p className="mt-6 text-center text-6xl font-extrabold tabular-nums text-primary">
        {mm}:{ss}
      </p>
      <p className="mt-1 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
        {mode}
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => setRunning((r) => !r)}
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          {running ? "Pausar" : "Iniciar"}
        </button>
        <button
          onClick={() => {
            setRunning(false);
            setMode("foco");
            setLeft(FOCUS);
          }}
          className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary"
        >
          Reiniciar
        </button>
      </div>
    </Card>
  );
}

/* ---------------- Lista de tarefas ---------------- */
function Tarefas() {
  const { tasks } = useAppState();
  const [text, setText] = useState("");

  function add() {
    if (!text.trim()) return;
    const novo: Task = { id: crypto.randomUUID(), text: text.trim(), done: false };
    actions.setTasks([...tasks, novo]);
    setText("");
  }

  return (
    <Card>
      <h2 className="text-lg font-bold text-foreground">✅ Lista de tarefas</h2>
      <p className="text-sm text-muted-foreground">Suas tarefas ficam salvas no navegador.</p>
      <div className="mt-4 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Ex.: revisar frações"
          className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        <button
          onClick={add}
          className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Adicionar
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {tasks.length === 0 && (
          <li className="text-sm text-muted-foreground">Nenhuma tarefa por enquanto.</li>
        )}
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center gap-3 rounded-xl bg-secondary/60 px-3 py-2">
            <input
              type="checkbox"
              checked={t.done}
              onChange={() =>
                actions.setTasks(tasks.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))
              }
              className="h-4 w-4 accent-[oklch(0.56_0.18_256)]"
            />
            <span className={`flex-1 text-sm ${t.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
              {t.text}
            </span>
            <button
              onClick={() => actions.setTasks(tasks.filter((x) => x.id !== t.id))}
              className="text-xs font-semibold text-destructive hover:underline"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ---------------- Calculadora ---------------- */
function Calculadora() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("");

  const keys = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"];

  function press(k: string) {
    if (k === "=") {
      try {
        // Só permite números e operadores básicos antes de calcular.
        if (!/^[0-9+\-*/.() ]+$/.test(expr)) throw new Error("inválido");
        const value = Function(`"use strict"; return (${expr})`)() as number;
        setResult(Number.isFinite(value) ? String(value) : "Erro");
      } catch {
        setResult("Erro");
      }
      return;
    }
    setExpr((e) => e + k);
  }

  return (
    <Card>
      <h2 className="text-lg font-bold text-foreground">🧮 Calculadora</h2>
      <div className="mt-4 rounded-xl bg-secondary px-4 py-3 text-right">
        <p className="min-h-5 text-sm text-muted-foreground">{expr || "0"}</p>
        <p className="text-2xl font-bold text-foreground">{result || "—"}</p>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {keys.map((k) => (
          <button
            key={k}
            onClick={() => press(k)}
            className={`rounded-xl py-3 text-sm font-semibold transition-colors ${
              k === "=" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-secondary"
            }`}
          >
            {k}
          </button>
        ))}
        <button
          onClick={() => {
            setExpr("");
            setResult("");
          }}
          className="col-span-4 rounded-xl border border-border py-2.5 text-sm font-semibold hover:bg-secondary"
        >
          Limpar
        </button>
      </div>
    </Card>
  );
}

/* ---------------- Cronograma ---------------- */
const DAYS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

function Cronograma() {
  const { schedule } = useAppState();
  const [day, setDay] = useState(DAYS[0]!);
  const [time, setTime] = useState("19:00");
  const [subject, setSubject] = useState("");

  function add() {
    if (!subject.trim()) return;
    const item: ScheduleItem = { id: crypto.randomUUID(), day, time, subject: subject.trim() };
    actions.setSchedule([...schedule, item]);
    setSubject("");
  }

  return (
    <Card>
      <h2 className="text-lg font-bold text-foreground">📅 Cronograma de estudos</h2>
      <div className="mt-4 grid gap-2 sm:grid-cols-4">
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm"
        >
          {DAYS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm"
        />
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Matéria"
          className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
        />
        <button
          onClick={add}
          className="rounded-xl bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Adicionar
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {schedule.length === 0 && (
          <li className="text-sm text-muted-foreground">Monte sua semana de estudos.</li>
        )}
        {schedule.map((i) => (
          <li key={i.id} className="flex items-center gap-3 rounded-xl bg-secondary/60 px-3 py-2 text-sm">
            <span className="w-20 font-semibold text-foreground">{i.day}</span>
            <span className="w-14 text-muted-foreground">{i.time}</span>
            <span className="flex-1 text-foreground">{i.subject}</span>
            <button
              onClick={() => actions.setSchedule(schedule.filter((x) => x.id !== i.id))}
              className="text-xs font-semibold text-destructive hover:underline"
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
