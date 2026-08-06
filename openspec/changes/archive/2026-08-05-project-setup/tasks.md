## 1. Configuração Inicial do Monorepo

- [x] 1.1 Criar o arquivo `package.json` na raiz configurado com npm/yarn/pnpm workspaces.
- [x] 1.2 Criar as pastas `/apps/frontend` e `/apps/backend`.

## 2. Frontend (Next.js)

- [x] 2.1 Inicializar a aplicação Next.js na pasta `/apps/frontend` com suporte a TypeScript.
- [x] 2.2 Limpar o template padrão para exibir apenas "Hello World".
- [x] 2.3 Garantir que o comando `npm run dev` inicie corretamente a aplicação no workspace do frontend.

## 3. Backend (Node.js + Express)

- [x] 3.1 Inicializar o projeto Node.js em `/apps/backend` com `package.json` próprio.
- [x] 3.2 Instalar `express`, `typescript`, `ts-node` e as respectivas tipagens (`@types/express`, `@types/node`).
- [x] 3.3 Criar a estrutura básica e o arquivo `index.ts` contendo um healthcheck (GET `/`) que retorne "Hello World".
- [x] 3.4 Configurar o script de inicialização do servidor de desenvolvimento na porta 3001.

## 4. Orquestração e Validação

- [x] 4.1 Adicionar scripts no `package.json` da raiz para rodar ambos os projetos simultaneamente (ex: usando `concurrently`).
- [x] 4.2 Validar que o frontend e o backend respondem corretamente em suas portas.
