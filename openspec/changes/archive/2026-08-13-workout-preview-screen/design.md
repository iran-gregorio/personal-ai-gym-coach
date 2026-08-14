## Context

Ao acessar a lista de treinos, o usuário pode querer conferir os detalhes e exercícios de um treino antes de decidir iniciá-lo. Atualmente, esse passo intermediário de revisão (preview) será criado para evitar que o treino inicie automaticamente, proporcionando maior controle ao usuário.

## Goals / Non-Goals

**Goals:**
- Prover uma tela em `/workouts/[id]` contendo a visualização completa do treino e de seus exercícios.
- Prover um botão "Iniciar Treino" nessa nova tela.
- Integrar a navegação da listagem (`/workouts`) para a nova tela.

**Non-Goals:**
- Não iremos alterar a tela de execução do treino em si nesta task.

## Decisions

- **Uso de Rota Dinâmica no Next.js**: Utilizar `apps/frontend/src/app/(dashboard)/workouts/[id]/page.tsx` para garantir que cada treino tenha uma URL única de visualização.
- **Endpoint Backend**: A criação (ou adaptação, caso exista) da rota `GET /api/workouts/:id` e seu respectivo controller/service no backend. A resposta do Prisma deve incluir a relação `exercises` (ex: `include: { exercises: true }`).
- **Testes**: Criação de testes unitários para as rotas e services, utilizando Jest conforme a stack.

## Risks / Trade-offs

- **Carga de Dados Adicional** → A busca de exercícios junto com o treino pode aumentar o payload do backend. Como a quantidade de exercícios por treino é normalmente pequena (menos de 20), isso não representa risco significativo no momento e otimiza a latência evitando um endpoint separado para buscar exercícios do treino.
