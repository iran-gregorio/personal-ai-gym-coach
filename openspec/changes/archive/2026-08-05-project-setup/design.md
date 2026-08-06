## Context

O projeto "Personal AI Gym Coach" está na fase inicial de configuração. A arquitetura escolhida visa suportar tanto os fluxos transacionais web padrão quanto futuras integrações pesadas de IA, ao mesmo tempo que mantém os custos mínimos utilizando recursos gratuitos da Vercel, Supabase e Google Cloud Platform.

## Goals / Non-Goals

**Goals:**
- Estruturar o repositório como um monorepo para simplificar o compartilhamento de tipos.
- Inicializar o app frontend com Next.js (hello world).
- Inicializar o app backend com Node.js e Express (hello world).
- Permitir que ambos os serviços rodem localmente através de comandos na raiz do projeto.

**Non-Goals:**
- Implementação de autenticação (ficará para uma etapa posterior).
- Criação de UI rica e estilização completa agora.
- Configuração de CI/CD para deploy neste exato momento.

## Decisions

- **Monorepo Structure**: Foi decidido usar a estrutura de workspaces do gerenciador de pacotes base, com pastas `apps/frontend` e `apps/backend`. Alternativa: repositórios separados, mas foi descartada para não criar atrito na comunicação de tipos e esquemas do Prisma entre as duas pontas.
- **Next.js para o Frontend**: Oferece rotas integradas e SSR, sendo excelente para SEO e Vercel, mesmo com um backend separado.
- **Node.js/Express para o Backend**: Escolhido pela facilidade de escalar a zero no Google Cloud Run e pelo amplo suporte a APIs do Google quando formos integrar o Gemini.
- **Supabase para DB**: Utilizaremos o PostgreSQL hospedado do Supabase gerenciado via Prisma ORM localmente.

## Risks / Trade-offs

- **Risk:** Complexidade inicial de configuração do monorepo (scripts, tipagens, ESLint compartilhado).
  - *Mitigação:* Usar templates minimalistas e ferramentas como `npm workspaces` (ou `yarn`/`pnpm`) mantendo a configuração inicial o mais simples possível.
- **Trade-off:** Manter um backend Express separado em vez de usar Next.js API Routes para tudo.
  - *Mitigação:* As chamadas ao Gemini (no futuro) e a lógica de processamento de treinos podem exigir processamentos assíncronos e longos, onde o Cloud Run é muito superior às Serverless Functions padrão do frontend, o que justifica este design desacoplado.
