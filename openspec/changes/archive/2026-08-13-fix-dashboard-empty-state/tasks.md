## 1. Backend

- [x] 1.1 Atualizar o serviço do Dashboard (`dashboard.service.ts` ou equivalente) para verificar a existência de treinos do usuário antes de calcular o próximo treino.
- [x] 1.2 Retornar um payload vazio/padrão válido caso não existam treinos, evitando erros internos.
- [x] 1.3 Adicionar testes unitários garantindo que o serviço do Dashboard retorne corretamente o estado vazio para usuários sem treinos.

## 2. Frontend

- [x] 2.1 Criar ou utilizar um componente de Empty State (Estado Vazio) visualmente amigável para a tela do Dashboard.
- [x] 2.2 Atualizar o componente da página inicial (`home-dashboard`) para verificar se o payload de treinos/próximo treino está vazio e, em caso positivo, renderizar o componente de Empty State em vez de falhar ao acessar propriedades.
- [x] 2.3 Garantir que não haja quebras de interface caso dados adjacentes do dashboard dependam da existência de treinos.
