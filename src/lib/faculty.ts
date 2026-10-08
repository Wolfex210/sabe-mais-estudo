export type FacultyDiscipline = {
  name: string;
  overview: string;
  modules: string[];
  practice: string;
};

export type FacultySemester = {
  period: string;
  theme: string;
  disciplines: FacultyDiscipline[];
};

export type FacultyCourse = {
  slug: string;
  name: string;
  area: string;
  duration: string;
  description: string;
  profile: string;
  careers: string[];
  competencies: string[];
  coverEmoji: string;
  coverAlt: string;
  examples: string[];
  semesters: FacultySemester[];
};

const courseSeeds = [
  ["engenharia-de-petroleo","Engenharia de Petróleo","Engenharias","Energia, reservatórios, perfuração, produção e segurança operacional"],
  ["engenharia-mecanica","Engenharia Mecânica","Engenharias","Mecânica, materiais, termodinâmica, máquinas, projetos e manufatura"],
  ["engenharia-civil","Engenharia Civil","Engenharias","Estruturas, materiais, geotecnia, hidráulica, construção e gestão de obras"],
  ["engenharia-eletrica","Engenharia Elétrica","Engenharias","Circuitos, eletrônica, máquinas elétricas, potência, controle e automação"],
  ["engenharia-de-producao","Engenharia de Produção","Engenharias","Processos, qualidade, logística, operações, dados e gestão industrial"],
  ["engenharia-quimica","Engenharia Química","Engenharias","Balanços, fenômenos de transporte, reatores, processos e controle"],
  ["engenharia-ambiental","Engenharia Ambiental","Engenharias","Água, resíduos, poluição, avaliação ambiental e sustentabilidade"],
  ["engenharia-de-computacao","Engenharia de Computação","Tecnologia","Hardware, software, sistemas embarcados, redes e arquitetura de computadores"],
  ["engenharia-de-software","Engenharia de Software","Tecnologia","Requisitos, arquitetura, programação, testes, DevOps e engenharia de sistemas"],
  ["engenharia-robotica","Engenharia Robótica","Tecnologia","Robótica, sensores, atuadores, controle, visão computacional e sistemas autônomos"],
  ["ciencia-da-computacao","Ciência da Computação","Tecnologia","Algoritmos, estruturas de dados, computação teórica, sistemas e IA"],
  ["sistemas-de-informacao","Sistemas de Informação","Tecnologia","Sistemas empresariais, bancos de dados, processos, software e gestão de TI"],
  ["inteligencia-artificial","Inteligência Artificial","Tecnologia","Aprendizado de máquina, dados, modelos, visão, linguagem e sistemas inteligentes"],
  ["analise-e-desenvolvimento-de-sistemas","Análise e Desenvolvimento de Sistemas","Tecnologia","Análise, programação, bancos de dados, APIs, testes e implantação"],
  ["arquitetura-e-urbanismo","Arquitetura e Urbanismo","Arquitetura e Design","Projeto arquitetônico, representação, conforto, urbanismo e paisagismo"],
  ["administracao","Administração","Gestão e Negócios","Estratégia, pessoas, marketing, finanças, operações e empreendedorismo"],
  ["ciencias-contabeis","Ciências Contábeis","Gestão e Negócios","Contabilidade, custos, auditoria, tributos, finanças e relatórios"],
  ["economia","Economia","Gestão e Negócios","Microeconomia, macroeconomia, estatística, finanças e análise de políticas"],
  ["direito","Direito","Ciências Humanas","Teoria jurídica, constitucional, civil, penal, trabalho, empresarial e processo"],
  ["medicina","Medicina","Saúde","Bases biomédicas, diagnóstico, raciocínio clínico, prevenção e cuidado integral"],
  ["enfermagem","Enfermagem","Saúde","Fundamentos de enfermagem, saúde coletiva, clínica, gestão e cuidado"],
  ["farmacia","Farmácia","Saúde","Química, farmacologia, tecnologia farmacêutica, análises e assistência"],
  ["biomedicina","Biomedicina","Saúde","Biologia celular, análises clínicas, microbiologia, genética e pesquisa"],
  ["nutricao","Nutrição","Saúde","Bioquímica, avaliação nutricional, dietética, saúde coletiva e alimentação"],
  ["psicologia","Psicologia","Saúde e Humanas","Processos psicológicos, desenvolvimento, avaliação, teorias e atuação profissional"],
  ["fisioterapia","Fisioterapia","Saúde","Anatomia, movimento, avaliação funcional, recursos terapêuticos e reabilitação"],
  ["educacao-fisica","Educação Física","Saúde","Corpo e movimento, treinamento, pedagogia, saúde e avaliação"],
  ["odontologia","Odontologia","Saúde","Anatomia oral, prevenção, diagnóstico, clínica e saúde bucal"],
  ["medicina-veterinaria","Medicina Veterinária","Saúde Animal","Anatomia animal, clínica, cirurgia, produção e saúde pública"],
  ["agronomia","Agronomia","Ciências Agrárias","Solo, plantas, produção, irrigação, máquinas, manejo e sustentabilidade"],
  ["gastronomia","Gastronomia","Produção e Alimentação","Técnicas culinárias, segurança alimentar, gestão, confeitaria e criação"],
  ["marketing","Marketing","Comunicação e Negócios","Comportamento, estratégia, marca, mídia, dados e marketing digital"],
  ["publicidade-e-propaganda","Publicidade e Propaganda","Comunicação","Criação, planejamento, mídia, redação, campanhas e métricas"],
  ["jornalismo","Jornalismo","Comunicação","Apuração, reportagem, texto, ética, audiovisual e jornalismo digital"],
  ["design","Design","Arquitetura e Design","Fundamentos visuais, tipografia, UX, produto, identidade e prototipação"],
  ["relacoes-internacionais","Relações Internacionais","Ciências Humanas","Teorias internacionais, política externa, economia, diplomacia e conflitos"],
  ["biblioteconomia-e-arquivologia","Biblioteconomia e Arquivologia","Informação","Organização da informação, acervos, preservação, pesquisa e gestão documental"],
  ["turismo","Turismo","Turismo e Hospitalidade","Planejamento turístico, hospitalidade, eventos, destinos e gestão"],
  ["matematica","Matemática","Ciências Exatas","Álgebra, cálculo, geometria, análise, probabilidade e modelagem"],
  ["fisica","Física","Ciências Exatas","Mecânica, termodinâmica, eletromagnetismo, ondas, quântica e experimentação"],
  ["pedagogia","Pedagogia","Educação","Didática, aprendizagem, currículo, inclusão e gestão educacional"],
  ["educacao-especial","Educação Especial","Educação","Inclusão, acessibilidade, desenvolvimento e práticas pedagógicas"],
  ["letras-portugues","Letras — Português","Educação","Língua portuguesa, linguística, literatura e ensino"],
  ["letras-ingles","Letras — Inglês","Educação","Língua inglesa, linguística, literatura e ensino"],
  ["traducao-interpretacao","Tradução e Interpretação","Humanidades","Tradução escrita, interpretação, linguística e cultura"],
  ["historia","História","Humanidades","Historiografia, sociedades, fontes e períodos históricos"],
  ["geografia","Geografia","Ciências Humanas","Território, cartografia, população, clima e geopolítica"],
  ["filosofia","Filosofia","Ciências Humanas","Lógica, ética, epistemologia, política e história da filosofia"],
  ["sociologia","Sociologia","Ciências Humanas","Sociedade, cultura, desigualdade, instituições e pesquisa social"],
  ["antropologia","Antropologia","Ciências Humanas","Culturas, parentesco, etnografia e diversidade humana"],
  ["arqueologia","Arqueologia","Humanidades","Culturas materiais, escavação, conservação e interpretação histórica"],
  ["teologia","Teologia","Humanidades","História das religiões, textos, ética e pensamento teológico"],
  ["ciencias-politicas","Ciência Política","Ciências Humanas","Instituições, democracia, políticas públicas e comportamento político"],
  ["servico-social","Serviço Social","Saúde e Humanas","Direitos sociais, políticas públicas, comunidade e proteção social"],
  ["relacoes-publicas","Relações Públicas","Comunicação","Comunicação institucional, reputação, eventos e públicos"],
  ["radio-tv","Rádio, TV e Internet","Comunicação","Produção audiovisual, roteiro, som, edição e transmissão"],
  ["cinema-audiovisual","Cinema e Audiovisual","Comunicação","Roteiro, direção, fotografia, montagem e produção"],
  ["musica","Música","Arquitetura e Design","Teoria musical, composição, performance e tecnologia sonora"],
  ["artes-visuais","Artes Visuais","Arquitetura e Design","Desenho, pintura, escultura, arte contemporânea e exposição"],
  ["danca","Dança","Arquitetura e Design","Técnicas corporais, criação, história e performance"],
  ["teatro","Teatro","Arquitetura e Design","Interpretação, dramaturgia, direção, cenografia e produção"],
  ["moda","Design de Moda","Arquitetura e Design","Desenho, modelagem, materiais, coleção e sustentabilidade"],
  ["design-interiores","Design de Interiores","Arquitetura e Design","Espaços, ergonomia, iluminação, materiais e representação"],
  ["design-grafico","Design Gráfico","Arquitetura e Design","Tipografia, identidade visual, composição e produção gráfica"],
  ["animacao","Animação","Comunicação","Storyboard, desenho, modelagem, movimento e pós-produção"],
  ["jogos-digitais","Jogos Digitais","Tecnologia","Game design, programação, narrativa, arte e testes"],
  ["seguranca-informacao","Segurança da Informação","Tecnologia","Redes, criptografia, gestão de riscos e proteção de sistemas"],
  ["ciencia-dados","Ciência de Dados","Tecnologia","Estatística, programação, visualização e modelos preditivos"],
  ["computacao-nuvem","Computação em Nuvem","Tecnologia","Infraestrutura, serviços cloud, automação e confiabilidade"],
  ["redes-computadores","Redes de Computadores","Tecnologia","Protocolos, infraestrutura, administração e monitoramento"],
  ["sistemas-embarcados","Sistemas Embarcados","Tecnologia","Microcontroladores, firmware, sensores e integração hardware-software"],
  ["matematica-computacional","Matemática Computacional","Ciências Exatas","Métodos numéricos, algoritmos, modelagem e simulação"],
  ["estatistica","Estatística","Ciências Exatas","Probabilidade, inferência, amostragem e análise de dados"],
  ["quimica","Química","Ciências Exatas","Química orgânica, inorgânica, analítica e físico-química"],
  ["ciencias-biologicas","Ciências Biológicas","Ciências Exatas","Biologia celular, ecologia, genética, evolução e biodiversidade"],
  ["astronomia","Astronomia","Ciências Exatas","Mecânica celeste, observação, astrofísica e cosmologia"],
  ["geologia","Geologia","Ciências Exatas","Minerais, rochas, tectônica, estratigrafia e recursos naturais"],
  ["oceanografia","Oceanografia","Ciências Exatas","Oceanos, correntes, ecossistemas, química e geologia marinha"],
  ["meteorologia","Meteorologia","Ciências Exatas","Atmosfera, previsão, clima, dinâmica e sensoriamento remoto"],
  ["biotecnologia","Biotecnologia","Ciências Exatas","Biologia molecular, bioprocessos, genética e aplicações industriais"],
  ["engenharia-aeroespacial","Engenharia Aeroespacial","Engenharias","Aerodinâmica, estruturas, propulsão e sistemas espaciais"],
  ["engenharia-aeronautica","Engenharia Aeronáutica","Engenharias","Projeto de aeronaves, aerodinâmica, estruturas e voo"],
  ["engenharia-naval","Engenharia Naval","Engenharias","Embarcações, hidrodinâmica, estruturas e sistemas navais"],
  ["engenharia-ferroviaria","Engenharia Ferroviária","Engenharias","Via permanente, material rodante, sinalização e operação"],
  ["engenharia-de-materiais","Engenharia de Materiais","Engenharias","Metais, polímeros, cerâmicas, compósitos e ensaios"],
  ["engenharia-metalurgica","Engenharia Metalúrgica","Engenharias","Extração, processamento, ligas, tratamentos e caracterização"],
  ["engenharia-de-minas","Engenharia de Minas","Engenharias","Geologia aplicada, lavra, beneficiamento e segurança"],
  ["engenharia-de-alimentos","Engenharia de Alimentos","Engenharias","Processamento, conservação, qualidade e desenvolvimento de alimentos"],
  ["engenharia-biomedica","Engenharia Biomédica","Engenharias","Instrumentação médica, biomateriais, sinais e dispositivos"],
  ["engenharia-de-energia","Engenharia de Energia","Engenharias","Geração, conversão, eficiência, redes e fontes renováveis"],
  ["engenharia-de-transportes","Engenharia de Transportes","Engenharias","Mobilidade, tráfego, logística, infraestrutura e planejamento"],
  ["engenharia-cartografica","Engenharia Cartográfica e de Agrimensura","Engenharias","Geodésia, topografia, mapas, GNSS e geoprocessamento"],
  ["engenharia-de-controle-automacao","Engenharia de Controle e Automação","Engenharias","Controle, instrumentação, robótica e processos industriais"],
  ["engenharia-sanitaria","Engenharia Sanitária","Engenharias","Saneamento, água, esgoto, resíduos e saúde ambiental"],
  ["engenharia-florestal","Engenharia Florestal","Ciências Agrárias","Florestas, manejo, conservação, inventário e produtos florestais"],
  ["zootecnia","Zootecnia","Ciências Agrárias","Nutrição animal, genética, produção, manejo e bem-estar"],
  ["medicina-equinos","Ciências Equinas","Saúde Animal","Manejo, anatomia, comportamento e saúde de equinos"],
  ["tecnologia-alimentos","Ciência e Tecnologia de Alimentos","Produção e Alimentação","Composição, segurança, conservação e qualidade de alimentos"],
  ["hotelaria","Hotelaria","Turismo e Hospitalidade","Hospedagem, operações, experiência do hóspede e gestão"],
  ["eventos","Eventos","Turismo e Hospitalidade","Planejamento, produção, orçamento, logística e avaliação de eventos"],
  ["comercio-exterior","Comércio Exterior","Gestão e Negócios","Importação, exportação, logística, câmbio e normas comerciais"],
  ["logistica","Logística","Gestão e Negócios","Transportes, armazenagem, estoques, distribuição e cadeia de suprimentos"],
  ["gestao-recursos-humanos","Gestão de Recursos Humanos","Gestão e Negócios","Recrutamento, desenvolvimento, remuneração e relações de trabalho"],
  ["gestao-publica","Gestão Pública","Gestão e Negócios","Políticas públicas, orçamento, governança e serviços públicos"],
  ["gestao-financeira","Gestão Financeira","Gestão e Negócios","Fluxo de caixa, orçamento, crédito, investimentos e análise financeira"],
  ["processos-gerenciais","Processos Gerenciais","Gestão e Negócios","Indicadores, processos, equipes, planejamento e melhoria contínua"],
  ["secretariado","Secretariado Executivo","Gestão e Negócios","Comunicação, organização, gestão de agendas e apoio executivo"],
  ["atuaria","Ciências Atuariais","Ciências Exatas","Probabilidade, risco, seguros, previdência e modelagem financeira"],
  ["relacoes-economicas","Relações Econômicas Internacionais","Gestão e Negócios","Comércio global, finanças internacionais e políticas econômicas"],
  ["criminologia","Criminologia","Ciências Humanas","Crime, prevenção, justiça, comportamento e políticas públicas"],
  ["investigacao-forense","Ciências Forenses","Ciências Exatas","Métodos laboratoriais, vestígios, documentação e análise científica"],
  ["fonoaudiologia","Fonoaudiologia","Saúde","Comunicação humana, linguagem, audição, voz e deglutição"],
  ["terapia-ocupacional","Terapia Ocupacional","Saúde","Participação, autonomia, atividades cotidianas e reabilitação"],
  ["saude-coletiva","Saúde Coletiva","Saúde","Epidemiologia, políticas de saúde, prevenção e gestão"],
  ["saude-publica","Saúde Pública","Saúde","Vigilância, promoção, sistemas de saúde e planejamento"],
  ["obstetricia","Obstetrícia","Saúde","Saúde reprodutiva, gestação, parto e cuidado materno"],
  ["gerontologia","Gerontologia","Saúde","Envelhecimento, autonomia, políticas e cuidado interdisciplinar"],
  ["optica-optometria","Optometria","Saúde","Visão, óptica, avaliação visual e saúde ocular"],
  ["radiologia","Radiologia","Saúde","Física das radiações, imagem médica, proteção e equipamentos"],
  ["estetica-cosmetica","Estética e Cosmética","Saúde","Cosmetologia, pele, avaliação estética e biossegurança"],
  ["podologia","Podologia","Saúde","Anatomia dos pés, avaliação, prevenção e cuidados podológicos"],
  ["biologia-marinha","Biologia Marinha","Ciências Exatas","Ecossistemas marinhos, organismos, conservação e pesquisa"],
  ["gestao-ambiental","Gestão Ambiental","Ciências Agrárias","Licenciamento, indicadores, sustentabilidade e políticas ambientais"],
  ["agroecologia","Agroecologia","Ciências Agrárias","Sistemas sustentáveis, biodiversidade, solo e agricultura familiar"],
  ["aquicultura","Aquicultura","Ciências Agrárias","Cultivo aquático, qualidade da água, nutrição e produção"],
  ["silvicultura","Silvicultura","Ciências Agrárias","Plantio florestal, manejo, viveiros e conservação"],
  ["viticultura-enologia","Viticultura e Enologia","Produção e Alimentação","Cultivo de uvas, fermentação, análise sensorial e produção"],
  ["panificacao-confeitaria","Panificação e Confeitaria","Produção e Alimentação","Massas, fermentação, confeitaria, segurança e custos"],
  ["artes-culinarias","Artes Culinárias","Produção e Alimentação","Técnicas, apresentação, cozinhas regionais e criação"],
  ["gestao-esportiva","Gestão Desportiva","Gestão e Negócios","Organizações esportivas, eventos, marketing e finanças"],
  ["ciencias-do-esporte","Ciências do Esporte","Saúde","Fisiologia, biomecânica, desempenho e pesquisa esportiva"],
  ["treinamento-esportivo","Treinamento Esportivo","Saúde","Planejamento, avaliação, periodização e recuperação"],
  ["lazer-recreacao","Lazer e Recreação","Educação","Jogos, lazer, inclusão, programação e desenvolvimento comunitário"],
  ["biblioteconomia","Biblioteconomia","Informação","Bibliotecas, catalogação, mediação da leitura e acervos digitais"],
  ["museologia","Museologia","Humanidades","Acervos, conservação, exposições, patrimônio e educação museal"],
  ["patrimonio-cultural","Gestão do Patrimônio Cultural","Humanidades","Preservação, inventário, memória e políticas culturais"],
  ["estudos-asiaticos","Estudos Asiáticos","Humanidades","História, línguas, culturas e sociedades asiáticas"],
  ["estudos-africanos","Estudos Africanos","Humanidades","História, culturas, línguas e sociedades africanas"],
  ["linguistica","Linguística","Humanidades","Fonética, sintaxe, semântica, sociolinguística e aquisição"],
  ["literatura","Estudos Literários","Humanidades","Teoria literária, gêneros, crítica e literatura comparada"],
  ["estudos-religiao","Ciências da Religião","Humanidades","Religiões, textos, práticas, história e sociedade"],
  ["educacao-fisica-adaptada","Atividade Física Adaptada","Saúde","Inclusão, acessibilidade, movimento e participação esportiva"],
  ["ciencias-da-familia","Ciências da Família","Ciências Humanas","Relações familiares, desenvolvimento, políticas e apoio comunitário"],
  ["estudos-urbanos","Estudos Urbanos","Ciências Humanas","Cidades, habitação, mobilidade, território e políticas urbanas"],
  ["planejamento-regional","Planejamento Regional","Ciências Humanas","Desenvolvimento territorial, infraestrutura e políticas regionais"],
  ["desenvolvimento-internacional","Desenvolvimento Internacional","Ciências Humanas","Desenvolvimento, cooperação, desigualdade e sustentabilidade"],
  ["estudos-de-genero","Estudos de Gênero","Ciências Humanas","Sociedade, identidade, direitos, cultura e pesquisa social"],
  ["empreendedorismo","Empreendedorismo","Gestão e Negócios","Modelos de negócio, validação, finanças, marketing e inovação"],
  ["inovacao","Gestão da Inovação","Gestão e Negócios","Pesquisa, desenvolvimento, propriedade intelectual e inovação"],
  ["gestao-projetos","Gestão de Projetos","Gestão e Negócios","Escopo, cronograma, riscos, orçamento e comunicação"],
  ["compliance","Compliance e Governança","Gestão e Negócios","Ética, controles, riscos, auditoria e conformidade"],
  ["negocios-digitais","Negócios Digitais","Gestão e Negócios","Produtos digitais, plataformas, métricas e crescimento"],
  ["financas","Finanças","Gestão e Negócios","Mercados, investimentos, risco, avaliação e planejamento"],
  ["banco-seguros","Gestão de Bancos e Seguros","Gestão e Negócios","Produtos financeiros, crédito, seguros, risco e regulação"],
  ["comunicacao-digital","Comunicação Digital","Comunicação","Conteúdo multiplataforma, comunidades, métricas e estratégia"],
  ["producao-musical","Produção Musical","Comunicação","Gravação, mixagem, arranjo, áudio digital e produção"],
  ["fotografia","Fotografia","Arquitetura e Design","Luz, composição, captura, edição e narrativa visual"],
  ["ilustracao","Ilustração","Arquitetura e Design","Desenho, narrativa visual, técnicas e publicação"],
  ["artes-cenicas","Artes Cênicas","Arquitetura e Design","Performance, movimento, voz, dramaturgia e produção"],
  ["conservacao-restauro","Conservação e Restauro","Humanidades","Materiais, diagnóstico, conservação preventiva e patrimônio"],
  ["defesa-civil","Gestão de Riscos e Defesa Civil","Engenharias","Prevenção, avaliação de riscos, planejamento e resposta a desastres"],
  ["seguranca-trabalho","Segurança do Trabalho","Engenharias","Prevenção de riscos, ergonomia, higiene e normas"],
  ["tecnologia-construcao","Tecnologia em Construção de Edifícios","Engenharias","Materiais, execução, orçamento, instalações e qualidade"],
  ["agroindustria","Agroindústria","Ciências Agrárias","Processamento rural, qualidade, produção e comercialização"],
  ["pesca","Engenharia de Pesca","Ciências Agrárias","Recursos pesqueiros, aquicultura, ecossistemas e tecnologia"],
  ["medicina-tropical","Medicina Tropical","Saúde","Doenças tropicais, epidemiologia, prevenção e pesquisa"],
  ["bioinformatica","Bioinformática","Tecnologia","Dados biológicos, programação, genômica e modelagem"],
  ["neurociencia","Neurociência","Ciências Exatas","Sistema nervoso, cognição, comportamento e métodos experimentais"],
  ["ciencia-cognitiva","Ciência Cognitiva","Ciências Humanas","Cognição, linguagem, mente, computação e comportamento"]
] as const;

