import type { Lesson } from "@/lib/lessons";
import type { Question } from "@/lib/content";

type Concept = { term: string; definition: string; case: string; limit: string };
type Module = { title: string; concepts: Concept[] };
export type CollegeCourse = { slug: string; name: string; area: string; modules: string[] };

const modules: Record<string, Module> = {
  "robotica": {
    "title": "Robótica e automação",
    "concepts": [
      {
        "term": "Sensor",
        "definition": "mede uma grandeza do ambiente",
        "case": "medir a distância até um obstáculo",
        "limit": "a leitura pode conter ruído e exige calibração"
      },
      {
        "term": "Atuador",
        "definition": "converte energia em movimento ou ação",
        "case": "mover a junta de um braço robótico",
        "limit": "o torque e os limites físicos restringem a operação"
      },
      {
        "term": "Realimentação",
        "definition": "usa a saída medida para corrigir o comando",
        "case": "corrigir a posição de uma junta com um encoder",
        "limit": "um sensor defeituoso pode comprometer a correção"
      },
      {
        "term": "Cinemática",
        "definition": "relaciona posições e movimentos sem estudar suas forças",
        "case": "calcular a posição da garra a partir dos ângulos",
        "limit": "não determina sozinha os torques dos motores"
      },
      {
        "term": "Intertravamento",
        "definition": "impede uma operação em condição insegura",
        "case": "bloquear um robô quando a porta de proteção abre",
        "limit": "não substitui a análise de riscos nem a validação de segurança"
      }
    ]
  },
  "petroleo": {
    "title": "Reservatórios e petróleo",
    "concepts": [
      {
        "term": "Porosidade",
        "definition": "expressa a fração do volume de vazios na rocha",
        "case": "estimar o espaço disponível para fluidos",
        "limit": "não garante que os poros estejam conectados"
      },
      {
        "term": "Permeabilidade",
        "definition": "expressa a capacidade de transmitir fluidos",
        "case": "avaliar a facilidade de escoamento no reservatório",
        "limit": "depende da conectividade dos poros e das condições do meio"
      },
      {
        "term": "Saturação",
        "definition": "expressa a fração do espaço poroso ocupada por um fluido",
        "case": "estimar a parcela de óleo nos poros",
        "limit": "as saturações dos fluidos somam um no mesmo volume"
      },
      {
        "term": "Pressão de reservatório",
        "definition": "representa a energia de pressão disponível no meio poroso",
        "case": "acompanhar a queda de pressão durante a produção",
        "limit": "a queda de pressão pode reduzir a vazão e alterar fases"
      },
      {
        "term": "Recuperação secundária",
        "definition": "repõe energia por injeção para deslocar óleo",
        "case": "avaliar um projeto de injeção de água",
        "limit": "a eficiência depende da heterogeneidade e do deslocamento"
      }
    ]
  },
  "gastronomia": {
    "title": "Técnicas e segurança dos alimentos",
    "concepts": [
      {
        "term": "Mise en place",
        "definition": "organiza ingredientes e utensílios antes do preparo",
        "case": "separar e pesar ingredientes antes do serviço",
        "limit": "deve respeitar conservação e segurança dos alimentos"
      },
      {
        "term": "Contaminação cruzada",
        "definition": "transfere agentes contaminantes entre alimentos ou superfícies",
        "case": "identificar o risco de usar a mesma tábua para frango cru e salada",
        "limit": "separação, limpeza e higiene reduzem o risco"
      },
      {
        "term": "Reação de Maillard",
        "definition": "envolve açúcares redutores e grupos amino no douramento",
        "case": "explicar o douramento da crosta do pão",
        "limit": "não é a mesma reação que caramelização"
      },
      {
        "term": "Emulsão",
        "definition": "dispersa um líquido em outro líquido imiscível",
        "case": "preparar um molho de óleo e água com emulsificante",
        "limit": "pode separar sem estabilização adequada"
      },
      {
        "term": "Cocção",
        "definition": "transforma alimentos pela transferência de calor",
        "case": "comparar cozimento por água, vapor e forno",
        "limit": "aparência não comprova sozinha segurança microbiológica"
      }
    ]
  },
  "programacao": {
    "title": "Programação e algoritmos",
    "concepts": [
      {
        "term": "Algoritmo",
        "definition": "descreve uma sequência finita de passos para resolver um problema",
        "case": "especificar como ordenar uma lista de notas",
        "limit": "deve ter entradas, passos e critério de término claros"
      },
      {
        "term": "Variável",
        "definition": "associa um nome a um valor manipulável",
        "case": "guardar a quantidade de produtos no estoque",
        "limit": "tipo e escopo influenciam as operações permitidas"
      },
      {
        "term": "Condicional",
        "definition": "seleciona um caminho conforme uma condição",
        "case": "aprovar acesso apenas quando a senha é válida",
        "limit": "a condição deve ser avaliada de maneira explícita"
      },
      {
        "term": "Laço",
        "definition": "repete um bloco segundo uma regra de controle",
        "case": "somar todos os valores de uma lista",
        "limit": "sem condição de parada pode ocorrer repetição infinita"
      },
      {
        "term": "Teste automatizado",
        "definition": "verifica um comportamento esperado de forma repetível",
        "case": "comparar o resultado de uma função com o valor previsto",
        "limit": "testes aprovados não provam ausência de todos os defeitos"
      }
    ]
  },
  "dados": {
    "title": "Dados e estatística",
    "concepts": [
      {
        "term": "Média",
        "definition": "divide a soma dos valores pela quantidade de observações",
        "case": "resumir um conjunto de notas sem valores extremos",
        "limit": "é sensível a valores muito altos ou muito baixos"
      },
      {
        "term": "Mediana",
        "definition": "representa o valor central dos dados ordenados",
        "case": "resumir salários com grande assimetria",
        "limit": "para quantidade par usa os dois valores centrais"
      },
      {
        "term": "Desvio padrão",
        "definition": "quantifica a dispersão em torno da média",
        "case": "comparar a variabilidade de duas séries de medidas",
        "limit": "tem a mesma unidade da variável analisada"
      },
      {
        "term": "Amostragem",
        "definition": "seleciona parte de uma população para análise",
        "case": "planejar uma pesquisa com consumidores",
        "limit": "uma amostra enviesada limita a generalização"
      },
      {
        "term": "Correlação",
        "definition": "descreve associação entre variáveis",
        "case": "investigar se duas medidas variam conjuntamente",
        "limit": "correlação não demonstra causalidade"
      }
    ]
  },
  "gestao": {
    "title": "Gestão e organizações",
    "concepts": [
      {
        "term": "Planejamento",
        "definition": "define objetivos e ações antes da execução",
        "case": "organizar metas e prazos de uma equipe",
        "limit": "precisa ser revisado quando as condições mudam"
      },
      {
        "term": "Indicador",
        "definition": "mede um aspecto relevante de um objetivo",
        "case": "acompanhar atrasos nas entregas",
        "limit": "uma métrica isolada pode esconder efeitos indesejados"
      },
      {
        "term": "Fluxo de caixa",
        "definition": "registra entradas e saídas financeiras no tempo",
        "case": "avaliar se haverá dinheiro para pagar fornecedores",
        "limit": "lucro contábil não significa caixa disponível"
      },
      {
        "term": "Análise SWOT",
        "definition": "organiza forças, fraquezas, oportunidades e ameaças",
        "case": "mapear capacidades internas e fatores externos",
        "limit": "não substitui dados nem decisões de prioridade"
      },
      {
        "term": "Stakeholder",
        "definition": "é uma parte interessada ou afetada por uma decisão",
        "case": "identificar clientes, equipe e comunidade em um projeto",
        "limit": "interesses podem ser conflitantes e exigem diálogo"
      }
    ]
  },
  "economia": {
    "title": "Economia e finanças",
    "concepts": [
      {
        "term": "Custo de oportunidade",
        "definition": "representa o valor da melhor alternativa renunciada",
        "case": "comparar estudar hoje com trabalhar no mesmo período",
        "limit": "não se limita a um pagamento em dinheiro"
      },
      {
        "term": "Inflação",
        "definition": "é o aumento persistente do nível geral de preços",
        "case": "avaliar a perda de poder de compra ao longo do tempo",
        "limit": "a alta isolada de um produto não define inflação geral"
      },
      {
        "term": "Elasticidade",
        "definition": "mede a resposta proporcional de uma variável a outra",
        "case": "estimar como a demanda reage a uma mudança de preço",
        "limit": "depende do produto, prazo e contexto"
      },
      {
        "term": "Juros compostos",
        "definition": "incidem sobre capital e juros acumulados",
        "case": "projetar o crescimento de uma aplicação",
        "limit": "taxa e prazo precisam estar na mesma unidade temporal"
      },
      {
        "term": "Diversificação",
        "definition": "distribui exposição entre diferentes ativos ou fontes",
        "case": "reduzir concentração em um único investimento",
        "limit": "não elimina todos os riscos nem garante retorno"
      }
    ]
  },
  "direito": {
    "title": "Direito e cidadania",
    "concepts": [
      {
        "term": "Constituição",
        "definition": "estabelece a organização do Estado e direitos fundamentais",
        "case": "analisar a validade de uma norma inferior",
        "limit": "sua interpretação exige considerar o texto e a jurisprudência"
      },
      {
        "term": "Legalidade",
        "definition": "exige respeito à lei na atuação pública e nas condutas reguladas",
        "case": "examinar a base jurídica de um ato administrativo",
        "limit": "o alcance do princípio varia conforme o ramo jurídico"
      },
      {
        "term": "Contraditório",
        "definition": "garante participação e possibilidade de contestação no processo",
        "case": "assegurar manifestação sobre uma prova apresentada",
        "limit": "não equivale a garantia de resultado favorável"
      },
      {
        "term": "Responsabilidade civil",
        "definition": "trata do dever de reparar dano conforme requisitos legais",
        "case": "avaliar um dano e seu nexo com uma conduta",
        "limit": "nem todo dano gera reparação automática"
      },
      {
        "term": "Proteção de dados",
        "definition": "regula o tratamento de dados pessoais com princípios e bases legais",
        "case": "planejar coleta de dados de clientes",
        "limit": "consentimento não é a única base legal da LGPD"
      }
    ]
  },
  "saude": {
    "title": "Fundamentos de saúde",
    "concepts": [
      {
        "term": "Homeostase",
        "definition": "mantém variáveis internas dentro de faixas funcionais",
        "case": "entender a regulação da temperatura corporal",
        "limit": "é um equilíbrio dinâmico, não ausência de variação"
      },
      {
        "term": "Prevenção primária",
        "definition": "atua antes do aparecimento de uma doença",
        "case": "analisar vacinação e redução de fatores de risco",
        "limit": "não equivale a diagnóstico ou tratamento de doença instalada"
      },
      {
        "term": "Biossegurança",
        "definition": "reduz riscos biológicos e outros riscos na prática profissional",
        "case": "planejar uso de proteção e descarte de materiais",
        "limit": "depende de protocolos, treinamento e condições reais"
      },
      {
        "term": "Anamnese",
        "definition": "reúne história e informações relatadas pela pessoa",
        "case": "levantar sintomas e antecedentes em uma avaliação",
        "limit": "não substitui exame, investigação nem julgamento profissional"
      },
      {
        "term": "Consentimento informado",
        "definition": "expressa decisão após informação adequada e compreensível",
        "case": "explicar riscos e alternativas antes de um procedimento",
        "limit": "não se reduz à assinatura de um formulário"
      }
    ]
  },
  "biologia": {
    "title": "Biologia celular e ecologia",
    "concepts": [
      {
        "term": "Membrana plasmática",
        "definition": "delimita a célula e regula trocas com o meio",
        "case": "explicar transporte seletivo de substâncias",
        "limit": "a permeabilidade varia conforme a substância e o mecanismo"
      },
      {
        "term": "DNA",
        "definition": "armazena informação genética em uma sequência de nucleotídeos",
        "case": "relacionar genes à produção de moléculas celulares",
        "limit": "a expressão depende de regulação e contexto celular"
      },
      {
        "term": "Enzima",
        "definition": "catalisa reações diminuindo a energia de ativação",
        "case": "explicar a aceleração de uma reação metabólica",
        "limit": "temperatura e pH podem alterar sua atividade"
      },
      {
        "term": "Ecossistema",
        "definition": "integra organismos e fatores físicos em interação",
        "case": "analisar uma lagoa com água, plantas e animais",
        "limit": "energia flui e matéria circula entre seus componentes"
      },
      {
        "term": "Biodiversidade",
        "definition": "inclui diversidade genética, de espécies e de ecossistemas",
        "case": "avaliar diferentes dimensões da conservação",
        "limit": "não se resume à contagem de espécies"
      }
    ]
  },
  "quimica": {
    "title": "Química aplicada",
    "concepts": [
      {
        "term": "Quantidade de matéria",
        "definition": "mede entidades químicas em mol",
        "case": "relacionar massa e número de entidades numa reação",
        "limit": "exige identificar a substância e sua massa molar"
      },
      {
        "term": "pH",
        "definition": "expressa acidez em escala logarítmica relacionada ao íon hidrogênio",
        "case": "comparar a acidez de duas soluções",
        "limit": "uma unidade representa uma razão de dez em condições ideais"
      },
      {
        "term": "Estequiometria",
        "definition": "relaciona quantidades pela equação química balanceada",
        "case": "calcular reagente necessário para uma reação",
        "limit": "rendimento real e pureza podem alterar o resultado"
      },
      {
        "term": "Oxidação",
        "definition": "envolve perda de elétrons e aumento do número de oxidação",
        "case": "analisar corrosão de um metal",
        "limit": "deve ser acompanhada de uma redução no processo redox"
      },
      {
        "term": "Equilíbrio químico",
        "definition": "ocorre quando velocidades direta e inversa se igualam",
        "case": "interpretar uma reação reversível em recipiente fechado",
        "limit": "não significa concentrações iguais nem reações paradas"
      }
    ]
  },
  "fisica": {
    "title": "Mecânica e energia",
    "concepts": [
      {
        "term": "Força resultante",
        "definition": "é a soma vetorial das forças que atuam em um corpo",
        "case": "determinar a aceleração de um objeto",
        "limit": "no modelo newtoniano vale F = m × a"
      },
      {
        "term": "Trabalho mecânico",
        "definition": "relaciona força e deslocamento na direção considerada",
        "case": "calcular energia transferida ao deslocar uma carga",
        "limit": "uma força perpendicular ao deslocamento não realiza trabalho"
      },
      {
        "term": "Conservação de energia",
        "definition": "afirma que energia se transforma sem criação no sistema total",
        "case": "acompanhar energia em uma máquina",
        "limit": "energia mecânica pode diminuir quando há dissipação"
      },
      {
        "term": "Pressão",
        "definition": "relaciona força normal e área de aplicação",
        "case": "comparar contato de uma carga em áreas diferentes",
        "limit": "a mesma força em menor área produz maior pressão"
      },
      {
        "term": "Potência",
        "definition": "mede energia transferida por unidade de tempo",
        "case": "comparar motores que realizam o mesmo trabalho em tempos diferentes",
        "limit": "maior potência não implica maior eficiência"
      }
    ]
  },
  "eletrica": {
    "title": "Circuitos e eletricidade",
    "concepts": [
      {
        "term": "Tensão",
        "definition": "é a diferença de potencial elétrico entre dois pontos",
        "case": "identificar a energia por carga fornecida a um circuito",
        "limit": "não é a mesma grandeza que corrente"
      },
      {
        "term": "Corrente",
        "definition": "representa fluxo de carga por unidade de tempo",
        "case": "medir a carga que atravessa uma seção do circuito",
        "limit": "a medição requer configuração apropriada do instrumento"
      },
      {
        "term": "Resistência",
        "definition": "relaciona tensão e corrente no regime considerado",
        "case": "aplicar V = R × I a um resistor ôhmico",
        "limit": "a relação linear não vale para todo componente"
      },
      {
        "term": "Lei dos nós",
        "definition": "expressa conservação de carga em um nó",
        "case": "somar correntes de entrada e saída numa junção",
        "limit": "no modelo usual a soma das entradas iguala a das saídas"
      },
      {
        "term": "Potência elétrica",
        "definition": "mede taxa de transferência de energia elétrica",
        "case": "calcular P = V × I em corrente contínua",
        "limit": "em corrente alternada é preciso considerar o fator de potência"
      }
    ]
  },
  "materiais": {
    "title": "Materiais e estruturas",
    "concepts": [
      {
        "term": "Tensão mecânica",
        "definition": "relaciona força interna e área resistente",
        "case": "avaliar uma barra sob tração axial",
        "limit": "o modelo simples usa tensão média F/A"
      },
      {
        "term": "Deformação",
        "definition": "relaciona mudança de dimensão e dimensão inicial",
        "case": "calcular alongamento relativo de uma barra",
        "limit": "é adimensional e depende das condições de carregamento"
      },
      {
        "term": "Elasticidade",
        "definition": "permite recuperar a forma após retirar a carga",
        "case": "estudar uma peça que retorna à dimensão original",
        "limit": "existe um limite além do qual pode haver deformação permanente"
      },
      {
        "term": "Fadiga",
        "definition": "envolve dano por carregamento repetido",
        "case": "analisar uma peça sujeita a ciclos de tensão",
        "limit": "pode ocorrer abaixo da resistência estática máxima"
      },
      {
        "term": "Fator de segurança",
        "definition": "compara capacidade resistente com solicitação de projeto",
        "case": "dimensionar uma estrutura com margem sobre a carga prevista",
        "limit": "não substitui normas, análise de falhas ou qualidade de execução"
      }
    ]
  },
  "ambiente": {
    "title": "Ambiente e sustentabilidade",
    "concepts": [
      {
        "term": "Impacto ambiental",
        "definition": "é uma alteração do ambiente associada a uma atividade",
        "case": "avaliar efeitos de uma obra sobre água e fauna",
        "limit": "pode ser positivo ou negativo, direto ou indireto"
      },
      {
        "term": "Ciclo de vida",
        "definition": "considera etapas desde obtenção de recursos até destinação",
        "case": "comparar produtos além da fase de uso",
        "limit": "limites do sistema influenciam os resultados"
      },
      {
        "term": "Economia circular",
        "definition": "busca manter valor de materiais e reduzir desperdício",
        "case": "planejar reparo, reuso e reciclagem de produtos",
        "limit": "reciclagem é apenas uma parte da estratégia"
      },
      {
        "term": "Tratamento de água",
        "definition": "combina operações para adequar qualidade a um uso",
        "case": "estudar coagulação, filtração e desinfecção",
        "limit": "a sequência depende da água de origem e das exigências"
      },
      {
        "term": "Mitigação",
        "definition": "reduz causas ou intensidade de um impacto",
        "case": "propor redução de emissões de gases de efeito estufa",
        "limit": "é diferente de adaptação às consequências"
      }
    ]
  },
  "projetos": {
    "title": "Projetos e produção",
    "concepts": [
      {
        "term": "Escopo",
        "definition": "define entregas e limites de um projeto",
        "case": "esclarecer o que uma equipe deve entregar",
        "limit": "mudanças precisam de avaliação de impacto"
      },
      {
        "term": "Cronograma",
        "definition": "organiza atividades e dependências no tempo",
        "case": "planejar a sequência de etapas de uma obra",
        "limit": "atrasos em atividades críticas podem alterar o prazo final"
      },
      {
        "term": "Gargalo",
        "definition": "é uma restrição que limita o fluxo do sistema",
        "case": "identificar uma etapa com capacidade menor que a demanda",
        "limit": "melhorar etapas não restritivas pode não aumentar a produção"
      },
      {
        "term": "Controle de qualidade",
        "definition": "verifica conformidade com critérios definidos",
        "case": "inspecionar dimensões de peças fabricadas",
        "limit": "inspeção final sozinha não previne a origem dos defeitos"
      },
      {
        "term": "Risco",
        "definition": "combina incerteza e efeitos sobre objetivos",
        "case": "avaliar probabilidade e consequência de uma falha",
        "limit": "o tratamento deve considerar contexto e risco residual"
      }
    ]
  },
  "design": {
    "title": "Design e comunicação visual",
    "concepts": [
      {
        "term": "Hierarquia visual",
        "definition": "organiza a atenção conforme a importância da informação",
        "case": "destacar um título antes de detalhes secundários",
        "limit": "excesso de destaques pode eliminar a hierarquia"
      },
      {
        "term": "Contraste",
        "definition": "diferencia elementos para favorecer percepção",
        "case": "melhorar leitura entre texto e fundo",
        "limit": "acessibilidade exige considerar legibilidade e contexto"
      },
      {
        "term": "Tipografia",
        "definition": "organiza formas de letras e composição de texto",
        "case": "escolher fonte e tamanho para leitura prolongada",
        "limit": "aparência deve ser equilibrada com legibilidade"
      },
      {
        "term": "Prototipação",
        "definition": "materializa uma solução para avaliação antes da entrega",
        "case": "testar um fluxo de interface com usuários",
        "limit": "um protótipo não valida sozinho todas as condições de uso"
      },
      {
        "term": "Pesquisa com usuários",
        "definition": "investiga necessidades e comportamentos das pessoas",
        "case": "observar como alguém realiza uma tarefa",
        "limit": "a amostra e o método limitam as conclusões"
      }
    ]
  },
  "comunicacao": {
    "title": "Comunicação e mídia",
    "concepts": [
      {
        "term": "Fonte",
        "definition": "origina uma informação que precisa ser avaliada",
        "case": "verificar de onde vem um dado de uma reportagem",
        "limit": "credibilidade exige contexto, evidência e confronto"
      },
      {
        "term": "Enquadramento",
        "definition": "seleciona aspectos de um tema para sua apresentação",
        "case": "comparar abordagens de uma mesma notícia",
        "limit": "pode influenciar percepção sem alterar todos os fatos"
      },
      {
        "term": "Público-alvo",
        "definition": "define o grupo ao qual uma mensagem se dirige",
        "case": "adaptar linguagem a leitores de um material",
        "limit": "não autoriza estereótipos nem exclui acessibilidade"
      },
      {
        "term": "Apuração",
        "definition": "verifica informações antes da divulgação",
        "case": "confirmar uma afirmação com documentos e entrevistas",
        "limit": "velocidade de publicação não substitui checagem"
      },
      {
        "term": "Direito autoral",
        "definition": "protege criações intelectuais conforme a legislação",
        "case": "avaliar uso de fotografia em uma publicação",
        "limit": "citar autoria não equivale automaticamente a obter licença"
      }
    ]
  },
  "psicologia": {
    "title": "Psicologia e aprendizagem",
    "concepts": [
      {
        "term": "Reforço",
        "definition": "aumenta a probabilidade de um comportamento",
        "case": "analisar uma consequência que torna uma ação mais frequente",
        "limit": "positivo e negativo indicam adicionar ou retirar, não bom ou ruim"
      },
      {
        "term": "Memória de trabalho",
        "definition": "mantém e manipula informação temporariamente",
        "case": "resolver um problema enquanto se retêm seus dados",
        "limit": "possui capacidade limitada e sofre interferência"
      },
      {
        "term": "Atenção",
        "definition": "seleciona e prioriza informação para processamento",
        "case": "concentrar recursos numa tarefa relevante",
        "limit": "multitarefa pode reduzir desempenho e aumentar erros"
      },
      {
        "term": "Viés cognitivo",
        "definition": "é uma tendência sistemática no julgamento",
        "case": "reconhecer busca apenas de evidências que confirmam uma crença",
        "limit": "identificá-lo não torna decisões automaticamente imparciais"
      },
      {
        "term": "Validade de avaliação",
        "definition": "relaciona evidências ao uso e interpretação de resultados",
        "case": "avaliar se um instrumento mede o construto pretendido",
        "limit": "depende da finalidade e da população avaliada"
      }
    ]
  },
  "educacao": {
    "title": "Educação e didática",
    "concepts": [
      {
        "term": "Objetivo de aprendizagem",
        "definition": "descreve o que o estudante deverá demonstrar",
        "case": "definir uma habilidade observável ao fim da aula",
        "limit": "deve orientar atividades e avaliação"
      },
      {
        "term": "Avaliação formativa",
        "definition": "acompanha a aprendizagem para orientar ajustes",
        "case": "usar devolutivas durante uma sequência de estudos",
        "limit": "não se limita a atribuir uma nota final"
      },
      {
        "term": "Inclusão",
        "definition": "remove barreiras para participação e aprendizagem",
        "case": "adaptar recursos para diferentes necessidades",
        "limit": "não significa oferecer tratamento idêntico a todos"
      },
      {
        "term": "Mediação",
        "definition": "apoia a construção de conhecimentos pelo estudante",
        "case": "propor perguntas e apoios adequados a uma dificuldade",
        "limit": "não se resume a fornecer a resposta pronta"
      },
      {
        "term": "Sequência didática",
        "definition": "organiza atividades articuladas em torno de objetivos",
        "case": "planejar etapas progressivas de estudo de um gênero textual",
        "limit": "precisa considerar conhecimentos prévios e evidências de aprendizagem"
      }
    ]
  },
  "sociedade": {
    "title": "Sociedade, cultura e território",
    "concepts": [
      {
        "term": "Cultura",
        "definition": "abrange significados, práticas e valores compartilhados",
        "case": "analisar costumes em seu contexto social",
        "limit": "não existe apenas em manifestações artísticas"
      },
      {
        "term": "Socialização",
        "definition": "envolve aprendizagem de normas e práticas sociais",
        "case": "estudar influência de família e escola na formação",
        "limit": "ocorre ao longo da vida em diferentes grupos"
      },
      {
        "term": "Fonte histórica",
        "definition": "fornece vestígios para investigação sobre o passado",
        "case": "interpretar uma carta de época",
        "limit": "precisa de contextualização e crítica, não leitura literal isolada"
      },
      {
        "term": "Território",
        "definition": "relaciona espaço e relações de poder ou apropriação",
        "case": "analisar disputas pelo uso de uma área",
        "limit": "não equivale somente a limites naturais"
      },
      {
        "term": "Desigualdade social",
        "definition": "envolve diferenças estruturais de acesso a recursos e oportunidades",
        "case": "comparar acesso a renda, educação e serviços",
        "limit": "não se explica apenas por escolhas individuais"
      }
    ]
  },
  "nutricao": {
    "title": "Nutrição e metabolismo",
    "concepts": [
      {
        "term": "Carboidrato",
        "definition": "é um grupo de compostos com papel importante no fornecimento de energia",
        "case": "analisar amido e açúcares na alimentação",
        "limit": "qualidade, quantidade e contexto dietético importam"
      },
      {
        "term": "Proteína",
        "definition": "é formada por aminoácidos e exerce funções estruturais e regulatórias",
        "case": "relacionar aminoácidos à síntese de tecidos e enzimas",
        "limit": "necessidades variam e não se resumem ao ganho muscular"
      },
      {
        "term": "Lipídio",
        "definition": "inclui moléculas com funções energéticas e estruturais",
        "case": "estudar gorduras e componentes de membranas",
        "limit": "diferentes tipos têm propriedades e efeitos distintos"
      },
      {
        "term": "Micronutriente",
        "definition": "é necessário em pequenas quantidades para funções fisiológicas",
        "case": "identificar vitaminas e minerais na dieta",
        "limit": "pequena quantidade não significa pouca importância"
      },
      {
        "term": "Balanço energético",
        "definition": "compara energia ingerida e gasta ao longo do tempo",
        "case": "avaliar fatores do equilíbrio energético",
        "limit": "saúde nutricional não é determinada somente por calorias"
      }
    ]
  },
  "anatomia": {
    "title": "Anatomia e movimento",
    "concepts": [
      {
        "term": "Plano sagital",
        "definition": "divide o corpo em porções direita e esquerda",
        "case": "descrever movimentos como flexão e extensão no modelo anatômico",
        "limit": "o plano mediano é um caso particular do plano sagital"
      },
      {
        "term": "Articulação",
        "definition": "é a conexão entre estruturas ósseas",
        "case": "identificar estruturas que permitem ou limitam movimento",
        "limit": "nem toda articulação tem grande mobilidade"
      },
      {
        "term": "Músculo esquelético",
        "definition": "produz força e movimento por contração",
        "case": "analisar a ação muscular numa caminhada",
        "limit": "a função depende da inserção e da coordenação"
      },
      {
        "term": "Alavanca biomecânica",
        "definition": "relaciona apoio, força e resistência no movimento",
        "case": "comparar vantagens mecânicas de segmentos corporais",
        "limit": "o modelo simplifica um sistema biológico complexo"
      },
      {
        "term": "Amplitude de movimento",
        "definition": "é a extensão de movimento possível numa articulação",
        "case": "mensurar um arco de flexão em avaliação",
        "limit": "dor, técnica e condições da pessoa influenciam a medida"
      }
    ]
  },
  "logistica": {
    "title": "Logística e operações",
    "concepts": [
      {
        "term": "Estoque de segurança",
        "definition": "protege contra incerteza de demanda e reposição",
        "case": "planejar reserva para variação de consumo",
        "limit": "mais estoque aumenta custo e não resolve toda incerteza"
      },
      {
        "term": "Lead time",
        "definition": "mede o tempo entre solicitação e atendimento",
        "case": "acompanhar o prazo de reposição de um item",
        "limit": "inclui espera e etapas além da execução física"
      },
      {
        "term": "Rastreabilidade",
        "definition": "permite acompanhar origem e percurso de um item",
        "case": "identificar o lote de um produto distribuído",
        "limit": "requer registros consistentes e identificação adequada"
      },
      {
        "term": "Custo total",
        "definition": "considera custos relevantes de toda a operação",
        "case": "comparar frete barato com armazenagem e perdas adicionais",
        "limit": "otimizar uma parcela pode aumentar o custo do conjunto"
      },
      {
        "term": "Nível de serviço",
        "definition": "expressa desempenho no atendimento ao cliente",
        "case": "medir entregas completas e no prazo",
        "limit": "sua definição precisa ser explícita e coerente com o objetivo"
      }
    ]
  },
  "agro": {
    "title": "Agronomia e produção animal",
    "concepts": [
      {
        "term": "Fertilidade do solo",
        "definition": "envolve a capacidade de fornecer nutrientes às plantas",
        "case": "interpretar análise de solo antes da adubação",
        "limit": "deve ser avaliada junto a condições físicas e biológicas"
      },
      {
        "term": "Manejo integrado",
        "definition": "combina medidas de controle com monitoramento e critérios",
        "case": "avaliar pragas antes de escolher uma intervenção",
        "limit": "não pressupõe aplicação automática de um único produto"
      },
      {
        "term": "Bem-estar animal",
        "definition": "considera condições físicas e comportamentais dos animais",
        "case": "avaliar alojamento, saúde e possibilidade de comportamento natural",
        "limit": "ausência de doença sozinha não comprova bem-estar"
      },
      {
        "term": "Irrigação",
        "definition": "fornece água conforme necessidade da cultura e condições do sistema",
        "case": "planejar reposição de água no solo",
        "limit": "excesso pode causar perdas, danos e desperdício"
      },
      {
        "term": "Rotação de culturas",
        "definition": "alterna espécies no tempo em uma mesma área",
        "case": "diversificar o cultivo para manejo do solo",
        "limit": "seus benefícios dependem das espécies e do planejamento"
      }
    ]
  },
  "arquitetura": {
    "title": "Espaço e projeto arquitetônico",
    "concepts": [
      {
        "term": "Programa de necessidades",
        "definition": "organiza usos e requisitos de um espaço",
        "case": "levantar ambientes e fluxos antes de desenhar",
        "limit": "deve considerar pessoas, contexto e restrições reais"
      },
      {
        "term": "Escala",
        "definition": "relaciona dimensão representada e dimensão real",
        "case": "interpretar uma planta em escala 1:100",
        "limit": "na mesma unidade uma medida no desenho representa cem no real"
      },
      {
        "term": "Conforto ambiental",
        "definition": "analisa condições térmicas, luminosas e acústicas",
        "case": "avaliar orientação, aberturas e proteção solar",
        "limit": "soluções dependem do clima e do uso do edifício"
      },
      {
        "term": "Acessibilidade",
        "definition": "possibilita uso seguro e autônomo por diferentes pessoas",
        "case": "avaliar percurso, circulação e recursos de um edifício",
        "limit": "exige observar normas e não apenas adicionar uma rampa"
      },
      {
        "term": "Compatibilização",
        "definition": "coordena diferentes projetos para evitar conflitos",
        "case": "verificar interferência entre estrutura e instalações",
        "limit": "deve ocorrer ao longo do desenvolvimento, não só ao final"
      }
    ]
  },
  "metodo": {
    "title": "Pesquisa e ética acadêmica",
    "concepts": [
      {
        "term": "Pergunta de pesquisa",
        "definition": "delimita o problema que uma investigação busca responder",
        "case": "transformar um tema amplo em uma questão investigável",
        "limit": "deve ser viável e coerente com o método"
      },
      {
        "term": "Hipótese",
        "definition": "propõe uma explicação ou relação passível de exame",
        "case": "formular uma previsão que será confrontada com dados",
        "limit": "nem todo estudo exige hipótese formal e confirmação não é certeza"
      },
      {
        "term": "Revisão bibliográfica",
        "definition": "examina conhecimento já produzido sobre o tema",
        "case": "comparar trabalhos publicados antes de planejar uma pesquisa",
        "limit": "deve avaliar qualidade e não apenas reunir citações"
      },
      {
        "term": "Reprodutibilidade",
        "definition": "permite verificar resultados a partir de procedimentos documentados",
        "case": "registrar dados, escolhas e etapas de uma análise",
        "limit": "depende do contexto e de restrições éticas de compartilhamento"
      },
      {
        "term": "Integridade acadêmica",
        "definition": "exige honestidade e responsabilidade na produção do conhecimento",
        "case": "citar fontes e não fabricar resultados",
        "limit": "paráfrase também exige atribuição quando usa ideias de terceiros"
      }
    ]
  },
  "marketing": {
    "title": "Marketing e experiência do cliente",
    "concepts": [
      {
        "term": "Segmentação",
        "definition": "divide o mercado em grupos com características relevantes",
        "case": "organizar clientes conforme necessidades distintas",
        "limit": "os grupos devem ser úteis e não apenas arbitrários"
      },
      {
        "term": "Posicionamento",
        "definition": "define a percepção desejada de uma oferta em relação a alternativas",
        "case": "explicitar uma proposta de valor para um público",
        "limit": "precisa ser sustentado pela experiência entregue"
      },
      {
        "term": "Jornada do cliente",
        "definition": "organiza etapas e contatos de uma experiência",
        "case": "mapear descoberta, compra e pós-venda",
        "limit": "não é sempre linear nem igual para todas as pessoas"
      },
      {
        "term": "Conversão",
        "definition": "representa realização de uma ação desejada",
        "case": "medir compras entre visitas de uma campanha",
        "limit": "a taxa depende de denominador e período bem definidos"
      },
      {
        "term": "Pesquisa de mercado",
        "definition": "coleta evidências para decisões sobre oferta e público",
        "case": "investigar necessidades antes de lançar um serviço",
        "limit": "método e amostra afetam a confiabilidade"
      }
    ]
  }
};

