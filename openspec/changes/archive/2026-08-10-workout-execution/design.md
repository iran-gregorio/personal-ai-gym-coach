## Context

Atualmente os usuários podem criar e visualizar seus treinos, mas não há um fluxo de execução interativo. O banco de dados já suporta as entidades `WorkoutHistory` e `WorkoutHistoryExercise`, porém, não há endpoints nem fluxo de frontend para interagir com esses dados durante a execução. O estado da execução do treino precisa ser registrado diretamente no banco em tempo real.

## Goals / Non-Goals

**Goals:**
- Prover um módulo de backend `execution` robusto e aderente aos princípios SOLID para iniciar, atualizar e finalizar treinos.
- Garantir que a execução seja salva em tempo real no banco de dados.
- Criar a interface de frontend (página de execução) que interage fluidamente com o backend.

**Non-Goals:**
- Não iremos alterar a estrutura do banco de dados (schema do Prisma). 
- Não iremos salvar repetições individualmente por série (será salvo o status de concluído e o peso por exercício, de acordo com o schema atual).
- Não haverá suporte offline ou estado persistente puramente local (localStorage).

## Decisions

- **Salvar estado em tempo real no Banco de Dados (API)**: Em vez de salvar o progresso temporariamente em memória, a aplicação vai criar o `WorkoutHistory` assim que o treino iniciar (com `durationSeconds` inicialmente 0). Cada alteração de exercício fará um PATCH na API. 
  - *Rationale*: Atende ao requisito de manter tudo salvo via API e evita complexidade de sincronização de estado offline/online.
- **Rastreamento em Nível de Exercício**: A marcação de feito e peso são atrelados ao exercício.
  - *Rationale*: Mantém alinhamento com o schema existente sem exigir alterações estruturais.

## Risks / Trade-offs

- **Risco**: Treinos inacabados (abandonados). O usuário pode iniciar o treino, a API cria o `WorkoutHistory`, mas o usuário fecha a aba e nunca clica em "Finalizar Treino".
  - *Mitigation*: O sistema pode considerar treinos com `durationSeconds = 0` como abandonados e não impactar estatísticas, ou permitir retomar em vez de criar um novo.
