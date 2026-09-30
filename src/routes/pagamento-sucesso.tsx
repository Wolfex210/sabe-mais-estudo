import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { SiteLayout, Card, PageHeader } from "@/components/SiteLayout";

export const Route = createFileRoute("/pagamento-sucesso")({
  head: () => ({ meta: [{ title: "Pagamento confirmado — Sabe Mais" }] }),
  component: PagamentoSucesso,
});

function PagamentoSucesso() {
  return (
    <SiteLayout>
      <PageHeader title="Pagamento iniciado com sucesso" subtitle="Seu checkout foi concluído. O acesso premium será atualizado após a confirmação da assinatura." />
      <div className="mx-auto max-w-2xl px-4 py-16">
        <Card className="text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
          <h2 className="mt-5 text-2xl font-bold text-foreground">Tudo certo!</h2>
          <p className="mt-2 text-muted-foreground">A confirmação é feita pelo webhook do Stripe. Você pode voltar aos estudos enquanto ela é processada.</p>
          <Link to="/planos" className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Ver meus planos</Link>
        </Card>
      </div>
    </SiteLayout>
  );
}
