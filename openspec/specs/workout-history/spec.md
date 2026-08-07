# workout-history Specification

## Purpose
TBD - created by archiving change add-workout-entities. Update Purpose after archive.
## Requirements
### Requirement: Snapshot-based Workout History
O sistema DEVE ser capaz de registrar uma execução de treino (`WorkoutHistory`) e seus respectivos exercícios (`WorkoutHistoryExercise`) de forma independente e imutável. Alterar o template original não deve afetar o registro histórico.

#### Scenario: Preserving historical data
- **WHEN** a user executes a workout and then deletes the original workout template
- **THEN** the workout history records must remain intact with the snapshot data of the names and configurations from the time of execution

### Requirement: Updating Last Used Weight
O sistema DEVE suportar a atualização do último peso usado (`lastWeight`) no próprio template do exercício de forma integrada quando se registra um histórico de treino.

#### Scenario: Saving workout history with new weight
- **WHEN** a user completes an exercise in a workout with a `weightUsed` value
- **THEN** the template exercise's `lastWeight` should be updated with the newly provided value

