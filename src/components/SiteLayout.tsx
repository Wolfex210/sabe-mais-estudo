/** Cabeçalho, menu (com versão mobile) e rodapé compartilhados. */
import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import { useAppState, levelOf } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Início" },
  { to: "/materias", label: "Matérias" },
  { to: "/ferramentas", label: "Ferramentas" },
  { to: "/quiz", label: "Quiz" },
  { to: "/desafios", label: "Desafios" },
  { to: "/progresso", label: "Meu Progresso" },
  { to: "/planos", label: "Planos" },
  { to: "/pesquisa", label: "Pesquisar" },
] as const;

export function AdSlot({ label = "Espaço reservado para publicidade" }: { label?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-muted/50 px-6 py-8 text-center text-xs uppercase tracking-widest text-muted-foreground">
      {label}
    </div>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const state = useAppState();
  const { user } = useAuth();
  const { current } = levelOf(state.points);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="text-lg tracking-tight">Sabe Mais</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/perfil"
              className="hidden rounded-lg border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              {current.name} · {state.points} pts
            </Link>
            <Button asChild variant="outline" size="sm"><Link to={user ? "/perfil" : "/conta"}>{user ? state.avatar : "Entrar"}</Link></Button>
            <Link
              to="/materias"
              className="hidden rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5 sm:block"
            >
              Começar a estudar
            </Link>
            <button
              aria-label="Abrir menu"
              onClick={() => setOpen((v) => !v)}
              className="rounded-lg border border-border p-2 text-foreground lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-border bg-background px-4 pb-4 lg:hidden">
            {[...nav, { to: "/perfil", label: "Perfil" } as const, { to: "/conta", label: "Minha conta" } as const].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-secondary/40">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
          <div>
            <p className="text-base font-bold text-foreground">Sabe Mais</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Aprenda mais. Entenda melhor. Vá mais longe.
            </p>
          </div>
          <div className="text-sm">
            <p className="font-semibold text-foreground">Navegar</p>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              {nav.slice(1, 5).map((i) => (
                <li key={i.to}>
                  <Link to={i.to} className="hover:text-foreground">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sm">
            <p className="font-semibold text-foreground">Estudante</p>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              <li>
                <Link to="/progresso" className="hover:text-foreground">
                  Meu progresso
                </Link>
              </li>
              <li>
                <Link to="/perfil" className="hover:text-foreground">
                  Perfil e conquistas
                </Link>
              </li>
              <li>
                <Link to="/planos" className="hover:text-foreground">
                  Sabe Mais Premium
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="border-t border-border py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sabe Mais · Plataforma brasileira de estudos
        </p>
      </footer>
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
    <div
      className={`rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift ${className}`}
    >
      {children}
    </div>
  );
}
