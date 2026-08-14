## Context

Atualmente, o usuário possui um Dashboard onde pode visualizar estatísticas rápidas e seus treinos mais recentes. Existe um botão "Ver outros treinos" que atualmente serve como um placeholder. A necessidade é criar a tela de listagem completa de treinos e conectar o botão a ela, permitindo que o usuário explore todos os seus treinos (histórico e opções).

## Goals / Non-Goals

**Goals:**
- Criar a página `/workouts` no frontend (Next.js App Router).
- Construir a interface utilizando componentes e padrões visuais (Tailwind CSS) já estabelecidos no projeto.
- Conectar o botão "Ver outros treinos" do dashboard à nova rota.
- Integrar a listagem com o endpoint de buscar treinos (`GET /workouts`) do backend.

**Non-Goals:**
- Não iremos refatorar a estrutura do banco de dados de treinos nesta task.
- Não iremos construir a tela de detalhes ou a execução do treino (já cobertas em outros módulos ou tasks).

## Decisions

- **Abordagem da UI:** A nova tela (`apps/frontend/src/app/(dashboard)/workouts/page.tsx`) manterá o Header (com botão de voltar) e utilizará componentes de `Card` para cada treino, reaproveitando os padrões visuais aplicados no Dashboard.
- **Comunicação Cliente-Servidor:** O componente da página pode inicialmente ser um componente cliente ou buscar dados utilizando server components, conforme o padrão de auth já adotado no projeto, mas será feito fetch via API do backend usando a infraestrutura existente de `api.ts` ou funções específicas se já disponíveis.

## Risks / Trade-offs

- **Falta de Paginação:** Caso o endpoint retorne um array muito grande, pode haver lentidão no client. 
  - Mitigação: Para o MVP e o momento atual do app, carregar todos os treinos de uma vez é aceitável, mas deixaremos a UI preparada para futuras implementações de paginação.