const trackDetails: Record<string,{foundation:string[];core:string[];advanced:string[];practice:string[]}> = {
  "Engenharias": {
    foundation:["Cálculo e funções aplicadas","Álgebra linear e geometria","Física geral e modelagem","Desenho técnico e representação"],
    core:["Materiais e propriedades","Métodos numéricos","Estatística aplicada","Gestão de projetos"],
    advanced:["Modelagem e simulação","Controle e instrumentação","Projeto integrado","Confiabilidade e segurança"],
    practice:["Estudo de caso de engenharia","Dimensionamento orientado","Projeto integrador","Análise de resultados"]
  },
  "Tecnologia": {
    foundation:["Lógica e fundamentos computacionais","Matemática discreta","Programação estruturada","Arquitetura de computadores"],
    core:["Estruturas de dados","Bancos de dados","Redes e sistemas","Engenharia de software"],
    advanced:["Sistemas distribuídos","Inteligência artificial aplicada","Segurança e observabilidade","Arquitetura de soluções"],
    practice:["Laboratório guiado","Projeto de sistema","Testes e métricas","Projeto integrador"]
  },
  "Arquitetura e Design": {
    foundation:["Desenho e representação","História e teoria","Geometria e percepção","Materiais e processos"],
    core:["Projeto e metodologia","Conforto e ergonomia","Tecnologia construtiva","Representação digital"],
    advanced:["Projeto integrado","Sistemas e sustentabilidade","Gestão e documentação","Portfólio e apresentação"],
    practice:["Estudo de referência","Análise de projeto","Protótipo ou maquete","Projeto integrador"]
  },
  "Gestão e Negócios": {
    foundation:["Fundamentos de administração","Matemática e estatística","Economia básica","Comunicação profissional"],
    core:["Finanças e custos","Marketing e comportamento","Pessoas e liderança","Operações e processos"],
    advanced:["Estratégia","Dados para decisão","Governança e riscos","Empreendedorismo"],
    practice:["Diagnóstico de organização","Plano de ação","Análise de indicadores","Projeto integrador"]
  },
  "Ciências Humanas": {
    foundation:["Introdução às ciências sociais","História das instituições","Teoria e argumentação","Pesquisa e leitura crítica"],
    core:["Estado e sociedade","Direitos e cidadania","Métodos de pesquisa","Comunicação profissional"],
    advanced:["Análise de casos","Instituições contemporâneas","Ética e responsabilidade","Pesquisa aplicada"],
    practice:["Estudo de caso","Análise documental","Debate estruturado","Projeto integrador"]
  },
  "Saúde": {
    foundation:["Anatomia e bases biológicas","Fisiologia humana","Bioquímica e metabolismo","Saúde e sociedade"],
    core:["Avaliação e raciocínio profissional","Microbiologia e imunidade","Farmacologia ou terapêutica","Epidemiologia"],
    advanced:["Práticas baseadas em evidências","Gestão e segurança","Atenção integral","Pesquisa em saúde"],
    practice:["Caso clínico educacional","Interpretação de dados","Plano de cuidado simulado","Projeto integrador"]
  },
  "Saúde e Humanas": {
    foundation:["Bases biológicas do comportamento","História e teorias da área","Desenvolvimento humano","Métodos de pesquisa"],
    core:["Avaliação profissional","Processos sociais","Ética e legislação","Intervenções baseadas em evidências"],
    advanced:["Práticas contemporâneas","Pesquisa aplicada","Gestão do cuidado","Atuação interdisciplinar"],
    practice:["Estudo de caso","Análise de instrumentos","Plano de intervenção simulado","Projeto integrador"]
  },
  "Saúde Animal": {
    foundation:["Anatomia e fisiologia animal","Biologia e genética","Microbiologia","Saúde e sociedade"],
    core:["Patologia","Farmacologia","Diagnóstico","Epidemiologia"],
    advanced:["Clínica e prevenção","Cirurgia e manejo","Saúde pública veterinária","Pesquisa aplicada"],
    practice:["Caso clínico educacional","Interpretação de exames","Plano de manejo simulado","Projeto integrador"]
  },
  "Ciências Agrárias": {
    foundation:["Biologia vegetal","Química e solo","Clima e ambiente","Matemática aplicada"],
    core:["Fisiologia vegetal","Manejo de solo","Irrigação","Fitossanidade"],
    advanced:["Agricultura de precisão","Gestão rural","Sustentabilidade","Tecnologia de produção"],
    practice:["Diagnóstico de área","Planejamento de cultivo","Análise de indicadores","Projeto integrador"]
  },
  "Produção e Alimentação": {
    foundation:["Fundamentos culinários","Ciência dos alimentos","Higiene e segurança","Gestão de cozinha"],
    core:["Técnicas de cocção","Panificação e confeitaria","Custos e fichas técnicas","Cultura alimentar"],
    advanced:["Criação de cardápios","Gestão de operações","Desenvolvimento de produtos","Empreendedorismo gastronômico"],
    practice:["Ficha técnica","Análise sensorial","Planejamento de serviço","Projeto integrador"]
  },
  "Comunicação e Negócios": {
    foundation:["Comunicação e cultura","Comportamento do consumidor","Pesquisa e dados","Texto profissional"],
    core:["Estratégia de marca","Mídia e canais","Criação de conteúdo","Métricas"],
    advanced:["Marketing integrado","Dados e experimentação","Gestão de reputação","Projetos digitais"],
    practice:["Diagnóstico de marca","Plano de comunicação","Teste de campanha","Projeto integrador"]
  },
  "Comunicação": {
    foundation:["Teoria da comunicação","História da mídia","Linguagem e narrativa","Pesquisa"],
    core:["Criação e redação","Planejamento de mídia","Audiovisual","Ética profissional"],
    advanced:["Estratégia multiplataforma","Métricas e audiência","Projetos de campanha","Gestão de produção"],
    practice:["Briefing","Peça ou reportagem","Planejamento","Projeto integrador"]
  },
  "Informação": {
    foundation:["Fundamentos da informação","História dos acervos","Metodologia de pesquisa","Representação"],
    core:["Classificação e descrição","Preservação","Tecnologias da informação","Serviços ao usuário"],
    advanced:["Curadoria digital","Gestão de acervos","Dados e interoperabilidade","Políticas de informação"],
    practice:["Organização de coleção","Plano de preservação","Pesquisa orientada","Projeto integrador"]
  },
  "Turismo e Hospitalidade": {
    foundation:["Fundamentos do turismo","Geografia do turismo","Cultura e patrimônio","Comunicação"],
    core:["Planejamento de destinos","Hospitalidade","Eventos","Marketing turístico"],
    advanced:["Gestão de destinos","Turismo sustentável","Dados e experiência","Empreendedorismo"],
    practice:["Diagnóstico de destino","Roteiro turístico","Plano de evento","Projeto integrador"]
  },
  "Ciências Exatas": {
    foundation:["Cálculo diferencial","Álgebra linear","Geometria analítica","Física e modelagem"],
    core:["Cálculo integral","Probabilidade e estatística","Equações diferenciais","Métodos numéricos"],
    advanced:["Análise ou física avançada","Modelagem computacional","Pesquisa aplicada","Seminário científico"],
    practice:["Lista comentada","Modelagem","Experimento ou simulação","Projeto integrador"]
  }
};



