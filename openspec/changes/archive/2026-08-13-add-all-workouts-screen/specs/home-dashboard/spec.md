## ADDED Requirements

### Requirement: Navegação para a listagem de treinos
O dashboard SHALL possuir uma ação de navegação ("Ver outros treinos") que redireciona o usuário para a página de listagem completa de treinos.

#### Scenario: Redirecionamento ao clicar no botão
- **WHEN** o usuário clica em "Ver outros treinos" no Dashboard
- **THEN** o usuário é redirecionado para a rota `/workouts` e a listagem de treinos é exibida
