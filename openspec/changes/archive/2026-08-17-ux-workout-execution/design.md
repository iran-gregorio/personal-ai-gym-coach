# Design: UX Melhorias na Execução de Treino

## Arquitetura e Decisões

### Barra de Progresso Fina no Header
O header atual é fixo (`fixed top-0`). A barra de progresso será incluída dentro da tag `<header>`, posicionada absolutamente em sua base (`absolute bottom-0 left-0 w-full h-1.5` ou semelhante). A exibição numérica do progresso (ex: `2/5`) será colocada na `div` que contém o cronômetro, mantendo o design equilibrado.

### Reposicionamento do Botão de Finalizar
O contêiner do botão deixará de ser `fixed bottom-0` e passará a ser renderizado no final do conteúdo scrollável da página, mantendo uma pequena margem/padding inferior para respirar. Removeremos a cor de gradiente do fundo flutuante.

### Modal de Confirmação
Um novo estado será adicionado à página para controlar a visibilidade do modal:
```tsx
const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
```
O método `handleFinishWorkout` atual será acionado apenas no botão "Sim, finalizar" dentro do modal. O botão principal da página apenas chamará `setIsConfirmModalOpen(true)`.
O modal será renderizado sobre a tela toda, com um fundo escurecido (overlay `bg-black/50 backdrop-blur-sm z-[100]`) e centralizado na tela com as opções claras.
