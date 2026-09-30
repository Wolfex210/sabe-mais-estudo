import { useCallback, useState } from 'react';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { getStripe, getStripeEnvironment } from '@/lib/stripe';
import { createCheckoutSession } from '@/lib/payments.functions';

export function StripeEmbeddedCheckout({ priceId }: { priceId: string }) {
  const [error, setError] = useState('');
  const fetchClientSecret = useCallback(async () => {
    const result = await createCheckoutSession({ data: { priceId, environment: getStripeEnvironment() } });
    if ('error' in result) { setError(result.error); throw new Error(result.error); }
    return result.clientSecret;
  }, [priceId]);
  return <div className="mt-8" id="checkout">
    <h2 className="mb-4 text-xl font-bold text-foreground">Finalizar assinatura</h2>
    {error && <p role="alert" className="mb-4 text-sm text-destructive">{error}</p>}
    <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}><EmbeddedCheckout /></EmbeddedCheckoutProvider>
  </div>;
}
