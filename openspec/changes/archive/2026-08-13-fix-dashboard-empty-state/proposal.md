## Why

Atualmente, quando um cliente novo que ainda não possui nenhum treino cadastrado acessa o dashboard, a aplicação tenta renderizar informações de treinos inexistentes e gera um erro, impedindo o carregamento da tela. Isso causa uma experiência ruim para novos usuários e impede a navegação inicial no sistema. A alteração visa corrigir esse problema para oferecer uma visualização amigável de "estado vazio" (empty state).

## What Changes

- Implementar uma verificação no frontend (e/ou backend, se necessário) para lidar adequadamente com a ausência de treinos.
- Adicionar um estado vazio (empty state) amigável na UI do dashboard, informando ao usuário que ele ainda não possui treinos cadastrados.
- Garantir que o restante da tela do dashboard seja carregado sem erros.

## Capabilities

### New Capabilities
<!-- Capabilities being introduced. Replace <name> with kebab-case identifier (e.g., user-auth, data-export, api-rate-limiting). Each creates specs/<name>/spec.md -->

### Modified Capabilities
<!-- Existing capabilities whose REQUIREMENTS are changing (not just implementation).
     Only list here if spec-level behavior changes. Each needs a delta spec file.
     Use existing spec names from openspec/specs/. Leave empty if no requirement changes. -->
- `home-dashboard`: A tela inicial (dashboard) passa a suportar e exigir a renderização de um estado vazio (empty state) amigável quando o usuário não tiver treinos cadastrados, sem causar quebra na interface.

## Impact

- Frontend: Componentes do Dashboard (`home-dashboard`) que lidam com a listagem de treinos.
- Backend: Garantia de que a API retorne uma estrutura válida (ex: array vazio) em vez de causar erros quando não houver treinos, facilitando o consumo pelo frontend.
