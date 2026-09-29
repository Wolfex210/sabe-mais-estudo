import { createFileRoute } from "@tanstack/react-router";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { SiteLayout, PageHeader, Card, AdSlot } from "@/components/SiteLayout";
import { useAppState, levelOf, streakOf } from "@/lib/store";

export const Route = createFileRoute("/progresso")({
  head: () => ({
    meta: [
      { title: "Meu progresso — Sabe Mais" },
      {
        name: "description",
        content: "Veja questões respondidas, acertos, erros, pontos, desafios, tempo estudado e sua sequência de dias.",
      },
      { property: "og:title", content: "Meu progresso — Sabe Mais" },
      { property: "og:description", content: "Estatísticas e gráficos dos seus estudos no Sabe Mais." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Progresso,
});

function Progresso() {
  const s = useAppState();
  const { current, next, progress } = levelOf(s.points);
  const streak = streakOf(s);
  const horas = Math.floor(s.studySeconds / 3600);
  const minutos = Math.floor((s.studySeconds % 3600) / 60);

  const stats = [
    { label: "Questões respondidas", value: s.answered },
    { label: "Acertos", value: s.correct },
    { label: "Erros", value: s.wrong },
    { label: "Pontos", value: s.points },
    { label: "Desafios concluídos", value: s.challenges.length },
    { label: "Tempo estudado", value: `${horas}h ${minutos}min` },
    { label: "Sequência de dias", value: `${streak} dia(s)` },
    { label: "Aproveitamento", value: `${s.answered ? Math.round((s.correct / s.answered) * 100) : 0}%` },
    { label: "Assuntos concluídos", value: s.completedTopics.length },
    { label: "Quizzes concluídos", value: s.quizHistory.length },
    { label: "Sessões de estudo", value: s.studySessions },
  ];

  const chart = [
    { nome: "Acertos", valor: s.correct },
    { nome: "Erros", valor: s.wrong },
    { nome: "Desafios", valor: s.challenges.length },
    { nome: "Dias", valor: s.days.length },
  ];

  return (
    <SiteLayout>
      <PageHeader title="Meu Progresso" subtitle="Acompanhe sua evolução nos estudos." />
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((st) => (
            <Card key={st.label} className="p-5">
              <p className="text-sm text-muted-foreground">{st.label}</p>
              <p className="mt-1 text-3xl font-extrabold text-primary">{st.value}</p>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <h2 className="font-semibold text-foreground">Resumo em gráfico</h2>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chart}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="nome" tickLine={false} axisLine={false} />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="valor" fill="oklch(0.56 0.18 256)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h2 className="font-semibold text-foreground">Nível</h2>
            <p className="mt-2 text-2xl font-bold text-foreground">{current.name}</p>
            <div className="mt-4 h-2 rounded-full bg-secondary">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {next ? `Faltam ${next.min - s.points} pontos para ${next.name}.` : "Nível máximo!"}
            </p>
            <div className="mt-6">
              <AdSlot label="Publicidade" />
            </div>
          </Card>
        </div>
      </div>
    </SiteLayout>
  );
}
