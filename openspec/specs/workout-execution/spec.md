# workout-execution Specification

## Purpose
TBD - created by archiving change workout-execution. Update Purpose after archive.
## Requirements
### Requirement: Iniciar Execução de Treino
O sistema MUST permitir que o usuário inicie um treino a partir do dashboard, o que MUST criar imediatamente o histórico do treino no banco de dados.

#### Scenario: Início de treino
- **WHEN** o usuário clica no botão "Iniciar Treino"
- **THEN** o sistema envia uma requisição POST criando um `WorkoutHistory` e redireciona para a tela de execução

### Requirement: Atualização em Tempo Real de Exercício
O sistema MUST permitir a marcação de exercícios como concluídos e a alteração do peso utilizado, salvando a mudança instantaneamente via API.

#### Scenario: Marcação de exercício concluído ou alteração de peso
- **WHEN** o usuário altera o peso ou clica em "Marcar como concluído"
- **THEN** o sistema envia uma requisição PATCH para o backend salvando os dados na tabela `WorkoutHistoryExercise`

### Requirement: Finalização do Treino
O sistema MUST permitir finalizar o treino, momento em que calcula o tempo decorrido desde o início.

#### Scenario: Finalização de treino
- **WHEN** o usuário clica em "Finalizar Treino"
- **THEN** o sistema calcula a duração, atualiza o `WorkoutHistory` via requisição PATCH e redireciona o usuário para o Dashboard

