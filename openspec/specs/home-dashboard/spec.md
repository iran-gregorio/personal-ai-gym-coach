# home-dashboard Specification

## Purpose
TBD - created by archiving change add-home-dashboard. Update Purpose after archive.
## Requirements
### Requirement: Autenticação da API do Dashboard
O endpoint `/api/dashboard` MUST be protegido por autenticação. O usuário MUST be identificado a partir do token JWT fornecido na requisição.

#### Scenario: Requisição sem token
- **WHEN** uma requisição é feita para `/api/dashboard` sem o header Authorization com um token válido
- **THEN** o sistema retorna um erro de não autorizado (HTTP 401)

#### Scenario: Requisição com token válido
- **WHEN** uma requisição é feita para `/api/dashboard` com um token JWT válido
- **THEN** o sistema identifica o usuário a partir do token e retorna os dados correspondentes exclusivamente a esse usuário

### Requirement: Exibição do Progresso Semanal
O sistema MUST retornar o status de conclusão dos treinos para cada dia da semana atual, de Segunda a Domingo.

#### Scenario: Usuário com treinos realizados na semana
- **WHEN** o usuário acessa o dashboard e enviou sua data local
- **THEN** o sistema retorna quais dias daquela semana tiveram um `WorkoutHistory` registrado

### Requirement: Cálculo do Treino do Dia
O sistema MUST calcular qual é o próximo treino baseado na sequência de `order` do último treino realizado, ou exibir o treino concluído de hoje.

#### Scenario: Treino já realizado hoje
- **WHEN** o último `WorkoutHistory` ocorreu na data de hoje
- **THEN** o sistema retorna esse treino com a flag `isCompletedToday = true`

#### Scenario: Treino não realizado hoje
- **WHEN** o último `WorkoutHistory` ocorreu antes de hoje
- **THEN** o sistema retorna o próximo treino na sequência de `order` com a flag `isCompletedToday = false`

