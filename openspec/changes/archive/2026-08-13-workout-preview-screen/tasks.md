## 1. Backend: Rota e Service para buscar treino por ID

- [x] 1.1 Atualizar `workouts.service.ts` para adicionar o método `getWorkoutById(id, userId)`, retornando também a relação `exercises`.
- [x] 1.2 Atualizar `workouts.controller.ts` para adicionar o método correspondente para extrair o `id` da rota.
- [x] 1.3 Adicionar a nova rota `GET /:id` em `workouts.routes.ts`.
- [x] 1.4 Adicionar documentação Swagger (JSDoc) na nova rota e criar testes unitários básicos para garantir o funcionamento com o id.

## 2. Frontend: Tela de Preview do Treino

- [x] 2.1 Criar a rota dinâmica `apps/frontend/src/app/(dashboard)/workouts/[id]/page.tsx`.
- [x] 2.2 Implementar a requisição à API para buscar os detalhes do treino pelo `id` extraído da URL.
- [x] 2.3 Implementar a UI que exibe as informações gerais do treino (título, descrição).
- [x] 2.4 Implementar a listagem dos exercícios desse treino, mostrando detalhes como número de séries, repetições, peso e descanso.
- [x] 2.5 Adicionar o botão "Iniciar Treino" na página de preview (inicialmente podendo apenas fazer console.log ou ir para a rota `/workouts/[id]/execution`).

## 3. Integração na Lista de Treinos

- [x] 3.1 Atualizar a listagem de treinos (`apps/frontend/src/app/(dashboard)/workouts/page.tsx`) para envolver o card do treino num link para `/workouts/[id]` em vez de iniciar automaticamente ou de não ter ação.
