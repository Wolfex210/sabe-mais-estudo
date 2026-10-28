import { useEffect, useState, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { useAuth } from '@/lib/auth';
import { getRegistrationAccess } from '@/lib/registration.functions';
import { SiteLayout, PageHeader } from './SiteLayout';
import { Button } from './ui/button';

export function RegistrationAccess({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const [access, setAccess] = useState<{ userId: string; allowed: boolean } | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!user) return;
    let active = true;
    getRegistrationAccess().then(result => { if (active) { setAccess({ userId: user.id, allowed: result.allowed }); setError(result.error); } })
      .catch(() => { if (active) setError('Não foi possível verificar seu pagamento. Atualize a página para tentar novamente.'); });
    return () => { active = false; };
  }, [user?.id]);
  if (user && access?.userId === user.id && access.allowed) return children;
  const checking = loading || (user && access?.userId !== user.id && !error);
  return <SiteLayout><PageHeader title={checking ? 'Verificando acesso…' : 'Conclua seu cadastro'} subtitle={error || (user ? 'Seu painel será liberado após a confirmação do pagamento.' : 'Entre na sua conta para continuar.')} />
    {!checking && <div className="mx-auto max-w-lg px-4 py-10"><Button asChild className="w-full"><Link to={user ? '/pagamento' : '/conta'}>{user ? 'Ir para o pagamento' : 'Entrar ou criar conta'}</Link></Button></div>}
  </SiteLayout>;
}