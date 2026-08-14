## Context

Atualmente, a tela inicial (dashboard) do Personal AI Gym Coach tenta renderizar informações do próximo treino ou do progresso semanal. No entanto, quando um novo usuário se cadastra e ainda não possui nenhum treino (`Workout`) assinalado a ele, a aplicação, seja no cálculo do backend para retornar o próximo treino ou no frontend ao tentar acessar propriedades de arrays/objetos vazios, gera um erro. Isso impede o carregamento da tela inicial.

## Goals / Non-Goals

**Goals:**
- Garantir que o dashboard carregue sem erros para usuários recém-cadastrados ou sem treinos.
- Exibir uma mensagem ou componente de "empty state" na interface de usuário indicando a ausência de treinos, convidando-o a criar um ou aguardar a atribuição de um treino pelo AI Coach.
- Atualizar a API do dashboard (`/api/dashboard` ou similar) para retornar explicitamente uma estrutura válida mesmo quando não houver treinos ativos/cadastrados (ex: `null`, ou array vazio).

**Non-Goals:**
- Não iremos refatorar a lógica de cálculo do próximo treino para usuários que já possuem treinos, apenas tratar o cenário de inexistência.
- Não iremos desenvolver a funcionalidade de "criar o primeiro treino" nesta issue; o foco é apenas lidar com a visualização do estado vazio do dashboard.

## Decisions

- **Decisão 1: Tratamento no Backend (Service)**
  - **O quê:** Modificar o serviço que calcula o progresso semanal e o treino do dia para verificar primeiro se o usuário possui treinos ativos. Caso a contagem ou busca inicial por treinos retorne vazio, o serviço deve retornar imediatamente um objeto padrão com dados zerados/nulos (`{ nextWorkout: null, weeklyProgress: [] }` ou similar) e evitar tentar acessar propriedades indefinidas.
  - **Alternativa considerada:** Deixar o erro estourar e tratar apenas no catch do frontend. *Rejeitada* pois o backend deve retornar dados previsíveis (HTTP 200 com payload vazio) em vez de HTTP 500 para regras de negócio normais (ausência de dados).

- **Decisão 2: Estado Vazio no Frontend**
  - **O quê:** No componente React que renderiza o dashboard, verificar se o retorno do próximo treino é nulo ou vazio e renderizar um componente alternativo de *EmptyState* (ex: "Você ainda não possui treinos cadastrados").
  - **Alternativa considerada:** Redirecionar o usuário para outra tela. *Rejeitada* pois o dashboard é o ponto de entrada correto e deve suportar o estado vazio.

## Risks / Trade-offs

- **[Risco] Múltiplos locais tentando ler os dados do treino no frontend e quebrando:** → **Mitigação:** Certificar-se de realizar a verificação condicional na raiz da página ou no componente de layout do dashboard (ex: usando *optional chaining* e *early return*) para que os componentes filhos que dependem fortemente do modelo do treino nem sejam renderizados.
