import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, BookOpen } from "lucide-react";
import type { Reinforcement } from "@/lib/reinforcement";
type Props = { sheet: Reinforcement; rows: string[][] };
export function ReinforcementView({ sheet, rows }: Props) {
  const [showAnswers, setShowAnswers] = useState(false);
  function download() {
    const csv = "\ufeff" + rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(";")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = `sabe-mais-${sheet.id}-reforco.csv`; link.click(); URL.revokeObjectURL(url);
  }
  return <section id="reinforcement" className="space-y-6" aria-labelledby="reinforcement-heading">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div><h2 id="reinforcement-heading" className="flex items-center gap-2 text-xl font-bold text-foreground"><BookOpen className="h-5 w-5 text-primary" />Caderno de reforço — {sheet.nome}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{sheet.etapa_sugerida} · {sheet.dificuldade}</p></div>
      <Button variant="outline" onClick={download}><Download className="mr-2 h-4 w-4" />Baixar planilha de conteúdo</Button>
    </div>
    {sheet.topicos.map((topic, index) => <article key={topic.titulo} id={`reinforcement-topic-${index}`} className="border-b border-border pb-6">
      <h3 className="text-lg font-semibold text-foreground">{topic.titulo}</h3>
      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-foreground">{topic.explicacao}</p>
      <div className="mt-4 border-l-2 border-primary pl-4"><h4 className="text-sm font-semibold text-primary">Exemplo resolvido</h4><p className="mt-2 text-sm font-medium">{topic.exemplo_resolvido.enunciado}</p><p className="mt-2 text-sm leading-7 text-muted-foreground">{topic.exemplo_resolvido.resolucao}</p></div>
    </article>)}
    <div><h3 className="text-lg font-bold">Exercícios de aplicação</h3>
      <ol className="mt-4 space-y-5">{sheet.exercicios.map(ex => <li id={`reinforcement-exercise-${ex.n}`} key={ex.n} className="border-b border-border pb-5">
        <p className="text-xs font-semibold text-primary">{ex.n}. {ex.tipo} · {ex.dificuldade}</p><p className="mt-2 text-sm leading-7">{ex.enunciado}</p>
        <textarea aria-label={`Resposta do exercício ${ex.n}`} rows={3} className="mt-3 w-full rounded-lg border border-border bg-background p-3 text-sm" />
        <details open={showAnswers} className="mt-3"><summary className="cursor-pointer text-sm font-semibold text-primary">Gabarito comentado</summary><p className="mt-2 text-sm leading-7 text-muted-foreground">{sheet.gabarito.find(answer => answer.n === ex.n)?.resposta}</p></details>
      </li>)}</ol>
      <Button className="mt-5" variant="outline" onClick={() => setShowAnswers(!showAnswers)}>{showAnswers ? "Ocultar gabaritos" : "Mostrar gabaritos"}</Button>
    </div>
  </section>;
}