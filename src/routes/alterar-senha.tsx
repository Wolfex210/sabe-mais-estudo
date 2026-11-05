import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
export const Route = createFileRoute("/alterar-senha")({
  head: () => ({ meta: [{ title: "Alterar senha — Sabe Mais" }, { name: "description", content: "Defina uma nova senha para sua conta do Sabe Mais." }, { property: "og:title", content: "Alterar senha — Sabe Mais" }, { property: "og:description", content: "Redefina sua senha com segurança." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: AlterarSenha,
});
function AlterarSenha() {
  const [password, setPassword] = useState(""); const [confirm, setConfirm] = useState(""); const [current, setCurrent] = useState(""); const [message, setMessage] = useState("");
  // Quem chega pelo link de recuperação enviado por e-mail não precisa da senha atual; quem já está logado precisa.
  const [recovery, setRecovery] = useState(false);
  useEffect(() => {
    if (window.location.hash.includes("type=recovery")) setRecovery(true);
    const { data } = supabase.auth.onAuthStateChange((event) => { if (event === "PASSWORD_RECOVERY") setRecovery(true); });
    return () => data.subscription.unsubscribe();
  }, []);
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (password !== confirm) { setMessage("As senhas não coincidem."); return; }
    if (!recovery) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) { setMessage("Entre na sua conta para alterar a senha."); return; }
      const { error: authError } = await supabase.auth.signInWithPassword({ email: user.email, password: current });
      if (authError) { setMessage("Senha atual incorreta."); return; }
    }
    const { error } = await supabase.auth.updateUser({ password });
    if (!error) { setCurrent(""); setPassword(""); setConfirm(""); }
    setMessage(error ? (recovery ? "O link expirou ou é inválido. Solicite outro na página de acesso." : "Não foi possível alterar a senha. Tente novamente.") : "Senha alterada com sucesso.");
  }
  return <SiteLayout><PageHeader title="Alterar senha" /><div className="mx-auto max-w-lg px-4 py-12"><form onSubmit={(e) => void submit(e)} className="space-y-4 rounded-lg border border-border bg-card p-6">{!recovery && <label className="block text-sm font-semibold">Senha atual<input required type="password" autoComplete="current-password" value={current} onChange={e => setCurrent(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background p-3" /></label>}<label className="block text-sm font-semibold">Nova senha<input required minLength={6} type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background p-3" /></label><label className="block text-sm font-semibold">Confirmar nova senha<input required minLength={6} type="password" value={confirm} onChange={e => setConfirm(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background p-3" /></label><Button type="submit">Salvar senha</Button>{message && <p role="status" className="text-sm">{message}</p>}<Link to="/conta" className="block text-sm text-primary">Voltar para minha conta</Link></form></div></SiteLayout>;
}