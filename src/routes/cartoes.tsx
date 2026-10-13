import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout, PageHeader, Card } from "@/components/SiteLayout";
import { subjects } from "@/lib/content";

export const Route = createFileRoute("/cartoes")({
  head: () => ({ meta: [{ title: "Flashcards — Sabe Mais" }, { name: "description", content: "Revise conceitos com cartões de pergunta e resposta." }] }),
  component: Cartoes,
});

type ReviewMap = Record<string, "known" | "review">;
function loadReviews(): ReviewMap {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem("sabe-mais:flashcards:v1") || "{}") as ReviewMap; } catch { return {}; }
}

function Cartoes() {
  const [subjectSlug, setSubjectSlug] = useState(subjects[0]?.slug ?? "");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviews, setReviews] = useState<ReviewMap>(loadReviews);
  const deck = useMemo(() => {
    const subject = subjects.find(s => s.slug === subjectSlug);
    return (subject?.questions ?? []).map((q, i) => ({
      id: subjectSlug + ":" + i,
      question: q.q,
      answer: q.options[q.answer] ?? "Consulte a explicação da questão.",
      explanation: q.explanation ?? "Explique com suas próprias palavras por que esta resposta está correta e relacione-a ao conceito estudado.",
    }));
  }, [subjectSlug]);
  const current = deck[index];
  const known = deck.filter(c => reviews[c.id] === "known").length;
  const pending = deck.filter(c => reviews[c.id] !== "known").length;
  function saveReview(value: "known" | "review") {
    if (!current) return;
    const next = { ...reviews, [current.id]: value };
    setReviews(next);
    try { localStorage.setItem("sabe-mais:flashcards:v1", JSON.stringify(next)); } catch {}
    setFlipped(false);
    setIndex(i => deck.length ? (i + 1) % deck.length : 0);
  }
  function changeSubject(value: string) { setSubjectSlug(value); setIndex(0); setFlipped(false); }
  return <SiteLayout>
    <PageHeader title="Flashcards e revisão rápida" subtitle="Recupere conceitos de memória, confira a resposta e marque o que já domina ou precisa rever." />
    <div className="mx-auto w-full max-w-4xl px-4 py-10 space-y-5">
      <Card>
        <label htmlFor="flash-subject" className="text-sm font-semibold">Escolha a matéria</label>
        <select id="flash-subject" value={subjectSlug} onChange={e => changeSubject(e.target.value)} className="mt-2 w-full rounded-xl border border-border bg-background p-3">
          {subjects.map(s => <option key={s.slug} value={s.slug}>{s.emoji} {s.name}</option>)}
        </select>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-secondary p-3"><p className="text-xs text-muted-foreground">Cartões</p><p className="text-2xl font-bold">{deck.length}</p></div>
          <div className="rounded-xl bg-secondary p-3"><p className="text-xs text-muted-foreground">Dominados</p><p className="text-2xl font-bold">{known}</p></div>
          <div className="rounded-xl bg-secondary p-3"><p className="text-xs text-muted-foreground">Para revisar</p><p className="text-2xl font-bold">{pending}</p></div>
        </div>
      </Card>
      {current ? <Card>
        <div className="flex items-center justify-between text-xs text-muted-foreground"><span>Cartão {index + 1} de {deck.length}</span><span>{reviews[current.id] === "known" ? "✓ Dominado" : reviews[current.id] === "review" ? "↻ Revisar" : "Novo"}</span></div>
        <button type="button" onClick={() => setFlipped(v => !v)} aria-label={flipped ? "Mostrar pergunta" : "Mostrar resposta"} className="mt-4 flex min-h-64 w-full flex-col items-center justify-center rounded-2xl border border-primary/25 bg-primary/5 p-7 text-center transition hover:bg-primary/10">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">{flipped ? "Resposta" : "Pergunta"}</span>
          <span className="mt-4 text-xl font-semibold leading-relaxed">{flipped ? current.answer : current.question}</span>
          {flipped && <span className="mt-4 text-sm leading-6 text-muted-foreground">{current.explanation}</span>}
          <span className="mt-5 text-xs text-muted-foreground">{flipped ? "Toque para voltar à pergunta" : "Toque para revelar a resposta"}</span>
        </button>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={() => setIndex(i => (i + deck.length - 1) % deck.length)} className="rounded-xl border border-border px-4 py-3 text-sm font-semibold">Anterior</button>
          <button type="button" onClick={() => setFlipped(v => !v)} className="flex-1 rounded-xl border border-border px-4 py-3 text-sm font-semibold">{flipped ? "Ver pergunta" : "Revelar resposta"}</button>
          <button type="button" onClick={() => saveReview("review")} className="rounded-xl border border-primary px-4 py-3 text-sm font-semibold text-primary">Preciso revisar</button>
          <button type="button" onClick={() => saveReview("known")} className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">Já domino</button>
        </div>
      </Card> : <Card><p className="text-center text-muted-foreground">Ainda não há questões cadastradas para esta matéria. Escolha outra matéria ou adicione cartões autorais ao banco de conteúdo.</p></Card>}
      <p className="text-xs leading-5 text-muted-foreground">As marcações desta primeira versão ficam salvas neste navegador. Elas ainda não sincronizam entre dispositivos.</p>
    </div>
  </SiteLayout>;
}
