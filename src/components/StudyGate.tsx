import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import type { ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import { SiteLayout } from "@/components/SiteLayout";
import type { StudyPlan, StudyResult } from "@/lib/study.functions";

/** Busca conteúdo protegido no servidor; só quem está logado e tem plano/teste ativo recebe o conteúdo. */
export function useStudy<A, T>(key: unknown[], fn: (opts: { data: A }) => Promise<StudyResult<T>>, args: A) {
  const { user, loading } = useAuth();
  const call = useServerFn(fn as never) as unknown as (opts: { data: A }) => Promise<StudyResult<T>>;
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

/** Mostra login, carregamento, bloqueio ou o conteúdo liberado (o conteúdo traz o próprio layout). */
export function StudyState<T>({ state, kind, children }: { state: { user: unknown; authLoading: boolean; isError: boolean; data: StudyResult<T> | undefined }; kind?: "matéria" | "curso" | "conteúdo"; children: (data: T) => ReactNode }) {
  let fallback: ReactNode;
  if (state.authLoading) fallback = <LoadingMessage />;
  else if (!state.user) fallback = <SignInMessage />;
  else if (state.isError) fallback = <p className="mx-auto max-w-2xl px-4 py-20 text-center text-muted-foreground">Não foi possível carregar o conteúdo. Tente novamente.</p>;
  else if (!state.data) fallback = <LoadingMessage />;
  else if (state.data.status === "not_found") fallback = <p className="mx-auto max-w-2xl px-4 py-20 text-center text-muted-foreground">Conteúdo não encontrado.</p>;
  else if (state.data.status === "locked") fallback = <LockedMessage plan={state.data.plan} {...(kind ? { kind } : {})} />;
  else return <>{children(state.data.data)}</>;
  return <SiteLayout>{fallback}</SiteLayout>;
}

/** Aviso curto para páginas com seletor de matéria (quiz, cartões, simulados). */
export function inlineStudyNotice(state: { user: unknown; authLoading: boolean; isError: boolean; data: StudyResult<unknown> | undefined }): ReactNode | null {
  const box = (text: ReactNode) => <div className="rounded-xl border border-border bg-card p-5 text-center text-sm text-muted-foreground">{text}</div>;
  if (state.authLoading) return box("Carregando…");
  if (!state.user) return box(<>Entre na sua conta para estudar. <Link to="/conta" className="font-semibold text-primary">Entrar ou criar conta</Link></>);
  if (state.isError) return box("Não foi possível carregar o conteúdo. Tente novamente.");
  if (!state.data) return box("Carregando…");
  if (state.data.status === "not_found") return box("Conteúdo não encontrado.");
  if (state.data.status === "locked") return box(<>{state.data.plan === null ? "Seu teste grátis terminou. Assine um plano para voltar a estudar." : "Esta matéria não faz parte do seu plano."} <Link to="/planos" className="font-semibold text-primary">Comparar planos</Link></>);
  return null;
}
