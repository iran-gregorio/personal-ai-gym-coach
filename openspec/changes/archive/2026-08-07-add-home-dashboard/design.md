## Context

O aplicativo requer uma tela principal (Dashboard) exibida após o login. Atualmente, o frontend possui uma tela de login que redireciona para a home, mas o dashboard em si não está implementado, nem no frontend nem no backend.

## Goals / Non-Goals

**Goals:**
- Prover a interface da Home (Dashboard) responsiva baseada nos mockups `home_desktop_v2` e `home_mobile_v2`.
- Retornar via API os dados consolidados do histórico semanal do usuário e identificar qual o próximo treino a ser executado.
- Exibir de forma coerente a tela vazia (empty state) e o botão de Sair.

**Non-Goals:**
- Não iremos implementar as funcionalidades dos ícones de notificações, configurações ou gerenciamento de perfil de usuário neste momento.
- Não iremos implementar a tela de execução do treino, apenas o botão de iniciar/status de concluído no Dashboard.

## Decisions

- **Cálculo da Semana Baseado na Data do Cliente:** Para evitar falhas devido ao fuso horário (ex: Brasil vs UTC do servidor), o frontend enviará a data atual do usuário via query parameter `clientDate` ou no corpo da requisição. O backend usará isso para calcular os limites temporais da semana atual (Segunda a Domingo) em relação ao usuário.
- **Adição de campo `tags` no Prisma:** Para exibir os badges presentes no mockup (ex: "PEITO", "TRÍCEPS"), adicionaremos a coluna `tags String[] @default([])` na tabela `Workout`. Essa abordagem evita a complexidade de criar uma tabela N:N apenas para isso neste momento inicial.
- **Lógica de Seleção do Treino do Dia:**
  1. O sistema busca o último `WorkoutHistory` válido.
  2. Se a data de execução coincidir com hoje (baseada no `clientDate`), o treino do dia é o treino desse histórico, marcado como concluído (`isCompletedToday = true`).
  3. Caso contrário, o sistema localiza o próximo treino da sequência verificando a coluna `order`. Se for o treino de maior ordem, recomeça do de menor ordem.
- **Autenticação e Segurança (Backend e Frontend):** A nova rota `/api/dashboard` deverá ser obrigatoriamente protegida pelo middleware de autenticação existente. O cliente fará a requisição passando o token JWT via cabeçalho (Bearer), e o backend usará esse token para identificar unicamente o usuário que está solicitando os dados (evitando parâmetros como `userId` na URL). No frontend, o botão "Sair" removerá o token do `localStorage` e utilizará o router do Next.js para redirecionar à tela inicial (`/login`).

## Risks / Trade-offs

- **Risk:** Usuário sem treinos cadastrados gerará falhas de lógica.
  → **Mitigation:** O backend deve ser defensivo e retornar `workoutOfDay: null`. O frontend exibirá um estado vazio ("Nenhum treino cadastrado") com o botão de início inativo.
- **Risk:** Exclusão de treinos passados invalidando a sequência (pois o `workoutId` no `WorkoutHistory` fica `null`).
  → **Mitigation:** Se o último histórico tiver `workoutId` nulo, o sistema adotará o comportamento seguro de recomeçar a sequência, pegando o treino de menor `order`.
