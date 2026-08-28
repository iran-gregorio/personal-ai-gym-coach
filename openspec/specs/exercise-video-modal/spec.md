## ADDED Requirements

### Requirement: Modal de Vídeo do Exercício
O sistema DEVE permitir a inserção e exibição de um link de vídeo do YouTube associado a um exercício do treino, permitindo a visualização in-app (modal).

#### Scenario: Visualização do vídeo de execução
- **WHEN** o usuário toca no botão "Ver Execução" de um exercício que possui link no treino
- **THEN** o sistema abre um modal sobreposto com o player incorporado (`iframe`) do vídeo.

#### Scenario: Prevenção de links inválidos (Manual)
- **WHEN** o usuário tenta cadastrar/editar um exercício inserindo uma URL no campo de vídeo
- **THEN** o sistema DEVE validar se é uma URL válida do YouTube e salvá-la; caso contrário, deve retornar erro.

#### Scenario: Ocultação do botão sem vídeo
- **WHEN** um exercício possui o campo `videoUrl` nulo ou vazio
- **THEN** o sistema NÃO DEVE exibir o botão ou opção de "Ver Execução" para esse exercício específico na interface.
