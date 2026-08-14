## Why

Atualmente, ao acessar a lista de treinos, o usuário precisa de um passo intermediário para visualizar os detalhes de um treino específico antes de efetivamente iniciá-lo. Isso permite que ele confira os exercícios, cargas e repetições previstas sem disparar a execução do treino, proporcionando maior controle e preparo.

## What Changes

- **Nova Tela de Visualização de Treino**: Uma página dedicada onde o usuário pode ver os detalhes de um treino (lista de exercícios, séries, repetições, etc) ao clicar nele na listagem.
- **Ação de Iniciar Treino**: A inclusão de um botão opcional nesta nova tela para iniciar a execução do treino, caso desejado.
- **Modificação na Listagem**: O clique nos cards da rota `/workouts` passará a redirecionar para a nova tela de visualização (`/workouts/[id]`), em vez de realizar qualquer outra ação.
- **Endpoint Backend**: Acesso ou criação de um endpoint para obter os detalhes completos (com exercícios) de um treino específico pelo ID (`GET /api/workouts/:id`).

## Capabilities

### New Capabilities
- `workout-preview`: Tela de visualização detalhada de um treino, contendo a lista dos seus exercícios e um botão para iniciar a execução.

### Modified Capabilities
- `workouts-list`: O comportamento ao clicar em um item da lista será modificado para navegar até a tela de visualização (preview).

## Impact

- **Frontend**: Criação da nova rota de visualização (`/workouts/[id]`), novos componentes para listar detalhes dos exercícios e modificação da navegação no componente de card de treino da listagem.
- **Backend**: Pode exigir a criação ou adaptação de uma rota `GET /api/workouts/:id` que inclua os exercícios relacionados ao treino no payload.
- **Testes**: Criação de testes unitários para o novo fluxo no frontend e para o endpoint do backend.
