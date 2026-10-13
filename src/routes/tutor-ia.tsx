import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { askStudyTutor } from "@/lib/tutor.functions";
import { SiteLayout, PageHeader, Card } from "@/components/SiteLayout";
import { useAuth } from "@/lib/auth";
import { useAppState } from "@/lib/store";
import { subjects } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Bot, Send, Sparkles, UserRound, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/tutor-ia")({
  head: () => ({
    meta: [
      { title: "Tutor de estudos com IA — Sabe Mais" },
      { name: "description", content: "Tire dúvidas, aprenda passo a passo e pratique com o tutor de estudos do Sabe Mais." },
    ],
  }),
  component: TutorIA,
});

type ChatMessage = { role: "user" | "assistant"; content: string };

const suggestions = [
  "Explique um assunto passo a passo",
  "Ajude-me a resolver um exercício",
  "Crie um exemplo para eu praticar",
  "Resuma o que preciso revisar",
];

function TutorIA() {
  const { user } = useAuth();
  const state = useAppState();
  const [subject, setSubject] = useState(subjects[0]?.name ?? "Matemática");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Olá! Sou o Tutor de Estudos do Sabe Mais. 😊\n\nPosso explicar matérias, orientar você em exercícios e criar exemplos para praticar. O que você gostaria de aprender hoje?" },
  ]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function send(text = draft) {
    const content = text.trim();
    if (!content || busy) return;
    if (!user) {
      setError("Entre na sua conta para conversar com o Tutor IA.");
      return;
    }
    const next: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(next);
    setDraft("");
    setError("");
    setBusy(true);
    try {
      const result = await askStudyTutor({
        data: {
          messages: next.filter((m, i) => i > 0 || m.role === "user").slice(-12),
          subject,
          schoolYear: state.schoolYear,
        },
      });
      if ("answer" in result && result.answer) {
        setMessages((current) => [...current, { role: "assistant", content: result.answer }]);
      } else {
        setError("error" in result ? result.error : "Não foi possível obter uma resposta.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível conectar ao Tutor IA.");
    } finally {
      setBusy(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send();
  }

  function resetChat() {
    setMessages([{ role: "assistant", content: "Conversa reiniciada! Qual assunto vamos estudar agora?" }]);
    setError("");
    setDraft("");
  }

  return (
    <SiteLayout>
      <PageHeader title="Tutor de estudos com IA" subtitle="Tire dúvidas, entenda o raciocínio e aprenda no seu ritmo." />
      <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_280px]">
        <Card className="flex min-h-[620px] flex-col !p-0 hover:translate-y-0">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Bot className="h-6 w-6" /></span>
              <div>
                <h2 className="font-bold text-foreground">Tutor Sabe Mais</h2>
                <p className="text-xs text-muted-foreground">{busy ? "Preparando uma explicação..." : "Pronto para estudar com você"}</p>
              </div>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={resetChat}><RotateCcw className="mr-2 h-4 w-4" /> Nova conversa</Button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-5" aria-live="polite">
            {messages.map((message, index) => (
              <div key={index} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${message.role === "user" ? "bg-secondary text-foreground" : "bg-primary/10 text-primary"}`}>
                  {message.role === "user" ? <UserRound className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                </span>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "rounded-tr-sm bg-primary text-primary-foreground" : "rounded-tl-sm bg-secondary text-foreground"}`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {busy && <div className="ml-11 rounded-2xl bg-secondary px-4 py-3 text-sm text-muted-foreground">Estou organizando uma explicação clara…</div>}
          </div>

          {error && <p role="alert" className="mx-5 mb-3 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</p>}

          <form onSubmit={submit} className="border-t border-border p-4">
            {!user && <p className="mb-3 text-xs text-muted-foreground">Faça login para enviar perguntas ao tutor.</p>}
            <label htmlFor="tutor-message" className="sr-only">Sua pergunta</label>
            <div className="flex items-end gap-2">
              <textarea
                id="tutor-message"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(); } }}
                placeholder="Digite sua dúvida… (Enter para enviar)"
                rows={2}
                maxLength={4000}
                disabled={busy}
                className="min-h-12 min-w-0 flex-1 resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary disabled:opacity-60"
              />
              <Button type="submit" disabled={busy || !draft.trim()} aria-label="Enviar pergunta"><Send className="h-4 w-4" /></Button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Use Shift + Enter para quebrar linha. Confira informações importantes com seu material didático.</p>
          </form>
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="font-bold text-foreground">Personalize a ajuda</h2>
            <p className="mt-1 text-sm text-muted-foreground">O tutor adapta as explicações à matéria e à sua série.</p>
            <label htmlFor="tutor-subject" className="mt-4 block text-sm font-semibold text-foreground">Matéria</label>
            <select id="tutor-subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-2 w-full rounded-xl border border-border bg-background p-3 text-sm">
              {subjects.map((item) => <option key={item.slug} value={item.name}>{item.emoji} {item.name}</option>)}
            </select>
            <div className="mt-4 rounded-xl bg-secondary p-3 text-sm">
              <p className="font-semibold text-foreground">Sua série</p>
              <p className="mt-1 text-muted-foreground">{state.schoolYear || "Não informada no perfil"}</p>
            </div>
          </Card>
          <Card>
            <h2 className="font-bold text-foreground">Comece por aqui</h2>
            <div className="mt-3 space-y-2">
              {suggestions.map((suggestion) => (
                <button key={suggestion} type="button" disabled={busy} onClick={() => void send(suggestion)} className="w-full rounded-xl border border-border px-3 py-3 text-left text-sm transition-colors hover:border-primary/40 hover:bg-primary/5 disabled:opacity-50">{suggestion}</button>
              ))}
            </div>
          </Card>
          <p className="text-xs leading-5 text-muted-foreground">O tutor é uma ferramenta de apoio ao aprendizado e pode cometer erros. Use as explicações para estudar e confirme fatos importantes em fontes confiáveis.</p>
        </div>
      </div>
    </SiteLayout>
  );
}
