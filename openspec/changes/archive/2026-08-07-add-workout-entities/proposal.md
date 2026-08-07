## Why

Esta alteração introduz os recursos fundamentais de gestão de treinos no Personal AI Gym Coach. Sem estas entidades, os usuários não teriam como estruturar suas rotinas de exercícios, registrar sua evolução e acompanhar o histórico das atividades executadas, que são a base de qualquer aplicativo voltado ao mundo fitness e acompanhamento por IA.

## What Changes

- Criação dos modelos Prisma para gestão de templates de treinos (`Workout`, `WorkoutExercise`).
- Criação dos modelos Prisma para registro de histórico de execução (`WorkoutHistory`, `WorkoutHistoryExercise`).
- Geração de dados de exemplo (Seed) para popular o banco de dados com usuários, treinos e histórico iniciais para facilitar o desenvolvimento e testes.
- (Atenção) Modificação no modelo `User` existente para adicionar os novos relacionamentos.

## Capabilities

### New Capabilities
- `workout-management`: Gestão de rotinas de treino (criar, listar, ver detalhes do treino e seus exercícios associados).
- `workout-history`: Registro da execução de um treino em uma data específica, incluindo tempo de duração e informações pontuais de cada exercício.
- `database-seed`: Scripts para alimentar a base de dados do Prisma com exemplos predefinidos para testes.

### Modified Capabilities

- 

## Impact

- **Banco de Dados (Prisma)**: O arquivo `schema.prisma` será modificado extensivamente para inclusão dos novos modelos e as respectivas migrações serão geradas.
- **Backend**: Scripts de seed (`prisma/seed.ts` ou equivalente) serão criados/modificados para inicializar as entidades.
