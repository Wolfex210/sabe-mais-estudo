<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Organize os roteiros de estudo por ano em `src/lib/curriculum.ts`, separados das questões gerais; isso mantém a seleção de ano independente dos quizzes existentes.
- Guarde o progresso autenticado por usuário no Lovable Cloud com políticas por conta; mantenha o conteúdo didático extensível separado de dados pessoais para adicionar aulas sem alterar autenticação.
- Use as lookup keys estáveis dos planos Stripe no checkout incorporado e resolva Price IDs no servidor; isso separa preços exibidos de identificadores de cobrança e mantém o Preview e a produção consistentes.
- Keep the college catalog in a separate typed module with course-scoped discipline IDs and reuse the lesson, quiz and progress engines; this prevents collisions with school curricula and keeps account data independent of educational content.
- Fetch individual lesson DTOs through a public read-only server function with TanStack Query; this preserves asynchronous route loading without exposing account data.
