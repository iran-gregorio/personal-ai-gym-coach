## Why

Muitas vezes o aluno possui dúvidas sobre a correta execução biomecânica de um exercício ao ver seu nome no treino, o que pode levar a execuções ruins e risco de lesão. Adicionar uma referência visual (vídeo) de curta duração diretamente na lista de exercícios ajuda o usuário a relembrar a técnica sem sair do aplicativo ou realizar pesquisas manuais em outras abas.

## What Changes

- Adição de um campo para armazenar o link do vídeo de execução (`videoUrl`) para cada exercício de um treino (`WorkoutExercise`).
- Modificação na interface de treino no frontend para exibir um botão "Ver Execução" ao lado dos exercícios que possuírem link.
- Inclusão de um modal (popup) no frontend que incorpora (`<iframe>`) o vídeo do YouTube vinculado ao exercício de forma otimizada para dispositivos móveis, preservando o espaço em tela.
- **NOTA:** A inserção do link no banco de dados, por enquanto, será feita manualmente (sem automação/IA).

## Capabilities

### New Capabilities
- `exercise-video-modal`: Capacidade do usuário visualizar um vídeo explicativo de um exercício no meio de seu treino por meio de um modal sobreposto que embute o player do YouTube.

### Modified Capabilities
- Nenhuma capacidade existente tem seus requisitos fundamentais alterados (apenas extensão do modelo de dados do treino para suportar a URL).

## Impact

- **Banco de Dados / Prisma:** Alteração no modelo `WorkoutExercise` adicionando o campo opcional `videoUrl`.
- **Backend API:** Ajuste nos endpoints de criação/listagem de treinos para trafegarem o campo `videoUrl`. Necessita testes unitários.
- **Frontend App:** Criação de um novo componente de Modal para vídeo, alteração no card do exercício para incluir o botão de acionamento.
