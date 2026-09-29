import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHeader, Card, AdSlot } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { getDeepStudy, getExamPrep, getSubject, getStudyHelpLines } from "@/lib/content";
import { curriculum, YEARS, YEAR_LABEL, type Year } from "@/lib/curriculum";
import { getTopics } from "@/lib/lessons";
import { actions } from "@/lib/store";

export const Route = createFileRoute("/materias/$slug")({
  loader: ({ params }) => {
    const subject = getSubject(params.slug);
    if (!subject) throw notFound();
    return { name: subject.name, intro: subject.intro };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Matéria não encontrada — Sabe Mais" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} — Sabe Mais`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.intro },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.intro },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: SubjectPage,
});

function SubjectPage() {
  const { slug } = Route.useParams();
  const subject = getSubject(slug);
  const availableYears = YEARS.filter((year) => (curriculum[slug]?.[year]?.length ?? 0) > 0);
  const [year, setYear] = useState<Year>(availableYears[0] ?? "1º EF");
  const activeYear = availableYears.includes(year) ? year : (availableYears[0] ?? "1º EF");
  const [open, setOpen] = useState<number | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [studyPage, setStudyPage] = useState(0);
  const studyImagesBySubject: Record<string, string[]> = {
    matematica: [
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1596495578060-6e0763fa1178?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1635372722656-389f87a941b7?auto=format&fit=crop&w=1200&q=80",
    ],
    portugues: [
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
    ],
    historia: [
      "https://images.unsplash.com/photo-1461360228754-6e81c478b882?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?auto=format&fit=crop&w=1200&q=80",
    ],
    geografia: [
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
    ],
    ciencias: [
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    ],
    ingles: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80",
    ],
    fisica: [
      "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&w=1200&q=80",
    ],
    quimica: [
      "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576319155264-99536e0be1ee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=1200&q=80",
    ],
    astronomia: [
      "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1534791547706-3c0e7e3f9f7b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=1200&q=80",
    ],
    sociologia: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    ],
    oratoria: [
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    ],
    filosofia: [
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80",
    ],
    biologia: [
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80",
    ],
    "ensino-religioso": [
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1548625361-7a4a4f0b8f5c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    ],
    redacao: [
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    ],
    literatura: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
    ],
    geopolitica: [
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?auto=format&fit=crop&w=1200&q=80",
    ],
    empreendedorismo: [
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    ],
    "historia-da-arte": [
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=80",
    ],
    "ecologia-e-educacao-ambiental": [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    ],
    algebra: [
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1596495578060-6e0763fa1178?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1635372722656-389f87a941b7?auto=format&fit=crop&w=1200&q=80",
    ],
    geometria: [
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1200&q=80",
    ],
  };
  const studyImages = studyImagesBySubject[slug] ?? studyImagesBySubject.matematica;

  if (!subject) return null;
  const topics = getTopics(slug, activeYear);
  const q = subject.questions[qIndex];
  const helpLines = getStudyHelpLines(slug);
  const examPrep = getExamPrep(slug);
  const deepStudy = getDeepStudy(slug);
  const finished = qIndex >= subject.questions.length || !q;

  function pick(i: number) {
    if (chosen !== null || !q) return;
    setChosen(i);
    const ok = i === q.answer;
    if (ok) setScore((s) => s + 1);
    actions.answer(ok);
  }

  return (
    <SiteLayout>
      <PageHeader title={`${subject.emoji} ${subject.name}`} subtitle={subject.intro} />
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <section aria-labelledby="year-heading">
            <h2 id="year-heading" className="text-xl font-bold text-foreground">Estude por ano escolar</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Selecione seu ano para ver um roteiro introdutório dos principais assuntos. A ordem pode variar conforme a escola.
              {(slug === "fisica" || slug === "quimica") && " Antes do 9º ano, estes temas aparecem principalmente em Ciências."}
            </p>
            <label htmlFor="school-year" className="mt-5 block text-sm font-semibold text-foreground">Ano escolar</label>
            <select
              id="school-year"
              value={activeYear}
              onChange={(event) => setYear(event.target.value as Year)}
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:max-w-sm"
            >
              {availableYears.map((item) => <option key={item} value={item}>{YEAR_LABEL[item]}</option>)}
            </select>
            <div className="mt-5 space-y-3" aria-live="polite">
              <h3 className="text-base font-semibold text-foreground">{YEAR_LABEL[activeYear]}</h3>
              <ol className="space-y-3">
                {topics.map((topic, index) => {
                  return (
                    <li key={`${activeYear}-${index}`} className="rounded-lg border border-border bg-card px-4 py-4 shadow-soft">
                      <h4 className="font-semibold text-foreground">{topic.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{topic.text}</p>
                      {topic.lesson && <Link to="/aula/$slug/$year/$topic" params={{ slug, year: activeYear, topic: topic.title }} className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">Abrir aula e atividades →</Link>}
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>

          <section aria-labelledby="study-pages-heading">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 id="study-pages-heading" className="text-xl font-bold text-foreground">📚 Abas de estudo</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Explore cada parte da matéria com uma imagem temática, explicação, tópicos principais e aplicação em provas.
                </p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Aba {studyPage + 1} de {subject.studyPages.length}</span>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-4" role="tablist" aria-label={`Abas de estudo de ${subject.name}`}>
              {subject.studyPages.map((page, i) => (
                <button
                  key={page.title}
                  role="tab"
                  aria-selected={i === studyPage}
                  onClick={() => setStudyPage(i)}
                  className={`group overflow-hidden rounded-xl border text-left transition-all ${i === studyPage ? "border-primary bg-primary/10 shadow-soft ring-2 ring-primary/20" : "border-border bg-card hover:border-primary/50"}`}
                >
                  <img
                    src={studyImages[i % studyImages.length]}
                    alt={`Imagem ilustrativa sobre ${page.title}`}
                    className="h-24 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="p-3">
                    <span className="text-xs font-semibold text-primary">Página {i + 1}</span>
                    <p className="mt-1 line-clamp-2 text-sm font-semibold text-foreground">{page.title}</p>
                  </div>
                </button>
              ))}
            </div>

            <Card className="mt-4 overflow-hidden">
              <img
                src={studyImages[studyPage % studyImages.length]}
                alt={`Imagem ilustrativa sobre ${subject.studyPages[studyPage]?.title ?? subject.name}`}
                className="h-52 w-full object-cover sm:h-64"
              />
              <div className="p-5 sm:p-6">
                <div className="h-1.5 overflow-hidden rounded-full bg-primary/15">
                  <div className="h-full bg-primary transition-all duration-300" style={{ width: `${((studyPage + 1) / subject.studyPages.length) * 100}%` }} />
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground">{subject.studyPages[studyPage]?.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{subject.studyPages[studyPage]?.text}</p>

                <div className="mt-5 grid gap-2 sm:grid-cols-3">
                  {subject.studyPages[studyPage]?.topics.map((item) => (
                    <div key={item} className="rounded-lg bg-secondary px-3 py-3 text-sm font-medium text-foreground">• {item}</div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <p className="text-sm font-semibold text-foreground">🎯 Como estudar esta parte</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Leia a explicação, revise os tópicos e tente explicar o conteúdo sem consultar a página. Depois, pratique questões relacionadas a este assunto.
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <Button variant="outline" disabled={studyPage === 0} onClick={() => setStudyPage((p) => Math.max(0, p - 1))}>← Anterior</Button>
                  <div className="hidden text-xs font-medium text-muted-foreground sm:block">Aba {studyPage + 1} de {subject.studyPages.length}</div>
                  <Button disabled={studyPage === subject.studyPages.length - 1} onClick={() => setStudyPage((p) => Math.min(subject.studyPages.length - 1, p + 1))}>Próxima →</Button>
                </div>
              </div>
            </Card>
          </section>

          {deepStudy && (
            <section aria-labelledby="deep-study-heading">
              <div>
                <h2 id="deep-study-heading" className="text-xl font-bold text-foreground">🔎 Aprofunde seus estudos</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Uma página especial para entender melhor {subject.name}, com explicação aprofundada, imagem ilustrativa e pontos essenciais.
                </p>
              </div>
              <Card className="mt-4 overflow-hidden p-0">
                <div className="grid lg:grid-cols-2">
                  <div className="order-2 p-6 sm:p-8 lg:order-1">
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">GUIA COMPLETO</span>
                    <h3 className="mt-4 text-2xl font-bold leading-tight text-foreground">{deepStudy.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{deepStudy.text}</p>
                    <div className="mt-6 space-y-3">
                      {deepStudy.highlights.map((item) => (
                        <div key={item} className="flex items-start gap-3 rounded-lg bg-secondary px-4 py-3">
                          <span className="mt-0.5 text-primary">✓</span>
                          <span className="text-sm font-medium text-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
                      <p className="text-sm font-semibold text-foreground">🎓 Para ENEM e vestibulares</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        Use esta explicação como revisão, depois pratique questões e tente relacionar o conteúdo a situações, textos, gráficos ou problemas.
                      </p>
                    </div>
                  </div>
                  <div className="order-1 min-h-[300px] lg:order-2 lg:min-h-full">
                    <img
                      src={deepStudy.image}
                      alt={deepStudy.imageAlt}
                      className="h-full min-h-[300px] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </Card>
            </section>
          )}

          <section aria-labelledby="exam-prep-heading">
            <div>
              <h2 id="exam-prep-heading" className="text-xl font-bold text-foreground">🎓 ENEM e Vestibulares</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Conteúdo complementar para transformar o que você já estuda em preparação para provas. Nada das matérias, páginas, resumos, exemplos, exercícios ou quizzes anteriores foi removido.
              </p>
            </div>
            <div className="mt-4 space-y-4">
              {examPrep.map((section) => (
                <Card key={section.title}>
                  <h3 className="font-semibold text-foreground">{section.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{section.explanation}</p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {section.topics.map((topic) => (
                      <div key={topic} className="rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-foreground">• {topic}</div>
                    ))}
                  </div>
                  <p className="mt-4 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm leading-6 text-foreground">
                    <span className="font-semibold text-primary">Como praticar:</span> {section.practice}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          <section aria-labelledby="help-heading">
            <h2 id="help-heading" className="text-xl font-bold text-foreground">📘 Como esta matéria pode ajudar você</h2>
            <p className="mt-2 text-sm text-muted-foreground">Uma página extensa com explicações para entender o que é a matéria, o que você aprende nela e como usar o conteúdo nos estudos.</p>
            <Card className="mt-4">
              <div className="space-y-3">
                {helpLines.map((line, index) => (
                  <p key={index} className="text-sm leading-7 text-muted-foreground">
                    <span className="mr-2 font-semibold text-primary">{index + 1}.</span>{line}
                  </p>
                ))}
              </div>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">Resumos e explicações complementares</h2>
            <p className="mt-2 text-sm text-muted-foreground">Materiais gerais da disciplina, não específicos do ano selecionado.</p>
            <div className="mt-4 space-y-4">
              {subject.summaries.map((s) => (
                <Card key={s.title}>
                  <h3 className="font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </Card>
              ))}
            </div>
          </section>

          {subject.formulas && (
            <section>
              <h2 className="text-xl font-bold text-foreground">Fórmulas importantes</h2>
              <Card className="mt-4">
                <ul className="space-y-2 text-sm text-foreground">
                  {subject.formulas.map((f) => (
                    <li key={f} className="rounded-lg bg-secondary px-3 py-2 font-medium">
                      {f}
                    </li>
                  ))}
                </ul>
              </Card>
            </section>
          )}

          <section>
            <h2 className="text-xl font-bold text-foreground">Exemplos</h2>
            <Card className="mt-4">
              <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                {subject.examples.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">Exercícios</h2>
            <div className="mt-4 space-y-3">
              {subject.exercises.map((ex, i) => (
                <Card key={ex.q} className="p-4">
                  <p className="text-sm font-medium text-foreground">{ex.q}</p>
                  <Button variant="link"
                    onClick={() => setOpen(open === i ? null : i)}
                    className="mt-2 h-auto p-0 text-xs"
                  >
                    {open === i ? "Ocultar resposta" : "Ver resposta"}
                  </Button>
                  {open === i && (
                    <p className="mt-2 rounded-lg bg-secondary px-3 py-2 text-sm text-foreground">
                      {ex.a}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">Quiz de {subject.name}</h2>
            <Card className="mt-4">
              {finished ? (
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">
                    Você acertou {score} de {subject.questions.length} questões.
                  </p>
                  <Button
                    onClick={() => {
                      setQIndex(0);
                      setChosen(null);
                      setScore(0);
                    }}
                    className="mt-4"
                  >
                    Tentar novamente
                  </Button>
                </div>
              ) : q ? (
                <>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">
                    Questão {qIndex + 1} de {subject.questions.length}
                  </p>
                  <p className="mt-2 font-medium text-foreground">{q.q}</p>
                  <div className="mt-4 space-y-2">
                    {q.options.map((o, i) => {
                      const state =
                        chosen === null
                          ? "border-border hover:border-primary"
                          : i === q.answer
                            ? "border-success bg-success/10"
                            : i === chosen
                              ? "border-destructive bg-destructive/10"
                              : "border-border opacity-60";
                      return (
                        <Button
                          key={o}
                          variant="outline"
                          onClick={() => pick(i)}
                          className={`h-auto min-h-11 w-full justify-start whitespace-normal px-4 py-3 text-left text-sm ${state}`}
                        >
                          {o}
                        </Button>
                      );
                    })}
                  </div>
                  {chosen !== null && q.explanation && (
                    <div className={chosen === q.answer ? "quiz-feedback-correct mt-4 rounded-xl border border-success/30 bg-success/10 p-4" : "quiz-feedback-wrong mt-4 rounded-xl border border-destructive/30 bg-destructive/10 p-4"}>
                      <p className="font-semibold text-foreground">{chosen === q.answer ? "✓ Resposta correta!" : "✕ Vamos entender o erro"}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{q.explanation}</p>
                    </div>
                  )}
                  {chosen !== null && (
                    <Button
                      onClick={() => {
                        setQIndex((i) => i + 1);
                        setChosen(null);
                      }}
                      className="mt-4"
                    >
                      Próxima
                    </Button>
                  )}
                </>
              ) : null}
            </Card>
          </section>
        </div>

        <aside className="space-y-6">
          <Card>
            <h3 className="font-semibold text-foreground">Estudar mais</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Faça um quiz completo escolhendo o nível de dificuldade.
            </p>
            <Link
              to="/quiz"
              className="mt-4 inline-block rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Ir para o Quiz
            </Link>
          </Card>
          <AdSlot label="Publicidade" />
        </aside>
      </div>
    </SiteLayout>
  );
}
