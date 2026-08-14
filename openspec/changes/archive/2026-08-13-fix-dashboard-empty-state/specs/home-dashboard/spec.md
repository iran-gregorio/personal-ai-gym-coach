## MODIFIED Requirements

### Requirement: Cálculo do Treino do Dia
O sistema MUST calcular qual é o próximo treino baseado na sequência de `order` do último treino realizado, exibir o treino concluído de hoje, ou retornar um estado seguro (vazio) caso o usuário não possua treinos cadastrados, evitando falhas.

#### Scenario: Treino já realizado hoje
- **WHEN** o último `WorkoutHistory` ocorreu na data de hoje
- **THEN** o sistema retorna esse treino com a flag `isCompletedToday = true`

#### Scenario: Treino não realizado hoje
- **WHEN** o último `WorkoutHistory` ocorreu antes de hoje e existem treinos cadastrados no sistema
- **THEN** o sistema retorna o próximo treino na sequência de `order` com a flag `isCompletedToday = false`

#### Scenario: Usuário sem treinos cadastrados
- **WHEN** o usuário acessa o dashboard mas ainda não possui nenhum `Workout` cadastrado em sua conta
- **THEN** o sistema retorna uma resposta indicando a ausência de treinos (ex: payload nulo ou array vazio para o treino do dia) e não gera erro interno 500