const courseVisuals: Record<string,{emoji:string;alt:string;topics:string[]}> = {
  "engenharia-de-petroleo":{emoji:"🛢️",alt:"Plataforma de petróleo e engenharia de poços",topics:["exploração de reservatórios","perfuração de poços","completação","produção offshore","simulação de reservatórios","perfilagem","mecânica dos fluidos","segurança operacional","avaliação econômica","transição energética"]},
  "engenharia-mecanica":{emoji:"⚙️",alt:"Máquinas, engrenagens e projeto mecânico",topics:["projeto de máquinas","mecânica dos sólidos","termodinâmica","usinagem","materiais","vibrações","manutenção","CAD","transferência de calor","automação industrial"]},
  "engenharia-civil":{emoji:"🏗️",alt:"Construção civil e estruturas",topics:["estruturas de concreto","fundações","topografia","materiais de construção","estradas","hidráulica","orçamento de obras","planejamento de obras","geotecnia","gestão de canteiro"]},
  "engenharia-eletrica":{emoji:"⚡",alt:"Circuitos elétricos e sistemas de energia",topics:["circuitos","eletrônica","máquinas elétricas","sistemas de potência","instalações elétricas","controle","instrumentação","proteção","energias renováveis","automação"]},
  "engenharia-de-producao":{emoji:"🏭",alt:"Linha de produção e gestão industrial",topics:["planejamento da produção","qualidade","logística","estoques","processos","ergonomia","custos","Lean","cadeia de suprimentos","indicadores"]},
  "engenharia-quimica":{emoji:"🧪",alt:"Processos químicos e equipamentos industriais",topics:["balanço de massa","balanço de energia","reatores","separações","termodinâmica","fenômenos de transporte","controle de processos","petroquímica","processos industriais","segurança de processos"]},
  "engenharia-ambiental":{emoji:"🌱",alt:"Engenharia ambiental, água e sustentabilidade",topics:["tratamento de água","esgoto","resíduos sólidos","qualidade do ar","licenciamento","impacto ambiental","recuperação de áreas","sustentabilidade","monitoramento ambiental","gestão de recursos hídricos"]},
  "engenharia-de-computacao":{emoji:"💻",alt:"Computadores, eletrônica e sistemas embarcados",topics:["arquitetura de computadores","microcontroladores","sistemas embarcados","redes","eletrônica digital","programação","sistemas operacionais","IoT","robótica","hardware"]},
  "engenharia-de-software":{emoji:"🧑‍💻",alt:"Desenvolvimento e arquitetura de software",topics:["requisitos","arquitetura","APIs","testes","versionamento","bancos de dados","DevOps","segurança","design de sistemas","qualidade de software"]},
  "engenharia-robotica":{emoji:"🤖",alt:"Robô industrial e sistemas autônomos",topics:["robôs móveis","manipuladores","sensores","atuadores","controle","visão computacional","planejamento de movimento","ROS","interação humano-robô","sistemas autônomos"]},
  "ciencia-da-computacao":{emoji:"🖥️",alt:"Algoritmos e ciência da computação",topics:["algoritmos","estruturas de dados","complexidade","linguagens de programação","sistemas operacionais","redes","bancos de dados","computação teórica","IA","segurança"]},
  "sistemas-de-informacao":{emoji:"🗄️",alt:"Sistemas de informação e dados empresariais",topics:["sistemas empresariais","bancos de dados","processos de negócio","ERP","análise de requisitos","BI","gestão de projetos","segurança da informação","integração de sistemas","governança de TI"]},
  "inteligencia-artificial":{emoji:"🧠",alt:"Inteligência artificial e modelos computacionais",topics:["aprendizado supervisionado","aprendizado não supervisionado","redes neurais","visão computacional","processamento de linguagem","modelos generativos","avaliação de modelos","engenharia de dados","ética em IA","MLOps"]},
  "analise-e-desenvolvimento-de-sistemas":{emoji:"📱",alt:"Aplicações, programação e sistemas",topics:["levantamento de requisitos","interfaces","programação web","APIs","bancos de dados","testes","Git","deploy","segurança","manutenção"]},
  "arquitetura-e-urbanismo":{emoji:"🏛️",alt:"Projeto arquitetônico e planejamento urbano",topics:["projeto arquitetônico","desenho técnico","urbanismo","paisagismo","conforto térmico","iluminação","materiais","BIM","acessibilidade","sustentabilidade"]},
  "administracao":{emoji:"📊",alt:"Gestão, negócios e organizações",topics:["planejamento estratégico","finanças","marketing","recursos humanos","operações","liderança","empreendedorismo","processos","indicadores","gestão de projetos"]},
  "ciencias-contabeis":{emoji:"🧾",alt:"Contabilidade e análise financeira",topics:["balanço patrimonial","DRE","custos","tributação","auditoria","controladoria","fluxo de caixa","contabilidade gerencial","perícia","relatórios"]},
  "economia":{emoji:"📈",alt:"Economia, mercados e análise de dados",topics:["oferta e demanda","inflação","juros","PIB","política monetária","política fiscal","economia internacional","econometria","mercados","desenvolvimento econômico"]},
  "direito":{emoji:"⚖️",alt:"Direito, legislação e argumentação jurídica",topics:["direito constitucional","direito civil","direito penal","direito do trabalho","direito empresarial","processo","contratos","direitos fundamentais","ética jurídica","pesquisa jurisprudencial"]},
  "medicina":{emoji:"🩺",alt:"Medicina e cuidado em saúde",topics:["anatomia","fisiologia","semiologia","diagnóstico","farmacologia","epidemiologia","prevenção","urgência","saúde coletiva","medicina baseada em evidências"]},
  "enfermagem":{emoji:"🩹",alt:"Enfermagem e cuidado integral",topics:["sistematização da assistência","sinais vitais","administração segura","feridas","saúde coletiva","urgência","centro cirúrgico","saúde do adulto","saúde da criança","gestão em enfermagem"]},
  "farmacia":{emoji:"💊",alt:"Farmácia, medicamentos e análises",topics:["farmacologia","química farmacêutica","formas farmacêuticas","controle de qualidade","análises clínicas","toxicologia","farmácia hospitalar","assistência farmacêutica","microbiologia","cosmetologia"]},
  "biomedicina":{emoji:"🔬",alt:"Laboratório, células e análises biomédicas",topics:["biologia celular","genética","microbiologia","imunologia","hematologia","bioquímica clínica","parasitologia","biologia molecular","análises clínicas","pesquisa"]},
  "nutricao":{emoji:"🥗",alt:"Nutrição, alimentos e saúde",topics:["avaliação nutricional","bioquímica","dietética","nutrição clínica","nutrição esportiva","saúde coletiva","segurança alimentar","educação alimentar","tecnologia de alimentos","planejamento alimentar"]},
  "psicologia":{emoji:"🧠",alt:"Psicologia e comportamento humano",topics:["desenvolvimento humano","aprendizagem","personalidade","psicologia social","avaliação psicológica","psicologia clínica","saúde mental","pesquisa","ética profissional","processos cognitivos"]},
  "fisioterapia":{emoji:"🦴",alt:"Fisioterapia, movimento e reabilitação",topics:["anatomia funcional","cinesiologia","avaliação funcional","terapia manual","eletroterapia","fisioterapia respiratória","neurologia","ortopedia","reabilitação","prevenção"]},
  "educacao-fisica":{emoji:"🏃",alt:"Movimento, esporte e atividade física",topics:["fisiologia do exercício","treinamento","biomecânica","avaliação física","esportes","atividade física e saúde","pedagogia do esporte","força","resistência","prescrição de exercícios"]},
  "odontologia":{emoji:"🦷",alt:"Odontologia e saúde bucal",topics:["anatomia oral","prevenção","dentística","periodontia","endodontia","prótese","cirurgia oral","radiologia","odontopediatria","saúde coletiva"]},
  "medicina-veterinaria":{emoji:"🐾",alt:"Medicina veterinária e saúde animal",topics:["anatomia animal","fisiologia","clínica","cirurgia","farmacologia veterinária","diagnóstico","produção animal","zoonoses","saúde pública","bem-estar animal"]},
  "agronomia":{emoji:"🌾",alt:"Agronomia, solo e produção agrícola",topics:["ciência do solo","fitotecnia","irrigação","máquinas agrícolas","fitossanidade","melhoramento vegetal","agricultura de precisão","gestão rural","agroecologia","pós-colheita"]},
  "gastronomia":{emoji:"👨‍🍳",alt:"Gastronomia, cozinha e alimentos",topics:["técnicas culinárias","panificação","confeitaria","cozinha brasileira","cozinha internacional","higiene dos alimentos","fichas técnicas","custos","gestão de cozinha","criação de cardápios"]},
  "marketing":{emoji:"📣",alt:"Marketing, marcas e comunicação",topics:["comportamento do consumidor","posicionamento","branding","marketing digital","SEO","mídias sociais","pesquisa de mercado","funil de vendas","métricas","estratégia"]},
  "publicidade-e-propaganda":{emoji:"📺",alt:"Publicidade, campanhas e criação",topics:["briefing","redação publicitária","direção de arte","planejamento","mídia","campanhas","branding","audiovisual","copywriting","mensuração"]},
  "jornalismo":{emoji:"📰",alt:"Jornalismo, apuração e produção de notícias",topics:["apuração","entrevista","reportagem","redação","fotojornalismo","radiojornalismo","telejornalismo","jornalismo digital","checagem","ética"]},
  "design":{emoji:"🎨",alt:"Design visual, produto e experiência",topics:["tipografia","cor","composição","identidade visual","UX","UI","design de produto","prototipação","pesquisa com usuários","portfólio"]},
  "relacoes-internacionais":{emoji:"🌎",alt:"Relações internacionais e diplomacia",topics:["teorias internacionais","diplomacia","política externa","organizações internacionais","comércio internacional","geopolítica","conflitos","direitos humanos","negociação","cooperação"]},
  "biblioteconomia-e-arquivologia":{emoji:"📚",alt:"Bibliotecas, arquivos e organização da informação",topics:["classificação","catalogação","descrição arquivística","preservação","acervos digitais","curadoria","gestão documental","metadados","serviços de referência","memória institucional"]},
  "turismo":{emoji:"🧳",alt:"Turismo, destinos e hospitalidade",topics:["planejamento turístico","roteiros","hospitalidade","eventos","marketing de destinos","patrimônio","turismo sustentável","hotelaria","experiência do visitante","gestão de destinos"]},
  "matematica":{emoji:"∑",alt:"Matemática, estruturas e modelagem",topics:["álgebra","cálculo","geometria","análise","probabilidade","estatística","equações diferenciais","álgebra linear","modelagem","matemática discreta"]},
  "fisica":{emoji:"⚛️",alt:"Física, matéria, energia e fenômenos naturais",topics:["mecânica","termodinâmica","ondas","eletromagnetismo","óptica","física moderna","quântica","relatividade","laboratório","modelagem computacional"]}
};

