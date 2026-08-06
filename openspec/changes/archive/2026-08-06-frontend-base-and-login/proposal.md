## Why

O projeto precisa estabelecer a fundação do seu aplicativo web (frontend) em Next.js para permitir que os usuários interajam com a plataforma. Atualmente, o backend já está implementado (incluindo rotas de autenticação), mas não há interface gráfica. A criação da base do frontend e da tela de login, respeitando o Design System proposto (modo escuro com tema industrial e glassmorphism) e garantindo responsividade (desktop e mobile), é o primeiro passo para o lançamento da plataforma.

## What Changes

- Configuração do Tailwind CSS no projeto Next.js com as variáveis de cor, fontes e espaçamentos definidas no Design System (Montserrat, Inter, JetBrains Mono, cores como `surface-container-lowest` e `primary-fixed`).
- Criação dos estilos globais base, incluindo configurações de fundo e comportamentos de autofill dos inputs para manter a coerência do modo escuro.
- Implementação da tela de Login (`/login`) de forma responsiva, utilizando os mockups HTML `login_desktop_v2` e `login_mobile_v2` como referência.
- Integração da tela de Login com a rota de backend `POST /api/auth/login`.
- Criação de tratamento amigável de erros (ex: credenciais inválidas) sem recarregar a página.
- Adição da variável de ambiente `NEXT_PUBLIC_API_URL` para gerenciar a URL base do backend.

## Capabilities

### New Capabilities
- `frontend-login`: Capacidade do usuário de acessar o sistema inserindo seu e-mail e senha através de uma interface responsiva e aderente ao Design System.

### Modified Capabilities

- Nenhuma alteração de requisitos de backend (apenas consumo da API existente).

## Impact

- **Frontend (`apps/frontend`)**: Inicialização da interface, configuração estrutural do Tailwind e adição da primeira rota principal (`/login`).
- **DevOps**: Necessidade de adicionar a variável de ambiente `NEXT_PUBLIC_API_URL` aos ambientes de desenvolvimento e produção (Vercel).
