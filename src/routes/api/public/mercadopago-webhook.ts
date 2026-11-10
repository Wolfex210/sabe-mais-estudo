import { createFileRoute } from '@tanstack/react-router';

/**
 * Aviso do Mercado Pago quando um Pix muda de status.
 * Não confiamos no conteúdo recebido: só usamos o ID e conferimos o pagamento direto na API do Mercado Pago.
 */
export const Route = createFileRoute('/api/public/mercadopago-webhook')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const url = new URL(request.url);
        const body = await request.json().catch(() => ({})) as { type?: string; action?: string; data?: { id?: unknown } };
        const type = body.type ?? url.searchParams.get('type') ?? url.searchParams.get('topic');
        const id = String(body.data?.id ?? url.searchParams.get('data.id') ?? url.searchParams.get('id') ?? '');
        if (type !== 'payment' || !/^\d{1,20}$/.test(id)) return new Response('ignored', { status: 200 });
        try {
          const { confirmPlanPix } = await import('@/lib/plan-pix.server');
          await confirmPlanPix(id);
          return new Response('ok', { status: 200 });
        } catch {
          return new Response('retry', { status: 500 });
        }
      },
    },
  },
});
