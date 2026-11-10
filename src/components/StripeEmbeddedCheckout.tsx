import { useCallback, useState } from 'react';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { getStripe, getStripeEnvironment } from '@/lib/stripe';
import { createCheckoutSession } from '@/lib/payments.functions';
import { createPlanPix, checkPlanPix } from '@/lib/plan-pix.functions';
import { STRIPE_PLANS, type PlanId } from '@/lib/stripe-plans';
import { useEffect } from 'react';

type Method = 'card' | 'pix';

const METHODS: { id: Method; title: string; detail: string }[] = [
  { id: 'card', title: 'Cartão de crédito', detail: 'Assinatura mensal com renovação automática' },
  { id: 'pix', title: 'Pix', detail: 'Acesso de 30 dias, sem renovação automática' },
];

function CheckoutFrame({ priceId, method }: { priceId: string; method: Method }) {
  const [error, setError] = useState('');
  const fetchClientSecret = useCallback(async () => {
    const result = await createCheckoutSession({ data: { priceId, method, environment: getStripeEnvironment() } });
    if ('error' in result) { setError(result.error); throw new Error(result.error); }
    return result.clientSecret;
  }, [priceId, method]);
  return <>
    {error && <p role="alert" className="mb-4 text-sm text-destructive">{error}</p>}
    <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}><EmbeddedCheckout /></EmbeddedCheckoutProvider>
  </>;
}

function PixFrame({ priceId }: { priceId: string }) {
  const planId = (Object.keys(STRIPE_PLANS) as PlanId[]).find(id => STRIPE_PLANS[id].lookupKey === priceId);
  const [pix, setPix] = useState<{ paymentId: string; qrCode: string; qrImage: string } | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [paid, setPaid] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!pix || paid) return;
    const timer = window.setInterval(async () => {
      const r = await checkPlanPix({ data: { paymentId: pix.paymentId } }).catch(() => null);
      if (r && 'paid' in r && r.paid) { setPaid(true); window.setTimeout(() => { window.location.href = '/dashboard'; }, 2000); }
    }, 5000);
    return () => window.clearInterval(timer);
  }, [pix, paid]);
  const generate = async () => {
    if (!planId) return;
    setBusy(true); setError('');
    const r = await createPlanPix({ data: { planId } }).catch((e: Error) => ({ error: e.message }));
    setBusy(false);
    if ('error' in r) setError(r.error); else setPix(r);
  };
  if (paid) return <p className="rounded-2xl border border-primary bg-primary/5 p-6 text-center font-semibold text-foreground">Pagamento confirmado! Seu acesso de 30 dias foi liberado.</p>;
  return <div className="rounded-2xl border border-border bg-card p-6 text-center">
    {error && <p role="alert" className="mb-4 text-sm text-destructive">{error}</p>}
    {!pix ? <button type="button" onClick={generate} disabled={busy} className="rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:opacity-60">{busy ? 'Gerando Pix...' : 'Gerar Pix'}</button> : <>
      {pix.qrImage && <img src={`data:image/png;base64,${pix.qrImage}`} alt="QR Code Pix" className="mx-auto h-56 w-56" />}
      <p className="mt-4 break-all rounded-xl bg-muted p-3 text-xs text-foreground">{pix.qrCode}</p>
      <button type="button" onClick={() => { void navigator.clipboard.writeText(pix.qrCode); setCopied(true); }} className="mt-3 rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">{copied ? 'Copiado!' : 'Copiar código Pix'}</button>
      <p className="mt-3 text-sm text-muted-foreground">Aguardando pagamento... a página atualiza sozinha após a confirmação.</p>
    </>}
  </div>;
}

export function StripeEmbeddedCheckout({ priceId }: { priceId: string }) {
  // Somente Pix (Mercado Pago): cartão de crédito foi removido a pedido do dono.
  return <div className="mt-8" id="checkout">
    <h2 className="mb-1 text-xl font-bold text-foreground">Finalizar pagamento por Pix</h2>
    <p className="mb-6 text-sm text-muted-foreground">Acesso de 30 dias, sem renovação automática.</p>
    <PixFrame key={priceId} priceId={priceId} />
  </div>;
}