function makeDiscipline(name:string, seed:string, phase:string, practice:string):FacultyDiscipline {
  const overview = `${name} é estudada dentro de ${seed}. O aluno parte dos fundamentos, conecta teoria e aplicações e aprende a interpretar problemas da área antes de avançar para situações mais complexas.`;
  return {
    name,
    overview,
    modules:[
      `Fundamentos e vocabulário essencial de ${name.toLowerCase()}`,
      `Modelos, métodos e ferramentas usados em ${seed.toLowerCase()}`,
      `Análise de problemas, evidências e tomada de decisão`,
      `${phase}: integração do conteúdo com situações profissionais`
    ],
    practice
  };
}

export const facultyCourses: FacultyCourse[] = courseSeeds.map(([slug,name,area,focus],index)=>{
  const t = trackDetails[area] ?? (area === "Educação" || area === "Humanidades" ? trackDetails["Ciências Humanas"] : trackDetails["Ciências Humanas"]);
  const phases = [
    {period:"1º semestre",theme:"Fundamentos e linguagem profissional",items:t.foundation},
    {period:"2º semestre",theme:"Bases científicas e técnicas",items:t.foundation.map((x,i)=>x+" aplicado")},
    {period:"3º semestre",theme:"Métodos e ferramentas",items:t.core},
    {period:"4º semestre",theme:"Aplicação e análise",items:t.core.map((x,i)=>x+" avançado")},
    {period:"5º semestre",theme:"Aprofundamento profissional",items:t.advanced},
    {period:"6º semestre",theme:"Sistemas, estratégia e integração",items:t.advanced.map((x,i)=>x+" integrado")},
    {period:"7º semestre",theme:"Projetos e prática orientada",items:t.practice},
    {period:"8º semestre",theme:"Projeto final e preparação profissional",items:[...t.practice].reverse()}
  ];
  return {
    slug,name,area,
    duration:"8 semestres · trilha educacional",
    description:`${name} no Sabe Mais é uma trilha educacional aprofundada sobre ${focus.toLowerCase()}. O percurso conecta fundamentos, disciplinas específicas, projetos e revisão profissional.`,
    profile:`Indicado para quem quer compreender ${focus.toLowerCase()}, desenvolver raciocínio analítico e explorar possibilidades de atuação na área. A trilha é educacional e não substitui uma graduação reconhecida.`,
    careers:[
      `Atuação em ${name.toLowerCase()} e áreas correlatas`,
      "Pesquisa, análise e desenvolvimento de projetos",
      "Gestão, planejamento e consultoria conforme a formação exigida",
      "Empreendedorismo e projetos próprios quando aplicável"
    ],
    competencies:[
      `Compreender fundamentos de ${focus.toLowerCase()}`,
      "Interpretar dados, problemas e evidências",
      "Planejar e avaliar projetos",
      "Comunicar resultados com clareza e responsabilidade"
    ],
    coverEmoji: (courseVisuals[slug] ?? {emoji:"🎓",alt:`Ilustração temática de ${name}`,topics:[focus,"fundamentos da área","métodos de pesquisa","ferramentas profissionais","estudo de caso","análise de dados","ética e responsabilidade","projeto aplicado","inovação","carreiras e aplicações"]}).emoji,
    coverAlt: (courseVisuals[slug] ?? {emoji:"🎓",alt:`Ilustração temática de ${name}`,topics:[focus,"fundamentos da área","métodos de pesquisa","ferramentas profissionais","estudo de caso","análise de dados","ética e responsabilidade","projeto aplicado","inovação","carreiras e aplicações"]}).alt,
    examples: ((courseVisuals[slug] ?? {emoji:"🎓",alt:`Ilustração temática de ${name}`,topics:[focus,"fundamentos da área","métodos de pesquisa","ferramentas profissionais","estudo de caso","análise de dados","ética e responsabilidade","projeto aplicado","inovação","carreiras e aplicações"]}).topics).map((topic,i)=>`Exemplo ${i+1}: ${topic} aplicado em uma situação de estudo ou projeto de ${name.toLowerCase()}.`),
    semesters:phases.map((p,si)=>({
      period:p.period,
      theme:p.theme,
      disciplines:p.items.map((item,di)=>makeDiscipline(item,name,p.period,t.practice[(si+di+index)%t.practice.length]))
    }))
  };
});

export function getFacultyCourse(slug:string){return facultyCourses.find(c=>c.slug===slug);}
