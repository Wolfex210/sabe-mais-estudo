# Reforçar a segurança do Sabe Mais

## Preservação
Manter o visual, os conteúdos, os preços, as integrações Stripe e Mercado Pago e os recursos existentes. Não publicar, realizar cobranças reais, excluir dados ou alterar secrets durante esta tarefa.

## Auditoria já executada
- As quatro tabelas pessoais possuem proteção por conta; a revisão básica e o verificador do banco não apontaram falhas.
- A auditoria aprofundada encontrou duas falhas: seleção de plano pago pelo estado editável do navegador e liberação do passe Pix pela consulta de retorno do checkout.
- A revisão do código também encontrou armazenamento indiscriminado de respostas pelo aplicativo instalado, risco de dados antigos durante troca de conta, alteração de senha sem distinção entre recuperação e sessão comum e fragilidade contra eventos de pagamento atrasados.
- A análise de dependências identificou avisos em Zod, Seroval, js-yaml e source-map-js, inclusive dependências indiretas.
- A última verificação automática disponível registrou `build OK`; isso não comprova pagamentos ou segurança integral.

## Correções
### 1. Contas e dados pessoais
- Limpar dados e consultas anteriores antes de encerrar ou trocar a conta, evitando exibição de progresso de outro aluno.
- Manter validação de identidade no servidor e políticas por proprietário; adicionar limites e validação de dados pessoais sem transformar progresso editável em autorização.
- Preservar recuperação de senha via serviço de autenticação e mensagens que não revelam contas existentes. Diferenciar recuperação por link de alteração autenticada, exigindo senha atual nesta última.
- Verificar configurações de confirmação de e-mail, senhas vazadas e sessões; não sobrescrever configurações desconhecidas.

### 2. Pagamentos
- Tornar a consulta do retorno Stripe somente leitura; fulfillment do passe Stripe Pix passa a depender do webhook assinado.
- Validar valor, moeda, preço, tipo de pagamento, ambiente e vínculo ao usuário antes de registrar direito de acesso.
- Impedir que teste conceda acesso em produção e impedir que o comprador escolha arbitrariamente o ambiente usado pelo servidor.
- Fortalecer checkout contra repetição e concorrência com registros duráveis e idempotência; conferir assinaturas reais antes de permitir uma segunda compra.
- Evitar reatribuição de assinatura a outra conta e sobrescrita por eventos antigos, com processamento transacional e comparação de versão ou consulta do estado atual ao provedor.
- Preservar consulta autenticada Mercado Pago para confirmação real do Pix de cadastro, validando também os dados do QR gerado e respostas do provedor.

### 3. Conteúdo e planos
- Centralizar autorização no servidor usando pagamento de cadastro, assinatura do ambiente correto e período gratuito baseado em data confiável da conta, não no navegador.
- Preservar os limites existentes: Básico, 25 matérias e 25 cursos; Médio, 60 matérias e 70 cursos; Master, catálogo ilimitado.
- Aplicar autorização antes de entregar conteúdo protegido. Separar catálogo público de aulas e questões protegidas; retirar conteúdo exclusivo de pacotes públicos quando necessário.
- Preservar páginas públicas de apresentação e acesso à conta, recuperação e pagamento. Ajustar a regra arquitetural de entrega de aulas para refletir a proteção solicitada.

### 4. Navegador, implantação e bibliotecas
- Restringir armazenamento offline a arquivos públicos explicitamente permitidos e eliminar caches antigos; não armazenar respostas pessoais ou de pagamento.
- Adicionar cabeçalhos de segurança compatíveis com checkout, login e prévia; testar CSP primeiro em modo de relatório quando a lista de serviços ainda não estiver validada.
- Preservar CSRF existente, restringir redirecionamentos e evitar erros que retornem credenciais ou dados pessoais.
- Atualizar dependências vulneráveis para versões corrigidas disponíveis, sem troca de arquitetura; conferir compatibilidade e refazer a análise.
- Revisar exposição de arquivos internos e mapas de código-fonte, sem modificar arquivos de integração gerenciados.

## Detalhes técnicos
- Usar funções TanStack protegidas por `requireSupabaseAuth` para autorização; manter o mecanismo gerenciado de sessão.
- Mudanças de banco serão aditivas, aplicadas por migração gerenciada com permissões explícitas, RLS e escrita interna exclusiva para pagamentos.
- Registros de cobrança e autorização nunca dependem de `student_study_data.progress.plan` ou `localStorage`.
- Não criar painel administrativo inexistente nem conceder administradores automaticamente. MFA e auditoria administrativa só se aplicam a uma área administrativa identificada.

## Testes e relatório
- Adicionar testes concretos de preços, limites, ambiente, estados de assinatura, repetição de eventos e rejeição de pagamentos inválidos.
- Verificar acesso anônimo, conta sem pagamento, adulteração de plano local, encerramento de sessão e isolamento entre contas com dados de teste autorizados.
- Conferir checkout em teste, quando disponível, sem cobrança de produção; falhas de credencial ou de provedor serão relatadas como bloqueios.
- Executar testes relevantes, ler verificações automáticas de tipos/build e repetir revisão de dependências e banco após correções.
- Entregar relatório com vulnerabilidades, correções, arquivos/configurações alterados, resultados reais e pendências. Não afirmar imunidade a invasões.

## Limitações e decisões pendentes
- **Limitação de tentativas/requisições:** não há mecanismo padronizado no servidor. A pergunta sobre alternativa foi interrompida; não implementar uma solução improvisada sem consentimento.
- **Backups:** Lovable Cloud documenta backups diários, mas o inventário só pode ser conferido em **More → Database → Manage → Backups**. Não declarar integridade verificada nem restaurar produção. Documentar teste isolado e lembrar que arquivos de armazenamento não entram no backup do banco.
- **Pagamentos reais:** a credencial Mercado Pago e a prontidão Stripe precisam de confirmação; não simular recebimento nem alterar preços de produção nesta auditoria.
- **Alertas, MFA administrativo e configuração hospedada:** explicar precisamente o que não foi possível verificar ou configurar pelos recursos disponíveis.
