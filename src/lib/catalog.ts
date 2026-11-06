/** Catálogo público (nomes e descrições). O conteúdo de estudo fica no servidor e só é entregue conforme o plano. Gerado a partir dos módulos de conteúdo. */
export type SubjectInfo = { slug: string; name: string; emoji: string; color: string; intro: string };
export type FacultyCourseInfo = { slug: string; name: string; area: string; duration: string; description: string; coverAlt: string };
export const subjects: SubjectInfo[] = [
 {
  "slug": "matematica",
  "name": "Matemática",
  "emoji": "🧮",
  "color": "bg-sky-100",
  "intro": "Uma trilha completa de matemática com conceitos, estratégias, resolução passo a passo e aplicações por ano escolar."
 },
 {
  "slug": "portugues",
  "name": "Português",
  "emoji": "📖",
  "color": "bg-rose-100",
  "intro": "Leitura, interpretação, gramática, literatura, oralidade e produção textual em uma trilha aprofundada por ano."
 },
 {
  "slug": "historia",
  "name": "História",
  "emoji": "🏛️",
  "color": "bg-amber-100",
  "intro": "História mundial e do Brasil com fontes históricas, cronologia, diferentes perspectivas e análise crítica em cada ano."
 },
 {
  "slug": "geografia",
  "name": "Geografia",
  "emoji": "🌎",
  "color": "bg-emerald-100",
  "intro": "Geografia física e humana, cartografia, população, economia, território e ambiente com estudos de caso por ano."
 },
 {
  "slug": "ciencias",
  "name": "Ciências",
  "emoji": "🔬",
  "color": "bg-lime-100",
  "intro": "Ciências da natureza com investigação, experiências seguras, vida, matéria, energia, Terra e ambiente em todos os anos."
 },
 {
  "slug": "ingles",
  "name": "Inglês",
  "emoji": "🇬🇧",
  "color": "bg-indigo-100",
  "intro": "Inglês por níveis e anos: vocabulário, gramática em contexto, leitura, escuta, fala e escrita comunicativa."
 },
 {
  "slug": "fisica",
  "name": "Física",
  "emoji": "⚛️",
  "color": "bg-cyan-100",
  "intro": "Movimento, forças e energia com fórmulas aplicadas."
 },
 {
  "slug": "quimica",
  "name": "Química",
  "emoji": "⚗️",
  "color": "bg-violet-100",
  "intro": "Átomos, tabela periódica e reações químicas."
 },
 {
  "slug": "astronomia",
  "name": "Astronomia",
  "emoji": "🌌",
  "color": "bg-slate-100",
  "intro": "Estude o Universo, os astros e os fenômenos do espaço."
 },
 {
  "slug": "sociologia",
  "name": "Sociologia",
  "emoji": "👥",
  "color": "bg-pink-100",
  "intro": "Compreenda sociedade, cultura, grupos sociais e relações humanas."
 },
 {
  "slug": "oratoria",
  "name": "Oratória",
  "emoji": "🎤",
  "color": "bg-orange-100",
  "intro": "Desenvolva comunicação clara, organização de ideias e apresentação em público."
 },
 {
  "slug": "filosofia",
  "name": "Filosofia",
  "emoji": "🏛️",
  "color": "bg-stone-100",
  "intro": "Explore perguntas sobre conhecimento, ética, política e existência."
 },
 {
  "slug": "biologia",
  "name": "Biologia",
  "emoji": "🧬",
  "color": "bg-green-100",
  "intro": "Biologia aprofundada: células, genética, evolução, ecologia, fisiologia e investigação da vida, do básico ao Ensino Médio."
 },
 {
  "slug": "ensino-religioso",
  "name": "Ensino Religioso",
  "emoji": "🕊️",
  "color": "bg-yellow-100",
  "intro": "Estude diversidade religiosa, cultura, valores e respeito às diferentes crenças."
 },
 {
  "slug": "redacao",
  "name": "Redação",
  "emoji": "✍️",
  "color": "bg-blue-100",
  "intro": "Aprenda a planejar, desenvolver e revisar textos com clareza."
 },
 {
  "slug": "literatura",
  "name": "Literatura",
  "emoji": "📚",
  "color": "bg-purple-100",
  "intro": "Conheça gêneros literários, narrativas, poesia e recursos de linguagem."
 },
 {
  "slug": "geopolitica",
  "name": "Geopolítica",
  "emoji": "🗺️",
  "color": "bg-red-100",
  "intro": "Estude relações entre território, poder, economia e política internacional."
 },
 {
  "slug": "empreendedorismo",
  "name": "Empreendedorismo",
  "emoji": "💡",
  "color": "bg-amber-100",
  "intro": "Aprenda a transformar ideias em projetos com planejamento e responsabilidade."
 },
 {
  "slug": "historia-da-arte",
  "name": "História da Arte",
  "emoji": "🎨",
  "color": "bg-fuchsia-100",
  "intro": "Conheça movimentos, obras, técnicas e contextos da história da arte."
 },
 {
  "slug": "ecologia-e-educacao-ambiental",
  "name": "Ecologia e Educação Ambiental",
  "emoji": "🌱",
  "color": "bg-teal-100",
  "intro": "Entenda ecossistemas, biodiversidade e atitudes para cuidar do ambiente."
 },
 {
  "slug": "algebra",
  "name": "Álgebra",
  "emoji": "➗",
  "color": "bg-indigo-100",
  "intro": "Aprenda a representar relações com letras, expressões e equações."
 },
 {
  "slug": "geometria",
  "name": "Geometria",
  "emoji": "📐",
  "color": "bg-cyan-100",
  "intro": "Estude formas, ângulos, medidas, áreas, perímetros e relações geométricas."
 },
 {
  "slug": "artes",
  "name": "Artes",
  "emoji": "🎨",
  "color": "bg-fuchsia-100",
  "intro": "Linguagens artísticas, criação, leitura de imagens e cultura visual."
 },
 {
  "slug": "educacao-fisica",
  "name": "Educação Física",
  "emoji": "🏃",
  "color": "bg-lime-100",
  "intro": "Movimento, jogos, esportes, saúde e práticas corporais."
 },
 {
  "slug": "musica",
  "name": "Música",
  "emoji": "🎵",
  "color": "bg-violet-100",
  "intro": "Ritmo, melodia, instrumentos, escuta e criação musical."
 },
 {
  "slug": "teatro",
  "name": "Teatro",
  "emoji": "🎭",
  "color": "bg-rose-100",
  "intro": "Expressão cênica, personagens, dramaturgia e criação coletiva."
 },
 {
  "slug": "danca",
  "name": "Dança",
  "emoji": "💃",
  "color": "bg-pink-100",
  "intro": "Movimento, ritmo, expressão, estilos e história da dança."
 },
 {
  "slug": "espanhol",
  "name": "Espanhol",
  "emoji": "🇪🇸",
  "color": "bg-orange-100",
  "intro": "Vocabulário, compreensão, gramática e culturas de língua espanhola."
 },
 {
  "slug": "frances",
  "name": "Francês",
  "emoji": "🇫🇷",
  "color": "bg-blue-100",
  "intro": "Vocabulário, pronúncia, estruturas e culturas francófonas."
 },
 {
  "slug": "alemao",
  "name": "Alemão",
  "emoji": "🇩🇪",
  "color": "bg-yellow-100",
  "intro": "Comunicação inicial, estruturas gramaticais e culturas de língua alemã."
 },
 {
  "slug": "mandarim",
  "name": "Mandarim",
  "emoji": "🀄",
  "color": "bg-red-100",
  "intro": "Introdução à língua chinesa, tons, caracteres e comunicação cotidiana."
 },
 {
  "slug": "libras",
  "name": "Libras",
  "emoji": "🤟",
  "color": "bg-teal-100",
  "intro": "Língua Brasileira de Sinais, comunicação visual e cultura surda."
 },
 {
  "slug": "latim",
  "name": "Latim",
  "emoji": "🏺",
  "color": "bg-amber-100",
  "intro": "Estruturas do latim, vocabulário, etimologia e legado cultural."
 },
 {
  "slug": "computacao",
  "name": "Computação",
  "emoji": "💻",
  "color": "bg-sky-100",
  "intro": "Fundamentos de computadores, sistemas, dados e pensamento computacional."
 },
 {
  "slug": "programacao",
  "name": "Programação",
  "emoji": "👨‍💻",
  "color": "bg-indigo-100",
  "intro": "Lógica, algoritmos, variáveis, estruturas de controle e desenvolvimento."
 },
 {
  "slug": "robotica",
  "name": "Robótica",
  "emoji": "🤖",
  "color": "bg-slate-100",
  "intro": "Robôs, sensores, atuadores, programação e sistemas automatizados."
 },
 {
  "slug": "inteligencia-artificial",
  "name": "Inteligência Artificial",
  "emoji": "🧠",
  "color": "bg-purple-100",
  "intro": "Conceitos de IA, dados, aprendizado de máquina, usos e responsabilidade."
 },
 {
  "slug": "cultura-digital",
  "name": "Cultura Digital",
  "emoji": "🌐",
  "color": "bg-cyan-100",
  "intro": "Tecnologias digitais, participação online, informação e convivência."
 },
 {
  "slug": "educacao-financeira",
  "name": "Educação Financeira",
  "emoji": "💰",
  "color": "bg-emerald-100",
  "intro": "Orçamento, poupança, consumo consciente e planejamento financeiro."
 },
 {
  "slug": "economia",
  "name": "Economia",
  "emoji": "📈",
  "color": "bg-green-100",
  "intro": "Produção, consumo, mercados, recursos e decisões econômicas."
 },
 {
  "slug": "contabilidade",
  "name": "Contabilidade",
  "emoji": "🧾",
  "color": "bg-stone-100",
  "intro": "Registros financeiros, receitas, despesas, patrimônio e relatórios."
 },
 {
  "slug": "direito-e-cidadania",
  "name": "Direito e Cidadania",
  "emoji": "⚖️",
  "color": "bg-blue-100",
  "intro": "Direitos, deveres, leis, instituições e participação cidadã."
 },
 {
  "slug": "ciencia-politica",
  "name": "Ciência Política",
  "emoji": "🏛️",
  "color": "bg-amber-100",
  "intro": "Estado, poder, instituições, democracia e participação política."
 },
 {
  "slug": "antropologia",
  "name": "Antropologia",
  "emoji": "🪶",
  "color": "bg-orange-100",
  "intro": "Culturas, diversidade humana, identidade, práticas sociais e pesquisa."
 },
 {
  "slug": "etica",
  "name": "Ética",
  "emoji": "🧭",
  "color": "bg-yellow-100",
  "intro": "Reflexão sobre escolhas, valores, responsabilidade e convivência."
 },
 {
  "slug": "estudos-de-midia",
  "name": "Estudos de Mídia",
  "emoji": "📺",
  "color": "bg-red-100",
  "intro": "Como mídias produzem, distribuem e influenciam informações e cultura."
 },
 {
  "slug": "jornalismo",
  "name": "Jornalismo",
  "emoji": "📰",
  "color": "bg-sky-100",
  "intro": "Apuração, notícias, fontes, entrevistas e responsabilidade informativa."
 },
 {
  "slug": "fotografia",
  "name": "Fotografia",
  "emoji": "📷",
  "color": "bg-neutral-100",
  "intro": "Imagem, composição, luz, enquadramento e narrativa visual."
 },
 {
  "slug": "cinema-audiovisual",
  "name": "Cinema e Audiovisual",
  "emoji": "🎬",
  "color": "bg-zinc-100",
  "intro": "Linguagem cinematográfica, roteiro, imagem, som e montagem."
 },
 {
  "slug": "design-grafico",
  "name": "Design Gráfico",
  "emoji": "🖌️",
  "color": "bg-fuchsia-100",
  "intro": "Comunicação visual, tipografia, cor, composição e identidade gráfica."
 },
 {
  "slug": "arquitetura",
  "name": "Arquitetura",
  "emoji": "🏠",
  "color": "bg-orange-100",
  "intro": "Espaços, formas, representação, conforto e relação com o ambiente."
 },
 {
  "slug": "moda-textil",
  "name": "Moda e Têxtil",
  "emoji": "🧵",
  "color": "bg-pink-100",
  "intro": "Vestuário, tecidos, criação, história da moda e produção responsável."
 },
 {
  "slug": "artesanato",
  "name": "Artesanato",
  "emoji": "🧶",
  "color": "bg-amber-100",
  "intro": "Técnicas manuais, materiais, design, cultura e criação de objetos."
 },
 {
  "slug": "pesquisa-cientifica",
  "name": "Pesquisa Científica",
  "emoji": "🔍",
  "color": "bg-indigo-100",
  "intro": "Perguntas de pesquisa, evidências, métodos, dados e comunicação científica."
 },
 {
  "slug": "metodologia-cientifica",
  "name": "Metodologia Científica",
  "emoji": "🧪",
  "color": "bg-teal-100",
  "intro": "Métodos, evidências, análise crítica e organização de estudos científicos."
 },
 {
  "slug": "escrita-academica",
  "name": "Escrita Acadêmica",
  "emoji": "✍️",
  "color": "bg-slate-100",
  "intro": "Planejamento de textos, argumentação, coesão, fontes e revisão."
 },
 {
  "slug": "logica",
  "name": "Lógica",
  "emoji": "🔗",
  "color": "bg-violet-100",
  "intro": "Argumentos, proposições, padrões, inferências e resolução de problemas."
 },
 {
  "slug": "probabilidade-estatistica",
  "name": "Probabilidade e Estatística",
  "emoji": "📊",
  "color": "bg-emerald-100",
  "intro": "Dados, gráficos, chance, amostras e interpretação de resultados."
 },
 {
  "slug": "geologia",
  "name": "Geologia",
  "emoji": "🪨",
  "color": "bg-stone-100",
  "intro": "Rochas, minerais, placas tectônicas, relevo e história da Terra."
 },
 {
  "slug": "oceanografia",
  "name": "Oceanografia",
  "emoji": "🌊",
  "color": "bg-cyan-100",
  "intro": "Oceanos, correntes, ecossistemas marinhos, clima e zonas costeiras."
 },
 {
  "slug": "meteorologia",
  "name": "Meteorologia",
  "emoji": "🌦️",
  "color": "bg-sky-100",
  "intro": "Atmosfera, tempo, nuvens, precipitação e previsão meteorológica."
 },
 {
  "slug": "ciencias-da-terra",
  "name": "Ciências da Terra",
  "emoji": "🌍",
  "color": "bg-green-100",
  "intro": "Sistemas terrestres, rochas, atmosfera, água e processos naturais."
 },
 {
  "slug": "ciencias-do-solo",
  "name": "Ciências do Solo",
  "emoji": "🌱",
  "color": "bg-lime-100",
  "intro": "Formação, propriedades, vida, conservação e uso sustentável do solo."
 },
 {
  "slug": "agricultura-agroecologia",
  "name": "Agricultura e Agroecologia",
  "emoji": "🌾",
  "color": "bg-lime-100",
  "intro": "Cultivo, solo, biodiversidade, produção de alimentos e sustentabilidade."
 },
 {
  "slug": "nutricao",
  "name": "Nutrição",
  "emoji": "🥗",
  "color": "bg-emerald-100",
  "intro": "Alimentação, nutrientes, hábitos saudáveis e leitura crítica de informações."
 },
 {
  "slug": "saude-bem-estar",
  "name": "Saúde e Bem-estar",
  "emoji": "💚",
  "color": "bg-green-100",
  "intro": "Hábitos de saúde, prevenção, sono, atividade física e bem-estar integral."
 },
 {
  "slug": "primeiros-socorros",
  "name": "Primeiros Socorros",
  "emoji": "🩹",
  "color": "bg-red-100",
  "intro": "Reconhecimento de emergências, prevenção e busca segura por ajuda."
 },
 {
  "slug": "psicologia",
  "name": "Psicologia",
  "emoji": "🧠",
  "color": "bg-purple-100",
  "intro": "Comportamento, emoções, aprendizagem, relações e pensamento crítico."
 },
 {
  "slug": "direitos-humanos",
  "name": "Direitos Humanos",
  "emoji": "🕊️",
  "color": "bg-sky-100",
  "intro": "Dignidade, igualdade, liberdades, direitos e convivência democrática."
 },
 {
  "slug": "relacoes-internacionais",
  "name": "Relações Internacionais",
  "emoji": "🌐",
  "color": "bg-blue-100",
  "intro": "Países, organizações, diplomacia, comércio e cooperação global."
 },
 {
  "slug": "estudos-culturais",
  "name": "Estudos Culturais",
  "emoji": "🎎",
  "color": "bg-fuchsia-100",
  "intro": "Identidade, cultura popular, mídia, representação e diversidade cultural."
 },
 {
  "slug": "cultura-indigena",
  "name": "Culturas Indígenas",
  "emoji": "🪶",
  "color": "bg-amber-100",
  "intro": "Diversidade dos povos indígenas, línguas, conhecimentos e direitos."
 },
 {
  "slug": "historia-africa",
  "name": "História da África",
  "emoji": "🌍",
  "color": "bg-amber-100",
  "intro": "Sociedades africanas, reinos, culturas, diáspora e história contemporânea."
 },
 {
  "slug": "historia-mundial",
  "name": "História Mundial",
  "emoji": "🌎",
  "color": "bg-orange-100",
  "intro": "Sociedades, transformações, conexões e acontecimentos da história global."
 },
 {
  "slug": "sustentabilidade",
  "name": "Sustentabilidade",
  "emoji": "♻️",
  "color": "bg-green-100",
  "intro": "Uso responsável de recursos, consumo, biodiversidade e soluções sustentáveis."
 },
 {
  "slug": "mudancas-climaticas",
  "name": "Mudanças Climáticas",
  "emoji": "🌡️",
  "color": "bg-orange-100",
  "intro": "Clima, efeito estufa, evidências científicas, impactos e adaptação."
 },
 {
  "slug": "educacao-consumo",
  "name": "Educação para o Consumo",
  "emoji": "🛒",
  "color": "bg-emerald-100",
  "intro": "Publicidade, direitos do consumidor, orçamento e escolhas conscientes."
 },
 {
  "slug": "debate-argumentacao",
  "name": "Debate e Argumentação",
  "emoji": "🗣️",
  "color": "bg-violet-100",
  "intro": "Construção de argumentos, escuta ativa, evidências e diálogo respeitoso."
 },
 {
  "slug": "gestao-projetos",
  "name": "Gestão de Projetos",
  "emoji": "📋",
  "color": "bg-blue-100",
  "intro": "Objetivos, planejamento, etapas, colaboração e avaliação de projetos."
 },
 {
  "slug": "logistica",
  "name": "Logística",
  "emoji": "🚚",
  "color": "bg-orange-100",
  "intro": "Fluxos de materiais, estoque, transporte, distribuição e planejamento."
 },
 {
  "slug": "marketing",
  "name": "Marketing",
  "emoji": "📣",
  "color": "bg-pink-100",
  "intro": "Públicos, marcas, comunicação, pesquisa e estratégias de marketing."
 },
 {
  "slug": "turismo",
  "name": "Turismo",
  "emoji": "🧳",
  "color": "bg-sky-100",
  "intro": "Destinos, patrimônios, hospitalidade, roteiros e turismo responsável."
 },
 {
  "slug": "gastronomia",
  "name": "Gastronomia",
  "emoji": "🍲",
  "color": "bg-amber-100",
  "intro": "Cultura alimentar, técnicas culinárias, higiene e planejamento de refeições."
 },
 {
  "slug": "seguranca-trabalho",
  "name": "Segurança do Trabalho",
  "emoji": "🦺",
  "color": "bg-yellow-100",
  "intro": "Prevenção de riscos, ergonomia, ambientes seguros e cultura preventiva."
 },
 {
  "slug": "engenharia-tecnologia",
  "name": "Engenharia e Tecnologia",
  "emoji": "⚙️",
  "color": "bg-slate-100",
  "intro": "Projeto, sistemas, materiais, medidas e resolução de problemas práticos."
 },
 {
  "slug": "ciencias-materiais",
  "name": "Ciência dos Materiais",
  "emoji": "🧱",
  "color": "bg-stone-100",
  "intro": "Propriedades, estrutura, processamento e usos de materiais."
 },
 {
  "slug": "biotecnologia",
  "name": "Biotecnologia",
  "emoji": "🧬",
  "color": "bg-lime-100",
  "intro": "Aplicações de organismos e processos biológicos em ciência e tecnologia."
 },
 {
  "slug": "genetica",
  "name": "Genética",
  "emoji": "🧬",
  "color": "bg-violet-100",
  "intro": "Genes, hereditariedade, variação, DNA e aplicações da genética."
 },
 {
  "slug": "neurociencia",
  "name": "Neurociência",
  "emoji": "🧠",
  "color": "bg-purple-100",
  "intro": "Sistema nervoso, percepção, memória, aprendizagem e comportamento."
 },
 {
  "slug": "saude-publica",
  "name": "Saúde Pública",
  "emoji": "🏥",
  "color": "bg-red-100",
  "intro": "Saúde coletiva, prevenção, determinantes sociais e organização dos cuidados."
 },
 {
  "slug": "desenvolvimento-sustentavel",
  "name": "Desenvolvimento Sustentável",
  "emoji": "🌱",
  "color": "bg-green-100",
  "intro": "Integração entre ambiente, sociedade, economia e bem-estar de longo prazo."
 },
 {
  "slug": "estudos-espaciais",
  "name": "Estudos Espaciais",
  "emoji": "🛰️",
  "color": "bg-indigo-100",
  "intro": "Exploração espacial, satélites, missões, observação da Terra e ciência planetária."
 },
 {
  "slug": "defesa-civil",
  "name": "Defesa Civil",
  "emoji": "🚨",
  "color": "bg-orange-100",
  "intro": "Prevenção, preparação, resposta comunitária e recuperação após desastres."
 }
];
export const facultyCatalog: FacultyCourseInfo[] = [
 {
  "slug": "engenharia-de-petroleo",
  "name": "Engenharia de Petróleo",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia de Petróleo no Sabe Mais é uma trilha educacional aprofundada sobre energia, reservatórios, perfuração, produção e segurança operacional. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Plataforma de petróleo e engenharia de poços"
 },
 {
  "slug": "engenharia-mecanica",
  "name": "Engenharia Mecânica",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia Mecânica no Sabe Mais é uma trilha educacional aprofundada sobre mecânica, materiais, termodinâmica, máquinas, projetos e manufatura. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Máquinas, engrenagens e projeto mecânico"
 },
 {
  "slug": "engenharia-civil",
  "name": "Engenharia Civil",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia Civil no Sabe Mais é uma trilha educacional aprofundada sobre estruturas, materiais, geotecnia, hidráulica, construção e gestão de obras. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Construção civil e estruturas"
 },
 {
  "slug": "engenharia-eletrica",
  "name": "Engenharia Elétrica",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia Elétrica no Sabe Mais é uma trilha educacional aprofundada sobre circuitos, eletrônica, máquinas elétricas, potência, controle e automação. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Circuitos elétricos e sistemas de energia"
 },
 {
  "slug": "engenharia-de-producao",
  "name": "Engenharia de Produção",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia de Produção no Sabe Mais é uma trilha educacional aprofundada sobre processos, qualidade, logística, operações, dados e gestão industrial. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Linha de produção e gestão industrial"
 },
 {
  "slug": "engenharia-quimica",
  "name": "Engenharia Química",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia Química no Sabe Mais é uma trilha educacional aprofundada sobre balanços, fenômenos de transporte, reatores, processos e controle. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Processos químicos e equipamentos industriais"
 },
 {
  "slug": "engenharia-ambiental",
  "name": "Engenharia Ambiental",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia Ambiental no Sabe Mais é uma trilha educacional aprofundada sobre água, resíduos, poluição, avaliação ambiental e sustentabilidade. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Engenharia ambiental, água e sustentabilidade"
 },
 {
  "slug": "engenharia-de-computacao",
  "name": "Engenharia de Computação",
  "area": "Tecnologia",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia de Computação no Sabe Mais é uma trilha educacional aprofundada sobre hardware, software, sistemas embarcados, redes e arquitetura de computadores. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Computadores, eletrônica e sistemas embarcados"
 },
 {
  "slug": "engenharia-de-software",
  "name": "Engenharia de Software",
  "area": "Tecnologia",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia de Software no Sabe Mais é uma trilha educacional aprofundada sobre requisitos, arquitetura, programação, testes, devops e engenharia de sistemas. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Desenvolvimento e arquitetura de software"
 },
 {
  "slug": "engenharia-robotica",
  "name": "Engenharia Robótica",
  "area": "Tecnologia",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia Robótica no Sabe Mais é uma trilha educacional aprofundada sobre robótica, sensores, atuadores, controle, visão computacional e sistemas autônomos. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Robô industrial e sistemas autônomos"
 },
 {
  "slug": "ciencia-da-computacao",
  "name": "Ciência da Computação",
  "area": "Tecnologia",
  "duration": "8 semestres · trilha educacional",
  "description": "Ciência da Computação no Sabe Mais é uma trilha educacional aprofundada sobre algoritmos, estruturas de dados, computação teórica, sistemas e ia. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Algoritmos e ciência da computação"
 },
 {
  "slug": "sistemas-de-informacao",
  "name": "Sistemas de Informação",
  "area": "Tecnologia",
  "duration": "8 semestres · trilha educacional",
  "description": "Sistemas de Informação no Sabe Mais é uma trilha educacional aprofundada sobre sistemas empresariais, bancos de dados, processos, software e gestão de ti. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Sistemas de informação e dados empresariais"
 },
 {
  "slug": "inteligencia-artificial",
  "name": "Inteligência Artificial",
  "area": "Tecnologia",
  "duration": "8 semestres · trilha educacional",
  "description": "Inteligência Artificial no Sabe Mais é uma trilha educacional aprofundada sobre aprendizado de máquina, dados, modelos, visão, linguagem e sistemas inteligentes. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Inteligência artificial e modelos computacionais"
 },
 {
  "slug": "analise-e-desenvolvimento-de-sistemas",
  "name": "Análise e Desenvolvimento de Sistemas",
  "area": "Tecnologia",
  "duration": "8 semestres · trilha educacional",
  "description": "Análise e Desenvolvimento de Sistemas no Sabe Mais é uma trilha educacional aprofundada sobre análise, programação, bancos de dados, apis, testes e implantação. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Aplicações, programação e sistemas"
 },
 {
  "slug": "arquitetura-e-urbanismo",
  "name": "Arquitetura e Urbanismo",
  "area": "Arquitetura e Design",
  "duration": "8 semestres · trilha educacional",
  "description": "Arquitetura e Urbanismo no Sabe Mais é uma trilha educacional aprofundada sobre projeto arquitetônico, representação, conforto, urbanismo e paisagismo. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Projeto arquitetônico e planejamento urbano"
 },
 {
  "slug": "administracao",
  "name": "Administração",
  "area": "Gestão e Negócios",
  "duration": "8 semestres · trilha educacional",
  "description": "Administração no Sabe Mais é uma trilha educacional aprofundada sobre estratégia, pessoas, marketing, finanças, operações e empreendedorismo. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Gestão, negócios e organizações"
 },
 {
  "slug": "ciencias-contabeis",
  "name": "Ciências Contábeis",
  "area": "Gestão e Negócios",
  "duration": "8 semestres · trilha educacional",
  "description": "Ciências Contábeis no Sabe Mais é uma trilha educacional aprofundada sobre contabilidade, custos, auditoria, tributos, finanças e relatórios. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Contabilidade e análise financeira"
 },
 {
  "slug": "economia",
  "name": "Economia",
  "area": "Gestão e Negócios",
  "duration": "8 semestres · trilha educacional",
  "description": "Economia no Sabe Mais é uma trilha educacional aprofundada sobre microeconomia, macroeconomia, estatística, finanças e análise de políticas. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Economia, mercados e análise de dados"
 },
 {
  "slug": "direito",
  "name": "Direito",
  "area": "Ciências Humanas",
  "duration": "8 semestres · trilha educacional",
  "description": "Direito no Sabe Mais é uma trilha educacional aprofundada sobre teoria jurídica, constitucional, civil, penal, trabalho, empresarial e processo. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Direito, legislação e argumentação jurídica"
 },
 {
  "slug": "medicina",
  "name": "Medicina",
  "area": "Saúde",
  "duration": "8 semestres · trilha educacional",
  "description": "Medicina no Sabe Mais é uma trilha educacional aprofundada sobre bases biomédicas, diagnóstico, raciocínio clínico, prevenção e cuidado integral. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Medicina e cuidado em saúde"
 },
 {
  "slug": "enfermagem",
  "name": "Enfermagem",
  "area": "Saúde",
  "duration": "8 semestres · trilha educacional",
  "description": "Enfermagem no Sabe Mais é uma trilha educacional aprofundada sobre fundamentos de enfermagem, saúde coletiva, clínica, gestão e cuidado. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Enfermagem e cuidado integral"
 },
 {
  "slug": "farmacia",
  "name": "Farmácia",
  "area": "Saúde",
  "duration": "8 semestres · trilha educacional",
  "description": "Farmácia no Sabe Mais é uma trilha educacional aprofundada sobre química, farmacologia, tecnologia farmacêutica, análises e assistência. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Farmácia, medicamentos e análises"
 },
 {
  "slug": "biomedicina",
  "name": "Biomedicina",
  "area": "Saúde",
  "duration": "8 semestres · trilha educacional",
  "description": "Biomedicina no Sabe Mais é uma trilha educacional aprofundada sobre biologia celular, análises clínicas, microbiologia, genética e pesquisa. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Laboratório, células e análises biomédicas"
 },
 {
  "slug": "nutricao",
  "name": "Nutrição",
  "area": "Saúde",
  "duration": "8 semestres · trilha educacional",
  "description": "Nutrição no Sabe Mais é uma trilha educacional aprofundada sobre bioquímica, avaliação nutricional, dietética, saúde coletiva e alimentação. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Nutrição, alimentos e saúde"
 },
 {
  "slug": "psicologia",
  "name": "Psicologia",
  "area": "Saúde e Humanas",
  "duration": "8 semestres · trilha educacional",
  "description": "Psicologia no Sabe Mais é uma trilha educacional aprofundada sobre processos psicológicos, desenvolvimento, avaliação, teorias e atuação profissional. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Psicologia e comportamento humano"
 },
 {
  "slug": "fisioterapia",
  "name": "Fisioterapia",
  "area": "Saúde",
  "duration": "8 semestres · trilha educacional",
  "description": "Fisioterapia no Sabe Mais é uma trilha educacional aprofundada sobre anatomia, movimento, avaliação funcional, recursos terapêuticos e reabilitação. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Fisioterapia, movimento e reabilitação"
 },
 {
  "slug": "educacao-fisica",
  "name": "Educação Física",
  "area": "Saúde",
  "duration": "8 semestres · trilha educacional",
  "description": "Educação Física no Sabe Mais é uma trilha educacional aprofundada sobre corpo e movimento, treinamento, pedagogia, saúde e avaliação. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Movimento, esporte e atividade física"
 },
 {
  "slug": "odontologia",
  "name": "Odontologia",
  "area": "Saúde",
  "duration": "8 semestres · trilha educacional",
  "description": "Odontologia no Sabe Mais é uma trilha educacional aprofundada sobre anatomia oral, prevenção, diagnóstico, clínica e saúde bucal. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Odontologia e saúde bucal"
 },
 {
  "slug": "medicina-veterinaria",
  "name": "Medicina Veterinária",
  "area": "Saúde Animal",
  "duration": "8 semestres · trilha educacional",
  "description": "Medicina Veterinária no Sabe Mais é uma trilha educacional aprofundada sobre anatomia animal, clínica, cirurgia, produção e saúde pública. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Medicina veterinária e saúde animal"
 },
 {
  "slug": "agronomia",
  "name": "Agronomia",
  "area": "Ciências Agrárias",
  "duration": "8 semestres · trilha educacional",
  "description": "Agronomia no Sabe Mais é uma trilha educacional aprofundada sobre solo, plantas, produção, irrigação, máquinas, manejo e sustentabilidade. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Agronomia, solo e produção agrícola"
 },
 {
  "slug": "gastronomia",
  "name": "Gastronomia",
  "area": "Produção e Alimentação",
  "duration": "8 semestres · trilha educacional",
  "description": "Gastronomia no Sabe Mais é uma trilha educacional aprofundada sobre técnicas culinárias, segurança alimentar, gestão, confeitaria e criação. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Gastronomia, cozinha e alimentos"
 },
 {
  "slug": "marketing",
  "name": "Marketing",
  "area": "Comunicação e Negócios",
  "duration": "8 semestres · trilha educacional",
  "description": "Marketing no Sabe Mais é uma trilha educacional aprofundada sobre comportamento, estratégia, marca, mídia, dados e marketing digital. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Marketing, marcas e comunicação"
 },
 {
  "slug": "publicidade-e-propaganda",
  "name": "Publicidade e Propaganda",
  "area": "Comunicação",
  "duration": "8 semestres · trilha educacional",
  "description": "Publicidade e Propaganda no Sabe Mais é uma trilha educacional aprofundada sobre criação, planejamento, mídia, redação, campanhas e métricas. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Publicidade, campanhas e criação"
 },
 {
  "slug": "jornalismo",
  "name": "Jornalismo",
  "area": "Comunicação",
  "duration": "8 semestres · trilha educacional",
  "description": "Jornalismo no Sabe Mais é uma trilha educacional aprofundada sobre apuração, reportagem, texto, ética, audiovisual e jornalismo digital. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Jornalismo, apuração e produção de notícias"
 },
 {
  "slug": "design",
  "name": "Design",
  "area": "Arquitetura e Design",
  "duration": "8 semestres · trilha educacional",
  "description": "Design no Sabe Mais é uma trilha educacional aprofundada sobre fundamentos visuais, tipografia, ux, produto, identidade e prototipação. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Design visual, produto e experiência"
 },
 {
  "slug": "relacoes-internacionais",
  "name": "Relações Internacionais",
  "area": "Ciências Humanas",
  "duration": "8 semestres · trilha educacional",
  "description": "Relações Internacionais no Sabe Mais é uma trilha educacional aprofundada sobre teorias internacionais, política externa, economia, diplomacia e conflitos. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Relações internacionais e diplomacia"
 },
 {
  "slug": "biblioteconomia-e-arquivologia",
  "name": "Biblioteconomia e Arquivologia",
  "area": "Informação",
  "duration": "8 semestres · trilha educacional",
  "description": "Biblioteconomia e Arquivologia no Sabe Mais é uma trilha educacional aprofundada sobre organização da informação, acervos, preservação, pesquisa e gestão documental. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Bibliotecas, arquivos e organização da informação"
 },
 {
  "slug": "turismo",
  "name": "Turismo",
  "area": "Turismo e Hospitalidade",
  "duration": "8 semestres · trilha educacional",
  "description": "Turismo no Sabe Mais é uma trilha educacional aprofundada sobre planejamento turístico, hospitalidade, eventos, destinos e gestão. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Turismo, destinos e hospitalidade"
 },
 {
  "slug": "matematica",
  "name": "Matemática",
  "area": "Ciências Exatas",
  "duration": "8 semestres · trilha educacional",
  "description": "Matemática no Sabe Mais é uma trilha educacional aprofundada sobre álgebra, cálculo, geometria, análise, probabilidade e modelagem. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Matemática, estruturas e modelagem"
 },
 {
  "slug": "fisica",
  "name": "Física",
  "area": "Ciências Exatas",
  "duration": "8 semestres · trilha educacional",
  "description": "Física no Sabe Mais é uma trilha educacional aprofundada sobre mecânica, termodinâmica, eletromagnetismo, ondas, quântica e experimentação. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Física, matéria, energia e fenômenos naturais"
 },
 {
  "slug": "pedagogia",
  "name": "Pedagogia",
  "area": "Educação",
  "duration": "8 semestres · trilha educacional",
  "description": "Pedagogia no Sabe Mais é uma trilha educacional aprofundada sobre didática, aprendizagem, currículo, inclusão e gestão educacional. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Pedagogia"
 },
 {
  "slug": "educacao-especial",
  "name": "Educação Especial",
  "area": "Educação",
  "duration": "8 semestres · trilha educacional",
  "description": "Educação Especial no Sabe Mais é uma trilha educacional aprofundada sobre inclusão, acessibilidade, desenvolvimento e práticas pedagógicas. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Educação Especial"
 },
 {
  "slug": "letras-portugues",
  "name": "Letras — Português",
  "area": "Educação",
  "duration": "8 semestres · trilha educacional",
  "description": "Letras — Português no Sabe Mais é uma trilha educacional aprofundada sobre língua portuguesa, linguística, literatura e ensino. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Letras — Português"
 },
 {
  "slug": "letras-ingles",
  "name": "Letras — Inglês",
  "area": "Educação",
  "duration": "8 semestres · trilha educacional",
  "description": "Letras — Inglês no Sabe Mais é uma trilha educacional aprofundada sobre língua inglesa, linguística, literatura e ensino. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Letras — Inglês"
 },
 {
  "slug": "traducao-interpretacao",
  "name": "Tradução e Interpretação",
  "area": "Humanidades",
  "duration": "8 semestres · trilha educacional",
  "description": "Tradução e Interpretação no Sabe Mais é uma trilha educacional aprofundada sobre tradução escrita, interpretação, linguística e cultura. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Tradução e Interpretação"
 },
 {
  "slug": "historia",
  "name": "História",
  "area": "Humanidades",
  "duration": "8 semestres · trilha educacional",
  "description": "História no Sabe Mais é uma trilha educacional aprofundada sobre historiografia, sociedades, fontes e períodos históricos. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de História"
 },
 {
  "slug": "geografia",
  "name": "Geografia",
  "area": "Ciências Humanas",
  "duration": "8 semestres · trilha educacional",
  "description": "Geografia no Sabe Mais é uma trilha educacional aprofundada sobre território, cartografia, população, clima e geopolítica. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Geografia"
 },
 {
  "slug": "filosofia",
  "name": "Filosofia",
  "area": "Ciências Humanas",
  "duration": "8 semestres · trilha educacional",
  "description": "Filosofia no Sabe Mais é uma trilha educacional aprofundada sobre lógica, ética, epistemologia, política e história da filosofia. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Filosofia"
 },
 {
  "slug": "sociologia",
  "name": "Sociologia",
  "area": "Ciências Humanas",
  "duration": "8 semestres · trilha educacional",
  "description": "Sociologia no Sabe Mais é uma trilha educacional aprofundada sobre sociedade, cultura, desigualdade, instituições e pesquisa social. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Sociologia"
 },
 {
  "slug": "antropologia",
  "name": "Antropologia",
  "area": "Ciências Humanas",
  "duration": "8 semestres · trilha educacional",
  "description": "Antropologia no Sabe Mais é uma trilha educacional aprofundada sobre culturas, parentesco, etnografia e diversidade humana. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Antropologia"
 },
 {
  "slug": "arqueologia",
  "name": "Arqueologia",
  "area": "Humanidades",
  "duration": "8 semestres · trilha educacional",
  "description": "Arqueologia no Sabe Mais é uma trilha educacional aprofundada sobre culturas materiais, escavação, conservação e interpretação histórica. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Arqueologia"
 },
 {
  "slug": "teologia",
  "name": "Teologia",
  "area": "Humanidades",
  "duration": "8 semestres · trilha educacional",
  "description": "Teologia no Sabe Mais é uma trilha educacional aprofundada sobre história das religiões, textos, ética e pensamento teológico. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Teologia"
 },
 {
  "slug": "ciencias-politicas",
  "name": "Ciência Política",
  "area": "Ciências Humanas",
  "duration": "8 semestres · trilha educacional",
  "description": "Ciência Política no Sabe Mais é uma trilha educacional aprofundada sobre instituições, democracia, políticas públicas e comportamento político. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Ciência Política"
 },
 {
  "slug": "servico-social",
  "name": "Serviço Social",
  "area": "Saúde e Humanas",
  "duration": "8 semestres · trilha educacional",
  "description": "Serviço Social no Sabe Mais é uma trilha educacional aprofundada sobre direitos sociais, políticas públicas, comunidade e proteção social. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Serviço Social"
 },
 {
  "slug": "relacoes-publicas",
  "name": "Relações Públicas",
  "area": "Comunicação",
  "duration": "8 semestres · trilha educacional",
  "description": "Relações Públicas no Sabe Mais é uma trilha educacional aprofundada sobre comunicação institucional, reputação, eventos e públicos. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Relações Públicas"
 },
 {
  "slug": "radio-tv",
  "name": "Rádio, TV e Internet",
  "area": "Comunicação",
  "duration": "8 semestres · trilha educacional",
  "description": "Rádio, TV e Internet no Sabe Mais é uma trilha educacional aprofundada sobre produção audiovisual, roteiro, som, edição e transmissão. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Rádio, TV e Internet"
 },
 {
  "slug": "cinema-audiovisual",
  "name": "Cinema e Audiovisual",
  "area": "Comunicação",
  "duration": "8 semestres · trilha educacional",
  "description": "Cinema e Audiovisual no Sabe Mais é uma trilha educacional aprofundada sobre roteiro, direção, fotografia, montagem e produção. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Cinema e Audiovisual"
 },
 {
  "slug": "musica",
  "name": "Música",
  "area": "Arquitetura e Design",
  "duration": "8 semestres · trilha educacional",
  "description": "Música no Sabe Mais é uma trilha educacional aprofundada sobre teoria musical, composição, performance e tecnologia sonora. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Música"
 },
 {
  "slug": "artes-visuais",
  "name": "Artes Visuais",
  "area": "Arquitetura e Design",
  "duration": "8 semestres · trilha educacional",
  "description": "Artes Visuais no Sabe Mais é uma trilha educacional aprofundada sobre desenho, pintura, escultura, arte contemporânea e exposição. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Artes Visuais"
 },
 {
  "slug": "danca",
  "name": "Dança",
  "area": "Arquitetura e Design",
  "duration": "8 semestres · trilha educacional",
  "description": "Dança no Sabe Mais é uma trilha educacional aprofundada sobre técnicas corporais, criação, história e performance. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Dança"
 },
 {
  "slug": "teatro",
  "name": "Teatro",
  "area": "Arquitetura e Design",
  "duration": "8 semestres · trilha educacional",
  "description": "Teatro no Sabe Mais é uma trilha educacional aprofundada sobre interpretação, dramaturgia, direção, cenografia e produção. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Teatro"
 },
 {
  "slug": "moda",
  "name": "Design de Moda",
  "area": "Arquitetura e Design",
  "duration": "8 semestres · trilha educacional",
  "description": "Design de Moda no Sabe Mais é uma trilha educacional aprofundada sobre desenho, modelagem, materiais, coleção e sustentabilidade. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Design de Moda"
 },
 {
  "slug": "design-interiores",
  "name": "Design de Interiores",
  "area": "Arquitetura e Design",
  "duration": "8 semestres · trilha educacional",
  "description": "Design de Interiores no Sabe Mais é uma trilha educacional aprofundada sobre espaços, ergonomia, iluminação, materiais e representação. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Design de Interiores"
 },
 {
  "slug": "design-grafico",
  "name": "Design Gráfico",
  "area": "Arquitetura e Design",
  "duration": "8 semestres · trilha educacional",
  "description": "Design Gráfico no Sabe Mais é uma trilha educacional aprofundada sobre tipografia, identidade visual, composição e produção gráfica. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Design Gráfico"
 },
 {
  "slug": "animacao",
  "name": "Animação",
  "area": "Comunicação",
  "duration": "8 semestres · trilha educacional",
  "description": "Animação no Sabe Mais é uma trilha educacional aprofundada sobre storyboard, desenho, modelagem, movimento e pós-produção. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Animação"
 },
 {
  "slug": "jogos-digitais",
  "name": "Jogos Digitais",
  "area": "Tecnologia",
  "duration": "8 semestres · trilha educacional",
  "description": "Jogos Digitais no Sabe Mais é uma trilha educacional aprofundada sobre game design, programação, narrativa, arte e testes. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Jogos Digitais"
 },
 {
  "slug": "seguranca-informacao",
  "name": "Segurança da Informação",
  "area": "Tecnologia",
  "duration": "8 semestres · trilha educacional",
  "description": "Segurança da Informação no Sabe Mais é uma trilha educacional aprofundada sobre redes, criptografia, gestão de riscos e proteção de sistemas. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Segurança da Informação"
 },
 {
  "slug": "ciencia-dados",
  "name": "Ciência de Dados",
  "area": "Tecnologia",
  "duration": "8 semestres · trilha educacional",
  "description": "Ciência de Dados no Sabe Mais é uma trilha educacional aprofundada sobre estatística, programação, visualização e modelos preditivos. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Ciência de Dados"
 },
 {
  "slug": "computacao-nuvem",
  "name": "Computação em Nuvem",
  "area": "Tecnologia",
  "duration": "8 semestres · trilha educacional",
  "description": "Computação em Nuvem no Sabe Mais é uma trilha educacional aprofundada sobre infraestrutura, serviços cloud, automação e confiabilidade. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Computação em Nuvem"
 },
 {
  "slug": "redes-computadores",
  "name": "Redes de Computadores",
  "area": "Tecnologia",
  "duration": "8 semestres · trilha educacional",
  "description": "Redes de Computadores no Sabe Mais é uma trilha educacional aprofundada sobre protocolos, infraestrutura, administração e monitoramento. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Redes de Computadores"
 },
 {
  "slug": "sistemas-embarcados",
  "name": "Sistemas Embarcados",
  "area": "Tecnologia",
  "duration": "8 semestres · trilha educacional",
  "description": "Sistemas Embarcados no Sabe Mais é uma trilha educacional aprofundada sobre microcontroladores, firmware, sensores e integração hardware-software. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Sistemas Embarcados"
 },
 {
  "slug": "matematica-computacional",
  "name": "Matemática Computacional",
  "area": "Ciências Exatas",
  "duration": "8 semestres · trilha educacional",
  "description": "Matemática Computacional no Sabe Mais é uma trilha educacional aprofundada sobre métodos numéricos, algoritmos, modelagem e simulação. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Matemática Computacional"
 },
 {
  "slug": "estatistica",
  "name": "Estatística",
  "area": "Ciências Exatas",
  "duration": "8 semestres · trilha educacional",
  "description": "Estatística no Sabe Mais é uma trilha educacional aprofundada sobre probabilidade, inferência, amostragem e análise de dados. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Estatística"
 },
 {
  "slug": "quimica",
  "name": "Química",
  "area": "Ciências Exatas",
  "duration": "8 semestres · trilha educacional",
  "description": "Química no Sabe Mais é uma trilha educacional aprofundada sobre química orgânica, inorgânica, analítica e físico-química. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Química"
 },
 {
  "slug": "ciencias-biologicas",
  "name": "Ciências Biológicas",
  "area": "Ciências Exatas",
  "duration": "8 semestres · trilha educacional",
  "description": "Ciências Biológicas no Sabe Mais é uma trilha educacional aprofundada sobre biologia celular, ecologia, genética, evolução e biodiversidade. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Ciências Biológicas"
 },
 {
  "slug": "astronomia",
  "name": "Astronomia",
  "area": "Ciências Exatas",
  "duration": "8 semestres · trilha educacional",
  "description": "Astronomia no Sabe Mais é uma trilha educacional aprofundada sobre mecânica celeste, observação, astrofísica e cosmologia. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Astronomia"
 },
 {
  "slug": "geologia",
  "name": "Geologia",
  "area": "Ciências Exatas",
  "duration": "8 semestres · trilha educacional",
  "description": "Geologia no Sabe Mais é uma trilha educacional aprofundada sobre minerais, rochas, tectônica, estratigrafia e recursos naturais. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Geologia"
 },
 {
  "slug": "oceanografia",
  "name": "Oceanografia",
  "area": "Ciências Exatas",
  "duration": "8 semestres · trilha educacional",
  "description": "Oceanografia no Sabe Mais é uma trilha educacional aprofundada sobre oceanos, correntes, ecossistemas, química e geologia marinha. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Oceanografia"
 },
 {
  "slug": "meteorologia",
  "name": "Meteorologia",
  "area": "Ciências Exatas",
  "duration": "8 semestres · trilha educacional",
  "description": "Meteorologia no Sabe Mais é uma trilha educacional aprofundada sobre atmosfera, previsão, clima, dinâmica e sensoriamento remoto. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Meteorologia"
 },
 {
  "slug": "biotecnologia",
  "name": "Biotecnologia",
  "area": "Ciências Exatas",
  "duration": "8 semestres · trilha educacional",
  "description": "Biotecnologia no Sabe Mais é uma trilha educacional aprofundada sobre biologia molecular, bioprocessos, genética e aplicações industriais. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Biotecnologia"
 },
 {
  "slug": "engenharia-aeroespacial",
  "name": "Engenharia Aeroespacial",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia Aeroespacial no Sabe Mais é uma trilha educacional aprofundada sobre aerodinâmica, estruturas, propulsão e sistemas espaciais. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Engenharia Aeroespacial"
 },
 {
  "slug": "engenharia-aeronautica",
  "name": "Engenharia Aeronáutica",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia Aeronáutica no Sabe Mais é uma trilha educacional aprofundada sobre projeto de aeronaves, aerodinâmica, estruturas e voo. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Engenharia Aeronáutica"
 },
 {
  "slug": "engenharia-naval",
  "name": "Engenharia Naval",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia Naval no Sabe Mais é uma trilha educacional aprofundada sobre embarcações, hidrodinâmica, estruturas e sistemas navais. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Engenharia Naval"
 },
 {
  "slug": "engenharia-ferroviaria",
  "name": "Engenharia Ferroviária",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia Ferroviária no Sabe Mais é uma trilha educacional aprofundada sobre via permanente, material rodante, sinalização e operação. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Engenharia Ferroviária"
 },
 {
  "slug": "engenharia-de-materiais",
  "name": "Engenharia de Materiais",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia de Materiais no Sabe Mais é uma trilha educacional aprofundada sobre metais, polímeros, cerâmicas, compósitos e ensaios. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Engenharia de Materiais"
 },
 {
  "slug": "engenharia-metalurgica",
  "name": "Engenharia Metalúrgica",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia Metalúrgica no Sabe Mais é uma trilha educacional aprofundada sobre extração, processamento, ligas, tratamentos e caracterização. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Engenharia Metalúrgica"
 },
 {
  "slug": "engenharia-de-minas",
  "name": "Engenharia de Minas",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia de Minas no Sabe Mais é uma trilha educacional aprofundada sobre geologia aplicada, lavra, beneficiamento e segurança. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Engenharia de Minas"
 },
 {
  "slug": "engenharia-de-alimentos",
  "name": "Engenharia de Alimentos",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia de Alimentos no Sabe Mais é uma trilha educacional aprofundada sobre processamento, conservação, qualidade e desenvolvimento de alimentos. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Engenharia de Alimentos"
 },
 {
  "slug": "engenharia-biomedica",
  "name": "Engenharia Biomédica",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia Biomédica no Sabe Mais é uma trilha educacional aprofundada sobre instrumentação médica, biomateriais, sinais e dispositivos. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Engenharia Biomédica"
 },
 {
  "slug": "engenharia-de-energia",
  "name": "Engenharia de Energia",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia de Energia no Sabe Mais é uma trilha educacional aprofundada sobre geração, conversão, eficiência, redes e fontes renováveis. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Engenharia de Energia"
 },
 {
  "slug": "engenharia-de-transportes",
  "name": "Engenharia de Transportes",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia de Transportes no Sabe Mais é uma trilha educacional aprofundada sobre mobilidade, tráfego, logística, infraestrutura e planejamento. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Engenharia de Transportes"
 },
 {
  "slug": "engenharia-cartografica",
  "name": "Engenharia Cartográfica e de Agrimensura",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia Cartográfica e de Agrimensura no Sabe Mais é uma trilha educacional aprofundada sobre geodésia, topografia, mapas, gnss e geoprocessamento. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Engenharia Cartográfica e de Agrimensura"
 },
 {
  "slug": "engenharia-de-controle-automacao",
  "name": "Engenharia de Controle e Automação",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia de Controle e Automação no Sabe Mais é uma trilha educacional aprofundada sobre controle, instrumentação, robótica e processos industriais. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Engenharia de Controle e Automação"
 },
 {
  "slug": "engenharia-sanitaria",
  "name": "Engenharia Sanitária",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia Sanitária no Sabe Mais é uma trilha educacional aprofundada sobre saneamento, água, esgoto, resíduos e saúde ambiental. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Engenharia Sanitária"
 },
 {
  "slug": "engenharia-florestal",
  "name": "Engenharia Florestal",
  "area": "Ciências Agrárias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia Florestal no Sabe Mais é uma trilha educacional aprofundada sobre florestas, manejo, conservação, inventário e produtos florestais. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Engenharia Florestal"
 },
 {
  "slug": "zootecnia",
  "name": "Zootecnia",
  "area": "Ciências Agrárias",
  "duration": "8 semestres · trilha educacional",
  "description": "Zootecnia no Sabe Mais é uma trilha educacional aprofundada sobre nutrição animal, genética, produção, manejo e bem-estar. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Zootecnia"
 },
 {
  "slug": "medicina-equinos",
  "name": "Ciências Equinas",
  "area": "Saúde Animal",
  "duration": "8 semestres · trilha educacional",
  "description": "Ciências Equinas no Sabe Mais é uma trilha educacional aprofundada sobre manejo, anatomia, comportamento e saúde de equinos. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Ciências Equinas"
 },
 {
  "slug": "tecnologia-alimentos",
  "name": "Ciência e Tecnologia de Alimentos",
  "area": "Produção e Alimentação",
  "duration": "8 semestres · trilha educacional",
  "description": "Ciência e Tecnologia de Alimentos no Sabe Mais é uma trilha educacional aprofundada sobre composição, segurança, conservação e qualidade de alimentos. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Ciência e Tecnologia de Alimentos"
 },
 {
  "slug": "hotelaria",
  "name": "Hotelaria",
  "area": "Turismo e Hospitalidade",
  "duration": "8 semestres · trilha educacional",
  "description": "Hotelaria no Sabe Mais é uma trilha educacional aprofundada sobre hospedagem, operações, experiência do hóspede e gestão. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Hotelaria"
 },
 {
  "slug": "eventos",
  "name": "Eventos",
  "area": "Turismo e Hospitalidade",
  "duration": "8 semestres · trilha educacional",
  "description": "Eventos no Sabe Mais é uma trilha educacional aprofundada sobre planejamento, produção, orçamento, logística e avaliação de eventos. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Eventos"
 },
 {
  "slug": "comercio-exterior",
  "name": "Comércio Exterior",
  "area": "Gestão e Negócios",
  "duration": "8 semestres · trilha educacional",
  "description": "Comércio Exterior no Sabe Mais é uma trilha educacional aprofundada sobre importação, exportação, logística, câmbio e normas comerciais. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Comércio Exterior"
 },
 {
  "slug": "logistica",
  "name": "Logística",
  "area": "Gestão e Negócios",
  "duration": "8 semestres · trilha educacional",
  "description": "Logística no Sabe Mais é uma trilha educacional aprofundada sobre transportes, armazenagem, estoques, distribuição e cadeia de suprimentos. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Logística"
 },
 {
  "slug": "gestao-recursos-humanos",
  "name": "Gestão de Recursos Humanos",
  "area": "Gestão e Negócios",
  "duration": "8 semestres · trilha educacional",
  "description": "Gestão de Recursos Humanos no Sabe Mais é uma trilha educacional aprofundada sobre recrutamento, desenvolvimento, remuneração e relações de trabalho. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Gestão de Recursos Humanos"
 },
 {
  "slug": "gestao-publica",
  "name": "Gestão Pública",
  "area": "Gestão e Negócios",
  "duration": "8 semestres · trilha educacional",
  "description": "Gestão Pública no Sabe Mais é uma trilha educacional aprofundada sobre políticas públicas, orçamento, governança e serviços públicos. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Gestão Pública"
 },
 {
  "slug": "gestao-financeira",
  "name": "Gestão Financeira",
  "area": "Gestão e Negócios",
  "duration": "8 semestres · trilha educacional",
  "description": "Gestão Financeira no Sabe Mais é uma trilha educacional aprofundada sobre fluxo de caixa, orçamento, crédito, investimentos e análise financeira. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Gestão Financeira"
 },
 {
  "slug": "processos-gerenciais",
  "name": "Processos Gerenciais",
  "area": "Gestão e Negócios",
  "duration": "8 semestres · trilha educacional",
  "description": "Processos Gerenciais no Sabe Mais é uma trilha educacional aprofundada sobre indicadores, processos, equipes, planejamento e melhoria contínua. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Processos Gerenciais"
 },
 {
  "slug": "secretariado",
  "name": "Secretariado Executivo",
  "area": "Gestão e Negócios",
  "duration": "8 semestres · trilha educacional",
  "description": "Secretariado Executivo no Sabe Mais é uma trilha educacional aprofundada sobre comunicação, organização, gestão de agendas e apoio executivo. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Secretariado Executivo"
 },
 {
  "slug": "atuaria",
  "name": "Ciências Atuariais",
  "area": "Ciências Exatas",
  "duration": "8 semestres · trilha educacional",
  "description": "Ciências Atuariais no Sabe Mais é uma trilha educacional aprofundada sobre probabilidade, risco, seguros, previdência e modelagem financeira. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Ciências Atuariais"
 },
 {
  "slug": "relacoes-economicas",
  "name": "Relações Econômicas Internacionais",
  "area": "Gestão e Negócios",
  "duration": "8 semestres · trilha educacional",
  "description": "Relações Econômicas Internacionais no Sabe Mais é uma trilha educacional aprofundada sobre comércio global, finanças internacionais e políticas econômicas. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Relações Econômicas Internacionais"
 },
 {
  "slug": "criminologia",
  "name": "Criminologia",
  "area": "Ciências Humanas",
  "duration": "8 semestres · trilha educacional",
  "description": "Criminologia no Sabe Mais é uma trilha educacional aprofundada sobre crime, prevenção, justiça, comportamento e políticas públicas. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Criminologia"
 },
 {
  "slug": "investigacao-forense",
  "name": "Ciências Forenses",
  "area": "Ciências Exatas",
  "duration": "8 semestres · trilha educacional",
  "description": "Ciências Forenses no Sabe Mais é uma trilha educacional aprofundada sobre métodos laboratoriais, vestígios, documentação e análise científica. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Ciências Forenses"
 },
 {
  "slug": "fonoaudiologia",
  "name": "Fonoaudiologia",
  "area": "Saúde",
  "duration": "8 semestres · trilha educacional",
  "description": "Fonoaudiologia no Sabe Mais é uma trilha educacional aprofundada sobre comunicação humana, linguagem, audição, voz e deglutição. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Fonoaudiologia"
 },
 {
  "slug": "terapia-ocupacional",
  "name": "Terapia Ocupacional",
  "area": "Saúde",
  "duration": "8 semestres · trilha educacional",
  "description": "Terapia Ocupacional no Sabe Mais é uma trilha educacional aprofundada sobre participação, autonomia, atividades cotidianas e reabilitação. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Terapia Ocupacional"
 },
 {
  "slug": "saude-coletiva",
  "name": "Saúde Coletiva",
  "area": "Saúde",
  "duration": "8 semestres · trilha educacional",
  "description": "Saúde Coletiva no Sabe Mais é uma trilha educacional aprofundada sobre epidemiologia, políticas de saúde, prevenção e gestão. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Saúde Coletiva"
 },
 {
  "slug": "saude-publica",
  "name": "Saúde Pública",
  "area": "Saúde",
  "duration": "8 semestres · trilha educacional",
  "description": "Saúde Pública no Sabe Mais é uma trilha educacional aprofundada sobre vigilância, promoção, sistemas de saúde e planejamento. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Saúde Pública"
 },
 {
  "slug": "obstetricia",
  "name": "Obstetrícia",
  "area": "Saúde",
  "duration": "8 semestres · trilha educacional",
  "description": "Obstetrícia no Sabe Mais é uma trilha educacional aprofundada sobre saúde reprodutiva, gestação, parto e cuidado materno. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Obstetrícia"
 },
 {
  "slug": "gerontologia",
  "name": "Gerontologia",
  "area": "Saúde",
  "duration": "8 semestres · trilha educacional",
  "description": "Gerontologia no Sabe Mais é uma trilha educacional aprofundada sobre envelhecimento, autonomia, políticas e cuidado interdisciplinar. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Gerontologia"
 },
 {
  "slug": "optica-optometria",
  "name": "Optometria",
  "area": "Saúde",
  "duration": "8 semestres · trilha educacional",
  "description": "Optometria no Sabe Mais é uma trilha educacional aprofundada sobre visão, óptica, avaliação visual e saúde ocular. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Optometria"
 },
 {
  "slug": "radiologia",
  "name": "Radiologia",
  "area": "Saúde",
  "duration": "8 semestres · trilha educacional",
  "description": "Radiologia no Sabe Mais é uma trilha educacional aprofundada sobre física das radiações, imagem médica, proteção e equipamentos. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Radiologia"
 },
 {
  "slug": "estetica-cosmetica",
  "name": "Estética e Cosmética",
  "area": "Saúde",
  "duration": "8 semestres · trilha educacional",
  "description": "Estética e Cosmética no Sabe Mais é uma trilha educacional aprofundada sobre cosmetologia, pele, avaliação estética e biossegurança. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Estética e Cosmética"
 },
 {
  "slug": "podologia",
  "name": "Podologia",
  "area": "Saúde",
  "duration": "8 semestres · trilha educacional",
  "description": "Podologia no Sabe Mais é uma trilha educacional aprofundada sobre anatomia dos pés, avaliação, prevenção e cuidados podológicos. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Podologia"
 },
 {
  "slug": "biologia-marinha",
  "name": "Biologia Marinha",
  "area": "Ciências Exatas",
  "duration": "8 semestres · trilha educacional",
  "description": "Biologia Marinha no Sabe Mais é uma trilha educacional aprofundada sobre ecossistemas marinhos, organismos, conservação e pesquisa. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Biologia Marinha"
 },
 {
  "slug": "gestao-ambiental",
  "name": "Gestão Ambiental",
  "area": "Ciências Agrárias",
  "duration": "8 semestres · trilha educacional",
  "description": "Gestão Ambiental no Sabe Mais é uma trilha educacional aprofundada sobre licenciamento, indicadores, sustentabilidade e políticas ambientais. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Gestão Ambiental"
 },
 {
  "slug": "agroecologia",
  "name": "Agroecologia",
  "area": "Ciências Agrárias",
  "duration": "8 semestres · trilha educacional",
  "description": "Agroecologia no Sabe Mais é uma trilha educacional aprofundada sobre sistemas sustentáveis, biodiversidade, solo e agricultura familiar. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Agroecologia"
 },
 {
  "slug": "aquicultura",
  "name": "Aquicultura",
  "area": "Ciências Agrárias",
  "duration": "8 semestres · trilha educacional",
  "description": "Aquicultura no Sabe Mais é uma trilha educacional aprofundada sobre cultivo aquático, qualidade da água, nutrição e produção. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Aquicultura"
 },
 {
  "slug": "silvicultura",
  "name": "Silvicultura",
  "area": "Ciências Agrárias",
  "duration": "8 semestres · trilha educacional",
  "description": "Silvicultura no Sabe Mais é uma trilha educacional aprofundada sobre plantio florestal, manejo, viveiros e conservação. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Silvicultura"
 },
 {
  "slug": "viticultura-enologia",
  "name": "Viticultura e Enologia",
  "area": "Produção e Alimentação",
  "duration": "8 semestres · trilha educacional",
  "description": "Viticultura e Enologia no Sabe Mais é uma trilha educacional aprofundada sobre cultivo de uvas, fermentação, análise sensorial e produção. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Viticultura e Enologia"
 },
 {
  "slug": "panificacao-confeitaria",
  "name": "Panificação e Confeitaria",
  "area": "Produção e Alimentação",
  "duration": "8 semestres · trilha educacional",
  "description": "Panificação e Confeitaria no Sabe Mais é uma trilha educacional aprofundada sobre massas, fermentação, confeitaria, segurança e custos. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Panificação e Confeitaria"
 },
 {
  "slug": "artes-culinarias",
  "name": "Artes Culinárias",
  "area": "Produção e Alimentação",
  "duration": "8 semestres · trilha educacional",
  "description": "Artes Culinárias no Sabe Mais é uma trilha educacional aprofundada sobre técnicas, apresentação, cozinhas regionais e criação. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Artes Culinárias"
 },
 {
  "slug": "gestao-esportiva",
  "name": "Gestão Desportiva",
  "area": "Gestão e Negócios",
  "duration": "8 semestres · trilha educacional",
  "description": "Gestão Desportiva no Sabe Mais é uma trilha educacional aprofundada sobre organizações esportivas, eventos, marketing e finanças. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Gestão Desportiva"
 },
 {
  "slug": "ciencias-do-esporte",
  "name": "Ciências do Esporte",
  "area": "Saúde",
  "duration": "8 semestres · trilha educacional",
  "description": "Ciências do Esporte no Sabe Mais é uma trilha educacional aprofundada sobre fisiologia, biomecânica, desempenho e pesquisa esportiva. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Ciências do Esporte"
 },
 {
  "slug": "treinamento-esportivo",
  "name": "Treinamento Esportivo",
  "area": "Saúde",
  "duration": "8 semestres · trilha educacional",
  "description": "Treinamento Esportivo no Sabe Mais é uma trilha educacional aprofundada sobre planejamento, avaliação, periodização e recuperação. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Treinamento Esportivo"
 },
 {
  "slug": "lazer-recreacao",
  "name": "Lazer e Recreação",
  "area": "Educação",
  "duration": "8 semestres · trilha educacional",
  "description": "Lazer e Recreação no Sabe Mais é uma trilha educacional aprofundada sobre jogos, lazer, inclusão, programação e desenvolvimento comunitário. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Lazer e Recreação"
 },
 {
  "slug": "biblioteconomia",
  "name": "Biblioteconomia",
  "area": "Informação",
  "duration": "8 semestres · trilha educacional",
  "description": "Biblioteconomia no Sabe Mais é uma trilha educacional aprofundada sobre bibliotecas, catalogação, mediação da leitura e acervos digitais. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Biblioteconomia"
 },
 {
  "slug": "museologia",
  "name": "Museologia",
  "area": "Humanidades",
  "duration": "8 semestres · trilha educacional",
  "description": "Museologia no Sabe Mais é uma trilha educacional aprofundada sobre acervos, conservação, exposições, patrimônio e educação museal. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Museologia"
 },
 {
  "slug": "patrimonio-cultural",
  "name": "Gestão do Patrimônio Cultural",
  "area": "Humanidades",
  "duration": "8 semestres · trilha educacional",
  "description": "Gestão do Patrimônio Cultural no Sabe Mais é uma trilha educacional aprofundada sobre preservação, inventário, memória e políticas culturais. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Gestão do Patrimônio Cultural"
 },
 {
  "slug": "estudos-asiaticos",
  "name": "Estudos Asiáticos",
  "area": "Humanidades",
  "duration": "8 semestres · trilha educacional",
  "description": "Estudos Asiáticos no Sabe Mais é uma trilha educacional aprofundada sobre história, línguas, culturas e sociedades asiáticas. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Estudos Asiáticos"
 },
 {
  "slug": "estudos-africanos",
  "name": "Estudos Africanos",
  "area": "Humanidades",
  "duration": "8 semestres · trilha educacional",
  "description": "Estudos Africanos no Sabe Mais é uma trilha educacional aprofundada sobre história, culturas, línguas e sociedades africanas. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Estudos Africanos"
 },
 {
  "slug": "linguistica",
  "name": "Linguística",
  "area": "Humanidades",
  "duration": "8 semestres · trilha educacional",
  "description": "Linguística no Sabe Mais é uma trilha educacional aprofundada sobre fonética, sintaxe, semântica, sociolinguística e aquisição. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Linguística"
 },
 {
  "slug": "literatura",
  "name": "Estudos Literários",
  "area": "Humanidades",
  "duration": "8 semestres · trilha educacional",
  "description": "Estudos Literários no Sabe Mais é uma trilha educacional aprofundada sobre teoria literária, gêneros, crítica e literatura comparada. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Estudos Literários"
 },
 {
  "slug": "estudos-religiao",
  "name": "Ciências da Religião",
  "area": "Humanidades",
  "duration": "8 semestres · trilha educacional",
  "description": "Ciências da Religião no Sabe Mais é uma trilha educacional aprofundada sobre religiões, textos, práticas, história e sociedade. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Ciências da Religião"
 },
 {
  "slug": "educacao-fisica-adaptada",
  "name": "Atividade Física Adaptada",
  "area": "Saúde",
  "duration": "8 semestres · trilha educacional",
  "description": "Atividade Física Adaptada no Sabe Mais é uma trilha educacional aprofundada sobre inclusão, acessibilidade, movimento e participação esportiva. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Atividade Física Adaptada"
 },
 {
  "slug": "ciencias-da-familia",
  "name": "Ciências da Família",
  "area": "Ciências Humanas",
  "duration": "8 semestres · trilha educacional",
  "description": "Ciências da Família no Sabe Mais é uma trilha educacional aprofundada sobre relações familiares, desenvolvimento, políticas e apoio comunitário. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Ciências da Família"
 },
 {
  "slug": "estudos-urbanos",
  "name": "Estudos Urbanos",
  "area": "Ciências Humanas",
  "duration": "8 semestres · trilha educacional",
  "description": "Estudos Urbanos no Sabe Mais é uma trilha educacional aprofundada sobre cidades, habitação, mobilidade, território e políticas urbanas. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Estudos Urbanos"
 },
 {
  "slug": "planejamento-regional",
  "name": "Planejamento Regional",
  "area": "Ciências Humanas",
  "duration": "8 semestres · trilha educacional",
  "description": "Planejamento Regional no Sabe Mais é uma trilha educacional aprofundada sobre desenvolvimento territorial, infraestrutura e políticas regionais. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Planejamento Regional"
 },
 {
  "slug": "desenvolvimento-internacional",
  "name": "Desenvolvimento Internacional",
  "area": "Ciências Humanas",
  "duration": "8 semestres · trilha educacional",
  "description": "Desenvolvimento Internacional no Sabe Mais é uma trilha educacional aprofundada sobre desenvolvimento, cooperação, desigualdade e sustentabilidade. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Desenvolvimento Internacional"
 },
 {
  "slug": "estudos-de-genero",
  "name": "Estudos de Gênero",
  "area": "Ciências Humanas",
  "duration": "8 semestres · trilha educacional",
  "description": "Estudos de Gênero no Sabe Mais é uma trilha educacional aprofundada sobre sociedade, identidade, direitos, cultura e pesquisa social. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Estudos de Gênero"
 },
 {
  "slug": "empreendedorismo",
  "name": "Empreendedorismo",
  "area": "Gestão e Negócios",
  "duration": "8 semestres · trilha educacional",
  "description": "Empreendedorismo no Sabe Mais é uma trilha educacional aprofundada sobre modelos de negócio, validação, finanças, marketing e inovação. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Empreendedorismo"
 },
 {
  "slug": "inovacao",
  "name": "Gestão da Inovação",
  "area": "Gestão e Negócios",
  "duration": "8 semestres · trilha educacional",
  "description": "Gestão da Inovação no Sabe Mais é uma trilha educacional aprofundada sobre pesquisa, desenvolvimento, propriedade intelectual e inovação. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Gestão da Inovação"
 },
 {
  "slug": "gestao-projetos",
  "name": "Gestão de Projetos",
  "area": "Gestão e Negócios",
  "duration": "8 semestres · trilha educacional",
  "description": "Gestão de Projetos no Sabe Mais é uma trilha educacional aprofundada sobre escopo, cronograma, riscos, orçamento e comunicação. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Gestão de Projetos"
 },
 {
  "slug": "compliance",
  "name": "Compliance e Governança",
  "area": "Gestão e Negócios",
  "duration": "8 semestres · trilha educacional",
  "description": "Compliance e Governança no Sabe Mais é uma trilha educacional aprofundada sobre ética, controles, riscos, auditoria e conformidade. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Compliance e Governança"
 },
 {
  "slug": "negocios-digitais",
  "name": "Negócios Digitais",
  "area": "Gestão e Negócios",
  "duration": "8 semestres · trilha educacional",
  "description": "Negócios Digitais no Sabe Mais é uma trilha educacional aprofundada sobre produtos digitais, plataformas, métricas e crescimento. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Negócios Digitais"
 },
 {
  "slug": "financas",
  "name": "Finanças",
  "area": "Gestão e Negócios",
  "duration": "8 semestres · trilha educacional",
  "description": "Finanças no Sabe Mais é uma trilha educacional aprofundada sobre mercados, investimentos, risco, avaliação e planejamento. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Finanças"
 },
 {
  "slug": "banco-seguros",
  "name": "Gestão de Bancos e Seguros",
  "area": "Gestão e Negócios",
  "duration": "8 semestres · trilha educacional",
  "description": "Gestão de Bancos e Seguros no Sabe Mais é uma trilha educacional aprofundada sobre produtos financeiros, crédito, seguros, risco e regulação. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Gestão de Bancos e Seguros"
 },
 {
  "slug": "comunicacao-digital",
  "name": "Comunicação Digital",
  "area": "Comunicação",
  "duration": "8 semestres · trilha educacional",
  "description": "Comunicação Digital no Sabe Mais é uma trilha educacional aprofundada sobre conteúdo multiplataforma, comunidades, métricas e estratégia. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Comunicação Digital"
 },
 {
  "slug": "producao-musical",
  "name": "Produção Musical",
  "area": "Comunicação",
  "duration": "8 semestres · trilha educacional",
  "description": "Produção Musical no Sabe Mais é uma trilha educacional aprofundada sobre gravação, mixagem, arranjo, áudio digital e produção. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Produção Musical"
 },
 {
  "slug": "fotografia",
  "name": "Fotografia",
  "area": "Arquitetura e Design",
  "duration": "8 semestres · trilha educacional",
  "description": "Fotografia no Sabe Mais é uma trilha educacional aprofundada sobre luz, composição, captura, edição e narrativa visual. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Fotografia"
 },
 {
  "slug": "ilustracao",
  "name": "Ilustração",
  "area": "Arquitetura e Design",
  "duration": "8 semestres · trilha educacional",
  "description": "Ilustração no Sabe Mais é uma trilha educacional aprofundada sobre desenho, narrativa visual, técnicas e publicação. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Ilustração"
 },
 {
  "slug": "artes-cenicas",
  "name": "Artes Cênicas",
  "area": "Arquitetura e Design",
  "duration": "8 semestres · trilha educacional",
  "description": "Artes Cênicas no Sabe Mais é uma trilha educacional aprofundada sobre performance, movimento, voz, dramaturgia e produção. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Artes Cênicas"
 },
 {
  "slug": "conservacao-restauro",
  "name": "Conservação e Restauro",
  "area": "Humanidades",
  "duration": "8 semestres · trilha educacional",
  "description": "Conservação e Restauro no Sabe Mais é uma trilha educacional aprofundada sobre materiais, diagnóstico, conservação preventiva e patrimônio. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Conservação e Restauro"
 },
 {
  "slug": "defesa-civil",
  "name": "Gestão de Riscos e Defesa Civil",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Gestão de Riscos e Defesa Civil no Sabe Mais é uma trilha educacional aprofundada sobre prevenção, avaliação de riscos, planejamento e resposta a desastres. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Gestão de Riscos e Defesa Civil"
 },
 {
  "slug": "seguranca-trabalho",
  "name": "Segurança do Trabalho",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Segurança do Trabalho no Sabe Mais é uma trilha educacional aprofundada sobre prevenção de riscos, ergonomia, higiene e normas. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Segurança do Trabalho"
 },
 {
  "slug": "tecnologia-construcao",
  "name": "Tecnologia em Construção de Edifícios",
  "area": "Engenharias",
  "duration": "8 semestres · trilha educacional",
  "description": "Tecnologia em Construção de Edifícios no Sabe Mais é uma trilha educacional aprofundada sobre materiais, execução, orçamento, instalações e qualidade. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Tecnologia em Construção de Edifícios"
 },
 {
  "slug": "agroindustria",
  "name": "Agroindústria",
  "area": "Ciências Agrárias",
  "duration": "8 semestres · trilha educacional",
  "description": "Agroindústria no Sabe Mais é uma trilha educacional aprofundada sobre processamento rural, qualidade, produção e comercialização. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Agroindústria"
 },
 {
  "slug": "pesca",
  "name": "Engenharia de Pesca",
  "area": "Ciências Agrárias",
  "duration": "8 semestres · trilha educacional",
  "description": "Engenharia de Pesca no Sabe Mais é uma trilha educacional aprofundada sobre recursos pesqueiros, aquicultura, ecossistemas e tecnologia. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Engenharia de Pesca"
 },
 {
  "slug": "medicina-tropical",
  "name": "Medicina Tropical",
  "area": "Saúde",
  "duration": "8 semestres · trilha educacional",
  "description": "Medicina Tropical no Sabe Mais é uma trilha educacional aprofundada sobre doenças tropicais, epidemiologia, prevenção e pesquisa. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Medicina Tropical"
 },
 {
  "slug": "bioinformatica",
  "name": "Bioinformática",
  "area": "Tecnologia",
  "duration": "8 semestres · trilha educacional",
  "description": "Bioinformática no Sabe Mais é uma trilha educacional aprofundada sobre dados biológicos, programação, genômica e modelagem. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Bioinformática"
 },
 {
  "slug": "neurociencia",
  "name": "Neurociência",
  "area": "Ciências Exatas",
  "duration": "8 semestres · trilha educacional",
  "description": "Neurociência no Sabe Mais é uma trilha educacional aprofundada sobre sistema nervoso, cognição, comportamento e métodos experimentais. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Neurociência"
 },
 {
  "slug": "ciencia-cognitiva",
  "name": "Ciência Cognitiva",
  "area": "Ciências Humanas",
  "duration": "8 semestres · trilha educacional",
  "description": "Ciência Cognitiva no Sabe Mais é uma trilha educacional aprofundada sobre cognição, linguagem, mente, computação e comportamento. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.",
  "coverAlt": "Ilustração temática de Ciência Cognitiva"
 }
];
export function getSubjectInfo(slug: string) { return subjects.find((s) => s.slug === slug); }
export function getFacultyCourseInfo(slug: string) { return facultyCatalog.find((c) => c.slug === slug); }
