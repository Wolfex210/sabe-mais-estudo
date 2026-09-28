/**
 * Conteúdo por ano escolar (1º ano do Fundamental ao 3º ano do Médio),
 * organizado com base na BNCC. Cada item: "Tópico | explicação".
 */

export const YEARS = [
  "1º EF", "2º EF", "3º EF", "4º EF", "5º EF", "6º EF", "7º EF", "8º EF", "9º EF",
  "1º EM", "2º EM", "3º EM",
] as const;
export type Year = (typeof YEARS)[number];

export const YEAR_LABEL: Record<Year, string> = {
  "1º EF": "1º ano – Fundamental", "2º EF": "2º ano – Fundamental", "3º EF": "3º ano – Fundamental",
  "4º EF": "4º ano – Fundamental", "5º EF": "5º ano – Fundamental", "6º EF": "6º ano – Fundamental",
  "7º EF": "7º ano – Fundamental", "8º EF": "8º ano – Fundamental", "9º EF": "9º ano – Fundamental",
  "1º EM": "1º ano – Ensino Médio", "2º EM": "2º ano – Ensino Médio", "3º EM": "3º ano – Ensino Médio",
};

type Topics = Partial<Record<Year, string[]>>;

export const curriculum: Record<string, Topics> = {
  matematica: {
    "1º EF": [
      "Contagem até 100 | Contar objetos, ler e escrever números e entender que cada número representa uma quantidade.",
      "Adição e subtração simples | Juntar (somar) e tirar (subtrair) quantidades pequenas usando objetos e desenhos.",
      "Formas geométricas | Reconhecer círculo, quadrado, triângulo e retângulo no dia a dia.",
      "Medidas do dia a dia | Comparar: maior/menor, mais alto/mais baixo, mais pesado/mais leve.",
    ],
    "2º EF": [
      "Números até 1000 | Unidade, dezena e centena: 245 = 2 centenas + 4 dezenas + 5 unidades.",
      "Adição e subtração com reagrupamento | O famoso \"vai um\" e \"empresta um\" nas contas armadas.",
      "Ideia de multiplicação | Somar parcelas iguais: 3 + 3 + 3 + 3 = 4 × 3 = 12.",
      "Dinheiro, tempo e calendário | Moedas e cédulas do real, horas no relógio, dias, semanas e meses.",
    ],
    "3º EF": [
      "Tabuada | Multiplicações de 1 a 10 e suas propriedades (a ordem não altera o resultado).",
      "Divisão | Repartir em partes iguais: 12 ÷ 3 = 4. O que sobra é o resto.",
      "Medidas | Metro e centímetro, quilo e grama, litro e mililitro.",
      "Figuras espaciais | Cubo, esfera, cilindro, cone e pirâmide: faces, arestas e vértices.",
    ],
    "4º EF": [
      "Números até a dezena de milhar | Leitura, escrita, composição e comparação de números grandes.",
      "Multiplicação e divisão com mais algarismos | Algoritmo da multiplicação e divisão por 1 algarismo.",
      "Frações simples | 1/2, 1/3, 1/4: parte de um inteiro dividido em partes iguais.",
      "Perímetro e área | Perímetro é o contorno; área é a superfície, contada em quadradinhos.",
    ],
    "5º EF": [
      "Números decimais | 0,5 = 5/10. Décimos, centésimos e milésimos; uso com dinheiro.",
      "Frações equivalentes e porcentagem | 1/2 = 2/4 = 50%. 25% é um quarto de algo.",
      "Operações com decimais | Somar e subtrair alinhando a vírgula.",
      "Gráficos e tabelas | Ler e montar gráficos de barras e de colunas.",
    ],
    "6º EF": [
      "Números naturais e sistema decimal | Valor posicional, ordens e classes.",
      "Múltiplos, divisores, MMC e MDC | Critérios de divisibilidade, números primos e fatoração.",
      "Frações e decimais | Operações com frações e conversão entre fração, decimal e porcentagem.",
      "Geometria plana | Ângulos, retas paralelas e perpendiculares, polígonos.",
    ],
    "7º EF": [
      "Números inteiros | Positivos e negativos, reta numérica e regra de sinais.",
      "Números racionais | Operações com frações e decimais positivos e negativos.",
      "Equações do 1º grau | ax + b = c: isolar o x fazendo a mesma operação dos dois lados.",
      "Razão, proporção e regra de três | a/b = c/d → a·d = b·c. Grandezas diretas e inversas.",
      "Ângulos e triângulos | A soma dos ângulos internos de um triângulo é 180°.",
    ],
    "8º EF": [
      "Potenciação e radiciação | Propriedades das potências, raiz quadrada e notação científica.",
      "Expressões algébricas e produtos notáveis | (a + b)² = a² + 2ab + b².",
      "Sistemas de equações do 1º grau | Métodos da substituição e da adição.",
      "Área de figuras planas | Quadrado, retângulo, triângulo, trapézio, losango e círculo (πr²).",
      "Estatística | Média, moda e mediana.",
    ],
    "9º EF": [
      "Números reais | Racionais e irracionais (√2, π).",
      "Equação do 2º grau | ax² + bx + c = 0; Δ = b² − 4ac; x = (−b ± √Δ)/2a.",
      "Funções | Ideia de função, função afim (y = ax + b) e gráficos.",
      "Teorema de Pitágoras e semelhança | a² = b² + c²; Teorema de Tales.",
      "Relações trigonométricas no triângulo retângulo | seno, cosseno e tangente.",
    ],
    "1º EM": [
      "Conjuntos | União, interseção, diferença e conjuntos numéricos.",
      "Função afim e quadrática | Gráficos, raízes, vértice (−b/2a, −Δ/4a) e estudo do sinal.",
      "Função exponencial e logarítmica | aˣ e logₐb = x ⇔ aˣ = b; propriedades dos logaritmos.",
      "Progressões | PA: aₙ = a₁ + (n−1)r. PG: aₙ = a₁·qⁿ⁻¹.",
      "Trigonometria no triângulo | Leis dos senos e dos cossenos.",
    ],
    "2º EM": [
      "Trigonometria no ciclo | Radianos, funções seno, cosseno e tangente.",
      "Matrizes e determinantes | Operações com matrizes, determinante 2×2 e 3×3 (Sarrus).",
      "Sistemas lineares | Escalonamento e regra de Cramer.",
      "Análise combinatória | Princípio fundamental da contagem, permutação, arranjo e combinação.",
      "Probabilidade | P = casos favoráveis / casos possíveis.",
      "Geometria espacial | Prismas, pirâmides, cilindros, cones e esferas: áreas e volumes.",
    ],
    "3º EM": [
      "Geometria analítica | Distância entre pontos, equação da reta e da circunferência.",
      "Números complexos | i² = −1; forma algébrica a + bi e operações.",
      "Polinômios e equações algébricas | Divisão de polinômios, Briot-Ruffini, relações de Girard.",
      "Estatística | Média, mediana, moda, variância e desvio padrão.",
      "Matemática financeira | Juros simples J = C·i·t e compostos M = C(1+i)ᵗ.",
      "Revisão ENEM | Interpretação de gráficos, proporcionalidade e porcentagem.",
    ],
  },

  portugues: {
    "1º EF": [
      "Alfabeto | Vogais e consoantes, letras maiúsculas e minúsculas.",
      "Sílabas | Juntar letras para formar sílabas e sílabas para formar palavras.",
      "Leitura de palavras e frases | Ler pequenos textos, parlendas e cantigas.",
      "Escrita do nome | Escrever o próprio nome e palavras do cotidiano.",
    ],
    "2º EF": [
      "Ortografia inicial | Uso de R/RR, S/SS, M antes de P e B.",
      "Frase e pontuação | Ponto final, interrogação e exclamação.",
      "Leitura e interpretação | Fábulas, bilhetes e contos curtos.",
      "Produção de textos curtos | Contar uma história com começo, meio e fim.",
    ],
    "3º EF": [
      "Substantivo e adjetivo | Substantivo nomeia; adjetivo caracteriza.",
      "Singular e plural, masculino e feminino | Flexões das palavras.",
      "Sinais gráficos | Acento agudo, circunflexo, til e cedilha.",
      "Gêneros textuais | Carta, receita, notícia e história em quadrinhos.",
    ],
    "4º EF": [
      "Verbos | Ação, estado ou fenômeno; tempos presente, passado e futuro.",
      "Pronomes pessoais | Eu, tu, ele, nós, vós, eles.",
      "Sílaba tônica | Oxítonas, paroxítonas e proparoxítonas.",
      "Paragrafação | Organizar ideias em parágrafos.",
    ],
    "5º EF": [
      "Classes de palavras | Artigo, numeral, advérbio, preposição e conjunção.",
      "Acentuação | Todas as proparoxítonas são acentuadas.",
      "Discurso direto e indireto | Uso do travessão e dos dois-pontos.",
      "Interpretação | Ideia principal, fato e opinião.",
    ],
    "6º EF": [
      "Variação linguística | Linguagem formal e informal; regionalismos.",
      "Fonologia | Fonema, letra, dígrafo, encontro vocálico e consonantal.",
      "Estrutura das palavras | Radical, prefixo e sufixo.",
      "Gêneros narrativos | Conto, crônica e lenda: narrador, personagens, tempo e espaço.",
    ],
    "7º EF": [
      "Frase, oração e período | Oração tem verbo; período pode ser simples ou composto.",
      "Sujeito e predicado | Tipos de sujeito: simples, composto, oculto, indeterminado e inexistente.",
      "Verbos: modos e tempos | Indicativo, subjuntivo e imperativo.",
      "Textos jornalísticos | Notícia, reportagem e entrevista.",
    ],
    "8º EF": [
      "Termos integrantes | Objeto direto, objeto indireto, complemento nominal e agente da passiva.",
      "Termos acessórios | Adjunto adnominal, adjunto adverbial e aposto; vocativo.",
      "Vozes verbais | Ativa, passiva e reflexiva.",
      "Textos argumentativos | Artigo de opinião: tese, argumentos e conclusão.",
    ],
    "9º EF": [
      "Período composto | Coordenação e subordinação.",
      "Orações subordinadas | Substantivas, adjetivas e adverbiais.",
      "Concordância e regência | Verbo concorda com o sujeito; verbos exigem preposições.",
      "Crase | Fusão de a + a: \"Vou à escola\".",
      "Figuras de linguagem | Metáfora, comparação, metonímia, ironia, hipérbole.",
    ],
    "1º EM": [
      "Literatura: Trovadorismo, Humanismo e Classicismo | Cantigas, Gil Vicente e Camões.",
      "Quinhentismo, Barroco e Arcadismo | Carta de Caminha, Gregório de Matos, Tomás A. Gonzaga.",
      "Morfologia completa | As 10 classes gramaticais.",
      "Funções da linguagem | Referencial, emotiva, conativa, fática, metalinguística e poética.",
    ],
    "2º EM": [
      "Romantismo | Poesia (Gonçalves Dias, Álvares de Azevedo, Castro Alves) e prosa (José de Alencar).",
      "Realismo e Naturalismo | Machado de Assis (Dom Casmurro) e Aluísio Azevedo (O Cortiço).",
      "Parnasianismo e Simbolismo | Olavo Bilac e Cruz e Sousa.",
      "Sintaxe | Análise do período simples e composto.",
    ],
    "3º EM": [
      "Pré-Modernismo e Modernismo | Semana de 22, Oswald e Mário de Andrade, Drummond, Graciliano.",
      "Literatura contemporânea | Clarice Lispector, Guimarães Rosa, João Cabral.",
      "Redação ENEM | Dissertativo-argumentativo: introdução, 2 desenvolvimentos e proposta de intervenção.",
      "Revisão gramatical | Concordância, regência, crase, pontuação e colocação pronominal.",
    ],
  },

  historia: {
    "1º EF": [
      "Minha história | Quem sou eu, minha família e minhas lembranças.",
      "Passado e presente | Como eram as brincadeiras e objetos antigamente.",
      "A escola | Regras de convivência e a história da escola.",
    ],
    "2º EF": [
      "Comunidade | O bairro e as pessoas que vivem nele.",
      "Tempo | Linha do tempo, calendário e medidas de tempo.",
      "Trabalho | Profissões de ontem e de hoje.",
    ],
    "3º EF": [
      "A cidade | Como as cidades surgem e se transformam.",
      "Patrimônio | Monumentos, festas e tradições locais.",
      "Espaços públicos e privados | Praças, ruas e casas.",
    ],
    "4º EF": [
      "Nomadismo e sedentarismo | Da caça e coleta à agricultura.",
      "Povos indígenas | Primeiros habitantes do Brasil e suas culturas.",
      "Migrações | Movimentos humanos ao longo do tempo.",
    ],
    "5º EF": [
      "Primeiras civilizações | Mesopotâmia, Egito e a escrita.",
      "Cidadania e direitos | Direitos humanos e o voto.",
      "Registros históricos | Fontes escritas, orais e materiais.",
    ],
    "6º EF": [
      "Pré-História | Paleolítico, Neolítico e Idade dos Metais.",
      "Antiguidade Oriental | Egito, Mesopotâmia, hebreus, fenícios e persas.",
      "Grécia Antiga | Esparta, Atenas e a democracia.",
      "Roma Antiga | Monarquia, República e Império.",
    ],
    "7º EF": [
      "Idade Média | Feudalismo, Igreja e Cruzadas.",
      "Renascimento e Reformas | Humanismo, Lutero e Contrarreforma.",
      "Grandes Navegações | Portugal e Espanha no mar.",
      "Brasil Colônia | Capitanias, açúcar e escravidão.",
    ],
    "8º EF": [
      "Iluminismo | Razão, Montesquieu, Rousseau e Voltaire.",
      "Revolução Francesa e Industrial | Liberdade, igualdade, fraternidade; máquinas a vapor.",
      "Independência do Brasil | 1822 e o Primeiro Reinado.",
      "Período Regencial e Segundo Reinado | Revoltas, café e abolição (1888).",
    ],
    "9º EF": [
      "República Velha | Café com leite, coronelismo e revoltas.",
      "Primeira e Segunda Guerra Mundial | Causas, alianças e consequências.",
      "Era Vargas | Estado Novo e leis trabalhistas.",
      "Guerra Fria e Ditadura Militar | EUA × URSS; Brasil de 1964 a 1985.",
      "Redemocratização | Constituição de 1988.",
    ],
    "1º EM": [
      "Introdução à História | Fontes, tempo histórico e historiografia.",
      "Antiguidade clássica aprofundada | Grécia e Roma: política, cultura e legado.",
      "Idade Média | Feudalismo, Império Bizantino e mundo islâmico.",
      "África e América pré-colonial | Reinos africanos, maias, astecas e incas.",
    ],
    "2º EM": [
      "Idade Moderna | Absolutismo, mercantilismo e colonização.",
      "Brasil Colônia e Império | Economia, sociedade e revoltas.",
      "Revoluções burguesas | Inglesa, Americana e Francesa.",
      "Imperialismo | Partilha da África e da Ásia.",
    ],
    "3º EM": [
      "Século XX | Guerras mundiais, Revolução Russa e crise de 1929.",
      "Brasil República | Da República Velha à Nova República.",
      "Guerra Fria e descolonização | Bipolaridade, Cuba, Vietnã.",
      "Mundo contemporâneo | Globalização e conflitos atuais.",
    ],
  },

  geografia: {
    "1º EF": [
      "Meu lugar | A casa, a escola e o caminho entre elas.",
      "Paisagem | Elementos naturais e construídos.",
      "Dia e noite | Rotinas e o movimento do Sol.",
    ],
    "2º EF": [
      "Orientação | Frente, atrás, direita, esquerda.",
      "Meios de transporte e comunicação | Como as pessoas se deslocam e se comunicam.",
      "Uso da água | Importância e cuidados.",
    ],
    "3º EF": [
      "Campo e cidade | Diferenças e relações entre eles.",
      "Mapas simples | Legenda e representação dos lugares.",
      "Recursos naturais | Solo, água e vegetação.",
    ],
    "4º EF": [
      "Pontos cardeais | Norte, Sul, Leste e Oeste.",
      "Município e estado | Organização territorial.",
      "Relevo e hidrografia | Montanhas, planaltos, planícies e rios.",
    ],
    "5º EF": [
      "Regiões do Brasil | Norte, Nordeste, Centro-Oeste, Sudeste e Sul.",
      "População brasileira | Diversidade e distribuição.",
      "Problemas ambientais | Poluição, desmatamento e reciclagem.",
    ],
    "6º EF": [
      "Planeta Terra | Movimentos de rotação e translação; estações do ano.",
      "Cartografia | Escala, coordenadas geográficas (latitude e longitude).",
      "Estrutura da Terra | Crosta, manto e núcleo; placas tectônicas.",
      "Clima e vegetação | Tempo × clima; biomas.",
    ],
    "7º EF": [
      "Território brasileiro | Formação e divisão regional.",
      "Biomas do Brasil | Amazônia, Cerrado, Caatinga, Mata Atlântica, Pampa e Pantanal.",
      "População do Brasil | Crescimento, migrações e urbanização.",
      "Economia brasileira | Agropecuária, indústria e serviços.",
    ],
    "8º EF": [
      "América | Aspectos físicos, população e economia.",
      "África | Diversidade, colonização e desafios atuais.",
      "Globalização | Blocos econômicos (Mercosul, Nafta/USMCA).",
      "Desenvolvimento | IDH e desigualdade.",
    ],
    "9º EF": [
      "Europa | Formação, União Europeia.",
      "Ásia | China, Japão, Índia e Oriente Médio.",
      "Oceania e regiões polares | Características gerais.",
      "Geopolítica mundial | Conflitos e ordem mundial.",
    ],
    "1º EM": [
      "Cartografia avançada | Projeções, fusos horários e sensoriamento remoto.",
      "Geologia e geomorfologia | Rochas, minerais e agentes do relevo.",
      "Climatologia | Massas de ar, fenômenos El Niño e La Niña.",
      "Hidrografia e biomas mundiais | Bacias hidrográficas e domínios morfoclimáticos.",
    ],
    "2º EM": [
      "População mundial | Transição demográfica, pirâmides etárias e migrações.",
      "Urbanização | Metrópoles, megalópoles e problemas urbanos.",
      "Industrialização | Revoluções industriais e fontes de energia.",
      "Agropecuária | Agronegócio, agricultura familiar e questão agrária.",
    ],
    "3º EM": [
      "Globalização e geopolítica | Nova ordem mundial, blocos e organismos internacionais.",
      "Conflitos mundiais | Oriente Médio, terrorismo e refugiados.",
      "Questões ambientais | Aquecimento global, acordos climáticos e sustentabilidade.",
      "Geografia do Brasil para o ENEM | Regionalização, economia e meio ambiente.",
    ],
  },

  ciencias: {
    "1º EF": [
      "Corpo humano | Partes do corpo e os cinco sentidos.",
      "Hábitos de higiene | Lavar as mãos, escovar os dentes e tomar banho.",
      "Materiais | Objetos feitos de plástico, madeira, metal e vidro.",
    ],
    "2º EF": [
      "Seres vivos | Plantas e animais: características e cuidados.",
      "Luz e som | Sol como fonte de luz e calor.",
      "Prevenção de acidentes | Cuidados em casa.",
    ],
    "3º EF": [
      "Animais | Vertebrados e invertebrados, alimentação e habitat.",
      "Som e luz | Como o som se propaga; sombras.",
      "Terra | Formato do planeta, solo e ar.",
    ],
    "4º EF": [
      "Cadeias alimentares | Produtores, consumidores e decompositores.",
      "Microrganismos | Fungos, bactérias e doenças.",
      "Misturas e transformações | Mudanças reversíveis e irreversíveis.",
    ],
    "5º EF": [
      "Sistemas do corpo | Digestório, respiratório e circulatório.",
      "Alimentação saudável | Nutrientes e pirâmide alimentar.",
      "Ciclo da água | Evaporação, condensação e precipitação.",
      "Astronomia | Constelações e fases da Lua.",
    ],
    "6º EF": [
      "Célula | Unidade básica da vida: membrana, citoplasma e núcleo.",
      "Níveis de organização | Célula → tecido → órgão → sistema → organismo.",
      "Sistema nervoso e visão | Neurônios e funcionamento dos olhos.",
      "Misturas | Homogêneas e heterogêneas; métodos de separação.",
    ],
    "7º EF": [
      "Máquinas simples | Alavancas, polias e plano inclinado.",
      "Calor e temperatura | Condução, convecção e irradiação.",
      "Ecossistemas | Biomas e impactos ambientais.",
      "Atmosfera | Composição do ar e efeito estufa.",
    ],
    "8º EF": [
      "Reprodução | Sistemas reprodutores, puberdade e métodos contraceptivos.",
      "Energia | Fontes renováveis e não renováveis; circuitos elétricos.",
      "Sistema Sol-Terra-Lua | Estações do ano, marés e eclipses.",
      "Clima | Fenômenos atmosféricos.",
    ],
    "9º EF": [
      "Matéria e átomo | Modelos atômicos, elementos e tabela periódica.",
      "Reações químicas | Reagentes e produtos; conservação da massa.",
      "Genética | DNA, genes e primeira lei de Mendel.",
      "Evolução | Darwin e seleção natural.",
      "Ondas e radiação | Luz, som e ondas eletromagnéticas.",
    ],
    "1º EM": [
      "Biologia: Citologia | Organelas, membrana plasmática, respiração celular e fotossíntese.",
      "Bioquímica | Carboidratos, lipídios, proteínas, vitaminas e ácidos nucleicos.",
      "Divisão celular | Mitose e meiose.",
      "Ecologia | Cadeias, teias, ciclos biogeoquímicos e relações ecológicas.",
    ],
    "2º EM": [
      "Classificação dos seres vivos | Vírus, bactérias, protozoários, fungos, plantas e animais.",
      "Botânica | Briófitas, pteridófitas, gimnospermas e angiospermas.",
      "Zoologia | Invertebrados e vertebrados.",
      "Fisiologia humana | Todos os sistemas do corpo humano.",
    ],
    "3º EM": [
      "Genética | Leis de Mendel, grupos sanguíneos, herança ligada ao sexo.",
      "Biotecnologia | Transgênicos, clonagem e DNA recombinante.",
      "Evolução | Lamarck, Darwin, neodarwinismo e especiação.",
      "Revisão ENEM de Biologia | Ecologia, saúde e meio ambiente.",
    ],
  },

  ingles: {
    "1º EF": ["Greetings | Hello, hi, goodbye, good morning.", "Colors | Red, blue, yellow, green.", "Numbers 1–10 | One, two, three..."],
    "2º EF": ["Family | Mother, father, brother, sister.", "Animals | Dog, cat, bird, fish.", "Numbers 1–20 | Eleven, twelve... twenty."],
    "3º EF": ["School objects | Pen, pencil, book, eraser.", "Body parts | Head, eyes, hands, feet.", "Toys and games | Ball, doll, kite."],
    "4º EF": ["Food | Apple, bread, milk, rice.", "Days of the week and months | Monday... January...", "Verb to be (I am, you are) | Frases simples de identificação."],
    "5º EF": ["Daily routine | Wake up, have breakfast, go to school.", "Weather and seasons | Sunny, rainy; summer, winter.", "Can / can't | Falar de habilidades: I can swim."],
    "6º EF": [
      "Verb to be | I am, you are, he/she/it is – afirmativa, negativa e interrogativa.",
      "Personal pronouns e possessive adjectives | I/my, you/your, he/his, she/her.",
      "There is / there are | Indicar existência: There is a book.",
      "Simple present | I play / She plays – rotina e hábitos.",
    ],
    "7º EF": [
      "Present continuous | I am studying now.",
      "Simple past | Verbos regulares (-ed) e irregulares (went, saw).",
      "Adjectives | Posição antes do substantivo: a big house.",
      "Countable / uncountable | Many, much, some, any.",
    ],
    "8º EF": [
      "Future | Will e going to.",
      "Comparatives e superlatives | Taller, the tallest; more beautiful.",
      "Past continuous | I was reading when...",
      "Modal verbs | Should, must, might.",
    ],
    "9º EF": [
      "Present perfect | I have lived here since 2010.",
      "Passive voice | The book was written by...",
      "Conditionals 0 e 1 | If it rains, I will stay home.",
      "Reading strategies | Skimming, scanning e cognatos.",
    ],
    "1º EM": ["Interpretação de textos | Cognatos, falsos cognatos e inferência.", "Tempos verbais revisados | Presente, passado e futuro.", "Pronouns e articles | Pronomes e artigos definidos/indefinidos."],
    "2º EM": ["Present perfect continuous e past perfect | Ações anteriores a outras no passado.", "Conditionals 2 e 3 | If I were you... / If I had known...", "Relative pronouns | Who, which, that, whose."],
    "3º EM": ["Reported speech | He said that he was tired.", "Phrasal verbs e linking words | Give up, however, although.", "Inglês no ENEM | Estratégias de leitura e questões comentadas."],
  },

  fisica: {
    "9º EF": [
      "Introdução à Física | Grandezas, unidades (SI) e medidas.",
      "Movimento | Velocidade média v = Δs/Δt.",
      "Força | Leis de Newton de forma introdutória.",
      "Energia | Cinética, potencial e conservação.",
    ],
    "1º EM": [
      "Cinemática | MU (s = s₀ + vt), MUV (v = v₀ + at; s = s₀ + v₀t + at²/2), Torricelli.",
      "Lançamentos e movimento circular | Queda livre, lançamento oblíquo, velocidade angular.",
      "Dinâmica | Leis de Newton: F = m·a; atrito, peso e força normal.",
      "Trabalho, energia e potência | τ = F·d; Ec = mv²/2; Ep = mgh; P = τ/Δt.",
      "Quantidade de movimento e gravitação | Q = m·v; Leis de Kepler; F = G·Mm/d².",
      "Hidrostática | Pressão, empuxo (Arquimedes) e princípio de Pascal.",
    ],
    "2º EM": [
      "Termologia | Escalas termométricas, dilatação e calorimetria Q = m·c·ΔT.",
      "Termodinâmica | Gases, 1ª e 2ª leis, máquinas térmicas.",
      "Óptica | Reflexão, refração, espelhos e lentes.",
      "Ondulatória | v = λ·f; som, ressonância e efeito Doppler.",
    ],
    "3º EM": [
      "Eletrostática | Carga, Lei de Coulomb, campo e potencial elétrico.",
      "Eletrodinâmica | Corrente, Lei de Ohm U = R·i, potência P = U·i, circuitos.",
      "Magnetismo e eletromagnetismo | Ímãs, campo magnético e indução (Faraday).",
      "Física Moderna | Relatividade, efeito fotoelétrico e física nuclear.",
    ],
  },

  quimica: {
    "9º EF": [
      "Matéria e seus estados | Sólido, líquido e gasoso; mudanças de estado.",
      "Átomo | Prótons, nêutrons e elétrons.",
      "Tabela periódica | Grupos, períodos e símbolos.",
      "Ligações e reações | Noções de ligações químicas e reações.",
    ],
    "1º EM": [
      "Matéria e substâncias | Substâncias puras, misturas e separação.",
      "Modelos atômicos | Dalton, Thomson, Rutherford e Bohr; distribuição eletrônica.",
      "Tabela periódica | Propriedades periódicas: raio, eletronegatividade, energia de ionização.",
      "Ligações químicas | Iônica, covalente e metálica; geometria e polaridade.",
      "Funções inorgânicas | Ácidos, bases, sais e óxidos.",
      "Estequiometria | Mol (6,02×10²³), massa molar e cálculos.",
    ],
    "2º EM": [
      "Soluções | Concentração C = m/V, molaridade e diluição.",
      "Propriedades coligativas | Ebulioscopia, crioscopia e osmose.",
      "Termoquímica | ΔH, reações exo e endotérmicas, Lei de Hess.",
      "Cinética química | Velocidade das reações e fatores que a alteram.",
      "Equilíbrio químico e pH | Kc, Le Chatelier; pH = −log[H⁺].",
      "Eletroquímica | Pilhas e eletrólise.",
    ],
    "3º EM": [
      "Química orgânica | O carbono, cadeias carbônicas e hidrocarbonetos.",
      "Funções orgânicas | Álcool, aldeído, cetona, ácido carboxílico, éster, amina e amida.",
      "Isomeria | Plana e espacial.",
      "Reações orgânicas e polímeros | Adição, substituição, combustão; plásticos.",
      "Química ambiental | Chuva ácida, efeito estufa e radioatividade.",
    ],
  },
};

export function parseTopic(t: string) {
  const [title, text] = t.split(" | ");
  return { title: title ?? t, text: text ?? "" };
}
