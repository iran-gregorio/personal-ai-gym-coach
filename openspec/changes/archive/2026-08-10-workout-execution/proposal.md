## Why

Os usuários precisam de uma forma de executar os treinos no aplicativo. Atualmente, os treinos podem ser criados, mas não há um fluxo para acompanhar o progresso durante o treino (tempo decorrido, pesos utilizados, marcar exercícios como concluídos) e salvar o histórico desse treino diretamente no banco de dados.

## What Changes

- Criação de uma nova tela no frontend para execução do treino.
- Registro em tempo real do estado do treino diretamente no banco de dados via API.
- Adição de rotas de backend (novo módulo de execução) para iniciar o treino, atualizar o peso/status dos exercícios e finalizar o treino, calculando a duração total.

## Capabilities

### New Capabilities
- `workout-execution`: O fluxo e a interface para iniciar a execução do treino, atualizar exercícios individualmente (peso e status) e finalizar a sessão.

### Modified Capabilities


## Impact

- **Frontend**: Criação de nova tela de execução (ex: `/dashboard/execution/[historyId]`) e atualização do botão de iniciar treino na home (`/dashboard`).
- **Backend**: Criação do módulo `execution` com rotas `POST /start`, `PATCH /exercise/:id` e `PATCH /finish/:id`.
- **Database**: O esquema atual (Prisma) será utilizado sem modificações estruturais, apenas populando `WorkoutHistory` e `WorkoutHistoryExercise`.
