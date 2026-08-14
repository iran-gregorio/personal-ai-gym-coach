## ADDED Requirements

### Requirement: Navegação para visualização detalhada
O sistema SHALL permitir que o usuário navegue para a visualização detalhada de um treino a partir da lista geral.

#### Scenario: Clique em um treino da lista
- **WHEN** o usuário clica sobre um dos cards de treino na página de listagem (`/workouts`)
- **THEN** o sistema redireciona o usuário para a respectiva rota de detalhes do treino (`/workouts/[id]`)
