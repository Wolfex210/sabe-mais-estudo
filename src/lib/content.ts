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
  studyPages: { title: string; text: string; topics: string[] }[];
  questions: Question[];
};

export const subjects: Subject[] = [
  {
    slug: "matematica",
    name: "Matemática",
    emoji: "🧮",
    color: "bg-sky-100",
    intro: "Números, operações, álgebra e geometria explicados passo a passo.",
    studyPages: [
      { title: "Números e operações", text: "Aprenda números, operações, frações, decimais e porcentagens.", topics: ["Operações fundamentais", "Frações e decimais", "Razão e porcentagem"] },
      { title: "Álgebra", text: "Use letras para representar valores e aprenda a simplificar expressões e resolver equações.", topics: ["Expressões algébricas", "Equações do 1º grau", "Equações do 2º grau"] },
      { title: "Geometria", text: "Estude formas, medidas, áreas, perímetros e o Teorema de Pitágoras.", topics: ["Ângulos e figuras", "Áreas e perímetros", "Teorema de Pitágoras"] },
      { title: "Estatística e problemas", text: "Aprenda a interpretar médias, tabelas, gráficos e enunciados matemáticos.", topics: ["Média aritmética", "Tabelas e gráficos", "Estratégias de resolução"] }
    ],
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
    studyPages: [
      { title: "Classes de palavras", text: "As palavras exercem funções diferentes nas frases, como nomear, caracterizar ou indicar ações.", topics: ["Substantivos", "Adjetivos e advérbios", "Verbos"] },
      { title: "Sintaxe", text: "Entenda como as palavras se organizam nas orações e identifique seus principais termos.", topics: ["Sujeito e predicado", "Complementos", "Concordância"] },
      { title: "Pontuação e crase", text: "A pontuação organiza as ideias e a crase ocorre pela união de preposição e artigo em situações específicas.", topics: ["Pontuação", "Crase", "Regência"] },
      { title: "Interpretação e textos", text: "Aprenda a localizar informações, fazer inferências e reconhecer diferentes gêneros textuais.", topics: ["Ideia principal", "Inferência", "Gêneros textuais"] }
    ],
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
    studyPages: [
      { title: "Brasil Colônia", text: "Estude a formação da sociedade colonial, a produção açucareira, a mineração e as relações de trabalho.", topics: ["Chegada portuguesa", "Açúcar e mineração", "Sociedade colonial"] },
      { title: "Independência e Império", text: "Entenda a independência de 1822 e as principais características dos períodos imperiais.", topics: ["Independência", "Primeiro Reinado", "Segundo Reinado"] },
      { title: "República brasileira", text: "Conheça a Proclamação da República, a Era Vargas, o período militar e a redemocratização.", topics: ["Primeira República", "Era Vargas", "Redemocratização"] },
      { title: "Mundo contemporâneo", text: "Veja acontecimentos que transformaram o século XX, como guerras mundiais e a Guerra Fria.", topics: ["Primeira Guerra Mundial", "Segunda Guerra Mundial", "Guerra Fria"] }
    ],
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
    studyPages: [
      { title: "Espaço geográfico", text: "A Geografia analisa as relações entre sociedade e natureza e as transformações do espaço.", topics: ["Paisagem e território", "Lugar e região", "Sociedade e natureza"] },
      { title: "Brasil: território e regiões", text: "Conheça as cinco regiões brasileiras e suas características naturais, populacionais e econômicas.", topics: ["Norte e Nordeste", "Centro-Oeste e Sudeste", "Sul"] },
      { title: "Clima e relevo", text: "Estude fatores climáticos e as diferentes formas da superfície terrestre.", topics: ["Climas", "Relevo", "Vegetação e biomas"] },
      { title: "População e economia", text: "Aprenda sobre distribuição da população, urbanização, migrações e atividades econômicas.", topics: ["População", "Urbanização", "Setores da economia"] }
    ],
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
    studyPages: [
      { title: "Células", text: "A célula é a unidade básica dos seres vivos. Conheça suas estruturas e diferenças gerais.", topics: ["Núcleo", "Mitocôndrias", "Células animais e vegetais"] },
      { title: "Corpo humano", text: "Estude como os principais sistemas do organismo trabalham em conjunto.", topics: ["Respiração", "Circulação", "Digestão e excreção"] },
      { title: "Ecologia", text: "Ecologia estuda as relações entre seres vivos e ambiente.", topics: ["Ecossistemas", "Cadeias alimentares", "Relações ecológicas"] },
      { title: "Matéria e energia", text: "Conheça propriedades da matéria, transformações e formas de energia.", topics: ["Estados físicos", "Transformações", "Energia"] }
    ],
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
    studyPages: [
      { title: "Vocabulary", text: "Amplie seu vocabulário com palavras usadas em situações do dia a dia.", topics: ["Saudações", "Família e escola", "Rotina"] },
      { title: "Verb to be e pronomes", text: "Aprenda as formas do verbo to be e os pronomes pessoais.", topics: ["I, you, he, she, it, we, they", "Am, is, are", "Frases negativas"] },
      { title: "Simple Present", text: "Use o Simple Present para hábitos, rotinas e fatos.", topics: ["Afirmativas", "Do e does", "Hábitos"] },
      { title: "Past e estruturas comuns", text: "Aprenda a falar sobre acontecimentos passados e reconhecer estruturas frequentes.", topics: ["Simple Past", "Verbos regulares e irregulares", "Perguntas e respostas"] }
    ],
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
    studyPages: [
      { title: "Movimento", text: "Estude posição, deslocamento, tempo e velocidade.", topics: ["Posição e deslocamento", "Velocidade média", "Movimento uniforme"] },
      { title: "Forças e Leis de Newton", text: "As Leis de Newton ajudam a explicar inércia, aceleração e ação e reação.", topics: ["Primeira Lei", "Segunda Lei: F = m·a", "Terceira Lei"] },
      { title: "Energia e trabalho", text: "Aprenda como energia aparece e se transforma em diferentes situações.", topics: ["Trabalho", "Energia cinética", "Energia potencial"] },
      { title: "Grandezas e unidades", text: "Conheça unidades padronizadas e aprenda a interpretar fórmulas físicas.", topics: ["Sistema Internacional", "Conversão de unidades", "Leitura de fórmulas"] }
    ],
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
    studyPages: [
      { title: "Átomos", text: "Estude prótons, nêutrons e elétrons e entenda o número atômico.", topics: ["Prótons e nêutrons", "Elétrons", "Número atômico"] },
      { title: "Tabela periódica", text: "A tabela organiza os elementos por número atômico e famílias.", topics: ["Períodos", "Famílias", "Metais e ametais"] },
      { title: "Substâncias e ligações", text: "Conheça moléculas, íons e noções de ligações químicas.", topics: ["Moléculas", "Íons", "Ligações"] },
      { title: "Reações e soluções", text: "Aprenda sobre transformações químicas, ácidos, bases e soluções.", topics: ["Reações químicas", "Ácidos e bases", "Soluções"] }
    ],
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
  {
    slug: "astronomia",
    name: "Astronomia",
    emoji: "🌌",
    color: "bg-slate-100",
    intro: "Estude o Universo, os astros e os fenômenos do espaço.",
    studyPages: [
      { title: "O Universo", text: "Conheça a origem, a organização e as principais estruturas do Universo.", topics: ["Galáxias", "Estrelas", "Sistema solar"] },
      { title: "Sistema Solar", text: "Aprenda sobre o Sol, os planetas e os pequenos corpos que orbitam nossa estrela.", topics: ["Sol e planetas", "Lua e satélites", "Asteroides e cometas"] },
      { title: "Estrelas", text: "Entenda como as estrelas nascem, evoluem e produzem energia.", topics: ["Nascimento estelar", "Fusão nuclear", "Evolução das estrelas"] },
      { title: "Movimentos e exploração", text: "Veja os movimentos aparentes dos astros e como estudamos o espaço.", topics: ["Rotação e translação", "Eclipses", "Exploração espacial"] }
    ],
    summaries: [],
    examples: ["Fases da Lua: a aparência da Lua muda conforme sua posição em relação à Terra e ao Sol.","Sistema Solar: a Terra é um dos planetas que orbitam o Sol.","Eclipse solar: acontece quando a Lua passa entre o Sol e a Terra.","Estrelas: o Sol é uma estrela que fornece luz e energia para a Terra."],
    exercises: [],
    questions: [],
  },
  {
    slug: "sociologia",
    name: "Sociologia",
    emoji: "👥",
    color: "bg-pink-100",
    intro: "Compreenda sociedade, cultura, grupos sociais e relações humanas.",
    studyPages: [
      { title: "Sociedade e cultura", text: "A Sociologia analisa como as pessoas vivem em sociedade e constroem formas de convivência.", topics: ["Cultura", "Normas sociais", "Valores"] },
      { title: "Socialização", text: "Entenda como aprendemos comportamentos e participamos de diferentes grupos.", topics: ["Família e escola", "Socialização", "Grupos sociais"] },
      { title: "Desigualdade social", text: "Estude diferenças de acesso a renda, educação, oportunidades e direitos.", topics: ["Estratificação", "Renda e oportunidades", "Mobilidade social"] },
      { title: "Cidadania e sociedade", text: "Conheça participação social, instituições e direitos na vida coletiva.", topics: ["Cidadania", "Instituições", "Participação social"] }
    ],
    summaries: [],
    examples: ["Família e escola são exemplos de espaços em que ocorre socialização.","Uma norma social é uma expectativa de comportamento compartilhada por um grupo.","A cultura inclui costumes, valores, conhecimentos, símbolos e práticas de uma sociedade.","A mobilidade social pode ocorrer quando uma pessoa ou grupo muda de posição na estrutura social."],
    exercises: [],
    questions: [],
  },
  {
    slug: "oratoria",
    name: "Oratória",
    emoji: "🎤",
    color: "bg-orange-100",
    intro: "Desenvolva comunicação clara, organização de ideias e apresentação em público.",
    studyPages: [
      { title: "Fundamentos da oratória", text: "Uma boa apresentação combina clareza, organização e adaptação ao público.", topics: ["Clareza", "Objetivo", "Público"] },
      { title: "Estrutura do discurso", text: "Organize uma fala com começo, desenvolvimento e encerramento.", topics: ["Introdução", "Desenvolvimento", "Conclusão"] },
      { title: "Voz e linguagem corporal", text: "Use voz, ritmo, postura e gestos para tornar a comunicação mais compreensível.", topics: ["Entonação", "Ritmo", "Postura"] },
      { title: "Apresentação e prática", text: "Pratique apresentações curtas e aprenda a lidar com perguntas.", topics: ["Ensaios", "Contato visual", "Perguntas"] }
    ],
    summaries: [],
    examples: ["Abertura: começar uma apresentação dizendo o tema e o objetivo ajuda o público a entender a proposta.","Argumentação: apresentar uma ideia, explicar o motivo e usar um exemplo torna a fala mais clara.","Linguagem corporal: postura equilibrada e gestos naturais podem acompanhar a mensagem.","Perguntas: repetir ou reformular uma pergunta antes de responder ajuda a organizar a resposta."],
    exercises: [],
    questions: [],
  },
  {
    slug: "filosofia",
    name: "Filosofia",
    emoji: "🏛️",
    color: "bg-stone-100",
    intro: "Explore perguntas sobre conhecimento, ética, política e existência.",
    studyPages: [
      { title: "O que é Filosofia", text: "A Filosofia busca analisar ideias e problemas por meio de perguntas, argumentos e reflexão.", topics: ["Perguntas filosóficas", "Argumentação", "Reflexão"] },
      { title: "Ética", text: "Estude questões sobre ações, valores, responsabilidade e convivência.", topics: ["Valores", "Responsabilidade", "Dilemas éticos"] },
      { title: "Conhecimento", text: "Investigue como podemos justificar aquilo que consideramos conhecimento.", topics: ["Razão", "Experiência", "Ceticismo"] },
      { title: "Política e sociedade", text: "Analise ideias sobre justiça, poder, leis e organização da sociedade.", topics: ["Justiça", "Poder", "Estado e sociedade"] }
    ],
    summaries: [],
    examples: ["Pergunta filosófica: 'O que torna uma ação justa?' pode ser analisada por diferentes argumentos.","Ética: avaliar consequências, princípios e responsabilidades é uma forma de analisar um dilema.","Conhecimento: comparar evidências e justificativas ajuda a avaliar uma afirmação.","Argumentação: uma conclusão deve estar relacionada às razões apresentadas."],
    exercises: [],
    questions: [],
  },
  {
    slug: "biologia",
    name: "Biologia",
    emoji: "🧬",
    color: "bg-green-100",
    intro: "Estude os seres vivos, suas estruturas, funcionamento e relações.",
    studyPages: [
      { title: "Vida e células", text: "Conheça características dos seres vivos e a célula como unidade básica da vida.", topics: ["Características da vida", "Células", "Organelas"] },
      { title: "Genética", text: "Entenda como características podem ser transmitidas entre gerações.", topics: ["DNA", "Genes", "Hereditariedade"] },
      { title: "Evolução", text: "Estude mudanças nas populações ao longo das gerações e seleção natural.", topics: ["Variação", "Seleção natural", "Adaptação"] },
      { title: "Diversidade da vida", text: "Conheça grupos de seres vivos e suas principais características.", topics: ["Classificação", "Reinos e grupos", "Biodiversidade"] }
    ],
    summaries: [],
    examples: ["Célula: plantas e animais são formados por células, embora existam diferenças entre seus tipos celulares.","Genética: genes são segmentos de DNA relacionados às características hereditárias.","Seleção natural: características que favorecem a sobrevivência e reprodução podem se tornar mais frequentes ao longo das gerações.","Biodiversidade: uma floresta reúne diferentes espécies e relações ecológicas."],
    exercises: [],
    questions: [],
  },
  {
    slug: "ensino-religioso",
    name: "Ensino Religioso",
    emoji: "🕊️",
    color: "bg-yellow-100",
    intro: "Estude diversidade religiosa, cultura, valores e respeito às diferentes crenças.",
    studyPages: [
      { title: "Diversidade religiosa", text: "Conheça a diversidade de tradições e formas de expressão religiosa no mundo.", topics: ["Tradições", "Símbolos", "Celebrações"] },
      { title: "Cultura e religião", text: "Observe como crenças e práticas podem se relacionar com culturas e comunidades.", topics: ["Cultura", "Ritos", "Patrimônio cultural"] },
      { title: "Valores e convivência", text: "Reflita sobre respeito, diálogo e convivência entre pessoas com diferentes visões.", topics: ["Respeito", "Diálogo", "Diversidade"] },
      { title: "Laicidade e liberdade", text: "Entenda liberdade de crença e a importância do respeito às diferentes convicções.", topics: ["Liberdade religiosa", "Laicidade", "Direitos"] }
    ],
    summaries: [],
    examples: ["Diversidade: diferentes tradições religiosas podem possuir símbolos, ritos e celebrações próprios.","Cultura: festas, músicas, arquitetura e costumes podem receber influências de tradições religiosas.","Convivência: respeitar uma crença não exige que todas as pessoas tenham a mesma crença.","Liberdade religiosa: pessoas podem ter diferentes convicções e devem ser tratadas com respeito."],
    exercises: [],
    questions: [],
  },
  {
    slug: "redacao",
    name: "Redação",
    emoji: "✍️",
    color: "bg-blue-100",
    intro: "Aprenda a planejar, desenvolver e revisar textos com clareza.",
    studyPages: [
      { title: "Planejamento", text: "Antes de escrever, defina tema, objetivo, público e ideias principais.", topics: ["Tema", "Objetivo", "Roteiro"] },
      { title: "Introdução e desenvolvimento", text: "Construa uma introdução clara e desenvolva ideias com argumentos e exemplos.", topics: ["Tese", "Argumentos", "Exemplos"] },
      { title: "Conclusão", text: "Finalize retomando a ideia central e organizando uma conclusão coerente.", topics: ["Síntese", "Proposta ou fechamento", "Coerência"] },
      { title: "Revisão do texto", text: "Revise conteúdo, organização, gramática, pontuação e escolha de palavras.", topics: ["Coesão", "Gramática", "Revisão"] }
    ],
    summaries: [],
    examples: ["Planejamento: antes de escrever, transforme o tema em uma pergunta e liste as ideias que respondem a ela.","Tese: uma frase central deixa claro qual ponto de vista será desenvolvido no texto.","Argumentação: uma afirmação fica mais consistente quando vem acompanhada de explicação, exemplo ou dado.","Revisão: depois de escrever, verifique se cada parágrafo contribui para o tema e se as ideias estão conectadas."],
    exercises: [],
    questions: [],
  },
  {
    slug: "literatura",
    name: "Literatura",
    emoji: "📚",
    color: "bg-purple-100",
    intro: "Conheça gêneros literários, narrativas, poesia e recursos de linguagem.",
    studyPages: [
      { title: "Gêneros literários", text: "Conheça características gerais da narrativa, poesia e outros gêneros.", topics: ["Narrativa", "Lírico", "Dramático"] },
      { title: "Elementos da narrativa", text: "Identifique personagens, narrador, espaço, tempo e enredo.", topics: ["Personagens", "Narrador", "Enredo"] },
      { title: "Poesia e linguagem", text: "Observe ritmo, imagens, metáforas e outros recursos usados na poesia.", topics: ["Versos", "Figuras de linguagem", "Ritmo"] },
      { title: "Escolas literárias", text: "Entenda como diferentes períodos apresentam estilos e temas característicos.", topics: ["Contexto histórico", "Estilos", "Autores e obras"] }
    ],
    summaries: [],
    examples: ["Narrativa: personagens, tempo, espaço, narrador e enredo ajudam a construir uma história.","Poesia: versos podem usar ritmo, imagens e figuras de linguagem para produzir efeitos de sentido.","Metáfora: uma expressão pode aproximar duas ideias sem usar uma comparação literal.","Escola literária: obras podem refletir características culturais e históricas do período em que foram produzidas."],
    exercises: [],
    questions: [],
  },
  {
    slug: "geopolitica",
    name: "Geopolítica",
    emoji: "🗺️",
    color: "bg-red-100",
    intro: "Estude relações entre território, poder, economia e política internacional.",
    studyPages: [
      { title: "Território e poder", text: "A Geopolítica analisa relações de poder ligadas ao espaço e aos territórios.", topics: ["Território", "Poder", "Fronteiras"] },
      { title: "Estados e organizações", text: "Conheça o papel dos Estados e de organizações internacionais nas relações globais.", topics: ["Estados", "Organizações internacionais", "Diplomacia"] },
      { title: "Economia mundial", text: "Entenda comércio, recursos naturais, cadeias produtivas e relações econômicas.", topics: ["Comércio", "Recursos", "Globalização"] },
      { title: "Conflitos e cooperação", text: "Analise causas gerais de conflitos e formas de cooperação entre países.", topics: ["Conflitos", "Acordos", "Cooperação"] }
    ],
    summaries: [],
    examples: ["Fronteira: é uma delimitação territorial que pode envolver questões políticas, econômicas e culturais.","Organizações internacionais: países podem cooperar por meio de instituições e acordos.","Comércio internacional: países importam e exportam produtos e serviços conforme suas relações econômicas.","Recursos naturais: petróleo, água e minerais podem ter importância econômica e estratégica."],
    exercises: [],
    questions: [],
  },
  {
    slug: "empreendedorismo",
    name: "Empreendedorismo",
    emoji: "💡",
    color: "bg-amber-100",
    intro: "Aprenda a transformar ideias em projetos com planejamento e responsabilidade.",
    studyPages: [
      { title: "Ideias e oportunidades", text: "Identifique problemas e pense em soluções úteis para pessoas e comunidades.", topics: ["Problemas", "Soluções", "Oportunidades"] },
      { title: "Modelo de projeto", text: "Organize público, proposta de valor, recursos e atividades de um projeto.", topics: ["Público", "Proposta de valor", "Recursos"] },
      { title: "Finanças básicas", text: "Conheça conceitos simples para organizar receitas, custos e planejamento.", topics: ["Receitas", "Custos", "Orçamento"] },
      { title: "Comunicação e equipe", text: "Aprenda a apresentar ideias e trabalhar de forma organizada com outras pessoas.", topics: ["Apresentação", "Colaboração", "Metas"] }
    ],
    summaries: [],
    examples: ["Problema e solução: identificar uma dificuldade cotidiana pode ajudar a criar uma ideia de projeto.","Público-alvo: um projeto precisa considerar quem utilizará ou será beneficiado pela solução.","Orçamento: somar custos ajuda a estimar quanto será necessário para realizar um projeto.","Equipe: dividir tarefas e estabelecer metas facilita a execução de uma atividade."],
    exercises: [],
    questions: [],
  },
  {
    slug: "historia-da-arte",
    name: "História da Arte",
    emoji: "🎨",
    color: "bg-fuchsia-100",
    intro: "Conheça movimentos, obras, técnicas e contextos da história da arte.",
    studyPages: [
      { title: "Arte na Antiguidade", text: "Estude manifestações artísticas de sociedades antigas e suas funções culturais.", topics: ["Egito", "Grécia", "Roma"] },
      { title: "Idade Média e Renascimento", text: "Observe mudanças na arte europeia e o desenvolvimento de novas técnicas.", topics: ["Arte medieval", "Renascimento", "Perspectiva"] },
      { title: "Modernismo", text: "Conheça movimentos que transformaram linguagens e temas artísticos.", topics: ["Impressionismo", "Vanguardas", "Modernismo"] },
      { title: "Arte contemporânea", text: "Explore linguagens, materiais e ideias presentes na produção artística contemporânea.", topics: ["Instalação", "Arte digital", "Novas linguagens"] }
    ],
    summaries: [],
    examples: ["Arte egípcia: muitas obras estavam relacionadas à religião, à vida após a morte e à representação de autoridades.","Renascimento: artistas desenvolveram estudos de perspectiva, anatomia e representação do espaço.","Impressionismo: artistas exploraram efeitos de luz e cor em cenas do cotidiano.","Arte contemporânea: instalações e arte digital mostram como diferentes materiais e tecnologias podem ser usados artisticamente."],
    exercises: [],
    questions: [],
  },
  {
    slug: "ecologia-e-educacao-ambiental",
    name: "Ecologia e Educação Ambiental",
    emoji: "🌱",
    color: "bg-teal-100",
    intro: "Entenda ecossistemas, biodiversidade e atitudes para cuidar do ambiente.",
    studyPages: [
      { title: "Ecossistemas", text: "Estude relações entre seres vivos e fatores não vivos em um ambiente.", topics: ["Fatores bióticos", "Fatores abióticos", "Ecossistemas"] },
      { title: "Cadeias e ciclos", text: "Entenda fluxo de energia e circulação de matéria nos ecossistemas.", topics: ["Cadeias alimentares", "Ciclos naturais", "Teias alimentares"] },
      { title: "Biodiversidade e impactos", text: "Conheça a importância da biodiversidade e impactos causados por atividades humanas.", topics: ["Biodiversidade", "Poluição", "Desmatamento"] },
      { title: "Educação ambiental", text: "Aprenda formas de compreender problemas ambientais e agir de maneira responsável.", topics: ["Consumo consciente", "Conservação", "Responsabilidade ambiental"] }
    ],
    summaries: [],
    examples: ["Ecossistema: uma lagoa reúne seres vivos e fatores não vivos que interagem entre si.","Cadeia alimentar: plantas podem servir de alimento para herbívoros, que podem ser consumidos por outros animais.","Impacto ambiental: o desmatamento pode alterar habitats e reduzir a biodiversidade.","Consumo consciente: reduzir desperdícios, reutilizar materiais e separar resíduos são atitudes relacionadas à educação ambiental."],
    exercises: [],
    questions: [],
  },
  {
    slug: "algebra",
    name: "Álgebra",
    emoji: "➗",
    color: "bg-indigo-100",
    intro: "Aprenda a representar relações com letras, expressões e equações.",
    studyPages: [
      { title: "Expressões algébricas", text: "Use letras para representar valores desconhecidos e relações matemáticas.", topics: ["Variáveis", "Termos", "Simplificação"] },
      { title: "Equações do 1º grau", text: "Aprenda a encontrar valores desconhecidos em equações simples.", topics: ["Igualdade", "Isolamento da variável", "Problemas"] },
      { title: "Equações do 2º grau", text: "Estude equações quadráticas e diferentes formas de encontrar suas raízes.", topics: ["Forma geral", "Fatoração", "Discriminante"] },
      { title: "Sistemas algébricos", text: "Resolva situações com duas ou mais incógnitas usando sistemas de equações.", topics: ["Substituição", "Adição", "Interpretação"] }
    ],
    summaries: [],
    examples: ["Expressão algébrica: 3x + 5 representa uma relação entre uma variável e números conhecidos.","Equação: em 2x + 4 = 10, podemos isolar x para encontrar o valor desconhecido.","Fatoração: x² + 5x + 6 pode ser escrito como (x + 2)(x + 3).","Sistema: duas equações podem ser usadas juntas para encontrar dois valores desconhecidos."],
    exercises: [],
    questions: [],
  },
  {
    slug: "geometria",
    name: "Geometria",
    emoji: "📐",
    color: "bg-cyan-100",
    intro: "Estude formas, ângulos, medidas, áreas, perímetros e relações geométricas.",
    studyPages: [
      { title: "Figuras e ângulos", text: "Conheça polígonos, ângulos e suas propriedades básicas.", topics: ["Triângulos", "Quadriláteros", "Ângulos"] },
      { title: "Perímetro e área", text: "Calcule medidas de contorno e superfície de figuras planas.", topics: ["Perímetro", "Área", "Unidades"] },
      { title: "Circunferência e círculo", text: "Aprenda raio, diâmetro, comprimento da circunferência e área do círculo.", topics: ["Raio e diâmetro", "Circunferência", "Área do círculo"] },
      { title: "Geometria espacial", text: "Conheça sólidos e calcule medidas como volume e área em situações simples.", topics: ["Prismas", "Cilindros", "Volume"] }
    ],
    summaries: [],
    examples: ["Ângulos: dois ângulos retos somam 180°.","Perímetro: um retângulo de lados 5 e 3 tem perímetro 16 unidades.","Área: um retângulo de base 8 e altura 4 tem área de 32 unidades quadradas.","Circunferência: o comprimento de um círculo pode ser calculado por C = 2πr."],
    exercises: [],
    questions: [],
  },

];


// Catálogo ampliado de matérias: cada área usa a mesma estrutura didática da plataforma.
const expandedSubjectCatalog: { slug: string; name: string; emoji: string; color: string; intro: string; topics: string[] }[] = [
  {
    "slug": "artes",
    "name": "Artes",
    "emoji": "🎨",
    "color": "bg-fuchsia-100",
    "intro": "Linguagens artísticas, criação, leitura de imagens e cultura visual.",
    "topics": [
      "Desenho e composição",
      "Teoria das cores",
      "Formas e texturas",
      "Pintura e técnicas",
      "Escultura e volume",
      "Arte digital",
      "Arte brasileira",
      "Arte indígena e afro-brasileira",
      "Arte moderna",
      "Arte contemporânea",
      "Leitura de imagens",
      "Criação de portfólio"
    ]
  },
  {
    "slug": "educacao-fisica",
    "name": "Educação Física",
    "emoji": "🏃",
    "color": "bg-lime-100",
    "intro": "Movimento, jogos, esportes, saúde e práticas corporais.",
    "topics": [
      "Consciência corporal",
      "Jogos e brincadeiras",
      "Esportes coletivos",
      "Esportes individuais",
      "Ginástica",
      "Dança e expressão corporal",
      "Lutas e cultura",
      "Atividades ao ar livre",
      "Regras e fair play",
      "Corpo e movimento",
      "Lazer ativo",
      "Inclusão no esporte"
    ]
  },
  {
    "slug": "musica",
    "name": "Música",
    "emoji": "🎵",
    "color": "bg-violet-100",
    "intro": "Ritmo, melodia, instrumentos, escuta e criação musical.",
    "topics": [
      "Pulso e ritmo",
      "Melodia e harmonia",
      "Famílias de instrumentos",
      "Leitura musical básica",
      "Voz e canto",
      "Composição",
      "Música brasileira",
      "Música de diferentes culturas",
      "Tecnologia musical",
      "Escuta crítica",
      "Forma musical",
      "Criação sonora"
    ]
  },
  {
    "slug": "teatro",
    "name": "Teatro",
    "emoji": "🎭",
    "color": "bg-rose-100",
    "intro": "Expressão cênica, personagens, dramaturgia e criação coletiva.",
    "topics": [
      "Corpo e presença",
      "Voz e dicção",
      "Improvisação",
      "Personagens",
      "Texto dramático",
      "Cenário e figurino",
      "Iluminação e som",
      "Direção cênica",
      "Teatro brasileiro",
      "Teatro de diferentes culturas",
      "Produção de espetáculo",
      "Crítica teatral"
    ]
  },
  {
    "slug": "danca",
    "name": "Dança",
    "emoji": "💃",
    "color": "bg-pink-100",
    "intro": "Movimento, ritmo, expressão, estilos e história da dança.",
    "topics": [
      "Consciência corporal",
      "Ritmo e musicalidade",
      "Dança popular brasileira",
      "Danças urbanas",
      "Ballet e dança clássica",
      "Dança contemporânea",
      "Coreografia",
      "Espaço e deslocamento",
      "Dança e identidade cultural",
      "Improvisação corporal",
      "Preparação e cuidado corporal",
      "Criação coreográfica"
    ]
  },
  {
    "slug": "espanhol",
    "name": "Espanhol",
    "emoji": "🇪🇸",
    "color": "bg-orange-100",
    "intro": "Vocabulário, compreensão, gramática e culturas de língua espanhola.",
    "topics": [
      "Saudações e apresentações",
      "Vocabulário cotidiano",
      "Artigos e substantivos",
      "Pronomes pessoais",
      "Verbos no presente",
      "Perguntas e respostas",
      "Leitura de textos curtos",
      "Falsos cognatos",
      "Pronúncia e escuta",
      "Culturas hispânicas",
      "Passado básico",
      "Produção de pequenos textos"
    ]
  },
  {
    "slug": "frances",
    "name": "Francês",
    "emoji": "🇫🇷",
    "color": "bg-blue-100",
    "intro": "Vocabulário, pronúncia, estruturas e culturas francófonas.",
    "topics": [
      "Saudações e apresentações",
      "Alfabeto e sons",
      "Números e datas",
      "Artigos e gênero",
      "Pronomes pessoais",
      "Verbos essenciais",
      "Vocabulário da escola",
      "Compreensão oral",
      "Leitura de textos simples",
      "Culturas francófonas",
      "Perguntas e negação",
      "Escrita cotidiana"
    ]
  },
  {
    "slug": "alemao",
    "name": "Alemão",
    "emoji": "🇩🇪",
    "color": "bg-yellow-100",
    "intro": "Comunicação inicial, estruturas gramaticais e culturas de língua alemã.",
    "topics": [
      "Saudações",
      "Pronúncia e alfabeto",
      "Números e horários",
      "Artigos e gênero",
      "Pronomes pessoais",
      "Verbos no presente",
      "Ordem das palavras",
      "Vocabulário cotidiano",
      "Leitura simples",
      "Escuta e compreensão",
      "Culturas de língua alemã",
      "Pequenas apresentações"
    ]
  },
  {
    "slug": "mandarim",
    "name": "Mandarim",
    "emoji": "🀄",
    "color": "bg-red-100",
    "intro": "Introdução à língua chinesa, tons, caracteres e comunicação cotidiana.",
    "topics": [
      "Pinyin",
      "Tons do mandarim",
      "Saudações",
      "Números e datas",
      "Caracteres básicos",
      "Ordem das palavras",
      "Pronomes e apresentações",
      "Vocabulário cotidiano",
      "Compreensão oral",
      "Leitura inicial",
      "Aspectos culturais",
      "Diálogos simples"
    ]
  },
  {
    "slug": "libras",
    "name": "Libras",
    "emoji": "🤟",
    "color": "bg-teal-100",
    "intro": "Língua Brasileira de Sinais, comunicação visual e cultura surda.",
    "topics": [
      "Comunicação visual",
      "Alfabeto manual",
      "Apresentações pessoais",
      "Números em Libras",
      "Expressões faciais",
      "Parâmetros dos sinais",
      "Vocabulário cotidiano",
      "Estrutura de frases",
      "Cultura surda",
      "Acessibilidade comunicacional",
      "Interação respeitosa",
      "Interpretação básica"
    ]
  },
  {
    "slug": "latim",
    "name": "Latim",
    "emoji": "🏺",
    "color": "bg-amber-100",
    "intro": "Estruturas do latim, vocabulário, etimologia e legado cultural.",
    "topics": [
      "Alfabeto e pronúncia",
      "Casos gramaticais",
      "Declinações",
      "Conjugações verbais",
      "Ordem das palavras",
      "Vocabulário latino",
      "Etimologia portuguesa",
      "Inscrições e textos",
      "Mitologia romana",
      "Literatura latina",
      "Expressões latinas",
      "Legado do latim"
    ]
  },
  {
    "slug": "computacao",
    "name": "Computação",
    "emoji": "💻",
    "color": "bg-sky-100",
    "intro": "Fundamentos de computadores, sistemas, dados e pensamento computacional.",
    "topics": [
      "Hardware e software",
      "Sistemas operacionais",
      "Arquivos e pastas",
      "Representação de dados",
      "Redes e internet",
      "Algoritmos",
      "Pensamento computacional",
      "Banco de dados",
      "Segurança digital",
      "Nuvem e serviços",
      "Computação e sociedade",
      "Resolução de problemas"
    ]
  },
  {
    "slug": "programacao",
    "name": "Programação",
    "emoji": "👨‍💻",
    "color": "bg-indigo-100",
    "intro": "Lógica, algoritmos, variáveis, estruturas de controle e desenvolvimento.",
    "topics": [
      "Algoritmos e passos",
      "Variáveis e tipos",
      "Entrada e saída",
      "Operadores",
      "Condicionais",
      "Laços de repetição",
      "Funções",
      "Listas e coleções",
      "Depuração",
      "Testes",
      "Estrutura de projetos",
      "Boas práticas"
    ]
  },
  {
    "slug": "robotica",
    "name": "Robótica",
    "emoji": "🤖",
    "color": "bg-slate-100",
    "intro": "Robôs, sensores, atuadores, programação e sistemas automatizados.",
    "topics": [
      "O que é um robô",
      "Sensores",
      "Atuadores e motores",
      "Circuitos básicos",
      "Controle e movimento",
      "Programação de robôs",
      "Automação",
      "Robótica educacional",
      "Robôs e ambiente",
      "Projeto e prototipagem",
      "Segurança e ética",
      "Testes e melhoria"
    ]
  },
  {
    "slug": "inteligencia-artificial",
    "name": "Inteligência Artificial",
    "emoji": "🧠",
    "color": "bg-purple-100",
    "intro": "Conceitos de IA, dados, aprendizado de máquina, usos e responsabilidade.",
    "topics": [
      "O que é IA",
      "Dados e padrões",
      "Aprendizado supervisionado",
      "Aprendizado não supervisionado",
      "Modelos e previsões",
      "Linguagem e IA generativa",
      "Visão computacional",
      "Avaliação de resultados",
      "Vieses e equidade",
      "Privacidade e segurança",
      "Usos cotidianos",
      "Ética e responsabilidade"
    ]
  },
  {
    "slug": "cultura-digital",
    "name": "Cultura Digital",
    "emoji": "🌐",
    "color": "bg-cyan-100",
    "intro": "Tecnologias digitais, participação online, informação e convivência.",
    "topics": [
      "Identidade digital",
      "Comunicação online",
      "Pesquisa na internet",
      "Verificação de fontes",
      "Privacidade",
      "Senhas e autenticação",
      "Direitos autorais",
      "Colaboração digital",
      "Desinformação",
      "Acessibilidade digital",
      "Bem-estar tecnológico",
      "Cidadania digital"
    ]
  },
  {
    "slug": "educacao-financeira",
    "name": "Educação Financeira",
    "emoji": "💰",
    "color": "bg-emerald-100",
    "intro": "Orçamento, poupança, consumo consciente e planejamento financeiro.",
    "topics": [
      "Necessidades e desejos",
      "Orçamento pessoal",
      "Receitas e despesas",
      "Poupança e metas",
      "Consumo consciente",
      "Preço e comparação",
      "Juros básicos",
      "Crédito e dívidas",
      "Inflação",
      "Planejamento de compras",
      "Fraudes financeiras",
      "Decisões responsáveis"
    ]
  },
  {
    "slug": "economia",
    "name": "Economia",
    "emoji": "📈",
    "color": "bg-green-100",
    "intro": "Produção, consumo, mercados, recursos e decisões econômicas.",
    "topics": [
      "Escassez e escolhas",
      "Oferta e demanda",
      "Mercados",
      "Produção e produtividade",
      "Trabalho e renda",
      "Inflação",
      "Moeda e bancos",
      "Comércio internacional",
      "Setores econômicos",
      "Desigualdade e distribuição",
      "Políticas econômicas",
      "Economia sustentável"
    ]
  },
  {
    "slug": "contabilidade",
    "name": "Contabilidade",
    "emoji": "🧾",
    "color": "bg-stone-100",
    "intro": "Registros financeiros, receitas, despesas, patrimônio e relatórios.",
    "topics": [
      "Patrimônio",
      "Ativos e passivos",
      "Receitas e despesas",
      "Registro de transações",
      "Balanço patrimonial",
      "Demonstração de resultados",
      "Custos e despesas",
      "Orçamento",
      "Controles internos",
      "Ética contábil",
      "Indicadores financeiros",
      "Informação para decisões"
    ]
  },
  {
    "slug": "direito-e-cidadania",
    "name": "Direito e Cidadania",
    "emoji": "⚖️",
    "color": "bg-blue-100",
    "intro": "Direitos, deveres, leis, instituições e participação cidadã.",
    "topics": [
      "Constituição e leis",
      "Direitos fundamentais",
      "Deveres cidadãos",
      "Organização do Estado",
      "Poderes públicos",
      "Acesso à justiça",
      "Direitos do consumidor",
      "Direitos da criança e do adolescente",
      "Trabalho e direitos",
      "Mediação de conflitos",
      "Participação democrática",
      "Ética e responsabilidade"
    ]
  },
  {
    "slug": "ciencia-politica",
    "name": "Ciência Política",
    "emoji": "🏛️",
    "color": "bg-amber-100",
    "intro": "Estado, poder, instituições, democracia e participação política.",
    "topics": [
      "Estado e governo",
      "Poder e legitimidade",
      "Democracia",
      "Constituições",
      "Instituições políticas",
      "Eleições e representação",
      "Partidos e movimentos",
      "Políticas públicas",
      "Cidadania",
      "Participação social",
      "Sistemas políticos",
      "Política internacional"
    ]
  },
  {
    "slug": "antropologia",
    "name": "Antropologia",
    "emoji": "🪶",
    "color": "bg-orange-100",
    "intro": "Culturas, diversidade humana, identidade, práticas sociais e pesquisa.",
    "topics": [
      "Cultura e sociedade",
      "Identidade e pertencimento",
      "Diversidade cultural",
      "Etnografia",
      "Parentesco e família",
      "Rituais e símbolos",
      "Linguagem e cultura",
      "Migrações",
      "Mudanças culturais",
      "Povos tradicionais",
      "Ética na pesquisa",
      "Antropologia contemporânea"
    ]
  },
  {
    "slug": "etica",
    "name": "Ética",
    "emoji": "🧭",
    "color": "bg-yellow-100",
    "intro": "Reflexão sobre escolhas, valores, responsabilidade e convivência.",
    "topics": [
      "Valores e princípios",
      "Dilemas éticos",
      "Responsabilidade",
      "Justiça e equidade",
      "Respeito e empatia",
      "Ética na ciência",
      "Ética digital",
      "Direitos humanos",
      "Decisões coletivas",
      "Ética ambiental",
      "Ética profissional",
      "Argumentação moral"
    ]
  },
  {
    "slug": "estudos-de-midia",
    "name": "Estudos de Mídia",
    "emoji": "📺",
    "color": "bg-red-100",
    "intro": "Como mídias produzem, distribuem e influenciam informações e cultura.",
    "topics": [
      "Tipos de mídia",
      "Linguagem audiovisual",
      "Público e audiência",
      "Publicidade e persuasão",
      "Representação e estereótipos",
      "Algoritmos e recomendações",
      "Notícia e opinião",
      "Desinformação",
      "Produção de conteúdo",
      "Privacidade e dados",
      "Mídia e democracia",
      "Análise crítica"
    ]
  },
  {
    "slug": "jornalismo",
    "name": "Jornalismo",
    "emoji": "📰",
    "color": "bg-sky-100",
    "intro": "Apuração, notícias, fontes, entrevistas e responsabilidade informativa.",
    "topics": [
      "Notícia e reportagem",
      "Apuração de fatos",
      "Fontes e evidências",
      "Entrevista",
      "Título e lead",
      "Checagem de informações",
      "Ética jornalística",
      "Fotojornalismo",
      "Jornalismo digital",
      "Opinião e notícia",
      "Desinformação",
      "Produção de reportagem"
    ]
  },
  {
    "slug": "fotografia",
    "name": "Fotografia",
    "emoji": "📷",
    "color": "bg-neutral-100",
    "intro": "Imagem, composição, luz, enquadramento e narrativa visual.",
    "topics": [
      "Enquadramento",
      "Composição",
      "Luz natural",
      "Exposição",
      "Foco e profundidade",
      "Cor e contraste",
      "Retrato",
      "Fotografia documental",
      "Edição responsável",
      "Narrativa visual",
      "Direitos de imagem",
      "Projeto fotográfico"
    ]
  },
  {
    "slug": "cinema-audiovisual",
    "name": "Cinema e Audiovisual",
    "emoji": "🎬",
    "color": "bg-zinc-100",
    "intro": "Linguagem cinematográfica, roteiro, imagem, som e montagem.",
    "topics": [
      "Planos e enquadramentos",
      "Movimentos de câmera",
      "Roteiro",
      "Personagem e narrativa",
      "Iluminação",
      "Som e trilha",
      "Montagem e edição",
      "Gêneros cinematográficos",
      "Documentário",
      "Cinema brasileiro",
      "Análise de filmes",
      "Produção audiovisual"
    ]
  },
  {
    "slug": "design-grafico",
    "name": "Design Gráfico",
    "emoji": "🖌️",
    "color": "bg-fuchsia-100",
    "intro": "Comunicação visual, tipografia, cor, composição e identidade gráfica.",
    "topics": [
      "Princípios visuais",
      "Tipografia",
      "Teoria das cores",
      "Composição e hierarquia",
      "Identidade visual",
      "Design editorial",
      "Cartazes e peças",
      "Ícones e símbolos",
      "Acessibilidade visual",
      "Ferramentas digitais",
      "Portfólio",
      "Crítica e revisão"
    ]
  },
  {
    "slug": "arquitetura",
    "name": "Arquitetura",
    "emoji": "🏠",
    "color": "bg-orange-100",
    "intro": "Espaços, formas, representação, conforto e relação com o ambiente.",
    "topics": [
      "Desenho e representação",
      "Escala e proporção",
      "Formas e volumes",
      "Plantas e cortes",
      "Materiais construtivos",
      "Conforto térmico",
      "Iluminação natural",
      "Acessibilidade espacial",
      "Arquitetura e cidade",
      "Sustentabilidade",
      "História da arquitetura",
      "Projeto de espaços"
    ]
  },
  {
    "slug": "moda-textil",
    "name": "Moda e Têxtil",
    "emoji": "🧵",
    "color": "bg-pink-100",
    "intro": "Vestuário, tecidos, criação, história da moda e produção responsável.",
    "topics": [
      "Fibras e tecidos",
      "Tipos de trama",
      "História da moda",
      "Desenho de moda",
      "Modelagem básica",
      "Cores e tendências",
      "Confecção",
      "Estilo e identidade",
      "Moda e cultura",
      "Consumo responsável",
      "Reaproveitamento têxtil",
      "Coleção e portfólio"
    ]
  },
  {
    "slug": "artesanato",
    "name": "Artesanato",
    "emoji": "🧶",
    "color": "bg-amber-100",
    "intro": "Técnicas manuais, materiais, design, cultura e criação de objetos.",
    "topics": [
      "Materiais e ferramentas",
      "Papel e dobraduras",
      "Tecelagem",
      "Cerâmica e modelagem",
      "Madeira e formas",
      "Bordado e costura",
      "Cores e padrões",
      "Artesanato tradicional",
      "Reaproveitamento de materiais",
      "Planejamento de peças",
      "Segurança no trabalho manual",
      "Feira e exposição"
    ]
  },
  {
    "slug": "pesquisa-cientifica",
    "name": "Pesquisa Científica",
    "emoji": "🔍",
    "color": "bg-indigo-100",
    "intro": "Perguntas de pesquisa, evidências, métodos, dados e comunicação científica.",
    "topics": [
      "Pergunta de pesquisa",
      "Hipótese",
      "Revisão de literatura",
      "Fontes confiáveis",
      "Métodos de pesquisa",
      "Variáveis e amostras",
      "Coleta de dados",
      "Análise de resultados",
      "Ética científica",
      "Reprodutibilidade",
      "Citações e referências",
      "Comunicação de resultados"
    ]
  },
  {
    "slug": "metodologia-cientifica",
    "name": "Metodologia Científica",
    "emoji": "🧪",
    "color": "bg-teal-100",
    "intro": "Métodos, evidências, análise crítica e organização de estudos científicos.",
    "topics": [
      "Conhecimento científico",
      "Problema e objetivo",
      "Hipóteses",
      "Métodos qualitativos",
      "Métodos quantitativos",
      "Observação e experimento",
      "Amostragem",
      "Análise de dados",
      "Limites e incerteza",
      "Ética em pesquisa",
      "Referências",
      "Relatório científico"
    ]
  },
  {
    "slug": "escrita-academica",
    "name": "Escrita Acadêmica",
    "emoji": "✍️",
    "color": "bg-slate-100",
    "intro": "Planejamento de textos, argumentação, coesão, fontes e revisão.",
    "topics": [
      "Objetivo e público",
      "Estrutura de parágrafos",
      "Tese e argumentos",
      "Coesão e coerência",
      "Paráfrase e citação",
      "Referências bibliográficas",
      "Resumo acadêmico",
      "Relatório",
      "Linguagem formal",
      "Revisão textual",
      "Integridade acadêmica",
      "Apresentação de trabalhos"
    ]
  },
  {
    "slug": "logica",
    "name": "Lógica",
    "emoji": "🔗",
    "color": "bg-violet-100",
    "intro": "Argumentos, proposições, padrões, inferências e resolução de problemas.",
    "topics": [
      "Proposições",
      "Conectivos lógicos",
      "Tabelas-verdade",
      "Condição e equivalência",
      "Argumentos válidos",
      "Dedução e indução",
      "Falácias comuns",
      "Conjuntos e relações",
      "Sequências e padrões",
      "Problemas de lógica",
      "Árvores de decisão",
      "Pensamento crítico"
    ]
  },
  {
    "slug": "probabilidade-estatistica",
    "name": "Probabilidade e Estatística",
    "emoji": "📊",
    "color": "bg-emerald-100",
    "intro": "Dados, gráficos, chance, amostras e interpretação de resultados.",
    "topics": [
      "Coleta e organização de dados",
      "Tabelas",
      "Gráficos",
      "Média e mediana",
      "Moda e amplitude",
      "Frequência",
      "Probabilidade básica",
      "Eventos independentes",
      "Amostras e população",
      "Variação e dispersão",
      "Correlação e limites",
      "Estatística no cotidiano"
    ]
  },
  {
    "slug": "geologia",
    "name": "Geologia",
    "emoji": "🪨",
    "color": "bg-stone-100",
    "intro": "Rochas, minerais, placas tectônicas, relevo e história da Terra.",
    "topics": [
      "Minerais e propriedades",
      "Tipos de rocha",
      "Ciclo das rochas",
      "Estrutura da Terra",
      "Placas tectônicas",
      "Vulcanismo",
      "Terremotos",
      "Formação do relevo",
      "Fósseis e tempo geológico",
      "Erosão e sedimentação",
      "Recursos minerais",
      "Riscos geológicos"
    ]
  },
  {
    "slug": "oceanografia",
    "name": "Oceanografia",
    "emoji": "🌊",
    "color": "bg-cyan-100",
    "intro": "Oceanos, correntes, ecossistemas marinhos, clima e zonas costeiras.",
    "topics": [
      "Zonas oceânicas",
      "Salinidade e temperatura",
      "Correntes marinhas",
      "Marés e ondas",
      "Ecossistemas marinhos",
      "Plâncton e cadeias alimentares",
      "Recifes e manguezais",
      "Costa e erosão",
      "Poluição marinha",
      "Pesca sustentável",
      "Oceano e clima",
      "Conservação marinha"
    ]
  },
  {
    "slug": "meteorologia",
    "name": "Meteorologia",
    "emoji": "🌦️",
    "color": "bg-sky-100",
    "intro": "Atmosfera, tempo, nuvens, precipitação e previsão meteorológica.",
    "topics": [
      "Camadas da atmosfera",
      "Temperatura e pressão",
      "Umidade do ar",
      "Formação de nuvens",
      "Frentes e massas de ar",
      "Ventos",
      "Precipitação",
      "Instrumentos meteorológicos",
      "Mapas do tempo",
      "Eventos extremos",
      "Tempo e clima",
      "Previsão e incerteza"
    ]
  },
  {
    "slug": "ciencias-da-terra",
    "name": "Ciências da Terra",
    "emoji": "🌍",
    "color": "bg-green-100",
    "intro": "Sistemas terrestres, rochas, atmosfera, água e processos naturais.",
    "topics": [
      "Estrutura terrestre",
      "Ciclo da água",
      "Atmosfera",
      "Rochas e minerais",
      "Tectônica de placas",
      "Relevo e erosão",
      "Solo e paisagem",
      "Oceanos",
      "Clima e mudanças",
      "Recursos naturais",
      "Desastres naturais",
      "Sistema Terra"
    ]
  },
  {
    "slug": "ciencias-do-solo",
    "name": "Ciências do Solo",
    "emoji": "🌱",
    "color": "bg-lime-100",
    "intro": "Formação, propriedades, vida, conservação e uso sustentável do solo.",
    "topics": [
      "Formação do solo",
      "Horizontes do solo",
      "Textura e estrutura",
      "Matéria orgânica",
      "Organismos do solo",
      "Água e nutrientes",
      "Erosão",
      "Fertilidade",
      "Contaminação",
      "Conservação do solo",
      "Uso agrícola",
      "Recuperação de áreas"
    ]
  },
  {
    "slug": "agricultura-agroecologia",
    "name": "Agricultura e Agroecologia",
    "emoji": "🌾",
    "color": "bg-lime-100",
    "intro": "Cultivo, solo, biodiversidade, produção de alimentos e sustentabilidade.",
    "topics": [
      "Solo e fertilidade",
      "Sementes e germinação",
      "Ciclos das plantas",
      "Irrigação",
      "Manejo integrado",
      "Compostagem",
      "Biodiversidade agrícola",
      "Agroecologia",
      "Sistemas agroflorestais",
      "Produção de alimentos",
      "Conservação da água",
      "Agricultura sustentável"
    ]
  },
  {
    "slug": "nutricao",
    "name": "Nutrição",
    "emoji": "🥗",
    "color": "bg-emerald-100",
    "intro": "Alimentação, nutrientes, hábitos saudáveis e leitura crítica de informações.",
    "topics": [
      "Grupos de alimentos",
      "Carboidratos, proteínas e lipídios",
      "Vitaminas e minerais",
      "Água e hidratação",
      "Digestão e absorção",
      "Rótulos alimentares",
      "Segurança alimentar",
      "Cultura e alimentação",
      "Planejamento de refeições",
      "Mitos sobre alimentação",
      "Alimentação sustentável",
      "Hábitos e bem-estar"
    ]
  },
  {
    "slug": "saude-bem-estar",
    "name": "Saúde e Bem-estar",
    "emoji": "💚",
    "color": "bg-green-100",
    "intro": "Hábitos de saúde, prevenção, sono, atividade física e bem-estar integral.",
    "topics": [
      "Saúde integral",
      "Sono e rotina",
      "Atividade física segura",
      "Higiene e prevenção",
      "Alimentação equilibrada",
      "Estresse e emoções",
      "Relações saudáveis",
      "Prevenção de doenças",
      "Uso responsável de telas",
      "Informação confiável em saúde",
      "Ambientes saudáveis",
      "Autocuidado e apoio"
    ]
  },
  {
    "slug": "primeiros-socorros",
    "name": "Primeiros Socorros",
    "emoji": "🩹",
    "color": "bg-red-100",
    "intro": "Reconhecimento de emergências, prevenção e busca segura por ajuda.",
    "topics": [
      "Reconhecer uma emergência",
      "Acionar serviços de emergência",
      "Segurança do local",
      "Comunicação clara",
      "Cuidados básicos sem risco",
      "Desmaio: buscar ajuda",
      "Queimaduras: prevenção e ajuda",
      "Engasgo: procurar orientação imediata",
      "Sangramentos: pedir assistência",
      "Kit de primeiros socorros",
      "Prevenção de acidentes",
      "Limites do atendimento leigo"
    ]
  },
  {
    "slug": "psicologia",
    "name": "Psicologia",
    "emoji": "🧠",
    "color": "bg-purple-100",
    "intro": "Comportamento, emoções, aprendizagem, relações e pensamento crítico.",
    "topics": [
      "Processos psicológicos",
      "Emoções",
      "Memória e atenção",
      "Aprendizagem",
      "Desenvolvimento humano",
      "Personalidade",
      "Psicologia social",
      "Relações interpessoais",
      "Estresse e estratégias saudáveis",
      "Pesquisa em psicologia",
      "Ética e privacidade",
      "Mitos e evidências"
    ]
  },
  {
    "slug": "direitos-humanos",
    "name": "Direitos Humanos",
    "emoji": "🕊️",
    "color": "bg-sky-100",
    "intro": "Dignidade, igualdade, liberdades, direitos e convivência democrática.",
    "topics": [
      "Dignidade humana",
      "Declaração Universal",
      "Igualdade e não discriminação",
      "Liberdade de expressão",
      "Direitos sociais",
      "Direitos da criança",
      "Acessibilidade e inclusão",
      "Refúgio e migração",
      "Direitos e ambiente",
      "Participação cidadã",
      "Prevenção da violência",
      "Instituições de proteção"
    ]
  },
  {
    "slug": "relacoes-internacionais",
    "name": "Relações Internacionais",
    "emoji": "🌐",
    "color": "bg-blue-100",
    "intro": "Países, organizações, diplomacia, comércio e cooperação global.",
    "topics": [
      "Estado e soberania",
      "Diplomacia",
      "Organizações internacionais",
      "Cooperação global",
      "Comércio internacional",
      "Conflitos e paz",
      "Direitos humanos globais",
      "Migrações",
      "Blocos econômicos",
      "Política externa",
      "Desenvolvimento internacional",
      "Desafios globais"
    ]
  },
  {
    "slug": "estudos-culturais",
    "name": "Estudos Culturais",
    "emoji": "🎎",
    "color": "bg-fuchsia-100",
    "intro": "Identidade, cultura popular, mídia, representação e diversidade cultural.",
    "topics": [
      "Conceito de cultura",
      "Identidade e pertencimento",
      "Cultura popular",
      "Mídia e representação",
      "Tradições e mudanças",
      "Língua e identidade",
      "Globalização cultural",
      "Patrimônio cultural",
      "Diversidade e inclusão",
      "Consumo cultural",
      "Cultura digital",
      "Análise de manifestações"
    ]
  },
  {
    "slug": "cultura-indigena",
    "name": "Culturas Indígenas",
    "emoji": "🪶",
    "color": "bg-amber-100",
    "intro": "Diversidade dos povos indígenas, línguas, conhecimentos e direitos.",
    "topics": [
      "Diversidade dos povos",
      "Línguas indígenas",
      "Territórios e modos de vida",
      "Histórias e memórias",
      "Conhecimentos tradicionais",
      "Arte e oralidade",
      "Relação com o ambiente",
      "Povos indígenas no Brasil atual",
      "Direitos indígenas",
      "Resistência e protagonismo",
      "Representações na mídia",
      "Respeito e combate a estereótipos"
    ]
  },
  {
    "slug": "historia-africa",
    "name": "História da África",
    "emoji": "🌍",
    "color": "bg-amber-100",
    "intro": "Sociedades africanas, reinos, culturas, diáspora e história contemporânea.",
    "topics": [
      "África e diversidade regional",
      "Sociedades antigas",
      "Reinos e impérios africanos",
      "Rotas comerciais",
      "Culturas e religiões",
      "Escravização e diáspora",
      "Colonialismo",
      "Lutas de independência",
      "África contemporânea",
      "Intelectuais e movimentos",
      "Conexões afro-brasileiras",
      "Fontes históricas africanas"
    ]
  },
  {
    "slug": "historia-mundial",
    "name": "História Mundial",
    "emoji": "🌎",
    "color": "bg-orange-100",
    "intro": "Sociedades, transformações, conexões e acontecimentos da história global.",
    "topics": [
      "Primeiras sociedades",
      "Civilizações antigas",
      "Rotas e intercâmbios",
      "Religiões e impérios",
      "Idade Média global",
      "Renascimento e expansão marítima",
      "Revoluções modernas",
      "Industrialização",
      "Imperialismo e guerras",
      "Guerra Fria",
      "Globalização",
      "História e fontes"
    ]
  },
  {
    "slug": "sustentabilidade",
    "name": "Sustentabilidade",
    "emoji": "♻️",
    "color": "bg-green-100",
    "intro": "Uso responsável de recursos, consumo, biodiversidade e soluções sustentáveis.",
    "topics": [
      "Desenvolvimento sustentável",
      "Recursos naturais",
      "Pegada ecológica",
      "Consumo responsável",
      "Resíduos e reciclagem",
      "Energia limpa",
      "Água e saneamento",
      "Biodiversidade",
      "Cidades sustentáveis",
      "Economia circular",
      "Justiça ambiental",
      "Projetos de sustentabilidade"
    ]
  },
  {
    "slug": "mudancas-climaticas",
    "name": "Mudanças Climáticas",
    "emoji": "🌡️",
    "color": "bg-orange-100",
    "intro": "Clima, efeito estufa, evidências científicas, impactos e adaptação.",
    "topics": [
      "Tempo e clima",
      "Efeito estufa natural",
      "Gases de efeito estufa",
      "Evidências de aquecimento",
      "Fontes de emissão",
      "Impactos nos ecossistemas",
      "Impactos nas cidades",
      "Eventos extremos",
      "Mitigação",
      "Adaptação",
      "Justiça climática",
      "Soluções coletivas"
    ]
  },
  {
    "slug": "educacao-consumo",
    "name": "Educação para o Consumo",
    "emoji": "🛒",
    "color": "bg-emerald-100",
    "intro": "Publicidade, direitos do consumidor, orçamento e escolhas conscientes.",
    "topics": [
      "Necessidades e desejos",
      "Publicidade e persuasão",
      "Comparação de preços",
      "Rótulos e informações",
      "Direitos do consumidor",
      "Garantias e compras",
      "Consumo digital",
      "Privacidade de dados",
      "Resíduos e descarte",
      "Consumo sustentável",
      "Golpes e prevenção",
      "Decisão de compra"
    ]
  },
  {
    "slug": "debate-argumentacao",
    "name": "Debate e Argumentação",
    "emoji": "🗣️",
    "color": "bg-violet-100",
    "intro": "Construção de argumentos, escuta ativa, evidências e diálogo respeitoso.",
    "topics": [
      "Tese e ponto de vista",
      "Argumentos e evidências",
      "Exemplos e analogias",
      "Contra-argumentação",
      "Falácias comuns",
      "Escuta ativa",
      "Perguntas investigativas",
      "Debate regrado",
      "Linguagem respeitosa",
      "Síntese de posições",
      "Pesquisa de fontes",
      "Conclusão argumentativa"
    ]
  },
  {
    "slug": "gestao-projetos",
    "name": "Gestão de Projetos",
    "emoji": "📋",
    "color": "bg-blue-100",
    "intro": "Objetivos, planejamento, etapas, colaboração e avaliação de projetos.",
    "topics": [
      "Definição do problema",
      "Objetivos e resultados",
      "Escopo",
      "Cronograma",
      "Recursos e orçamento",
      "Papéis da equipe",
      "Riscos e prevenção",
      "Comunicação",
      "Acompanhamento",
      "Indicadores",
      "Avaliação final",
      "Aprendizados e melhoria"
    ]
  },
  {
    "slug": "logistica",
    "name": "Logística",
    "emoji": "🚚",
    "color": "bg-orange-100",
    "intro": "Fluxos de materiais, estoque, transporte, distribuição e planejamento.",
    "topics": [
      "Cadeia de suprimentos",
      "Estoque e inventário",
      "Armazenagem",
      "Transporte",
      "Rotas e distribuição",
      "Previsão de demanda",
      "Custos logísticos",
      "Rastreabilidade",
      "Logística reversa",
      "Segurança e qualidade",
      "Tecnologia logística",
      "Sustentabilidade nas operações"
    ]
  },
  {
    "slug": "marketing",
    "name": "Marketing",
    "emoji": "📣",
    "color": "bg-pink-100",
    "intro": "Públicos, marcas, comunicação, pesquisa e estratégias de marketing.",
    "topics": [
      "Público-alvo",
      "Pesquisa de mercado",
      "Proposta de valor",
      "Marca e posicionamento",
      "Produto e serviço",
      "Preço",
      "Canais de distribuição",
      "Comunicação e campanhas",
      "Marketing digital",
      "Métricas e resultados",
      "Ética na publicidade",
      "Relacionamento com clientes"
    ]
  },
  {
    "slug": "turismo",
    "name": "Turismo",
    "emoji": "🧳",
    "color": "bg-sky-100",
    "intro": "Destinos, patrimônios, hospitalidade, roteiros e turismo responsável.",
    "topics": [
      "Tipos de turismo",
      "Patrimônio natural",
      "Patrimônio cultural",
      "Planejamento de roteiros",
      "Hospitalidade",
      "Turismo comunitário",
      "Marketing de destinos",
      "Impactos ambientais",
      "Acessibilidade turística",
      "Eventos e serviços",
      "Economia local",
      "Turismo sustentável"
    ]
  },
  {
    "slug": "gastronomia",
    "name": "Gastronomia",
    "emoji": "🍲",
    "color": "bg-amber-100",
    "intro": "Cultura alimentar, técnicas culinárias, higiene e planejamento de refeições.",
    "topics": [
      "Cultura e tradições alimentares",
      "Técnicas de preparo",
      "Cortes e ingredientes",
      "Higiene e segurança alimentar",
      "Panificação e massas",
      "Temperos e sabores",
      "Apresentação de pratos",
      "Planejamento de cardápios",
      "Desperdício de alimentos",
      "Custos e porções",
      "Cozinhas do mundo",
      "Sustentabilidade na cozinha"
    ]
  },
  {
    "slug": "seguranca-trabalho",
    "name": "Segurança do Trabalho",
    "emoji": "🦺",
    "color": "bg-yellow-100",
    "intro": "Prevenção de riscos, ergonomia, ambientes seguros e cultura preventiva.",
    "topics": [
      "Identificação de perigos",
      "Avaliação de riscos",
      "Equipamentos de proteção",
      "Ergonomia",
      "Sinalização",
      "Prevenção de incêndios",
      "Organização do ambiente",
      "Saúde ocupacional",
      "Comunicação de riscos",
      "Planos de emergência",
      "Cultura de prevenção",
      "Melhoria contínua"
    ]
  },
  {
    "slug": "engenharia-tecnologia",
    "name": "Engenharia e Tecnologia",
    "emoji": "⚙️",
    "color": "bg-slate-100",
    "intro": "Projeto, sistemas, materiais, medidas e resolução de problemas práticos.",
    "topics": [
      "Processo de projeto",
      "Desenho técnico",
      "Medidas e unidades",
      "Forças e estruturas",
      "Materiais e propriedades",
      "Energia e eficiência",
      "Mecanismos",
      "Sensores e controle",
      "Prototipagem",
      "Testes e validação",
      "Segurança e ética",
      "Inovação responsável"
    ]
  },
  {
    "slug": "ciencias-materiais",
    "name": "Ciência dos Materiais",
    "emoji": "🧱",
    "color": "bg-stone-100",
    "intro": "Propriedades, estrutura, processamento e usos de materiais.",
    "topics": [
      "Metais e ligas",
      "Polímeros",
      "Cerâmicas e vidros",
      "Compósitos",
      "Estrutura atômica",
      "Propriedades mecânicas",
      "Condutividade",
      "Corrosão e desgaste",
      "Reciclagem de materiais",
      "Ensaios e testes",
      "Seleção de materiais",
      "Materiais inovadores"
    ]
  },
  {
    "slug": "biotecnologia",
    "name": "Biotecnologia",
    "emoji": "🧬",
    "color": "bg-lime-100",
    "intro": "Aplicações de organismos e processos biológicos em ciência e tecnologia.",
    "topics": [
      "Células e microrganismos",
      "DNA e genes",
      "Fermentação",
      "Enzimas",
      "Biotecnologia na agricultura",
      "Biotecnologia na saúde",
      "Bioinformática",
      "Biorremediação",
      "Biossegurança",
      "Ética e regulamentação",
      "Bioprocessos",
      "Impactos sociais"
    ]
  },
  {
    "slug": "genetica",
    "name": "Genética",
    "emoji": "🧬",
    "color": "bg-violet-100",
    "intro": "Genes, hereditariedade, variação, DNA e aplicações da genética.",
    "topics": [
      "DNA e genes",
      "Cromossomos",
      "Hereditariedade",
      "Alelos e características",
      "Divisão celular",
      "Mutações e variação",
      "Genética mendeliana",
      "Genética molecular",
      "Genética de populações",
      "Biotecnologia",
      "Aconselhamento e limites",
      "Ética genética"
    ]
  },
  {
    "slug": "neurociencia",
    "name": "Neurociência",
    "emoji": "🧠",
    "color": "bg-purple-100",
    "intro": "Sistema nervoso, percepção, memória, aprendizagem e comportamento.",
    "topics": [
      "Neurônios e sinapses",
      "Organização do sistema nervoso",
      "Percepção sensorial",
      "Atenção",
      "Memória",
      "Aprendizagem",
      "Sono e cérebro",
      "Emoções e comportamento",
      "Plasticidade neural",
      "Métodos de pesquisa",
      "Mitos sobre o cérebro",
      "Ética em neurociência"
    ]
  },
  {
    "slug": "saude-publica",
    "name": "Saúde Pública",
    "emoji": "🏥",
    "color": "bg-red-100",
    "intro": "Saúde coletiva, prevenção, determinantes sociais e organização dos cuidados.",
    "topics": [
      "Conceito de saúde pública",
      "Prevenção e promoção",
      "Determinantes sociais",
      "Vacinação e prevenção",
      "Saneamento e saúde",
      "Vigilância em saúde",
      "Epidemiologia básica",
      "Acesso aos serviços",
      "Comunicação em saúde",
      "Equidade e inclusão",
      "Políticas públicas",
      "Dados e indicadores"
    ]
  },
  {
    "slug": "desenvolvimento-sustentavel",
    "name": "Desenvolvimento Sustentável",
    "emoji": "🌱",
    "color": "bg-green-100",
    "intro": "Integração entre ambiente, sociedade, economia e bem-estar de longo prazo.",
    "topics": [
      "Dimensões da sustentabilidade",
      "Objetivos globais de desenvolvimento",
      "Pobreza e desigualdade",
      "Educação e oportunidades",
      "Água e saneamento",
      "Energia acessível",
      "Cidades e comunidades",
      "Consumo e produção",
      "Proteção dos ecossistemas",
      "Parcerias e cooperação",
      "Indicadores de progresso",
      "Projetos locais"
    ]
  },
  {
    "slug": "estudos-espaciais",
    "name": "Estudos Espaciais",
    "emoji": "🛰️",
    "color": "bg-indigo-100",
    "intro": "Exploração espacial, satélites, missões, observação da Terra e ciência planetária.",
    "topics": [
      "Sistema Solar",
      "Satélites artificiais",
      "Foguetes e propulsão",
      "Órbitas",
      "Observação da Terra",
      "Missões espaciais",
      "Exploração lunar e marciana",
      "Instrumentos científicos",
      "Lixo espacial",
      "Cooperação internacional",
      "Ética e sustentabilidade espacial",
      "Futuro da exploração"
    ]
  },
  {
    "slug": "defesa-civil",
    "name": "Defesa Civil",
    "emoji": "🚨",
    "color": "bg-orange-100",
    "intro": "Prevenção, preparação, resposta comunitária e recuperação após desastres.",
    "topics": [
      "Riscos e vulnerabilidades",
      "Mapas de risco",
      "Alertas e comunicação",
      "Planos familiares",
      "Rotas de evacuação",
      "Prevenção de enchentes",
      "Prevenção de deslizamentos",
      "Segurança em tempestades",
      "Organização comunitária",
      "Serviços de emergência",
      "Abrigos e apoio",
      "Recuperação e resiliência"
    ]
  }
];

for (const item of expandedSubjectCatalog) {
  const groups = [item.topics.slice(0,3), item.topics.slice(3,6), item.topics.slice(6,9), item.topics.slice(9,12)];
  const pageTitles = ["Fundamentos e conceitos", "Linguagem e ferramentas", "Aplicações e contexto", "Revisão e projeto" ];
  const pageTexts = [
    `Conheça os conceitos fundamentais de ${item.name}. Esta etapa apresenta ${groups[0].join(", ")} e explica como esses assuntos ajudam a construir a base da matéria.`,
    `Explore métodos, vocabulário e ferramentas de ${item.name}, relacionando ${groups[1].join(", ")} a exemplos e situações de estudo.`,
    `Veja como ${item.name} se conecta ao cotidiano e a outras áreas por meio de ${groups[2].join(", ")}. Observe contextos, evidências e aplicações.`,
    `Revise ${groups[3].join(", ")} e organize o que aprendeu em uma atividade ou pequeno projeto. Use o quiz para verificar sua compreensão.`
  ];
  subjects.push({
    slug: item.slug,
    name: item.name,
    emoji: item.emoji,
    color: item.color,
    intro: item.intro,
    studyPages: groups.map((topics, index) => ({ title: pageTitles[index]!, text: pageTexts[index]!, topics })),
    summaries: groups.slice(0,3).map((topics,index)=>({title: pageTitles[index]!, text: `${item.name} aborda ${topics.join(", ")}. Procure entender o significado de cada conceito, reconhecer exemplos e explicar como os temas se relacionam.`})),
    examples: item.topics.slice(0,6).map((topic,index)=>`Exemplo ${index+1}: observe ${topic.toLowerCase()} em uma situação cotidiana, escolar ou de pesquisa relacionada a ${item.name}.`),
    exercises: item.topics.slice(0,4).map((topic,index)=>({q:`Explique com suas palavras o que significa “${topic}” em ${item.name}.`,a:`Resposta esperada: uma explicação correta de “${topic}”, com um exemplo pertinente à área de ${item.name}.`})),
    questions: [],
  });
}


// Gera quizzes completos para as novas matérias a partir das páginas didáticas.
function buildGeneratedQuestions(subject: Subject): Question[] {
  const pages = subject.studyPages;
  const result: Question[] = [];
  const levels: Question["level"][] = ["facil","facil","medio","medio","medio","dificil","medio","dificil","dificil","dificil"];

  pages.forEach((page, pageIndex) => {
    const otherPages = pages.filter((_, i) => i !== pageIndex);
    result.push({
      q: `Qual é o foco principal da página "${page.title}"?`,
      options: [page.text, ...otherPages.slice(0, 3).map((p) => p.text)],
      answer: 0,
      level: levels[result.length]!,
      explanation: `A resposta correta é a descrição da página "${page.title}". Ela apresenta o assunto central estudado nessa etapa e explica por que esse conteúdo faz parte de ${subject.name}.`,
    });
    result.push({
      q: `Qual destes temas aparece entre os tópicos de "${page.title}"?`,
      options: [page.topics[0]!, ...otherPages.slice(0, 3).map((p) => p.topics[0]!)],
      answer: 0,
      level: levels[result.length]!,
      explanation: `"${page.topics[0]}" é um dos tópicos indicados para "${page.title}". Estudar esse ponto ajuda a compreender o conteúdo da página e a relacioná-lo com os demais conceitos da matéria.`,
    });
  });

  result.push({
    q: `O que o estudo de ${subject.name} ajuda a compreender?`,
    options: [subject.intro, pages[0]?.text ?? "Os principais conceitos da disciplina.", "Somente informações sem relação com a disciplina.", "Apenas conteúdos de outra matéria."],
    answer: 0,
    level: "dificil",
    explanation: `A alternativa correta resume o objetivo de ${subject.name}: ${subject.intro} O estudo organizado permite compreender conceitos, relacioná-los e aplicá-los em atividades e questões.`,
  });
  result.push({
    q: `Qual é uma boa forma de estudar ${subject.name} no Sabe Mais?`,
    options: ["Ler as páginas, revisar os conceitos e usar os quizzes para testar a compreensão.", "Pular as explicações e marcar alternativas ao acaso.", "Estudar somente a última questão.", "Ignorar os conceitos e memorizar apenas palavras isoladas."],
    answer: 0,
    level: "medio",
    explanation: `A melhor alternativa combina explicação, revisão e prática. As páginas apresentam os conceitos e o quiz ajuda a verificar se você consegue reconhecê-los e aplicá-los.`,
  });
  return result;
}

for (const subject of subjects) {
  if (subject.questions.length === 0 && subject.studyPages.length === 4) {
    subject.questions = buildGeneratedQuestions(subject);
  } else {
    subject.questions = subject.questions.map((question) => ({
      ...question,
      explanation: question.explanation ?? `A alternativa correta é "${question.options[question.answer]}". Ela corresponde ao conceito cobrado na questão e deve ser entendida em conjunto com os conteúdos de ${subject.name}, para que você consiga aplicar o conhecimento em situações diferentes.`,
    }));
  }
}

export function getStudyHelpLines(slug: string): string[] {
  const subject = getSubject(slug);
  if (!subject) return [];
  const pageLines = subject.studyPages.flatMap((page) => [
    `${page.title}: ${page.text}`,
    `Nesta etapa, o objetivo é entender os conceitos de ${page.topics.join(", ")}.`,
    `Esse conteúdo pode ajudar na revisão, na resolução de exercícios e na compreensão de questões de ${subject.name}.`,
  ]);
  const common = [
    `Estudar ${subject.name} ajuda a construir uma base para interpretar problemas e conteúdos relacionados.`,
    "Comece lendo a explicação e tente repetir a ideia principal com suas próprias palavras.",
    "Depois, observe os exemplos e procure relacionar o conceito com uma situação concreta.",
    "Use as perguntas do quiz como revisão ativa, tentando responder antes de olhar a explicação.",
    "Quando errar, leia a explicação completa e volte à página relacionada ao assunto.",
    "Anotar palavras-chave pode facilitar a revisão em outro momento.",
    "Dividir o estudo em pequenas etapas ajuda a manter a atenção e perceber o que ainda precisa ser revisado.",
    "Os conteúdos desta matéria podem se conectar com outras disciplinas do Sabe Mais.",
    "Essas conexões ajudam a entender que os conhecimentos escolares se complementam.",
    "Não é necessário memorizar tudo na primeira leitura; primeiro procure compreender.",
    "Tente explicar cada conceito sem copiar a definição exatamente como está escrita.",
    "Use os quatro blocos de estudo como uma sequência para avançar gradualmente.",
    "Os exercícios podem ser usados para transformar a explicação em prática.",
    "O quiz serve para identificar pontos fortes e assuntos que merecem nova revisão.",
    "Revisar erros é tão importante quanto comemorar acertos.",
    "Ao estudar novamente depois de alguns dias, tente lembrar a ideia antes de reler o texto.",
    "Se um conceito parecer difícil, divida-o em partes menores.",
    "Compare conceitos parecidos para entender melhor suas diferenças.",
    "Procure sempre justificar por que uma resposta está correta.",
    "Com esse ciclo de explicação, prática, revisão e quiz, o estudo fica mais completo.",
  ];
  return [...pageLines, ...common].slice(0, 32);
}

export type DeepStudySection = {
  title: string;
  text: string;
  highlights: string[];
  image: string;
  imageAlt: string;
};

const deepStudyData: Record<string, DeepStudySection> = {
  matematica: { title: "Matemática: raciocínio, modelos e resolução de problemas", text: "A Matemática vai além de aplicar fórmulas. Ela permite representar situações por números, expressões, gráficos e relações. Ao estudar, procure entender por que cada procedimento funciona e confira se o resultado combina com o contexto do problema. Esse hábito ajuda tanto nas atividades escolares quanto em questões contextualizadas de provas.", highlights: ["Raciocínio lógico e interpretação", "Porcentagem, funções e estatística", "Geometria e leitura de gráficos"], image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80", imageAlt: "Estudos de matemática e cálculos" },
  portugues: { title: "Português: compreender a linguagem e construir sentidos", text: "Estudar Português significa aprender a observar como a linguagem funciona em diferentes situações. Interpretação, gramática, gêneros textuais, argumentação e literatura se relacionam. Em vez de memorizar regras isoladas, observe como uma escolha de palavra, pontuação ou estrutura altera o sentido de um texto.", highlights: ["Interpretação e inferência", "Gramática em contexto", "Gêneros e funções da linguagem"], image: "https://images.unsplash.com/photo-1455885666463-7c7c8b2a2b7c?auto=format&fit=crop&w=1200&q=80", imageAlt: "Caderno e escrita durante os estudos" },
  historia: { title: "História: entender processos e relações entre passado e presente", text: "A História investiga sociedades, conflitos, mudanças, permanências e diferentes formas de organização ao longo do tempo. Para aprender melhor, organize os acontecimentos em contextos e relações de causa e consequência, sempre considerando que diferentes grupos podem ter experiências históricas distintas.", highlights: ["Contexto histórico", "Causas, consequências e permanências", "Análise de fontes históricas"], image: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?auto=format&fit=crop&w=1200&q=80", imageAlt: "Livros e materiais de história" },
  geografia: { title: "Geografia: interpretar espaço, sociedade e natureza", text: "A Geografia ajuda a compreender como pessoas, atividades econômicas, território e ambiente se relacionam. Mapas, gráficos e imagens são ferramentas centrais. Ao estudar um fenômeno, pergunte onde ele acontece, por que ocorre naquele lugar e quais são seus impactos sociais, econômicos e ambientais.", highlights: ["Mapas e representação espacial", "População, território e economia", "Sociedade e meio ambiente"], image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80", imageAlt: "Mapa representando diferentes regiões do mundo" },
  ciencias: { title: "Ciências: explicar fenômenos do mundo", text: "Ciências desenvolve a capacidade de observar fenômenos, formular explicações e interpretar evidências. O estudo fica mais sólido quando você relaciona conceitos a situações do cotidiano, experimentos, tabelas e gráficos, entendendo não apenas o que acontece, mas também como podemos investigar o fenômeno.", highlights: ["Observação e evidências", "Experimentos e interpretação de dados", "Relação entre ciência e cotidiano"], image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80", imageAlt: "Laboratório e estudo de ciências" },
  ingles: { title: "Inglês: leitura, contexto e comunicação", text: "O estudo do Inglês envolve vocabulário, estruturas e, principalmente, comunicação. Para leitura, não é necessário conhecer todas as palavras: procure o tema, palavras-chave, conectores e informações que o contexto permite inferir. Esse método ajuda a compreender textos de diferentes assuntos.", highlights: ["Leitura e compreensão global", "Vocabulário pelo contexto", "Conectores e intenção comunicativa"], image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80", imageAlt: "Estudantes aprendendo juntos" },
  fisica: { title: "Física: transformar situações em modelos", text: "A Física descreve movimentos, forças, energia, ondas, eletricidade e muitos outros fenômenos por meio de modelos. Uma boa estratégia é identificar as grandezas, unidades e relações envolvidas antes de escolher uma fórmula. Depois do cálculo, verifique se a unidade e o valor fazem sentido.", highlights: ["Grandezas e unidades", "Leis e modelos físicos", "Gráficos e situações do cotidiano"], image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1200&q=80", imageAlt: "Conceitos de física e ciência" },
  quimica: { title: "Química: compreender a matéria e suas transformações", text: "A Química estuda a composição da matéria, suas propriedades e transformações. Um aprendizado completo conecta representações microscópicas, equações e fenômenos observáveis. Ao estudar uma reação, pense no que muda, no que permanece e nas condições necessárias para que ela aconteça.", highlights: ["Matéria e transformações", "Reações e conservação", "Química no cotidiano e ambiente"], image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=1200&q=80", imageAlt: "Experimento de química em laboratório" },
  astronomia: { title: "Astronomia: observar e compreender o Universo", text: "Astronomia investiga corpos celestes, movimentos, escalas e fenômenos do Universo. A compreensão começa pela observação do céu e avança para modelos que explicam fases, estações, eclipses, órbitas e outros fenômenos. Comparar escalas também ajuda a perceber a dimensão dos sistemas astronômicos.", highlights: ["Sistema Solar e movimentos", "Fases, eclipses e estações", "Escalas e observação do Universo"], image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1200&q=80", imageAlt: "Céu estrelado e astronomia" },
  sociologia: { title: "Sociologia: compreender a vida em sociedade", text: "A Sociologia analisa relações sociais, instituições, cultura, trabalho, desigualdades e formas de organização coletiva. O estudo fica mais interessante quando conceitos são aplicados a situações concretas e quando diferentes explicações para um mesmo fenômeno são comparadas com cuidado.", highlights: ["Cultura e socialização", "Desigualdades e trabalho", "Instituições, poder e cidadania"], image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80", imageAlt: "Grupo de pessoas representando sociedade" },
  oratoria: { title: "Oratória: comunicar ideias com clareza", text: "Oratória é a capacidade de organizar e apresentar ideias de maneira compreensível. Uma boa apresentação combina preparação, estrutura, linguagem adequada ao público, exemplos e controle do ritmo. Treinar também significa aprender a ouvir, responder perguntas e revisar a própria comunicação.", highlights: ["Estrutura de apresentação", "Clareza e argumentação", "Expressão e adaptação ao público"], image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80", imageAlt: "Pessoa apresentando uma ideia para um público" },
  filosofia: { title: "Filosofia: questionar, argumentar e analisar ideias", text: "A Filosofia estimula perguntas sobre conhecimento, ética, política, existência e linguagem. Estudar um filósofo não significa apenas decorar sua biografia: procure identificar o problema discutido, a tese apresentada e os argumentos usados para sustentá-la.", highlights: ["Problemas filosóficos", "Teses e argumentos", "Ética, política e conhecimento"], image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80", imageAlt: "Livros representando estudo filosófico" },
  biologia: { title: "Biologia: vida, organização e diversidade", text: "A Biologia estuda os seres vivos em diferentes níveis, das células aos ecossistemas. Os temas se conectam: genética ajuda a compreender características, evolução explica mudanças nas populações e ecologia mostra relações entre organismos e ambiente. Fazer conexões é mais útil que estudar cada tema isoladamente.", highlights: ["Célula e organização da vida", "Genética e evolução", "Ecologia e biodiversidade"], image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1200&q=80", imageAlt: "Estudo de biologia e estrutura celular" },
  "ensino-religioso": { title: "Ensino Religioso: diversidade, cultura e diálogo", text: "O estudo do fenômeno religioso pode abordar tradições, símbolos, valores, cultura e formas de convivência. O objetivo é compreender a diversidade e desenvolver diálogo respeitoso, distinguindo descrição de uma tradição de adesão pessoal a uma crença.", highlights: ["Diversidade religiosa", "Cultura e símbolos", "Ética, diálogo e respeito"], image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80", imageAlt: "Espaço de reflexão e estudo" },
  redacao: { title: "Redação: transformar ideias em argumentação", text: "Uma boa redação começa pela compreensão precisa do tema. Depois, é necessário formular uma tese, selecionar argumentos pertinentes, organizar os parágrafos e usar mecanismos de coesão. A revisão final deve verificar clareza, desenvolvimento das ideias e adequação ao gênero solicitado.", highlights: ["Tese e projeto de texto", "Argumentação e repertório", "Coesão e revisão"], image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1200&q=80", imageAlt: "Pessoa escrevendo uma redação" },
  literatura: { title: "Literatura: ler obras, estilos e contextos", text: "A Literatura permite analisar linguagem, personagens, narradores, temas e estilos. Contexto histórico é importante, mas a leitura do texto continua central. Ao estudar uma obra, observe como as escolhas de linguagem produzem efeitos e como elas se relacionam com o período e com outros textos.", highlights: ["Gêneros e recursos literários", "Escolas e contextos", "Leitura e interpretação de obras"], image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80", imageAlt: "Livros de literatura" },
  geopolitica: { title: "Geopolítica: território, poder e relações internacionais", text: "Geopolítica analisa como território, recursos, economia, população e poder influenciam relações entre Estados e outros atores. Mapas e dados ajudam a visualizar processos como globalização, formação de blocos, disputas territoriais e mudanças nas relações internacionais.", highlights: ["Território e poder", "Economia e relações internacionais", "Conflitos, blocos e recursos"], image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80", imageAlt: "Mapa e relações entre diferentes regiões" },
  empreendedorismo: { title: "Empreendedorismo: planejar, testar e aprender", text: "Empreendedorismo envolve identificar problemas, pensar em soluções, planejar recursos e avaliar resultados. Uma ideia precisa ser analisada em relação às pessoas que serão atendidas, aos custos, aos recursos disponíveis e aos riscos. O aprendizado vem também dos testes e das mudanças feitas a partir dos resultados.", highlights: ["Identificação de problemas", "Planejamento e recursos", "Inovação e avaliação de resultados"], image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80", imageAlt: "Equipe planejando um projeto" },
  "historia-da-arte": { title: "História da Arte: imagem, contexto e expressão", text: "A História da Arte relaciona obras a técnicas, ideias, sociedades e períodos. Ao observar uma imagem, comece pelos elementos visuais e depois investigue contexto, função, materiais e características do movimento. Comparações entre obras ajudam a perceber mudanças de estilo e de pensamento.", highlights: ["Elementos visuais e técnicas", "Movimentos e contextos históricos", "Comparação e interpretação de obras"], image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1200&q=80", imageAlt: "Obra de arte em exposição" },
  "ecologia-e-educacao-ambiental": { title: "Ecologia e Educação Ambiental: relações e sustentabilidade", text: "Ecologia estuda relações entre seres vivos e ambiente. Educação Ambiental amplia essa compreensão para decisões e práticas humanas, considerando recursos, impactos, conservação e qualidade de vida. Para estudar, conecte causas, consequências e possíveis estratégias de prevenção ou redução de impactos.", highlights: ["Ecossistemas e ciclos", "Impactos e conservação", "Sustentabilidade e responsabilidade"], image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80", imageAlt: "Floresta representando ecologia e conservação" },
  algebra: { title: "Álgebra: representar relações com símbolos", text: "A Álgebra permite representar quantidades desconhecidas e relações gerais. Expressões, equações, sistemas e funções transformam situações em modelos que podem ser analisados. Sempre que possível, interprete o significado das letras e verifique a solução no problema original.", highlights: ["Expressões e operações", "Equações e sistemas", "Funções e modelagem"], image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80", imageAlt: "Estudo de álgebra e matemática" },
  geometria: { title: "Geometria: compreender formas, medidas e espaço", text: "A Geometria desenvolve a capacidade de visualizar e calcular propriedades de figuras planas e espaciais. Desenhar a situação, identificar medidas e escolher uma relação adequada são passos importantes. Além do cálculo, procure compreender o significado geométrico do resultado.", highlights: ["Perímetro, área e volume", "Ângulos, semelhança e relações", "Figuras planas e espaciais"], image: "https://images.unsplash.com/photo-1635372722656-389f87a941b7?auto=format&fit=crop&w=1200&q=80", imageAlt: "Formas geométricas usadas em estudos" },
};

export function getDeepStudy(slug: string): DeepStudySection | null {
  return deepStudyData[slug] ?? null;
}

export type ExamPrepSection = {
  title: string;
  explanation: string;
  topics: string[];
  practice: string;
};

const examPrepTips: Record<string, string> = {
  matematica: "Em ENEM e vestibulares, priorize interpretação de problemas, proporcionalidade, porcentagem, funções, estatística, geometria e leitura de gráficos. Treine reconhecer qual ferramenta matemática o enunciado pede antes de calcular.",
  portugues: "Em provas, treine interpretação, inferência, efeitos de sentido, gêneros textuais, gramática em contexto, variação linguística e relações entre texto e linguagem. Leia o enunciado até identificar exatamente o que está sendo perguntado.",
  historia: "Em ENEM e vestibulares, relacione acontecimentos históricos a contexto, causas, consequências, permanências e mudanças. Questões podem combinar texto, imagem, fonte histórica, mapa ou gráfico.",
  geografia: "Priorize leitura de mapas, gráficos e tabelas, território, população, urbanização, economia, ambiente e relações entre sociedade e natureza. Procure sempre relacionar fenômenos locais e globais.",
  ciencias: "Use os conceitos científicos para explicar situações do cotidiano e interpretar experimentos, tabelas e gráficos. Procure entender causa e consequência em vez de decorar definições isoladas.",
  ingles: "Em ENEM e vestibulares, a leitura e a compreensão global são fundamentais. Treine identificar tema, objetivo, informação explícita, inferência, palavras pelo contexto e intenção comunicativa.",
  fisica: "Priorize interpretação de situações, unidades, gráficos, movimento, energia, forças, eletricidade e fenômenos do cotidiano. Antes de usar uma fórmula, identifique as grandezas e o que o problema realmente pede.",
  quimica: "Treine interpretação de fenômenos, gráficos, tabelas e situações ambientais ou tecnológicas. Dê atenção a matéria, transformações, estequiometria, soluções, energia e química orgânica conforme seu nível.",
  astronomia: "Astronomia pode fortalecer questões interdisciplinares de Ciências e Geografia. Revise movimentos da Terra, fases, estações, sistema solar, gravitação, escalas e interpretação de dados astronômicos.",
  sociologia: "Para provas de Humanas, relacione conceitos sociológicos a situações sociais, textos e dados. Revise cultura, socialização, desigualdade, trabalho, poder, cidadania e instituições.",
  oratoria: "Oratória ajuda na comunicação e na produção de argumentos. Treine tese, organização de ideias, clareza, seleção de evidências e apresentação oral, competências úteis para estudos e trabalhos.",
  filosofia: "Em provas, treine identificar a tese de um texto, conceitos, argumentos e relações entre ideias. Revise ética, política, conhecimento, filosofia antiga e moderna e autores estudados no ensino médio.",
  biologia: "Priorize interpretação de fenômenos e experimentos ligados a células, genética, evolução, ecologia, fisiologia e biodiversidade. Questões frequentemente exigem aplicar conceitos a situações novas.",
  "ensino-religioso": "O conteúdo pode contribuir principalmente para repertório cultural e compreensão da diversidade, ética e relações sociais. Em provas, conecte religião a cultura, direitos, cidadania, história e respeito à diversidade sem confundir perspectivas religiosas diferentes.",
  redacao: "Na preparação para o ENEM, treine texto dissertativo-argumentativo, leitura cuidadosa do tema, tese, argumentos, repertório pertinente, coesão e proposta de intervenção. Revise cada parágrafo e verifique se todas as ideias estão ligadas ao tema.",
  literatura: "Revise escolas literárias, gêneros, contexto histórico, linguagem e características das obras. Em vestibulares, treine relacionar trecho, estilo, contexto e recursos de linguagem, em vez de decorar somente listas de autores.",
  geopolitica: "Relacione território, poder, economia e relações internacionais a acontecimentos e processos contemporâneos. Treine mapas, gráficos e textos sobre globalização, conflitos, blocos econômicos e recursos estratégicos.",
  empreendedorismo: "Pode contribuir para questões e projetos interdisciplinares sobre economia, trabalho, planejamento e cidadania. Revise orçamento, custos, organização de projetos, inovação e tomada de decisão responsável.",
  "historia-da-arte": "Revise movimentos artísticos junto de seus contextos históricos, técnicas e características. Em provas, treine observar imagens e relacionar elementos visuais ao período, movimento e contexto cultural.",
  "ecologia-e-educacao-ambiental": "É especialmente útil para Ciências da Natureza e questões interdisciplinares. Revise ecossistemas, ciclos, biodiversidade, impactos ambientais, conservação e sustentabilidade, sempre relacionando causas, consequências e possíveis soluções.",
  algebra: "Em Matemática, treine expressões, equações, sistemas, funções e modelagem de situações. O mais importante é transformar o enunciado em uma relação matemática e conferir se a resposta faz sentido.",
  geometria: "Treine interpretação de figuras, medidas, áreas, perímetros, circunferência, semelhança, Pitágoras e geometria espacial. Faça desenhos quando necessário e confira unidades antes de concluir.",
};

export function getExamPrep(slug: string): ExamPrepSection[] {
  const subject = getSubject(slug);
  if (!subject) return [];
  const tip = examPrepTips[slug] ?? ("Para provas e vestibulares, revise os conceitos fundamentais de " + subject.name + ", pratique questões contextualizadas e aprenda a justificar suas respostas.");
  return subject.studyPages.map((page, index) => ({
    title: (index + 1) + ". " + page.title + " — preparação para provas",
    explanation: page.text + " Em uma preparação para ENEM e vestibulares, transforme esse conteúdo em compreensão aplicada: identifique os conceitos principais, relacione-os com situações e pratique a interpretação de questões. " + tip,
    topics: [...page.topics, "Interpretação de questões", "Aplicação do conceito"],
    practice: "Prática sugerida: revise " + page.topics.join(", ") + ", depois resolva questões sobre esses assuntos e explique com suas próprias palavras por que a resposta escolhida está correta.",
  }));
}

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
