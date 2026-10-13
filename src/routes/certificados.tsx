import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout, PageHeader, Card } from "@/components/SiteLayout";
import { useAppState } from "@/lib/store";
import { subjects } from "@/lib/content";

export const Route = createFileRoute("/certificados")({
  head: () => ({ meta: [{ title: "Certificados de estudo — Sabe Mais" }, { name: "description", content: "Consulte seus marcos de estudo e imprima um comprovante de conclusão de trilha." }] }),
  component: Certificados,
});

function Certificados() {
  const s = useAppState();
  const [selected, setSelected] = useState(subjects[0]?.slug ?? "");
  const [issuedDate, setIssuedDate] = useState("");
  useEffect(() => { setIssuedDate(new Date().toLocaleDateString("pt-BR")); }, []);
  const completedBySubject = subjects.map(subject => {
    const ids = s.completedTopics.filter(id => id.startsWith(subject.slug + ":"));
    return { ...subject, completed: ids.length };
  }).filter(subject => subject.completed > 0).sort((a,b) => b.completed - a.completed);
  const active = completedBySubject.find(subject => subject.slug === selected);
  const eligible = active && active.completed >= 5;
  return <SiteLayout>
    <PageHeader title="Certificados de estudo" subtitle="Reconheça seu esforço com comprovantes de conclusão das trilhas de estudo registradas na sua conta." />
    <div className="mx-auto w-full max-w-4xl space-y-5 px-4 py-10">
      <Card>
        <h2 className="text-xl font-bold">Seus marcos de aprendizagem</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Esta versão libera um comprovante imprimível quando você conclui pelo menos 5 aulas marcadas como concluídas em uma mesma matéria. Isso é um critério interno de participação, não uma certificação acadêmica oficial.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="rounded-xl bg-secondary p-4"><p className="text-xs text-muted-foreground">Aulas concluídas</p><p className="mt-1 text-2xl font-bold">{s.completedTopics.length}</p></div><div className="rounded-xl bg-secondary p-4"><p className="text-xs text-muted-foreground">Matérias iniciadas</p><p className="mt-1 text-2xl font-bold">{completedBySubject.length}</p></div><div className="rounded-xl bg-secondary p-4"><p className="text-xs text-muted-foreground">Trilhas elegíveis</p><p className="mt-1 text-2xl font-bold">{completedBySubject.filter(x => x.completed >= 5).length}</p></div></div>
      </Card>
      <Card>
        <label htmlFor="certificate-subject" className="text-sm font-semibold">Matéria para o comprovante</label>
        <select id="certificate-subject" value={selected} onChange={e => setSelected(e.target.value)} className="mt-2 w-full rounded-xl border border-border bg-background p-3">
          {subjects.map(subject => <option key={subject.slug} value={subject.slug}>{subject.emoji} {subject.name} · {s.completedTopics.filter(id => id.startsWith(subject.slug + ":")).length} aula(s)</option>)}
        </select>
        {eligible && active ? <div className="certificate mt-5 rounded-2xl border-2 border-primary/40 p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Sabe Mais · Comprovante de aprendizagem</p>
          <div className="my-5 text-4xl">🎓</div>
          <h2 className="text-2xl font-bold">Certificado de conclusão de trilha</h2>
          <p className="mt-5 text-sm text-muted-foreground">Declaramos que</p>
          <p className="mt-1 text-2xl font-bold">{s.name || "Estudante"}</p>
          <p className="mt-4 leading-7">concluiu pelo menos cinco aulas registradas na trilha de <strong>{active.name}</strong> na plataforma Sabe Mais.</p>
          <p className="mt-5 text-xs text-muted-foreground">Emitido em {issuedDate || "Data de emissão no navegador"} · Progresso registrado na conta</p>
          <button type="button" onClick={() => window.print()} className="no-print mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Imprimir ou salvar como PDF</button>
        </div> : <div className="mt-5 rounded-xl border border-border p-5"><p className="font-semibold">Ainda não disponível para esta matéria</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Conclua mais aulas da matéria selecionada. Você precisa de pelo menos 5 aulas marcadas como concluídas para gerar o comprovante.</p></div>}
      </Card>
      <style>{`@media print { body * { visibility: hidden; } .certificate, .certificate * { visibility: visible; } .certificate { position: absolute; inset: 0; width: 100%; border: 3px solid #555; background: white; color: black; } .no-print { display: none !important; } }`}</style>
    </div>
  </SiteLayout>;
}
