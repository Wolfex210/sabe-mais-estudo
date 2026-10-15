# Atualizar preços Stripe de produção

## Objetivo
Separar explicitamente os preços de teste e produção dos três planos, validar cada preço no servidor antes do checkout e preservar integralmente a página de planos e o comportamento das assinaturas existentes.

## Alterações
- Registrar em `src/lib/stripe-plans.ts` o identificador de teste, o Price ID de produção e o valor esperado de cada plano.
- Fazer `src/lib/payments.functions.ts` escolher o identificador conforme o ambiente: lookup key no teste e Price ID informado em produção.
- Recuperar preços de produção diretamente pelo ID usando a conexão Stripe Live já vinculada; validar existência, atividade, recorrência mensal, BRL e valor antes de criar o checkout incorporado.
- Manter autenticação, bloqueio de assinatura duplicada, Customer e metadados por usuário, URL de retorno e ambiente isolado.
- Tornar a identificação do plano ativo compatível com registros antigos por lookup key e novos registros por Price ID, sem migrar nem excluir assinaturas.
- Manter `src/routes/planos.tsx` e `src/components/StripeEmbeddedCheckout.tsx` visualmente inalterados; ajustar apenas o identificador lógico enviado, se necessário.
- Atualizar a regra técnica do projeto para refletir preços separados por ambiente.

## Validação
- Confirmar os três Price IDs na conta Stripe Live e conferir moeda, valor, recorrência e atividade.
- Executar a verificação de tipos disponível e aguardar o build automático da prévia.
- Testar o checkout de teste autenticado para garantir que ele continua usando apenas o catálogo de teste.
- Não executar uma cobrança real; informar claramente que produção foi validada por catálogo, não por pagamento concluído.

## Antes de publicar
Apresentar a lista exata de arquivos alterados, os resultados das verificações e qualquer bloqueio/configuração ainda pendente. A publicação não será feita sem novo pedido explícito.
