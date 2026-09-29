import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/lib/auth";
import { YEARS, YEAR_LABEL } from "@/lib/curriculum";

export const Route = createFileRoute("/conta")({
  head: () => ({ meta: [
    { title: "Entrar ou criar conta — Sabe Mais" },
    { name: "description", content: "Crie sua conta de estudante ou entre para acompanhar seus estudos no Sabe Mais." },
    { property: "og:title", content: "Conta de estudante — Sabe Mais" },
    { property: "og:description", content: "Entre ou cadastre-se para acompanhar seus estudos." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Conta,
});

function Conta() {
  const { user } = useAuth();
  const [mode, setMode] = useState<"entrar" | "cadastrar" | "recuperar">("entrar");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [schoolYear, setSchoolYear] = useState("");
  const [avatar, setAvatar] = useState("📚");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault(); setMessage("");
    if (mode === "cadastrar" && password !== confirmation) { setMessage("As senhas não coincidem."); return; }
    setBusy(true);
    try {
      if (mode === "recuperar") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/alterar-senha` });
        setMessage(error ? error.message : "Se o e-mail estiver cadastrado, enviaremos um link para redefinir a senha.");
      } else if (mode === "cadastrar") {
        const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name, school_year: schoolYear, avatar } } });
        if (error) setMessage(error.message);
        else if (data.session && data.user) {
          await supabase.from("student_profiles").upsert({ user_id: data.user.id, name, school_year: schoolYear, avatar });
          setMessage("Conta criada! Seu progresso já pode ser acompanhado.");
        } else setMessage("Confira seu e-mail para confirmar sua conta antes de entrar.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setMessage(error ? "E-mail ou senha incorretos." : "Você entrou na sua conta.");
      }
    } finally { setBusy(false); }
  }

  async function google() {
    setMessage("");
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) setMessage("Não foi possível entrar com Google. Tente novamente.");
    else if (!result.redirected) setMessage("Você entrou na sua conta.");
  }

  return <SiteLayout><PageHeader title="Minha conta" subtitle="Seu espaço para estudar e acompanhar sua evolução." />
    <div className="mx-auto max-w-lg px-4 py-12">
      {user ? <div className="rounded-lg border border-border bg-card p-6">
        <p className="font-semibold text-foreground">Você está conectado</p><p className="mt-2 text-sm text-muted-foreground">{user.email}</p>
        <div className="mt-5 flex gap-3"><Button asChild><Link to="/perfil">Ver perfil</Link></Button><Button variant="outline" onClick={() => void supabase.auth.signOut()}>Sair</Button></div>
      </div> : <div className="rounded-lg border border-border bg-card p-6 shadow-soft">
        <div className="mb-6 flex gap-4 border-b border-border pb-4 text-sm font-semibold">
          <Button variant={mode === "entrar" ? "default" : "ghost"} onClick={() => { setMode("entrar"); setMessage(""); }}>Entrar</Button>
          <Button variant={mode === "cadastrar" ? "default" : "ghost"} onClick={() => { setMode("cadastrar"); setMessage(""); }}>Criar conta</Button>
        </div>
        <form onSubmit={(e) => void submit(e)} className="space-y-4">
          {mode === "cadastrar" && <><label className="block text-sm font-semibold">Nome<input required value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background p-3" /></label>
            <label className="block text-sm font-semibold">Ano escolar<select required value={schoolYear} onChange={e => setSchoolYear(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background p-3"><option value="">Escolha seu ano</option>{YEARS.map(y => <option key={y} value={y}>{YEAR_LABEL[y]}</option>)}</select></label>
            <label className="block text-sm font-semibold">Avatar<select value={avatar} onChange={e => setAvatar(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background p-3">{["📚", "🎓", "⭐", "🧠", "🚀"].map(a => <option key={a} value={a}>{a}</option>)}</select></label></>}
          <label className="block text-sm font-semibold">E-mail<input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background p-3" /></label>
          {mode !== "recuperar" && <label className="block text-sm font-semibold">Senha<input type="password" minLength={6} required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background p-3" /></label>}
          {mode === "cadastrar" && <label className="block text-sm font-semibold">Confirmar senha<input type="password" minLength={6} required value={confirmation} onChange={e => setConfirmation(e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-background p-3" /></label>}
          <Button disabled={busy} type="submit" className="w-full">{mode === "entrar" ? "Entrar" : mode === "cadastrar" ? "Criar conta" : "Enviar link de recuperação"}</Button>
        </form>
        {mode === "entrar" && <Button variant="link" className="mt-3 px-0" onClick={() => { setMode("recuperar"); setMessage(""); }}>Esqueci minha senha</Button>}
        {mode === "recuperar" && <Button variant="link" className="mt-3 px-0" onClick={() => setMode("entrar")}>Voltar para entrar</Button>}
        {mode !== "recuperar" && <Button variant="outline" className="mt-5 w-full" onClick={() => void google()}>Continuar com Google</Button>}
        {message && <p role="status" className="mt-4 text-sm text-foreground">{message}</p>}
      </div>}
    </div></SiteLayout>;
}