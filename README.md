# Personal AI Gym Coach

Bem-vindo ao repositório do **Personal AI Gym Coach**! Este projeto é um aplicativo full-stack projetado para ser seu assistente pessoal de treinos, construído com foco em escalabilidade, uso otimizado de recursos gratuitos (Free Tier) e preparado para integração futura com a Inteligência Artificial do Google Gemini.

## Arquitetura do Projeto

O projeto adota uma estrutura de **Monorepo** (usando workspaces do NPM), dividindo claramente as responsabilidades:

- **Frontend (`/apps/frontend`)**: Construído com **Next.js** e **Tailwind CSS**. Focado em performance e facilidade de deploy na **Vercel**.
- **Backend (`/apps/backend`)**: Construído com **Node.js, Express e TypeScript**. Projetado para rodar no **Google Cloud Run**, servindo como orquestrador para as futuras chamadas de IA.
- **Banco de Dados**: Utiliza **PostgreSQL** hospedado no **Supabase**, com comunicação e tipagem segura via **Prisma ORM**.

## Pré-requisitos

- Node.js (versão 18+ recomendada)
- NPM (ou Yarn/PNPM)

## Como rodar o projeto localmente

Devido à arquitetura de monorepo, configuramos um script facilitador na raiz do projeto que inicia ambos os servidores (frontend e backend) simultaneamente utilizando o `concurrently`.

1. Instale as dependências na raiz do projeto:
   ```bash
   npm install
   ```

2. Inicie o ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```

3. O que acontece agora?
   - O **Frontend** estará disponível em: [http://localhost:3000](http://localhost:3000)
   - O **Backend** estará rodando e respondendo ao healthcheck em: [http://localhost:3001/api/health](http://localhost:3001/api/health)

## Integração Futura (Gemini)

O backend em Express está isolado propositalmente para atuar como o maestro das interações com o Google Gemini. Futuramente, ele será responsável por compilar o histórico de treinos e enviar um contexto rico para a IA gerar novos planos personalizados.