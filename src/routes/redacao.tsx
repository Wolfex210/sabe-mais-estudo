import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout, PageHeader, Card } from "@/components/SiteLayout";

export const Route = createFileRoute("/redacao")({
  head: () => ({ meta: [{ title: "Oficina de redação — Sabe Mais" }, { name: "description", content: "Pratique redações com temas, estrutura e checklist de revisão." }] }),
  component: Redacao,
});

const themes = [
  { title: "Desafios para combater a desinformação no Brasil", support: "Considere educação midiática, responsabilidade das plataformas, liberdade de expressão e checagem de fatos." },
  { title: "Caminhos para ampliar a inclusão digital no país", support: "Considere acesso à internet, formação tecnológica, desigualdades regionais e serviços públicos digitais." },
  { title: "A importância da preservação ambiental nas cidades", support: "Considere saneamento, mobilidade, áreas verdes, planejamento urbano e participação comunitária." },
  { title: "Estratégias para valorizar a saúde mental de estudantes", support: "Considere acolhimento, prevenção, ambiente escolar, acesso a profissionais e limites do uso de telas." },
  { title: "Desafios para garantir acesso à leitura no Brasil", support: "Considere bibliotecas, preço dos livros, formação de leitores e diversidade cultural." },
];
const criteria = [
  "Apresentei uma tese clara e respondi ao tema.",
  "Organizei as ideias em introdução, desenvolvimento e conclusão.",
  "Usei argumentos e exemplos pertinentes, sem fugir do tema.",
  "Conectei os parágrafos com coesão e conectivos variados.",
  "Revisei ortografia, pontuação e concordância.",
  "Concluí o texto de forma coerente e respeitosa aos direitos humanos.",
];

function Redacao() {
  const [themeIndex, setThemeIndex] = useState(0);
  const [draft, setDraft] = useState("");
  const [checked, setChecked] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    try {
      setDraft(localStorage.getItem("sabe-mais:redacao:draft") || "");
      setChecked(JSON.parse(localStorage.getItem("sabe-mais:redacao:checklist") || "[]") as string[]);
    } catch {}
  }, []);
  const words = draft.trim() ? draft.trim().split(/\s+/).length : 0;
  function save() {
    try {
      localStorage.setItem("sabe-mais:redacao:draft", draft);
      localStorage.setItem("sabe-mais:redacao:checklist", JSON.stringify(checked));
      setSaved(true);
    } catch { setSaved(false); }
  }
  function toggle(item: string) { setChecked(v => v.includes(item) ? v.filter(x => x !== item) : [...v, item]); setSaved(false); }
  return <SiteLayout>
    <PageHeader title="Oficina de redação" subtitle="Treine argumentação, estrutura textual e revisão com um roteiro claro. A plataforma não atribui uma nota oficial." />
    <div className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-5">
        <Card>
          <h2 className="text-lg font-bold">1. Escolha um tema</h2>
          <select value={themeIndex} onChange={e => setThemeIndex(Number(e.target.value))} className="mt-3 w-full rounded-xl border border-border bg-background p-3">
            {themes.map((t,i) => <option key={t.title} value={i}>{t.title}</option>)}
          </select>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{themes[themeIndex]?.support}</p>
        </Card>
        <Card>
          <h2 className="text-lg font-bold">2. Estruture seu texto</h2>
          <div className="mt-4 space-y-3 text-sm leading-6">
            <p><strong>Introdução:</strong> contextualize o tema e apresente sua tese.</p>
            <p><strong>Desenvolvimento:</strong> construa argumentos, explique causas ou consequências e use exemplos confiáveis.</p>
            <p><strong>Conclusão:</strong> retome a tese e proponha encaminhamentos coerentes com o problema.</p>
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-bold">3. Checklist de revisão</h2>
          <div className="mt-3 space-y-3">{criteria.map(item => <label key={item} className="flex items-start gap-3 text-sm leading-5"><input type="checkbox" checked={checked.includes(item)} onChange={() => toggle(item)} className="mt-1" /><span>{item}</span></label>)}</div>
          <p className="mt-3 text-xs text-muted-foreground">{checked.length} de {criteria.length} itens revisados</p>
        </Card>
      </div>
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-lg font-bold">Escreva sua redação</h2><span className="text-sm text-muted-foreground">{words} palavras</span></div>
        <p className="mt-2 text-sm text-muted-foreground">Dica: desenvolva um argumento por parágrafo e revise se cada exemplo sustenta sua tese.</p>
        <textarea value={draft} onChange={e => { setDraft(e.target.value); setSaved(false); }} rows={22} placeholder="Comece pela introdução: apresente o tema e deixe clara sua tese..." className="mt-4 w-full resize-y rounded-xl border border-border bg-background p-4 text-sm leading-7 outline-none focus:border-primary" />
        <div className="mt-4 flex flex-wrap items-center gap-3"><button type="button" onClick={save} className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Salvar rascunho</button><button type="button" onClick={() => { setDraft(""); setChecked([]); setSaved(false); }} className="rounded-xl border border-border px-5 py-3 text-sm font-semibold">Limpar editor</button>{saved && <span role="status" className="text-sm text-primary">Rascunho salvo neste navegador.</span>}</div>
        <p className="mt-4 text-xs leading-5 text-muted-foreground">O rascunho fica neste navegador e não é enviado para avaliação. Faça uma cópia se não quiser correr o risco de perdê-lo ao limpar os dados do navegador.</p>
      </Card>
    </div>
  </SiteLayout>;
}
