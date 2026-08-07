## 1. Modificações de Banco de Dados

- [x] 1.1 Atualizar o arquivo `apps/backend/prisma/schema.prisma` para adicionar `tags String[] @default([])` no modelo `Workout`
- [x] 1.2 Atualizar `apps/backend/prisma/seed.ts` para inserir algumas tags nos dados padrão gerados
- [x] 1.3 Gerar o cliente Prisma e aplicar a migração no banco de dados

## 2. Backend - Módulo Dashboard

- [x] 2.1 Criar arquivo de rotas `apps/backend/src/modules/dashboard/dashboard.routes.ts` com proteção de autenticação
- [x] 2.2 Criar arquivo do controller `apps/backend/src/modules/dashboard/dashboard.controller.ts`
- [x] 2.3 Implementar no controller a extração do `clientDate` e a busca pelo progresso semanal (`weekProgress`)
- [x] 2.4 Implementar no controller a lógica de identificar o próximo treino (`workoutOfDay`) com base no último `WorkoutHistory`
- [x] 2.5 Registrar a nova rota `/api/dashboard` no `apps/backend/index.ts`
- [x] 2.6 Documentar o endpoint `/api/dashboard` usando JSDoc para o Swagger

## 3. Frontend - Interface e Integração

- [x] 3.1 Criar a página de dashboard em `apps/frontend/src/app/dashboard/page.tsx`
- [x] 3.2 Implementar a estrutura visual responsiva (Desktop e Mobile) utilizando TailwindCSS
- [x] 3.3 Consumir a API `/api/dashboard` repassando o token de acesso e a data atual (`clientDate`) do navegador
- [x] 3.4 Tratar a renderização dinâmica do calendário da semana e dos detalhes do treino
- [x] 3.5 Implementar o estado de "TREINO CONCLUÍDO" desabilitando a ação de iniciar, caso `isCompletedToday` seja `true`
- [x] 3.6 Substituir o header da interface implementando a funcionalidade do botão de "Sair" (limpeza do localStorage)
- [x] 3.7 Adicionar o empty state visual caso a API retorne `workoutOfDay: null`
