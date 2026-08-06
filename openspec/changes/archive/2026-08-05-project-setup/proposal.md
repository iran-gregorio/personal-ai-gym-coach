## Why

O projeto "Personal AI Gym Coach" requer uma fundação técnica robusta e escalável. O setup inicial de um Monorepo vai garantir o compartilhamento eficiente de código entre o frontend (Next.js) e o backend (Node.js/Express) desde o primeiro dia. Isso acelera o desenvolvimento, facilita a tipagem (usando Prisma e TypeScript) e prepara o ambiente para o futuro uso do Google Gemini.

## What Changes

- Configuração de um Monorepo básico usando workspaces.
- Inicialização da aplicação frontend com Next.js.
- Inicialização da aplicação backend com Node.js e Express.
- Criação de scripts básicos para rodar as aplicações localmente.

## Capabilities

### New Capabilities
- `project-foundation`: Estabelecimento do monorepo, frontend e backend em modo "Hello World".

### Modified Capabilities


## Impact

- Criação da estrutura de pastas base (`/apps/frontend` e `/apps/backend`).
- Impacta o modo de execução local, exigindo que ambos os apps sejam executados via scripts do diretório raiz.
