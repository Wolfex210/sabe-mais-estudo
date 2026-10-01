# Corrigir preços do Stripe no Preview

## Objetivo
Garantir que os três planos iniciem o checkout de teste usando os preços cadastrados no Stripe, nunca os textos monetários exibidos na página.

## Alterações
- Substituir o fluxo antigo da página de planos, que lê `STRIPE_PRICE_*`, pelo checkout incorporado já configurado com os identificadores estáveis `sabe_mais_basico_mensal`, `sabe_mais_medio_mensal` e `sabe_mais_master_mensal`.
- Manter `R$ 19,99`, `R$ 49,99` e `R$ 89,99` apenas como textos visuais.
- Remover ou neutralizar os endpoints antigos que usam chave Stripe direta e variáveis `STRIPE_PRICE_*`, evitando que o Preview volte a enviar valores monetários à API.
- Exibir o aviso de ambiente de teste e preservar a aparência atual da página.
- Registrar a decisão técnica de usar lookup keys estáveis e atualizar a pendência de pagamentos no roadmap.

## Validação
- Confirmar que o Preview chama o fluxo incorporado e resolve cada lookup key para um Price ID real `price_...` no servidor.
- Testar usuário autenticado na página de planos e verificar que o formulário Stripe abre sem o erro “No such price”.
- Conferir os três planos, erros do navegador e compilação final.

## Observação
As variáveis antigas `STRIPE_PRICE_BASICO`, `STRIPE_PRICE_MEDIO` e `STRIPE_PRICE_MASTER` deixam de ser necessárias neste fluxo gerenciado. Os Price IDs reais permanecem resolvidos com segurança no servidor pelo catálogo Stripe de teste.
