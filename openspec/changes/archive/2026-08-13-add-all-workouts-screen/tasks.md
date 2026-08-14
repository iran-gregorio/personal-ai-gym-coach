## 1. Backend / API Verification

- [x] 1.1 Verificar se o endpoint `GET /workouts` (ou equivalente) do backend retorna a lista de todos os treinos do usuário logado e se atende às necessidades da tela (dados suficientes como nome, descrição, status).
- [x] 1.2 Atualizar as tipagens do frontend para refletir a resposta correta da API de listagem de treinos, caso ainda não existam.

## 2. Frontend - Nova Página de Treinos

- [x] 2.1 Criar a estrutura da página em `apps/frontend/src/app/(dashboard)/workouts/page.tsx`, utilizando o Header padrão (ex: título "Meus Treinos" e botão de voltar para `/`).
- [x] 2.2 Implementar o fetch dos treinos a partir do frontend (preservando o padrão de autenticação do app para passar o token JWT ao backend).
- [x] 2.3 Implementar a listagem dos treinos iterando sobre os dados retornados e renderizando o componente de Card de Treino.
- [x] 2.4 Implementar o estado de lista vazia para quando o usuário não tiver treinos.

## 3. Frontend - Integração com Dashboard

- [x] 3.1 Localizar o botão "Ver outros treinos" no componente do Dashboard.
- [x] 3.2 Modificar a ação do botão para navegar para `/workouts` (utilizando `next/link` ou `useRouter`).
- [x] 3.3 Validar visualmente e realizar teste de fluxo end-to-end (Navegar do Dashboard para `/workouts` e testar a exibição da lista).
