# workout-management Specification

## Purpose
TBD - created by archiving change add-workout-entities. Update Purpose after archive.
## Requirements
### Requirement: Database Schema for Workouts
O sistema DEVE prover tabelas relacionais que permitam armazenar os Treinos (Workouts) de um usuário e os Exercícios (WorkoutExercises) contidos nesse treino.

#### Scenario: Schema validation
- **WHEN** the Prisma schema is updated and migrated
- **THEN** the PostgreSQL database should contain the tables `Workout` and `WorkoutExercise` correctly linked to a `User`

### Requirement: Flexible Set and Reps Definitions
O sistema DEVE armazenar as definições de `sets` (séries) e `reps` (repetições) dos exercícios como textos (`String`), e `restTimeSeconds` (tempo de descanso) como número inteiro.

#### Scenario: Storing varied set formats
- **WHEN** a user defines an exercise with sets="2-4-8" and reps="falha"
- **THEN** the system must persist these text values successfully in the database

