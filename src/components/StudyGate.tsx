import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import type { ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import type { StudyPlan, StudyResult } from "@/lib/study.functions";

/** Busca conteúdo protegido no servidor; só quem está logado e tem plano/teste ativo recebe o conteúdo. */
export function useStudy<A, T>(key: unknown[], fn: (opts: { data: A }) => Promise<StudyResult<T>>, args: A) {
  const { user, loading } = useAuth() as { user: { id: string } | null; loading?: boolean };
  const call = useServerFn(fn as never) as (opts: { data: A }) => Promise<StudyResult<T>>;
  const query = useQuery({ queryKey: ["study", user?.id, ...key], queryFn: () => call({ data: args }), enabled: !!user, staleTime: 5 * 60_000 });
  return { user, authLoading: !!loading, ...query };
}

export function LockedMessage({ plan, kind = "matéria" }: { plan: StudyPlan; kind?: "matéria" | "curso" | "conteúdo" }) {
  const text = plan === null ? "Seu teste grátis terminou. Assine um plano para voltar a estudar."
    : plan === "basico" ? `O Básico inclui 25 ${kind === "curso" ? "cursos" : "matérias"}. Faça upgrade para continuar.`
    : `O Médio inclui ${kind === "curso" ? "70 cursos" : "60 matérias"}. O Master libera todos.`;
  return <div className="mx-auto max-w-2xl px-4 py-20 text-center">
    <h1 className="text-2xl font-bold text-foreground">{kind === "curso" ? "Curso indisponível neste plano" : "Matéria indisponível neste plano"}</h1>
    <p className="mt-3 text-muted-foreground">{text}</p>
    <Link to="/planos" className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">Comparar planos</Link>
  </div>;
}

export function SignInMessage() {
  return <div className="mx-auto max-w-2xl px-4 py-20 text-center">
    <h1 className="text-2xl font-bold text-foreground">Entre para estudar</h1>
    <p className="mt-3 text-muted-foreground">As aulas, exercícios e quizzes ficam disponíveis para alunos com conta no Sabe Mais.</p>
    <Link to="/conta" className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">Entrar ou criar conta</Link>
  </div>;
}

export function LoadingMessage() {
  return <p className="mx-auto max-w-2xl px-4 py-20 text-center text-muted-foreground" role="status">Carregando conteúdo…</p>;
}

/** Mostra login, carregamento, bloqueio ou o conteúdo liberado. */
export function StudyState<T>({ state, kind, children }: { state: ReturnType<typeof useStudy<unknown, T>>; kind?: "matéria" | "curso" | "conteúdo"; children: (data: T) => ReactNode }) {
  if (state.authLoading) return <LoadingMessage />;
  if (!state.user) return <SignInMessage />;
  if (state.isError) return <p className="mx-auto max-w-2xl px-4 py-20 text-center text-muted-foreground">Não foi possível carregar o conteúdo. Tente novamente.</p>;
  if (!state.data) return <LoadingMessage />;
  if (state.data.status === "not_found") return <p className="mx-auto max-w-2xl px-4 py-20 text-center text-muted-foreground">Conteúdo não encontrado.</p>;
  if (state.data.status === "locked") return <LockedMessage plan={state.data.plan} {...(kind ? { kind } : {})} />;
  return <>{children(state.data.data)}</>;
}
