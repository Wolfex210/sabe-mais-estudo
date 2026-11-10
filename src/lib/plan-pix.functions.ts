import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { STRIPE_PLANS, isPlanId } from './stripe-plans';

/** Pix dos planos via Mercado Pago: passe de 30 dias, liberado só após o servidor confirmar o pagamento. */
export const createPlanPix = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { planId: string }) => { if (!isPlanId(data.planId)) throw new Error('Plano inválido'); return data as { planId: keyof typeof STRIPE_PLANS }; })
  .handler(async ({ data, context }) => {
    try {
      const { mercadoPago, MP_WEBHOOK_URL } = await import('./plan-pix.server');
      const { data: { user } } = await context.supabase.auth.getUser();
      if (!user?.email || user.id !== context.userId) return { error: 'Entre na sua conta para continuar.' };
      const plan = STRIPE_PLANS[data.planId];
      const reference = `sm_plan_${crypto.randomUUID()}`;
      const payment = await mercadoPago('/v1/payments', {
        method: 'POST', headers: { 'X-Idempotency-Key': reference },
        body: JSON.stringify({ transaction_amount: plan.amount / 100, description: `Sabe Mais ${data.planId} — 30 dias`, payment_method_id: 'pix', payer: { email: user.email }, external_reference: reference, notification_url: MP_WEBHOOK_URL }),
      });
      const qr = payment.point_of_interaction?.transaction_data;
      if (!payment.live_mode || !qr?.qr_code) throw new Error('O Mercado Pago não retornou um Pix válido.');
      const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
      const { error } = await supabaseAdmin.from('subscriptions').insert({
        user_id: context.userId, stripe_subscription_id: `mp_${payment.id}`, stripe_customer_id: reference,
        product_id: 'mercadopago_pix', price_id: plan.lookupKey, status: 'pending', environment: 'live',
      });
      if (error) throw new Error('Não foi possível salvar o Pix.');
      return { paymentId: String(payment.id), qrCode: qr.qr_code, qrImage: qr.qr_code_base64 ?? '' };
    } catch (error) { return { error: error instanceof Error ? error.message : 'Não foi possível iniciar o Pix.' }; }
  });

export const checkPlanPix = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { paymentId: string }) => { if (!/^\d{1,20}$/.test(data.paymentId)) throw new Error('Pagamento inválido'); return data; })
  .handler(async ({ data, context }) => {
    try {
      const { confirmPlanPix } = await import('./plan-pix.server');
      const result = await confirmPlanPix(data.paymentId, context.userId);
      if (!result.found) return { error: 'Pagamento não encontrado.' };
      return result.paid ? { paid: true } : { paid: false, status: result.status };
    } catch (error) { return { error: error instanceof Error ? error.message : 'Não foi possível confirmar o Pix.' }; }
  });
