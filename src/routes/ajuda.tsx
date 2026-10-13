import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader, Card } from "@/components/SiteLayout";

export const Route = createFileRoute("/ajuda")({
  head: () => ({ meta: [{ title: "Ajuda e suporte — Sabe Mais" }, { name: "description", content: "Orientações para usar as ferramentas de estudo e resolver dúvidas comuns no Sabe Mais." }] }),
  component: Ajuda,
});

const faqs = [
  { q: "Como começo a estudar?", a: "Escolha uma matéria, selecione seu ano escolar quando essa opção estiver disponível, leia a explicação e pratique com as questões. O plano de estudos pode ajudar a distribuir as matérias durante a semana." },
  { q: "Como funciona o caderno de erros?", a: "Quando você erra uma questão em um quiz compatível, a resposta e a explicação ficam registradas para revisar. Depois de estudar o conceito, marque o item como revisado." },
  { q: "Como montar uma rotina?", a: "Abra Plano de estudos, informe o tempo diário, descreva seu objetivo e selecione as matérias. A rotina usa seu histórico de quizzes para ajudar a priorizar os assuntos com menor aproveitamento." },
  { q: "Os simulados têm tempo?", a: "Sim. A versão atual sugere 90 segundos por questão. Ao concluir ou encerrar, você pode consultar as respostas registradas, as explicações disponíveis e o desempenho por matéria." },
  { q: "Onde ficam meus flashcards e redações?", a: "Nesta versão, as marcações de flashcards e os rascunhos da oficina de redação ficam salvos no navegador usado. Eles não são sincronizados entre dispositivos e podem ser apagados se os dados do navegador forem limpos." },
  { q: "Como vejo meu progresso?", a: "Use o Dashboard do aluno e Meu progresso para consultar questões respondidas, aproveitamento, pontos, tempo de estudo, sessões e histórico disponível." },
  { q: "Como escolher ou alterar um plano?", a: "Acesse Planos de compra para consultar os benefícios e valores exibidos. Antes de confirmar uma compra, confira o preço, a periodicidade e as condições de cancelamento mostradas no checkout." },
  { q: "O que fazer se uma página não carregar?", a: "Atualize a página, confira a conexão, tente abrir novamente e verifique se o navegador está atualizado. Se o problema continuar, registre a página, o horário e a mensagem de erro para encaminhar ao canal oficial de suporte quando ele estiver configurado." },
];

function Ajuda() {
  const [open, setOpen] = useState<number | null>(0);
  return <SiteLayout>
    <PageHeader title="Ajuda e suporte" subtitle="Respostas rápidas para aproveitar melhor as ferramentas do Sabe Mais." />
    <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 py-10 lg:grid-cols-[1fr_280px]">
      <section aria-label="Perguntas frequentes" className="space-y-3">
        {faqs.map((faq,i)=><Card key={faq.q} className="p-0"><button type="button" aria-expanded={open===i} onClick={()=>setOpen(v=>v===i?null:i)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold"><span>{faq.q}</span><span aria-hidden="true" className="text-primary">{open===i?"−":"+"}</span></button>{open===i&&<div className="border-t border-border px-5 py-4 text-sm leading-6 text-muted-foreground">{faq.a}</div>}</Card>)}
      </section>
      <aside className="space-y-4">
        <Card><h2 className="font-bold">Atalhos úteis</h2><div className="mt-4 space-y-2"><Link to="/plano-estudos" className="block rounded-xl border border-border p-3 text-sm font-medium hover:bg-secondary">📅 Plano de estudos</Link><Link to="/caderno-erros" className="block rounded-xl border border-border p-3 text-sm font-medium hover:bg-secondary">📒 Caderno de erros</Link><Link to="/cartoes" className="block rounded-xl border border-border p-3 text-sm font-medium hover:bg-secondary">🗂️ Flashcards</Link><Link to="/redacao" className="block rounded-xl border border-border p-3 text-sm font-medium hover:bg-secondary">✍️ Oficina de redação</Link><Link to="/planos" className="block rounded-xl border border-border p-3 text-sm font-medium hover:bg-secondary">💳 Planos de compra</Link></div></Card>
        <Card><h2 className="font-bold">Antes de comprar</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Confira os benefícios incluídos, o valor mensal e as condições exibidas no checkout. Não conclua a compra se as informações estiverem incompletas ou divergentes.</p></Card>
        <p className="text-xs leading-5 text-muted-foreground">Esta página reúne orientações de autoatendimento. Um canal de suporte humano precisa ser configurado pelo responsável pelo serviço antes de ser anunciado como disponível.</p>
      </aside>
    </div>
  </SiteLayout>;
}
