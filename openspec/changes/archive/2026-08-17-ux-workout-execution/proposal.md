# UX Melhorias: Tela de Execução de Treino

## Problema
Durante a execução do treino, a barra de progresso atual fica localizada abaixo do cabeçalho e desaparece da tela (rola) à medida que o usuário desce a lista de exercícios. Isso remove a percepção contínua de progresso.
Além disso, o botão de "Finalizar Treino" é um botão flutuante (FAB) que ocupa espaço constante na interface, correndo o risco de cliques acidentais que encerram o treino prematuramente, sem nenhum aviso de confirmação.

## Solução
Implementar as seguintes melhorias na experiência de usuário (UX) da tela de execução de treinos:

1. **Barra de Progresso Fixa (Opção A):**
   - Integrar a barra de progresso no cabeçalho (header) fixo, renderizando-a como uma linha fina e minimalista na borda inferior do header.
   - Adicionar o texto indicador numérico (ex: `2/5`) no cabeçalho, ao lado do nome do treino ou do cronômetro.

2. **Botão de Finalizar Reposicionado:**
   - Remover o comportamento de botão flutuante.
   - Colocar o botão "Finalizar Treino" no final da lista de exercícios, indicando o fluxo natural de conclusão do treino.

3. **Confirmação de Finalização:**
   - Adicionar um modal (popup) de confirmação que é exibido ao clicar no botão de finalizar.
   - O modal deve perguntar "Deseja realmente finalizar este treino?" com as opções "Cancelar" e "Sim, finalizar".

## Escopo
- `apps/frontend/src/app/dashboard/execute/[workoutId]/page.tsx`

## Métricas de Sucesso
- A barra de progresso está sempre visível na borda inferior do header.
- O botão de finalizar apenas aparece ao chegar no final do conteúdo.
- Não ocorrem finalizações acidentais devido à necessidade de confirmação via modal.
