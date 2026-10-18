import { useCallback, useState } from 'react';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { getStripe, getStripeEnvironment } from '@/lib/stripe';
import { createCheckoutSession } from '@/lib/payments.functions';

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

export function StripeEmbeddedCheckout({ priceId }: { priceId: string }) {
  const [method, setMethod] = useState<Method>('card');
  return <div className="mt-8" id="checkout">
    <h2 className="mb-4 text-xl font-bold text-foreground">Finalizar pagamento</h2>
    <div role="radiogroup" aria-label="Forma de pagamento" className="mb-6 grid gap-3 sm:grid-cols-2">
      {METHODS.map((m) => (
        <button key={m.id} type="button" role="radio" aria-checked={method === m.id} onClick={() => setMethod(m.id)}
          className={`rounded-2xl border p-4 text-left transition hover:shadow-soft ${method === m.id ? 'border-primary bg-primary/5 ring-2 ring-primary/30' : 'border-border bg-card'}`}>
          <span className="block font-semibold text-foreground">{m.title}</span>
          <span className="block text-sm text-muted-foreground">{m.detail}</span>
        </button>
      ))}
    </div>
    <CheckoutFrame key={`${priceId}-${method}`} priceId={priceId} method={method} />
  </div>;
}
