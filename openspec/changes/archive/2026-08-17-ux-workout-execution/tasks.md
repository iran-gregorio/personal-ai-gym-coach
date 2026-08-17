# Tasks: UX Melhorias na Execução de Treino

## 1. Barra de Progresso Fixa
- [x] Mover a lógica de progresso (`completedCount`, `totalCount`, `progressPercent`) para antes do render do Header.
- [x] Adicionar o texto indicador numérico do progresso no cabeçalho fixo, ao lado do timer ou título.
- [x] Remover a barra de progresso do escopo da tag `<main>`.
- [x] Adicionar uma `div` de altura fina (ex: `h-1`) com largura percentual dinâmica na base (`bottom-0`) do `<header>`.

## 2. Reposicionar Botão Finalizar
- [x] Remover as classes `fixed bottom-0 pointer-events-none bg-gradient-to-t` do container do botão de finalizar.
- [x] Mover o contêiner do botão para dentro ou final da tag `<main>`, logo após a lista de exercícios.

## 3. Modal de Confirmação
- [x] Criar o estado `isConfirmModalOpen` com valor inicial `false`.
- [x] Criar o componente visual do modal de confirmação no fim do render da página, atrelado à condição `isConfirmModalOpen`.
- [x] Alterar o botão "Finalizar Treino" original para `onClick={() => setIsConfirmModalOpen(true)}`.
- [x] Vincular a função existente `handleFinishWorkout` ao botão de confirmação do modal.
