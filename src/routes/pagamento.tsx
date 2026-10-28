import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Copy, QrCode, ShieldCheck, CheckCircle, RefreshCw } from 'lucide-react';
import { SiteLayout, PageHeader } from '@/components/SiteLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { createRegistrationPix, checkRegistrationPix, getRegistrationAccess } from '@/lib/registration.functions';

export const Route = createFileRoute("/pagamento")({
  head: () => ({
    meta: [
      { title: "Pagamento — Sabe Mais" },
      { name: "description", content: "Conclua seu cadastro no Sabe Mais com pagamento único de R$ 1,00 por Pix." },
      { property: "og:title", content: "Pagamento — Sabe Mais" },
      { property: "og:description", content: "Conclua o pagamento para liberar seu acesso ao Sabe Mais." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Pagamento,
});

function Pagamento() {
  const { user, loading } = useAuth();
  const [paid, setPaid] = useState(false);
  const [checking, setChecking] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [pix, setPix] = useState<{ qrCode: string; qrImage: string; expiresAt: string } | null>(null);
  const [status, setStatus] = useState('');
  useEffect(() => {
    if (loading) return;
    if (!user) { setChecking(false); return; }
    let active = true;
    getRegistrationAccess().then(result => { if (active) { setPaid(result.allowed); setError(result.error); } })
      .catch(() => { if (active) setError('Não foi possível verificar seu pagamento. Tente novamente.'); })
      .finally(() => { if (active) setChecking(false); });
    return () => { active = false; };
  }, [user?.id, loading]);
  async function generate() {
    setBusy(true); setError(''); setStatus('');
    try {
      const result = await createRegistrationPix();
      if ('error' in result) { setError(result.error ?? 'Não foi possível gerar o Pix.'); return; }
      if (result.paid) setPaid(true);
      else if ('qrCode' in result && result.qrCode) setPix({ qrCode: result.qrCode, qrImage: result.qrImage ?? '', expiresAt: result.expiresAt ?? '' });
    } catch { setError('Não foi possível iniciar o Pix. Tente novamente.'); }
    finally { setBusy(false); }
  }
  async function verify() {
    setBusy(true); setError('');
    try {
      const result = await checkRegistrationPix();
      if ('error' in result) setError(result.error ?? 'Não foi possível confirmar o pagamento.');
      else { setPaid(result.paid); setStatus(result.paid ? '' : ['cancelled', 'rejected'].includes(result.status) ? 'Pix cancelado ou recusado. Entre em contato antes de pagar novamente.' : 'Pagamento ainda não recebido. Aguarde e consulte novamente.'); }
    } catch { setError('Não foi possível confirmar o pagamento. Tente novamente.'); }
    finally { setBusy(false); }
  }
  return <SiteLayout>
    <PageHeader title="Conclua seu cadastro" subtitle="Pagamento único por Pix" />
    <div className="mx-auto max-w-xl px-4 py-10">
      <ol aria-label="Etapas do cadastro" className="mb-8 flex items-center justify-between gap-3 text-sm text-muted-foreground">
        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" />Dados</li>
        <li className="font-semibold text-primary">2. Pagamento</li><li>3. Acesso</li>
      </ol>
      {loading || checking ? <p role="status">Verificando seu cadastro…</p> : !user ? <>
        <p className="mb-5 text-muted-foreground">Confirme seu e-mail e entre na conta para continuar ao pagamento.</p>
        <Button asChild className="w-full"><Link to="/conta">Entrar ou criar conta</Link></Button>
      </> : paid ? <div className="text-center">
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h2 className="text-2xl font-bold">Pagamento recebido</h2><p className="mt-2 text-muted-foreground">Seu cadastro foi liberado.</p>
        <Button asChild className="mt-6 w-full"><Link to="/dashboard">Acessar meu painel</Link></Button>
      </> : <>
        <div className="flex items-start justify-between gap-4 border-b border-border pb-6"><div><h2 className="text-xl font-bold">Taxa de cadastro</h2><p className="mt-1 text-sm text-muted-foreground">Sabe Mais · Mercado Pago</p></div><p className="whitespace-nowrap text-3xl font-extrabold text-primary">R$ 1,00</p></div>
        <div className="my-6 flex items-center gap-3"><QrCode className="h-6 w-6 text-primary" /><div><p className="font-semibold">Pix</p><p className="text-sm text-muted-foreground">Pagamento único, sem renovação automática</p></div></div>
        {!pix ? <Button onClick={() => void generate()} disabled={busy} className="w-full"><QrCode className="mr-2 h-4 w-4" />{busy ? 'Gerando Pix…' : 'Gerar Pix de R$ 1,00'}</Button> : <>
          {pix.qrImage && <img src={`data:image/png;base64,${pix.qrImage}`} alt="QR Code do pagamento Pix" className="mx-auto my-5 h-60 w-60 max-w-full object-contain" />}
          <label className="block text-sm font-semibold">Pix Copia e Cola<textarea readOnly value={pix.qrCode} rows={3} className="mt-2 w-full resize-none break-all rounded-lg border border-border bg-background p-3 text-xs" /></label>
          <Button variant="outline" className="mt-3 w-full" onClick={() => { void navigator.clipboard.writeText(pix.qrCode).then(() => setCopied(true)).catch(() => setError('Selecione e copie o código Pix acima.')); }}><Copy className="mr-2 h-4 w-4" />{copied ? 'Código copiado' : 'Copiar código Pix'}</Button>
          {pix.expiresAt && <p className="mt-3 text-xs text-muted-foreground">Validade: {new Date(pix.expiresAt).toLocaleString('pt-BR')}</p>}
          <Button onClick={() => void verify()} disabled={busy} className="mt-5 w-full"><RefreshCw className="mr-2 h-4 w-4" />{busy ? 'Consultando…' : 'Verificar pagamento'}</Button>
        </>}
        {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
        {status && <p role="status" className="mt-4 text-sm text-muted-foreground">{status}</p>}
        <p className="mt-6 flex gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 shrink-0" />O acesso ao painel será liberado somente após o Mercado Pago confirmar o recebimento.</p>
      </>}
    </div>
  </SiteLayout>;
}
