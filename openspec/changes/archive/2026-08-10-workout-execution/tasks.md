## 1. Backend: Módulo de Execução (API)

- [x] 1.1 Criar estrutura do módulo `execution` (routes, controller, service)
- [x] 1.2 Implementar endpoint `POST /api/execution/start` que recebe `workoutId`, cria o `WorkoutHistory` com `durationSeconds: 0` e popula `WorkoutHistoryExercise`
- [x] 1.3 Implementar endpoint `PATCH /api/execution/exercise/:id` para atualizar `weightUsed` e `isCompleted` de um exercício específico
- [x] 1.4 Implementar endpoint `PATCH /api/execution/finish/:id` que calcula o `durationSeconds` (baseado na data atual e `executedAt`) e salva
- [x] 1.5 Documentar rotas com JSDoc/Swagger e escrever testes unitários para o `execution.service.ts`

## 2. Frontend: Integração e UI

- [x] 2.1 Criar a página `/dashboard/execute/[workoutId]` (recebe o id do workout na rota).
- [x] 2.2 Ao montar a página, disparar `POST /api/execution/start` e salvar o `historyId` e dados dos exercícios no estado local.
- [x] 2.3 Implementar o Timer visual (que não precisa se preocupar com estado persistente, apenas mostra o tempo passando)
- [x] 2.4 Renderizar lista de exercícios com checkbox para conclusão e input para o peso. Cada alteração dispara `PATCH /api/execution/exercise/:id`.
- [x] 2.5 Implementar botão "Finalizar Treino" que chama `PATCH /api/execution/finish/:historyId` e redireciona de volta para a Home.
