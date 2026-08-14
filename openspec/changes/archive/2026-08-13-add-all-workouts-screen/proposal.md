## Why

O dashboard principal exibe apenas os treinos mais recentes ou o treino do dia. Para que os usuários tenham controle total sobre sua rotina, é necessário ter uma tela dedicada que liste todos os treinos disponíveis, permitindo pesquisar, visualizar e selecionar treinos passados ou futuros. O botão "Ver outros treinos" no dashboard já indica essa necessidade e será ativado para levar a essa nova tela.

## What Changes

- Criação da página/tela de lista de treinos (All Workouts Screen) no frontend (Next.js).
- O layout seguirá o Design System e os padrões visuais já estabelecidos nas outras telas (como o Dashboard).
- Adição da funcionalidade de navegação no botão "Ver outros treinos" do Dashboard apontando para a nova tela.
- Integração da tela com o backend para buscar a lista completa de treinos do usuário autenticado.

## Capabilities

### New Capabilities
- `workouts-list`: Tela e listagem completa dos treinos do usuário, exibindo as informações essenciais de cada treino em formato de lista/cards de acordo com o design system, com integração ao backend.

### Modified Capabilities
- `home-dashboard`: Modificação para fazer o botão "Ver outros treinos" funcionar e redirecionar para a nova tela.
- `workout-management`: O spec existente pode precisar contemplar ou reafirmar o endpoint de listagem de todos os treinos para consumo na nova tela.

## Impact

- Frontend: Nova rota/página no Next.js (ex: `/workouts`), novos componentes de lista se necessário (reutilizando cards de treino).
- Backend: Consumo do endpoint existente de listar treinos (ou ajuste se necessário para suportar paginação/filtros requeridos pela tela).
- UX: Os usuários poderão explorar todo o catálogo pessoal de treinos.
