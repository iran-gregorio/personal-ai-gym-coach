## ADDED Requirements

### Requirement: Exibição detalhada de um treino
A tela de visualização de treino SHALL exibir todas as informações pertinentes do treino selecionado, incluindo nome, descrição, status e a lista dos exercícios pertencentes.

#### Scenario: Visualização dos dados e exercícios
- **WHEN** o usuário acessa `/workouts/[id]`
- **THEN** o sistema exibe os dados básicos do treino, seguidos pela lista detalhada dos exercícios (incluindo nome, número de séries, repetições, tempo de descanso e carga, conforme aplicável)

### Requirement: Opção de iniciar o treino
A tela de visualização SHALL possuir uma ação para permitir ao usuário iniciar a execução do treino atual.

#### Scenario: Botão de iniciar treino
- **WHEN** o usuário clica no botão "Iniciar Treino"
- **THEN** o sistema executa o redirecionamento ou lógica responsável pela interface de execução do treino (a definir/integrar com as rotas de execução existentes)
