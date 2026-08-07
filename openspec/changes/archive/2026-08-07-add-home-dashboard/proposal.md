## Why

O aplicativo precisa de uma tela principal (Home/Dashboard) que seja apresentada ao usuário logo após o login. Esta tela é essencial para engajar o usuário, mostrando o progresso semanal e direcionando-o para o próximo treino da sequência.

## What Changes

- Criação da página Home (Dashboard) no frontend web, mesclando o design dos mockups mobile e desktop.
- Substituição dos ícones de notificação e perfil por um botão de "Sair" para logout.
- Criação de uma nova rota de API `/api/dashboard` no backend para fornecer os dados consolidados, exigindo autenticação obrigatória via token JWT para identificação do usuário.
- Modificação no schema do banco de dados (Prisma) para adicionar suporte a `tags` nos treinos, permitindo a exibição das badges no frontend (ex: "PEITO", "TRÍCEPS").
- Lógica de cálculo do próximo treino baseada no último `WorkoutHistory` realizado.

## Capabilities

### New Capabilities
- `home-dashboard`: Exibição do progresso semanal, determinação do próximo treino da sequência (Treino do Dia) e apresentação do histórico consolidado desse treino (vezes realizado, última data, última duração).

### Modified Capabilities

- `workout-management`: Alteração para incluir o campo de tags.

## Impact

- **Frontend:** Nova rota `/dashboard` e novos componentes de interface (calendário semanal, card de treino).
- **Backend:** Novo módulo `dashboard` e endpoint respectivo com a lógica de agregação.
- **Banco de Dados:** Nova migração no Prisma para adicionar o array de strings `tags` no modelo `Workout`.
- **Experiência do Usuário:** O login agora redirecionará de fato para a Home preenchida, não mais para uma página em branco.