export const collegeCourses: CollegeCourse[] = [
  {
    "slug": "robotica",
    "name": "Robótica",
    "area": "Tecnologia",
    "modules": [
      "robotica",
      "programacao",
      "eletrica"
    ]
  },
  {
    "slug": "engenharia-de-petroleo",
    "name": "Engenharia de Petróleo",
    "area": "Engenharias",
    "modules": [
      "petroleo",
      "fisica",
      "quimica"
    ]
  },
  {
    "slug": "gastronomia",
    "name": "Gastronomia",
    "area": "Serviços e criação",
    "modules": [
      "gastronomia",
      "nutricao",
      "gestao"
    ]
  },
  {
    "slug": "ciencia-da-computacao",
    "name": "Ciência da Computação",
    "area": "Tecnologia",
    "modules": [
      "programacao",
      "dados",
      "robotica"
    ]
  },
  {
    "slug": "engenharia-de-software",
    "name": "Engenharia de Software",
    "area": "Tecnologia",
    "modules": [
      "programacao",
      "projetos",
      "design"
    ]
  },
  {
    "slug": "sistemas-de-informacao",
    "name": "Sistemas de Informação",
    "area": "Tecnologia",
    "modules": [
      "programacao",
      "dados",
      "gestao"
    ]
  },
  {
    "slug": "analise-e-desenvolvimento-de-sistemas",
    "name": "Análise e Desenvolvimento de Sistemas",
    "area": "Tecnologia",
    "modules": [
      "programacao",
      "design",
      "projetos"
    ]
  },
  {
    "slug": "ciencia-de-dados",
    "name": "Ciência de Dados",
    "area": "Tecnologia",
    "modules": [
      "dados",
      "programacao",
      "metodo"
    ]
  },
  {
    "slug": "inteligencia-artificial",
    "name": "Inteligência Artificial",
    "area": "Tecnologia",
    "modules": [
      "dados",
      "programacao",
      "robotica"
    ]
  },
  {
    "slug": "engenharia-civil",
    "name": "Engenharia Civil",
    "area": "Engenharias",
    "modules": [
      "materiais",
      "fisica",
      "projetos"
    ]
  },
  {
    "slug": "engenharia-mecanica",
    "name": "Engenharia Mecânica",
    "area": "Engenharias",
    "modules": [
      "fisica",
      "materiais",
      "robotica"
    ]
  },
  {
    "slug": "engenharia-eletrica",
    "name": "Engenharia Elétrica",
    "area": "Engenharias",
    "modules": [
      "eletrica",
      "fisica",
      "projetos"
    ]
  },
  {
    "slug": "engenharia-de-producao",
    "name": "Engenharia de Produção",
    "area": "Engenharias",
    "modules": [
      "projetos",
      "dados",
      "logistica"
    ]
  },
  {
    "slug": "engenharia-quimica",
    "name": "Engenharia Química",
    "area": "Engenharias",
    "modules": [
      "quimica",
      "fisica",
      "ambiente"
    ]
  },
  {
    "slug": "engenharia-ambiental",
    "name": "Engenharia Ambiental",
    "area": "Engenharias",
    "modules": [
      "ambiente",
      "quimica",
      "biologia"
    ]
  },
  {
    "slug": "engenharia-de-controle-e-automacao",
    "name": "Engenharia de Controle e Automação",
    "area": "Engenharias",
    "modules": [
      "robotica",
      "eletrica",
      "programacao"
    ]
  },
  {
    "slug": "arquitetura-e-urbanismo",
    "name": "Arquitetura e Urbanismo",
    "area": "Serviços e criação",
    "modules": [
      "arquitetura",
      "materiais",
      "design"
    ]
  },
  {
    "slug": "design",
    "name": "Design",
    "area": "Serviços e criação",
    "modules": [
      "design",
      "comunicacao",
      "marketing"
    ]
  },
  {
    "slug": "administracao",
    "name": "Administração",
    "area": "Negócios e direito",
    "modules": [
      "gestao",
      "economia",
      "projetos"
    ]
  },
  {
    "slug": "ciencias-contabeis",
    "name": "Ciências Contábeis",
    "area": "Negócios e direito",
    "modules": [
      "economia",
      "gestao",
      "dados"
    ]
  },
  {
    "slug": "ciencias-economicas",
    "name": "Ciências Econômicas",
    "area": "Negócios e direito",
    "modules": [
      "economia",
      "dados",
      "sociedade"
    ]
  },
  {
    "slug": "direito",
    "name": "Direito",
    "area": "Negócios e direito",
    "modules": [
      "direito",
      "sociedade",
      "metodo"
    ]
  },
  {
    "slug": "marketing",
    "name": "Marketing",
    "area": "Negócios e direito",
    "modules": [
      "marketing",
      "comunicacao",
      "dados"
    ]
  },
  {
    "slug": "logistica",
    "name": "Logística",
    "area": "Negócios e direito",
    "modules": [
      "logistica",
      "projetos",
      "gestao"
    ]
  },
  {
    "slug": "medicina",
    "name": "Medicina",
    "area": "Saúde",
    "modules": [
      "saude",
      "anatomia",
      "biologia"
    ]
  },
  {
    "slug": "enfermagem",
    "name": "Enfermagem",
    "area": "Saúde",
    "modules": [
      "saude",
      "anatomia",
      "nutricao"
    ]
  },
  {
    "slug": "farmacia",
    "name": "Farmácia",
    "area": "Saúde",
    "modules": [
      "quimica",
      "biologia",
      "saude"
    ]
  },
  {
    "slug": "odontologia",
    "name": "Odontologia",
    "area": "Saúde",
    "modules": [
      "anatomia",
      "saude",
      "biologia"
    ]
  },
  {
    "slug": "fisioterapia",
    "name": "Fisioterapia",
    "area": "Saúde",
    "modules": [
      "anatomia",
      "fisica",
      "saude"
    ]
  },
  {
    "slug": "nutricao",
    "name": "Nutrição",
    "area": "Saúde",
    "modules": [
      "nutricao",
      "gastronomia",
      "biologia"
    ]
  },
  {
    "slug": "psicologia",
    "name": "Psicologia",
    "area": "Saúde",
    "modules": [
      "psicologia",
      "saude",
      "metodo"
    ]
  },
  {
    "slug": "medicina-veterinaria",
    "name": "Medicina Veterinária",
    "area": "Saúde",
    "modules": [
      "agro",
      "biologia",
      "saude"
    ]
  },
  {
    "slug": "biomedicina",
    "name": "Biomedicina",
    "area": "Saúde",
    "modules": [
      "biologia",
      "quimica",
      "saude"
    ]
  },
  {
    "slug": "educacao-fisica",
    "name": "Educação Física",
    "area": "Educação e humanas",
    "modules": [
      "anatomia",
      "educacao",
      "saude"
    ]
  },
  {
    "slug": "pedagogia",
    "name": "Pedagogia",
    "area": "Educação e humanas",
    "modules": [
      "educacao",
      "psicologia",
      "sociedade"
    ]
  },
  {
    "slug": "letras",
    "name": "Letras",
    "area": "Educação e humanas",
    "modules": [
      "comunicacao",
      "educacao",
      "sociedade"
    ]
  },
  {
    "slug": "historia",
    "name": "História",
    "area": "Educação e humanas",
    "modules": [
      "sociedade",
      "metodo",
      "educacao"
    ]
  },
  {
    "slug": "geografia",
    "name": "Geografia",
    "area": "Educação e humanas",
    "modules": [
      "sociedade",
      "ambiente",
      "dados"
    ]
  },
  {
    "slug": "agronomia",
    "name": "Agronomia",
    "area": "Ciências e campo",
    "modules": [
      "agro",
      "biologia",
      "ambiente"
    ]
  },
  {
    "slug": "jornalismo",
    "name": "Jornalismo",
    "area": "Serviços e criação",
    "modules": [
      "comunicacao",
      "sociedade",
      "metodo"
    ]
  }
];

