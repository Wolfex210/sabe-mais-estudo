import { loadStripe, type Stripe } from '@stripe/stripe-js';
export type StripeEnv = 'sandbox' | 'live';
const token = import.meta.env['VITE_PAYMENTS_CLIENT_TOKEN'];
export function getStripeEnvironment(): StripeEnv {
  if (token?.startsWith('pk_test_')) return 'sandbox';
  if (token?.startsWith('pk_live_')) return 'live';
  throw new Error('Pagamentos não estão configurados neste site. Conclua a ativação antes de aceitar assinaturas.');
}
let stripePromise: Promise<Stripe | null> | null = null;
export function getStripe() {
  if (!stripePromise) {
    getStripeEnvironment();
    stripePromise = loadStripe(token as string);
  }
  return stripePromise;
}
export function paymentsAvailable() { return token?.startsWith('pk_test_') || token?.startsWith('pk_live_'); }
export function isTestPayment() { return token?.startsWith('pk_test_'); }
