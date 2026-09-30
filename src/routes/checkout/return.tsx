import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { SiteLayout, PageHeader } from '@/components/SiteLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { getStripeEnvironment } from '@/lib/stripe';
import { getCheckoutStatus } from '@/lib/payments.functions';

export const Route = createFileRoute('/checkout/return')({
  validateSearch: (search: Record<string, unknown>): { session_id?: string } => typeof search['session_id'] === 'string' ? { session_id: search['session_id'] } : {},
  head: () => ({ meta: [
    { title: 'Resultado da assinatura — Sabe Mais' },
    { name: 'description', content: 'Confira o resultado da sua assinatura no Sabe Mais.' },
    { property: 'og:title', content: 'Resultado da assinatura — Sabe Mais' },
    { property: 'og:description', content: 'Confira o resultado da sua assinatura no Sabe Mais.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' },
  ] }),
  component: CheckoutReturn,
});
function CheckoutReturn() {
  const { session_id: sessionId } = Route.useSearch();
  const { user, loading } = useAuth();
  const [message, setMessage] = useState('Verificando assinatura…');
  useEffect(() => {
    if (loading) return;
    if (!user) { setMessage('Entre na sua conta para consultar sua assinatura.'); return; }
    if (!sessionId) { setMessage('Não há um pagamento para consultar.'); return; }
    let active = true;
    getCheckoutStatus({ data: { sessionId, environment: getStripeEnvironment() } })
      .then(result => { if (active) setMessage('error' in result ? result.error : result.status === 'complete' && result.paymentStatus !== 'unpaid' ? 'Assinatura recebida. Confira seu plano no perfil.' : 'Seu pagamento ainda está em processamento. Confira novamente em instantes.'); })
      .catch(() => { if (active) setMessage('Não foi possível verificar este pagamento agora. Consulte seu perfil mais tarde.'); });
    return () => { active = false; };
  }, [sessionId, user, loading]);
  return <SiteLayout><PageHeader title="Sua assinatura" subtitle={message} /><div className="mx-auto flex max-w-5xl gap-3 px-4 py-10"><Button asChild><Link to="/perfil">Ver perfil</Link></Button><Button asChild variant="outline"><Link to="/planos">Ver planos</Link></Button></div></SiteLayout>;
}
