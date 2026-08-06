## 1. Setup da Nova Estrutura

- [x] 1.1 Criar a pasta base para os módulos do sistema em `apps/backend/src/modules/`.
- [x] 1.2 Criar a subpasta do domínio de autenticação em `apps/backend/src/modules/auth/`.

## 2. Refatoração do Domínio de Auth

- [x] 2.1 Criar o arquivo `auth.schema.ts` em `modules/auth/` e extrair o `loginSchema` (Zod).
- [x] 2.2 Criar o arquivo `auth.service.ts` para lidar com a regra de negócio. Ele deve receber `email` e `password` como entrada, buscar o usuário no Prisma, comparar o hash via `bcrypt` e gerar/retornar o token JWT e o usuário (sem a senha).
- [x] 2.3 Criar o arquivo `auth.controller.ts` que lida com `Request` e `Response`. Ele deve utilizar o `loginSchema` para validar a requisição (tratando erros), acionar o `auth.service.ts` e devolver o status code adequado.
- [x] 2.4 Criar o arquivo `auth.routes.ts` e mapear o endpoint `POST /login` para o novo controller.

## 3. Limpeza e Integração

- [x] 3.1 Atualizar o roteador principal (no `index.ts` ou roteador central) para importar e montar a rota a partir do novo `modules/auth/auth.routes.ts`.
- [x] 3.2 Apagar os arquivos legados: `src/controllers/auth.ts` e `src/routes/auth.ts`.
- [x] 3.3 Validar se o TypeScript compila sem erros (ex: `npx tsc --noEmit`).

## 4. Testes Automatizados

- [x] 4.1 Criar o arquivo de testes `auth.service.spec.ts` contendo testes unitários para o `auth.service.ts` (mockando o Prisma e bcrypt).
- [x] 4.2 Criar o arquivo de testes `auth.controller.spec.ts` para testar os retornos HTTP (status code 200, 400, 401).
- [x] 4.3 Rodar a suite de testes e garantir a cobertura adequada.
