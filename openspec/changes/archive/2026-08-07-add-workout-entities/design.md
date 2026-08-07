## Context

O aplicativo *Personal AI Gym Coach* atualmente conta apenas com o modelo de `User` no banco de dados. Para se tornar um verdadeiro aplicativo de acompanhamento de exercícios, precisamos implementar a gestão de Treinos (templates) e o Histórico de Execução (log de atividades). O backend utiliza Prisma ORM integrado ao PostgreSQL (Supabase).

## Goals / Non-Goals

**Goals:**
- Projetar a estrutura de dados (schema do Prisma) necessária para criar treinos com múltiplos exercícios.
- Suportar valores flexíveis de strings para as séries (`sets`) e repetições (`reps`) dos exercícios.
- Registrar um histórico isolado e resiliente (snapshot) da execução dos treinos.
- Criar dados iniciais de *seed* (banco de dados falso de exemplo) para facilitar testes locais e desenvolvimento da interface e de endpoints da API.

**Non-Goals:**
- Não iremos construir um catálogo relacional centralizado de exercícios disponíveis. Cada exercício está diretamente embutido no treino.
- Não iremos construir a interface do usuário ou os controladores (controllers/routers) do backend nesta fase. Focaremos apenas na modelagem dos dados e script de seed.

## Decisions

- **Criação de Tabelas de Snapshot para o Histórico:** Decidimos não usar um campo JSON para gravar o histórico e também não relacionar diretamente o histórico com o exercício template de forma que um `CASCADE DELETE` o afete. No lugar, criaremos o modelo `WorkoutHistory` e `WorkoutHistoryExercise`, que recebem relações `nullable` com os templates originais e gravam o nome (`nameSnapshot`) no momento da execução para garantir estabilidade dos dados.
- **Armazenamento de Séries e Repetições:** Foram definidos como `String` no banco de dados, em vez de `Int`, para acomodar casos onde o usuário dita estruturas não-homogêneas (ex: "8-10-12"). O tempo de descanso será `Int` (segundos).

## Risks / Trade-offs

- **[Risk] Manutenção dos nomes dos exercícios no histórico:** Como cada treino tem seu próprio exercício com texto livre, é difícil agregar todos os pesos levantados num "Supino" se o usuário errar a ortografia. → **Mitigation:** Para esse escopo inicial, a prioridade é simplicidade e acoplamento frouxo. No futuro, a IA poderá ajudar a processar e classificar o texto inserido antes de mostrá-lo em gráficos.
- **[Risk] Crescimento das tabelas de histórico:** Tabelas relacionais crescem rápido para cada exercício feito. → **Mitigation:** Uso de IDs indexados (`UUID`) adequadamente referenciados. O PostgreSQL gerencia isso com altíssima performance.
