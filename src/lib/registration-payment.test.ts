import { test, expect } from 'bun:test';
import { REGISTRATION_AMOUNT_CENTS, isRegistrationPaymentApproved } from './registration-payment';

const paid = { status: 'approved', transaction_amount: 1, currency_id: 'BRL', external_reference: 'order', payment_method_id: 'pix', live_mode: true };
test('registration costs exactly R$ 1.00', () => {
  expect(REGISTRATION_AMOUNT_CENTS).toBe(100);
  expect(isRegistrationPaymentApproved({ ...paid, transaction_amount: 19.99 }, 'order')).toBe(false);
});
test('only received production Pix for the matching order unlocks registration', () => {
  expect(isRegistrationPaymentApproved(paid, 'order')).toBe(true);
  for (const invalid of [{status:'pending'}, {live_mode:false}, {payment_method_id:'credit_card'}, {currency_id:'USD'}, {external_reference:'other'}]) {
    expect(isRegistrationPaymentApproved({ ...paid, ...invalid }, 'order')).toBe(false);
  }
});