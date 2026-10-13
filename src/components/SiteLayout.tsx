/** Cabeçalho, navegação lateral responsiva e rodapé compartilhados. */
import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Menu, X, GraduationCap, Download, House, BookOpen, GraduationCap as College,
  Wrench, Brain, Trophy, LayoutDashboard, CalendarDays, NotebookPen,
  RotateCcw, ClipboardCheck, TrendingUp, CreditCard, Search, UserRound,
} from "lucide-react";
import { useAppState, levelOf, trialExpired } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const navGroups = [
  {
    label: "PRINCIPAL",
    items: [
      { to: "/", label: "Início", icon: House },
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/materias", label: "Matérias", icon: BookOpen },
      { to: "/faculdade", label: "Faculdade", icon: College },
    ],
  },
  {
    label: "ESTUDAR",
    items: [
      { to: "/plano-estudos", label: "Plano de estudos", icon: CalendarDays },
      { to: "/quiz", label: "Quizzes", icon: Brain },
      { to: "/desafios", label: "Desafios", icon: Trophy },
      { to: "/simulados", label: "Simulados", icon: ClipboardCheck },
      { to: "/revisao", label: "Revisão inteligente", icon: RotateCcw },
      { to: "/caderno-erros", label: "Caderno de erros", icon: NotebookPen },
    ],
  },
  {
    label: "ACOMPANHAMENTO",
    items: [
      { to: "/progresso", label: "Meu progresso", icon: TrendingUp },
      { to: "/ferramentas", label: "Ferramentas", icon: Wrench },
      { to: "/pesquisa", label: "Pesquisar", icon: Search },
    ],
  },
  {
    label: "CONTA",
    items: [
      { to: "/planos", label: "Planos", icon: CreditCard },
      { to: "/perfil", label: "Meu perfil", icon: UserRound },
    ],
  },
] as const;

const nav = navGroups.flatMap((group) => group.items);

export function AdSlot({ label = "Espaço reservado para publicidade" }: { label?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-muted/50 px-6 py-8 text-center text-xs uppercase tracking-widest text-muted-foreground">
      {label}
    </div>
  );
}

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const handleInstallApp = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      await installPrompt.userChoice;
      setInstallPrompt(null);
      return;
    }
    window.alert(
      "Para instalar o Sabe Mais como aplicativo, use o botão de instalar do navegador. No Chrome/Edge, procure o ícone de instalação na barra de endereço."
    );
  };

  const state = useAppState();
  const location = useLocation();
  const { user } = useAuth();
  const { current } = levelOf(state.points);
  const accessLocked = trialExpired(state) && location.pathname !== "/planos";

  const navigation = (mobile = false) => (
    <div className="space-y-5">
      {navGroups.map((group) => (
        <section key={group.label}>
          <p className="px-3 pb-2 text-[10px] font-extrabold tracking-[0.16em] text-muted-foreground/75">
            {group.label}
          </p>
          <div className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => mobile && setOpen(false)}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "bg-primary/10 text-primary font-semibold shadow-sm" }}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground [&.active]:bg-primary/10 [&.active]:text-primary"
                >
                  <Icon className="h-[18px] w-[18px] shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="flex h-16 w-full items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-2 font-bold text-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="text-lg tracking-tight">Sabe Mais</span>
          </Link>

          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/perfil"
              className="hidden rounded-lg border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              {current.name} · {state.points} pts
            </Link>
            <button
              type="button"
              onClick={handleInstallApp}
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary/25 bg-primary/10 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/15"
              title="Instalar o Sabe Mais como aplicativo"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Baixar app</span>
            </button>
            <Button asChild variant="outline" size="sm">
              <Link to={user ? "/perfil" : "/conta"}>{user ? state.avatar : "Entrar"}</Link>
            </Button>
            <button
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="rounded-lg border border-border p-2 text-foreground lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 flex-col border-r border-border/70 bg-card/50 lg:flex">
          <div className="flex-1 overflow-y-auto px-3 py-5">
            {navigation()}
          </div>
          <div className="border-t border-border/70 p-3">
            <Link to="/perfil" className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-secondary">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {state.avatar || "🎓"}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-foreground">{user?.email || "Área do estudante"}</span>
                <span className="block text-xs text-muted-foreground">{current.name} · {state.points} pontos</span>
              </span>
            </Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {open && (
            <div className="fixed inset-0 top-16 z-30 bg-background lg:hidden">
              <nav className="h-full overflow-y-auto px-4 py-5">{navigation(true)}</nav>
            </div>
          )}

          <main className="min-h-[60vh]">{children}</main>

          {accessLocked && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 px-4 backdrop-blur-sm">
              <div className="w-full max-w-2xl rounded-3xl border border-border bg-card p-8 text-center shadow-lift sm:p-10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl">🔒</div>
                <h2 className="mt-5 text-2xl font-extrabold text-foreground sm:text-3xl">Seu período grátis terminou</h2>
                <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                  Seus 4 dias gratuitos terminaram. Para continuar usando as matérias, quizzes, ferramentas e demais recursos do Sabe Mais, escolha um plano mensal.
                </p>
                <Link to="/planos" className="mt-7 inline-flex rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5">
                  Ver planos e continuar estudando
                </Link>
                <p className="mt-4 text-xs text-muted-foreground">Você continuará podendo acessar esta tela e a página de planos.</p>
              </div>
            </div>
          )}

          <footer className="border-t border-border bg-secondary/40">
            <div className="grid w-full gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
              <div>
                <p className="text-base font-bold text-foreground">Sabe Mais</p>
                <p className="mt-1 text-sm text-muted-foreground">Aprenda mais. Entenda melhor. Vá mais longe.</p>
              </div>
              <div className="text-sm">
                <p className="font-semibold text-foreground">Navegar</p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  {nav.slice(1, 5).map((item) => (
                    <li key={item.to}><Link to={item.to} className="hover:text-foreground">{item.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="text-sm">
                <p className="font-semibold text-foreground">Estudante</p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li><Link to="/progresso" className="hover:text-foreground">Meu progresso</Link></li>
                  <li><Link to="/perfil" className="hover:text-foreground">Perfil e conquistas</Link></li>
                  <li><Link to="/planos" className="hover:text-foreground">Sabe Mais Premium</Link></li>
                </ul>
              </div>
            </div>
            <p className="border-t border-border py-4 text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} Sabe Mais · Plataforma brasileira de estudos
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

/** Cabeçalho padrão das páginas internas. */
export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="border-b border-border bg-gradient-hero">
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift ${className}`}>
      {children}
    </div>
  );
}
