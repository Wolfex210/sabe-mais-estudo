export const REGISTRATION_AMOUNT_CENTS = 100;

export function isRegistrationPaymentApproved(payment: {
  status?: string; transaction_amount?: number; currency_id?: string;
  external_reference?: string; payment_method_id?: string; live_mode?: boolean;
}, orderId: string): boolean {
  return payment.status === 'approved' && payment.transaction_amount === REGISTRATION_AMOUNT_CENTS / 100 &&
    payment.currency_id === 'BRL' && payment.external_reference === orderId &&
    payment.payment_method_id === 'pix' && payment.live_mode === true;
}