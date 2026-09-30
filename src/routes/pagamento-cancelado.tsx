import { createFileRoute, Link } from "@tanstack/react-router";
import { XCircle } from "lucide-react";
import { SiteLayout, Card, PageHeader } from "@/components/SiteLayout";

export const Route = createFileRoute("/pagamento-cancelado")({
  head: () => ({ meta: [{ title: "Checkout cancelado — Sabe Mais" }] }),
  component: PagamentoCancelado,
});

function PagamentoCancelado() {
  return (
    <SiteLayout>
      <PageHeader title="Checkout cancelado" subtitle="Nenhuma assinatura foi ativada por esta tentativa." />
      <div className="mx-auto max-w-2xl px-4 py-16">
        <Card className="text-center">
          <XCircle className="mx-auto h-14 w-14 text-muted-foreground" />
          <h2 className="mt-5 text-2xl font-bold text-foreground">Tudo bem</h2>
          <p className="mt-2 text-muted-foreground">Você pode voltar para os planos quando quiser.</p>
          <Link to="/planos" className="mt-6 inline-block rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground">Voltar aos planos</Link>
        </Card>
      </div>
    </SiteLayout>
  );
}
