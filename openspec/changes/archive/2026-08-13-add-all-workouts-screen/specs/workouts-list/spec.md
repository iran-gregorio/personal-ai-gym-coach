## ADDED Requirements

### Requirement: Exibição da lista completa de treinos
O sistema SHALL exibir uma página dedicada `/workouts` contendo a listagem de todos os treinos disponíveis na conta do usuário autenticado.

#### Scenario: Visualização da lista de treinos
- **WHEN** o usuário acessa a rota `/workouts` no frontend
- **THEN** o sistema exibe a interface com todos os seus treinos listados utilizando os cards de treino padrão
