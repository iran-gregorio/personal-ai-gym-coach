## 1. Prisma Schema Updates

- [x] 1.1 Adicionar modelos `Workout` e `WorkoutExercise` em `schema.prisma`.
- [x] 1.2 Adicionar modelos `WorkoutHistory` e `WorkoutHistoryExercise` com as devidas configurações de relacionamentos opcionais (set null).
- [x] 1.3 Atualizar o modelo `User` existente adicionando as referências aos novos modelos.
- [x] 1.4 Executar formatação (`npx prisma format`) e gerar a migração (`npx prisma migrate dev`).

## 2. Database Seed

- [x] 2.1 Criar/Modificar o script `prisma/seed.ts` para popular a base de dados com ao menos um `User`, um `Workout` (com exercícios variados) e um registro no `WorkoutHistory`.
- [x] 2.2 Executar o seed localmente para validar se os dados foram inseridos corretamente.