export const collegeAreas = Array.from(new Set(collegeCourses.map(c => c.area)));
export const normalizeSearch = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
export function disciplineId(course: string, module: string) { return `fac-${course}-${module}`; }

/** Each difficulty tests a different aspect: identification, context and scope. */
function buildQuestions(module: Module, level: Question["level"]): Question[] {
  const facts = module.concepts;
  return facts.flatMap((fact, index) => [0, 1].map(variant => {
    const neighbors = Array.from({length: 4}, (_, j) => facts[(index + j) % facts.length]).filter((c): c is Concept => Boolean(c));
    let q: string;
    let correct: string;
    let distractors: string[];
    if (level === "facil") {
      q = variant === 0 ? `Qual conceito ${fact.definition}?` : `Qual descrição corresponde a ${fact.term.toLowerCase()}?`;
      correct = variant === 0 ? fact.term : fact.definition;
      distractors = neighbors.slice(1).map(c => variant === 0 ? c.term : c.definition);
    } else if (level === "medio") {
      q = variant === 0 ? `Ao ${fact.case}, qual conceito está diretamente envolvido?` : `Qual situação exemplifica ${fact.term.toLowerCase()}?`;
      correct = variant === 0 ? fact.term : fact.case;
      distractors = neighbors.slice(1).map(c => variant === 0 ? c.term : c.case);
    } else {
      q = variant === 0 ? `Ao ${fact.case}, que ressalva precisa ser considerada?` : `Qual conceito está associado a esta ressalva: “${fact.limit}”?`;
      correct = variant === 0 ? fact.limit : fact.term;
      distractors = neighbors.slice(1).map(c => variant === 0 ? c.limit : c.term);
    }
    const answer = (index + variant + (level === "facil" ? 0 : level === "medio" ? 1 : 2)) % 4;
    const options = [...distractors]; options.splice(answer, 0, correct);
    return {q, options, answer, level, explanation: `${fact.term}: ${fact.definition}. Exemplo: ${fact.case}. Atenção: ${fact.limit}.`};
  }));
}
export function getCollegeDisciplines(course: CollegeCourse) {
  return course.modules.flatMap((key, index) => {
    const module = modules[key];
    if (!module) return [];
    return [{ id: disciplineId(course.slug, key), key, title: module.title, period: `Módulo ${index + 1}`, lessonTitle: `Fundamentos de ${module.title.toLocaleLowerCase("pt-BR")}` }];
  });
}
export const collegeLessons: Lesson[] = collegeCourses.flatMap(course => getCollegeDisciplines(course).flatMap(discipline => {
  const module = modules[discipline.key];
  if (!module) return [];
  const concepts = module.concepts;
  return [{
    subject: discipline.id, year: discipline.period, title: discipline.lessonTitle,
    explanation: concepts.map(c => `${c.term} — ${c.definition}.
Na prática, esse conceito ajuda a ${c.case}. É importante observar que ${c.limit}.`).join("\n\n"),
    summary: `Bases de ${module.title.toLocaleLowerCase("pt-BR")} na trilha de ${course.name}: ${concepts.map(c => c.term.toLocaleLowerCase("pt-BR")).join(", ")}.`,
    examples: concepts.map(c => `${c.term}: ${c.case}.`),
    solvedExamples: concepts.slice(0, 2).map(c => ({problem: `Como analisar uma situação que exige ${c.case}?`, steps: [`Identifique a questão: ${c.case}.`, `Use ${c.term.toLocaleLowerCase("pt-BR")}: ${c.definition}.`, `Verifique o alcance da conclusão: ${c.limit}.`]})),
    exercises: concepts.map(c => ({prompt: `Explique ${c.term.toLocaleLowerCase("pt-BR")} e aplique o conceito a uma situação prática.`, answer: `${c.term} ${c.definition}. Um exemplo é ${c.case}. Na análise, considere que ${c.limit}.`})),
    review: concepts.map(c => `Por que a ressalva “${c.limit}” importa ao estudar ${c.term.toLocaleLowerCase("pt-BR")}?`),
    finalSummary: `Diferencie definição, aplicação e limites de cada conceito. Esses fundamentos são um ponto de partida para o aprofundamento em ${course.name}.`,
    quizzes: {facil: buildQuestions(module, "facil"), medio: buildQuestions(module, "medio"), dificil: buildQuestions(module, "dificil")},
  }];
}));
export function getCollegeContext(subject: string) {
  for (const course of collegeCourses) {
    const discipline = getCollegeDisciplines(course).find(d => d.id === subject);
    if (discipline) return {course, discipline};
  }
  return undefined;
}
export function collegeLabel(subject: string) {
  const context = getCollegeContext(subject);
  return context ? `${context.course.name} · ${context.discipline.title}` : undefined;
}
