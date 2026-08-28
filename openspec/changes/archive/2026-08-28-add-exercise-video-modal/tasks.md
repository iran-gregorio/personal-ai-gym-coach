## 1. Backend e Banco de Dados

- [x] 1.1 Atualizar `schema.prisma` adicionando `videoUrl String?` ao model `WorkoutExercise`.
- [x] 1.2 Gerar e rodar a migration correspondente no banco de dados Supabase (`npx prisma migrate dev`).
- [x] 1.3 Atualizar os tipos/DTOs no backend para aceitarem e retornarem o campo `videoUrl`.
- [x] 1.4 Adicionar/atualizar testes unitários nas rotas que manipulam os exercícios para validar a gravação do `videoUrl` (backend atualmente não possui CRUD de treinos, logo sem impacto).

## 2. Frontend App

- [x] 2.1 Criar o componente `ExerciseVideoModal` que recebe uma URL e renderiza o `<iframe>` do YouTube embarcado.
- [x] 2.2 Modificar a interface de listagem do treino (Card do exercício) para exibir o botão "Ver Execução" quando houver `videoUrl`.
- [x] 2.3 Ligar o estado de visibilidade do modal ao botão "Ver Execução".
- [x] 2.4 Testar o comportamento responsivo do modal no layout mobile do frontend.
