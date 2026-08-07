## MODIFIED Requirements

### Requirement: Database Schema for Workouts
O sistema MUST prover tabelas relacionais que permitam armazenar os Treinos (Workouts) de um usuário e os Exercícios (WorkoutExercises) contidos nesse treino. A tabela `Workout` MUST incluir um campo `tags` para armazenar classificações descritivas do treino.

#### Scenario: Schema validation
- **WHEN** the Prisma schema is updated and migrated
- **THEN** the PostgreSQL database should contain the tables `Workout` and `WorkoutExercise` correctly linked to a `User`, e a tabela `Workout` deve possuir a coluna de array de strings `tags`
