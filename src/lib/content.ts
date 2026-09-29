/** Conteúdo didático e banco de questões do Sabe Mais. */

export type Question = {
  q: string;
  options: string[];
  answer: number; // índice da alternativa correta
  level: "facil" | "medio" | "dificil";
  explanation?: string;
};

export type Subject = {
  slug: string;
  name: string;
  emoji: string;
  color: string; // classe de fundo do ícone
  intro: string;
  summaries: { title: string; text: string }[];
  formulas?: string[];
  examples: string[];
  exercises: { q: string; a: string }[];
  questions: Question[];
};

export const subjects: Subject[] = [
  {
    slug: "matematica",
    name: "Matemática",
    emoji: "🧮",
    color: "bg-sky-100",
    intro: "Números, operações, álgebra e geometria explicados passo a passo.",
    summaries: [
      {
        title: "Frações",
        text: "Uma fração representa parte de um todo. Para somar frações com denominadores diferentes, encontre o mínimo múltiplo comum e converta cada fração antes de somar os numeradores.",
      },
      {
        title: "Equação do 1º grau",
        text: "Uma equação do 1º grau tem a forma ax + b = 0. Isole o x fazendo a mesma operação nos dois lados da igualdade.",
      },
      {
        title: "Porcentagem",
        text: "Porcentagem é uma fração de denominador 100. 20% de 50 é o mesmo que 0,20 × 50 = 10.",
      },
    ],
    formulas: [
      "Área do retângulo: A = base × altura",
      "Área do triângulo: A = (base × altura) / 2",
      "Teorema de Pitágoras: a² = b² + c²",
      "Equação do 2º grau: x = (-b ± √(b² - 4ac)) / 2a",
    ],
    examples: [
      "Resolver 2x + 6 = 14 → 2x = 8 → x = 4",
      "Calcular 15% de 200 → 0,15 × 200 = 30",
    ],
    exercises: [
      { q: "Resolva: 3x - 9 = 0", a: "x = 3" },
      { q: "Qual é a área de um triângulo de base 10 e altura 6?", a: "30" },
      { q: "Quanto é 25% de 80?", a: "20" },
    ],
    questions: [
      { q: "Quanto é 7 × 8?", options: ["54", "56", "58", "62"], answer: 1, level: "facil" },
      { q: "Quanto é 10% de 250?", options: ["2,5", "25", "125", "50"], answer: 1, level: "facil" },
      { q: "Resolva 2x + 6 = 14", options: ["x = 2", "x = 4", "x = 6", "x = 8"], answer: 1, level: "medio" },
      { q: "Área de um retângulo 7 × 3:", options: ["10", "20", "21", "24"], answer: 2, level: "medio" },
      {
        q: "As raízes de x² - 5x + 6 = 0 são:",
        options: ["1 e 6", "2 e 3", "-2 e -3", "0 e 5"],
        answer: 1,
        level: "dificil",
      },
      {
        q: "Num triângulo retângulo de catetos 6 e 8, a hipotenusa é:",
        options: ["9", "10", "12", "14"],
        answer: 1,
        level: "dificil",
      },
      { q: "Quanto é 3/4 de 20?", options: ["12", "15", "16", "18"], answer: 1, level: "facil" },
      { q: "Qual é a média de 6, 8 e 10?", options: ["7", "8", "9", "10"], answer: 1, level: "medio" },
      { q: "Qual é a circunferência de um círculo de raio 5, usando π ≈ 3,14?", options: ["15,7", "25", "31,4", "78,5"], answer: 2, level: "dificil" },
      { q: "Resolva o sistema x + y = 10 e x - y = 2.", options: ["x = 4, y = 6", "x = 5, y = 5", "x = 6, y = 4", "x = 8, y = 2"], answer: 2, level: "dificil" },
    ],
  },
  {
    slug: "portugues",
    name: "Português",
    emoji: "📖",
    color: "bg-rose-100",
    intro: "Gramática, interpretação de texto e produção escrita sem complicação.",
    summaries: [
      {
        title: "Classes de palavras",
        text: "Substantivo nomeia, adjetivo caracteriza, verbo indica ação ou estado e advérbio modifica o verbo.",
      },
      {
        title: "Crase",
        text: "A crase é a fusão da preposição 'a' com o artigo 'a'. Usa-se antes de palavras femininas: 'Vou à escola'.",
      },
      {
        title: "Concordância verbal",
        text: "O verbo concorda em número e pessoa com o sujeito: 'Os alunos estudam'.",
      },
    ],
    examples: ["Sujeito simples: 'A professora explicou a matéria.'", "Uso de crase: 'Cheguei à cidade.'"],
    exercises: [
      { q: "Classifique: 'rápido' em 'Ele corre rápido'.", a: "Advérbio de modo" },
      { q: "Corrija: 'Nós vai ao museu'.", a: "Nós vamos ao museu" },
    ],
    questions: [
      {
        q: "Qual palavra é um substantivo?",
        options: ["Correr", "Beleza", "Rapidamente", "Azul"],
        answer: 1,
        level: "facil",
      },
      {
        q: "Plural de 'cidadão':",
        options: ["Cidadões", "Cidadãos", "Cidadães", "Cidadãs"],
        answer: 1,
        level: "facil",
      },
      {
        q: "Em 'Vou à praia', a crase ocorre porque há:",
        options: ["Dois artigos", "Preposição + artigo", "Verbo + artigo", "Pronome"],
        answer: 1,
        level: "medio",
      },
      {
        q: "A oração 'Estudo para passar' expressa ideia de:",
        options: ["Causa", "Finalidade", "Tempo", "Condição"],
        answer: 1,
        level: "dificil",
      },
      { q: "Qual palavra é um verbo?", options: ["Casa", "Bonito", "Estudar", "Rapidamente"], answer: 2, level: "facil" },
      { q: "Em 'Os alunos estudam', o verbo concorda com:", options: ["O objeto", "O sujeito", "O adjetivo", "O advérbio"], answer: 1, level: "medio" },
      { q: "Na frase 'Ela falou calmamente', 'calmamente' é:", options: ["Substantivo", "Adjetivo", "Advérbio", "Pronome"], answer: 2, level: "medio" },
      { q: "Em 'O livro que comprei é interessante', 'que' é:", options: ["Artigo", "Pronome relativo", "Preposição", "Advérbio"], answer: 1, level: "dificil" },
      { q: "Qual frase apresenta concordância correta?", options: ["Nós vai à escola.", "Nós vamos à escola.", "Nós vão à escola.", "Nós ir à escola."], answer: 1, level: "dificil" },
      { q: "Qual alternativa apresenta uma oração subordinada adjetiva?", options: ["Estudei porque precisava.", "O aluno que estudou passou.", "Quando cheguei, ele saiu.", "Estude para aprender."], answer: 1, level: "dificil" },
    ],
  },
  {
    slug: "historia",
    name: "História",
    emoji: "🏛️",
    color: "bg-amber-100",
    intro: "Do Brasil colônia ao mundo contemporâneo, com linha do tempo clara.",
    summaries: [
      {
        title: "Brasil Colônia",
        text: "Período de 1500 a 1822, marcado pela exploração do pau-brasil, engenhos de açúcar e mineração em Minas Gerais.",
      },
      {
        title: "Independência",
        text: "Em 7 de setembro de 1822, D. Pedro I proclamou a independência do Brasil em relação a Portugal.",
      },
      {
        title: "Era Vargas",
        text: "Getúlio Vargas governou de 1930 a 1945 e depois de 1951 a 1954, com forte intervenção do Estado na economia.",
      },
    ],
    examples: ["1888: Lei Áurea abole a escravidão.", "1889: Proclamação da República."],
    exercises: [{ q: "Em que ano o Brasil se tornou independente?", a: "1822" }],
    questions: [
      { q: "Em que ano o Brasil foi 'descoberto'?", options: ["1492", "1500", "1530", "1549"], answer: 1, level: "facil" },
      { q: "Quem proclamou a independência?", options: ["D. João VI", "D. Pedro I", "D. Pedro II", "Tiradentes"], answer: 1, level: "facil" },
      { q: "A Lei Áurea foi assinada em:", options: ["1871", "1885", "1888", "1891"], answer: 2, level: "medio" },
      { q: "O Estado Novo começou em:", options: ["1930", "1937", "1945", "1964"], answer: 1, level: "dificil" },
      { q: "A Proclamação da República no Brasil ocorreu em:", options: ["1822", "1888", "1889", "1930"], answer: 2, level: "facil" },
      { q: "A Revolução Industrial começou primeiro em:", options: ["França", "Inglaterra", "Brasil", "Espanha"], answer: 1, level: "medio" },
      { q: "A Primeira Guerra Mundial ocorreu principalmente entre:", options: ["1914–1918", "1929–1933", "1939–1945", "1945–1950"], answer: 0, level: "medio" },
      { q: "A Segunda Guerra Mundial terminou em:", options: ["1939", "1942", "1945", "1950"], answer: 2, level: "medio" },
      { q: "A Guerra Fria foi marcada principalmente pela rivalidade entre:", options: ["Brasil e Argentina", "EUA e URSS", "França e Alemanha", "China e Japão"], answer: 1, level: "dificil" },
      { q: "A Constituição brasileira atualmente em vigor foi promulgada em:", options: ["1967", "1985", "1988", "1992"], answer: 2, level: "dificil" },
    ],
  },
  {
    slug: "geografia",
    name: "Geografia",
    emoji: "🌎",
    color: "bg-emerald-100",
    intro: "Relevo, clima, população e o espaço brasileiro e mundial.",
    summaries: [
      { title: "Regiões do Brasil", text: "O Brasil tem 5 regiões: Norte, Nordeste, Centro-Oeste, Sudeste e Sul." },
      { title: "Climas", text: "Predominam no Brasil os climas equatorial, tropical, semiárido e subtropical." },
    ],
    examples: ["Bioma Amazônia: maior floresta tropical do mundo."],
    exercises: [{ q: "Qual a capital do Brasil?", a: "Brasília" }],
    questions: [
      { q: "Quantas regiões tem o Brasil?", options: ["3", "4", "5", "6"], answer: 2, level: "facil" },
      { q: "Maior bioma brasileiro:", options: ["Cerrado", "Amazônia", "Caatinga", "Pampa"], answer: 1, level: "facil" },
      { q: "O clima semiárido predomina em qual região?", options: ["Sul", "Nordeste", "Norte", "Sudeste"], answer: 1, level: "medio" },
      { q: "Rio de maior vazão do mundo:", options: ["Nilo", "Amazonas", "Paraná", "Mississipi"], answer: 1, level: "dificil" },
      { q: "Qual é a capital do Brasil?", options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"], answer: 2, level: "facil" },
      { q: "Qual é o maior estado brasileiro em área?", options: ["Pará", "Amazonas", "Mato Grosso", "Minas Gerais"], answer: 1, level: "medio" },
      { q: "Qual linha imaginária divide a Terra em hemisférios Norte e Sul?", options: ["Trópico de Câncer", "Linha do Equador", "Meridiano de Greenwich", "Trópico de Capricórnio"], answer: 1, level: "medio" },
      { q: "O Meridiano de Greenwich é usado como referência para:", options: ["Latitude", "Longitude", "Altitude", "Temperatura"], answer: 1, level: "dificil" },
      { q: "Qual região brasileira possui maior concentração populacional?", options: ["Norte", "Nordeste", "Sudeste", "Centro-Oeste"], answer: 2, level: "dificil" },
      { q: "A latitude é medida em relação a:", options: ["Linha do Equador", "Meridiano de Greenwich", "Polo Norte apenas", "Trópico de Capricórnio apenas"], answer: 0, level: "dificil" },
    ],
  },
  {
    slug: "ciencias",
    name: "Ciências",
    emoji: "🔬",
    color: "bg-lime-100",
    intro: "Corpo humano, ecologia e os fenômenos da natureza.",
    summaries: [
      { title: "Célula", text: "A célula é a menor unidade viva. Células animais não têm parede celular nem cloroplastos." },
      { title: "Fotossíntese", text: "As plantas usam luz, gás carbônico e água para produzir glicose e liberar oxigênio." },
    ],
    examples: ["Cadeia alimentar: produtor → consumidor primário → consumidor secundário."],
    exercises: [{ q: "Qual organela produz energia na célula?", a: "Mitocôndria" }],
    questions: [
      { q: "Organela responsável pela respiração celular:", options: ["Núcleo", "Mitocôndria", "Ribossomo", "Vacúolo"], answer: 1, level: "facil" },
      { q: "A fotossíntese libera:", options: ["Gás carbônico", "Oxigênio", "Nitrogênio", "Hidrogênio"], answer: 1, level: "facil" },
      { q: "O sangue é bombeado pelo:", options: ["Pulmão", "Coração", "Fígado", "Rim"], answer: 1, level: "medio" },
      { q: "Seres que produzem o próprio alimento são:", options: ["Heterótrofos", "Autótrofos", "Decompositores", "Parasitas"], answer: 1, level: "dificil" },
      { q: "Seres que produzem seu próprio alimento são chamados de:", options: ["Heterótrofos", "Autótrofos", "Decompositores", "Parasitas"], answer: 1, level: "facil" },
      { q: "Qual sistema é responsável principalmente pelas trocas gasosas?", options: ["Digestório", "Respiratório", "Nervoso", "Esquelético"], answer: 1, level: "medio" },
      { q: "Qual é a unidade básica da vida?", options: ["Tecido", "Célula", "Órgão", "Molécula"], answer: 1, level: "medio" },
      { q: "Na cadeia alimentar, os produtores são geralmente:", options: ["Plantas e algas", "Carnívoros", "Fungos", "Animais herbívoros"], answer: 0, level: "medio" },
      { q: "O DNA está relacionado principalmente ao armazenamento de:", options: ["Energia", "Informação genética", "Oxigênio", "Água"], answer: 1, level: "dificil" },
      { q: "Qual órgão é responsável principalmente pela filtragem do sangue e formação da urina?", options: ["Coração", "Rim", "Pulmão", "Estômago"], answer: 1, level: "dificil" },
    ],
  },
  {
    slug: "ingles",
    name: "Inglês",
    emoji: "🇬🇧",
    color: "bg-indigo-100",
    intro: "Vocabulário, verbos e estruturas básicas da língua inglesa.",
    summaries: [
      { title: "Verb to be", text: "I am, you are, he/she/it is, we are, they are." },
      { title: "Simple Present", text: "Usado para hábitos e fatos. Na 3ª pessoa do singular acrescenta-se -s ao verbo." },
    ],
    examples: ["She studies every day.", "They are students."],
    exercises: [{ q: "Complete: He ___ (to be) my friend.", a: "is" }],
    questions: [
      { q: "Complete: She ___ a student.", options: ["am", "is", "are", "be"], answer: 1, level: "facil" },
      { q: "'Book' significa:", options: ["Caderno", "Livro", "Mochila", "Caneta"], answer: 1, level: "facil" },
      { q: "Past of 'go':", options: ["Goed", "Went", "Gone", "Going"], answer: 1, level: "medio" },
      { q: "Escolha a frase correta:", options: ["He don't like it", "He doesn't likes it", "He doesn't like it", "He not like it"], answer: 2, level: "dificil" },
      { q: "Qual é o plural de 'child'?", options: ["Childs", "Children", "Childes", "Childrens"], answer: 1, level: "facil" },
      { q: "Complete: They ___ playing soccer.", options: ["is", "am", "are", "be"], answer: 2, level: "medio" },
      { q: "What does 'beautiful' mean?", options: ["Rápido", "Bonito/belo", "Pequeno", "Forte"], answer: 1, level: "medio" },
      { q: "Complete: If I ___ time, I will study.", options: ["have", "has", "had", "having"], answer: 0, level: "dificil" },
      { q: "Qual frase está no Simple Past?", options: ["I play soccer.", "I am playing soccer.", "I played soccer.", "I will play soccer."], answer: 2, level: "dificil" },
      { q: "Em 'She has lived here for two years', o tempo verbal é:", options: ["Simple Present", "Present Perfect", "Simple Past", "Future"], answer: 1, level: "dificil" },
    ],
  },
  {
    slug: "fisica",
    name: "Física",
    emoji: "⚛️",
    color: "bg-cyan-100",
    intro: "Movimento, forças e energia com fórmulas aplicadas.",
    summaries: [
      { title: "MRU", text: "No movimento retilíneo uniforme a velocidade é constante e a posição varia linearmente com o tempo." },
      { title: "Leis de Newton", text: "Inércia, princípio fundamental (F = m·a) e ação e reação." },
    ],
    formulas: ["v = Δs / Δt", "F = m · a", "Ec = m·v² / 2", "Ep = m·g·h"],
    examples: ["Um carro percorre 100 m em 5 s → v = 20 m/s"],
    exercises: [{ q: "Massa 2 kg e aceleração 3 m/s². Qual a força?", a: "6 N" }],
    questions: [
      { q: "Unidade de força no SI:", options: ["Joule", "Newton", "Watt", "Pascal"], answer: 1, level: "facil" },
      { q: "Fórmula da velocidade média:", options: ["v = m·a", "v = Δs/Δt", "v = F/m", "v = m·g"], answer: 1, level: "facil" },
      { q: "Força resultante com m = 4 kg e a = 5 m/s²:", options: ["9 N", "20 N", "0,8 N", "45 N"], answer: 1, level: "medio" },
      { q: "Energia cinética de 2 kg a 3 m/s:", options: ["6 J", "9 J", "12 J", "18 J"], answer: 1, level: "dificil" },
      { q: "Qual grandeza é medida em quilogramas?", options: ["Força", "Massa", "Velocidade", "Energia"], answer: 1, level: "facil" },
      { q: "Uma força de 20 N atua sobre uma massa de 4 kg. A aceleração é:", options: ["4 m/s²", "5 m/s²", "16 m/s²", "80 m/s²"], answer: 1, level: "medio" },
      { q: "Um carro percorre 100 m em 5 s. Sua velocidade média é:", options: ["5 m/s", "20 m/s", "50 m/s", "105 m/s"], answer: 1, level: "medio" },
      { q: "Qual unidade mede energia no SI?", options: ["Newton", "Joule", "Watt", "Metro"], answer: 1, level: "medio" },
      { q: "A energia cinética depende principalmente da:", options: ["Massa e velocidade", "Altura apenas", "Temperatura apenas", "Cor do objeto"], answer: 0, level: "dificil" },
      { q: "Se um objeto está em movimento retilíneo uniforme, sua velocidade:", options: ["É constante", "Sempre aumenta", "Sempre diminui", "É necessariamente zero"], answer: 0, level: "dificil" },
    ],
  },
  {
    slug: "quimica",
    name: "Química",
    emoji: "⚗️",
    color: "bg-violet-100",
    intro: "Átomos, tabela periódica e reações químicas.",
    summaries: [
      { title: "Átomo", text: "Formado por prótons e nêutrons no núcleo e elétrons na eletrosfera." },
      { title: "Tabela periódica", text: "Os elementos estão organizados por número atômico crescente em períodos e famílias." },
    ],
    formulas: ["Massa molar: M = m / n", "Concentração: C = m / V"],
    examples: ["H₂O: dois átomos de hidrogênio e um de oxigênio."],
    exercises: [{ q: "Qual o símbolo do sódio?", a: "Na" }],
    questions: [
      { q: "Símbolo químico da água:", options: ["CO₂", "H₂O", "O₂", "NaCl"], answer: 1, level: "facil" },
      { q: "Partícula de carga negativa:", options: ["Próton", "Elétron", "Nêutron", "Íon"], answer: 1, level: "facil" },
      { q: "NaCl é conhecido como:", options: ["Açúcar", "Sal de cozinha", "Cal", "Bicarbonato"], answer: 1, level: "medio" },
      { q: "Número atômico representa a quantidade de:", options: ["Nêutrons", "Prótons", "Elétrons livres", "Massa"], answer: 1, level: "dificil" },
      { q: "Qual é o símbolo químico do sódio?", options: ["S", "So", "Na", "Sd"], answer: 2, level: "facil" },
      { q: "Qual gás é representado por O₂?", options: ["Oxigênio", "Hidrogênio", "Nitrogênio", "Gás carbônico"], answer: 0, level: "medio" },
      { q: "Quando um átomo perde elétrons, ele se torna um:", options: ["Ânion", "Cátion", "Nêutron", "Isótopo"], answer: 1, level: "medio" },
      { q: "Uma substância com pH menor que 7 é geralmente:", options: ["Ácida", "Básica", "Neutra", "Metálica"], answer: 0, level: "medio" },
      { q: "Qual elemento possui símbolo Fe?", options: ["Flúor", "Ferro", "Fósforo", "Frâncio"], answer: 1, level: "dificil" },
      { q: "Na tabela periódica, elementos da mesma família tendem a apresentar:", options: ["Propriedades químicas semelhantes", "A mesma massa", "O mesmo número atômico", "A mesma quantidade de nêutrons"], answer: 0, level: "dificil" },
    ],
  },
];

export function getSubject(slug: string) {
  return subjects.find((s) => s.slug === slug);
}

export type Challenge = {
  id: string;
  title: string;
  category: string;
  question: string;
  options: string[];
  answer: number;
};

export const challenges: Challenge[] = [
  {
    id: "mat-1",
    title: "Desafio de Matemática",
    category: "Matemática",
    question: "Se 3 cadernos custam R$ 24, quanto custam 7 cadernos?",
    options: ["R$ 48", "R$ 56", "R$ 64", "R$ 72"],
    answer: 1,
  },
  {
    id: "port-1",
    title: "Desafio de Português",
    category: "Português",
    question: "Qual frase está corretamente escrita?",
    options: ["Fazem dois anos que estudo", "Faz dois anos que estudo", "Fazem dois ano que estudo", "Faz dois anos que estudam eu"],
    answer: 1,
  },
  {
    id: "logica-1",
    title: "Desafio de Lógica",
    category: "Lógica",
    question: "Complete a sequência: 2, 4, 8, 16, ...",
    options: ["18", "24", "32", "64"],
    answer: 2,
  },
  {
    id: "geral-1",
    title: "Desafio de Conhecimentos Gerais",
    category: "Conhecimentos Gerais",
    question: "Qual é o oceano que banha o litoral brasileiro?",
    options: ["Pacífico", "Índico", "Atlântico", "Ártico"],
    answer: 2,
  },
  {
    id: "logica-2",
    title: "Desafio de Lógica",
    category: "Lógica",
    question: "Se todo A é B e todo B é C, então:",
    options: ["Todo C é A", "Todo A é C", "Nenhum A é C", "Nada se conclui"],
    answer: 1,
  },
];

/** Desafio do dia: muda a cada dia do ano. */
export function dailyChallenge(): Challenge {
  const day = Math.floor(Date.now() / 86400000);
  return challenges[day % challenges.length]!;
}
