CREATE TABLE public.registration_payments (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id uuid NOT NULL UNIQUE,
 amount_cents integer NOT NULL DEFAULT 100 CHECK (amount_cents = 100),
 currency text NOT NULL DEFAULT 'BRL' CHECK (currency = 'BRL'),
 provider_payment_id text UNIQUE,
 status text NOT NULL DEFAULT 'pending',
 qr_code text,
 qr_code_base64 text,
 expires_at timestamptz,
 paid_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.registration_payments TO authenticated;
GRANT ALL ON public.registration_payments TO service_role;
ALTER TABLE public.registration_payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own registration payment" ON public.registration_payments FOR SELECT TO authenticated USING (auth.uid() = user_id);