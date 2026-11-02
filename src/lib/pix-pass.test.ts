import { test, expect } from 'bun:test';
import { isValidPixPassSession } from './pix-pass.server';

const valid = {
  id: 'cs_test_123',
  mode: 'payment',
  livemode: false,
  payment_status: 'paid',
  amount_total: 1999,
  currency: 'brl',
  customer: 'cus_test_123',
  metadata: {
    kind: 'pix_30d',
    userId: '123e4567-e89b-12d3-a456-426614174000',
    lookupKey: 'sabe_mais_basico_mensal',
    productId: 'prod_test_123',
  },
};

test('accepts a paid Pix pass only when amount, currency, plan and environment match', () => {
  expect(isValidPixPassSession(valid, 'sandbox')).toBe(true);
  expect(isValidPixPassSession({ ...valid, livemode: true }, 'sandbox')).toBe(false);
  expect(isValidPixPassSession({ ...valid, amount_total: 1 }, 'sandbox')).toBe(false);
  expect(isValidPixPassSession({ ...valid, currency: 'usd' }, 'sandbox')).toBe(false);
  expect(isValidPixPassSession({ ...valid, mode: 'subscription' }, 'sandbox')).toBe(false);
  expect(isValidPixPassSession({ ...valid, payment_status: 'unpaid' }, 'sandbox')).toBe(false);
  expect(isValidPixPassSession({ ...valid, metadata: { ...valid.metadata, lookupKey: 'unknown' } }, 'sandbox')).toBe(false);
});

test('requires a live Checkout Session for the live environment', () => {
  expect(isValidPixPassSession({ ...valid, id: 'cs_live_123', livemode: true }, 'live')).toBe(true);
  expect(isValidPixPassSession(valid, 'live')).toBe(false);
});
