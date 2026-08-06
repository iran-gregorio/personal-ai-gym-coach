## Context

Atualmente, o projeto é um monorepo e o backend (Node.js com Express e TypeScript) ainda não possui uma camada de persistência. Para dar suporte à criação de usuários e futura orquestração com a API do Google Gemini, precisamos introduzir um banco de dados relacional e um mecanismo de autenticação seguro. A escolha é o PostgreSQL (que rodará no Supabase em produção, mas via Docker em desenvolvimento) gerenciado pelo Prisma ORM.

## Goals / Non-Goals

**Goals:**
- Configurar e rodar um contêiner Docker com PostgreSQL localmente.
- Configurar o Prisma ORM e criar a migração inicial com o schema da entidade `User`.
- Implementar um endpoint seguro de login (`POST /api/auth/login`) usando `bcrypt` e retornando um JWT (expirando em 14 dias).

**Non-Goals:**
- Implementação de OAuth (Google, Apple, etc.) neste momento.
- Endpoint de cadastro (será contemplado em outra feature ou num fluxo separado, embora o banco já suporte usuários).
- Recuperação de senha, envio de e-mails, etc.

## Decisions

- **Banco de Dados**: PostgreSQL.
  - *Rationale*: Mais robusto que o MySQL, nativamente suportado pelo Supabase em produção, garantindo paridade entre desenvolvimento e produção.
- **ORM**: Prisma.
  - *Rationale*: Excelente DX (Developer Experience) com TypeScript. A geração automática de tipos garante segurança de compilação sem precisar escrever interfaces manualmente.
- **Ambiente de Desenvolvimento**: Docker Compose.
  - *Rationale*: Mantém o ambiente local limpo e facilmente reprodutível para novos membros da equipe.
- **Autenticação e Senhas**: JWT e `bcrypt`.
  - *Rationale*: Padrões de mercado. JWT é stateless e ideal para APIs REST. `bcrypt` é seguro para armazenar senhas com um bom fator de custo (rounds). A expiração de 14 dias foi uma decisão da área de produto/segurança para não deslogar o usuário de dispositivos móveis com frequência excessiva.

## Risks / Trade-offs

- **Risco**: Chaves do JWT ou strings do banco hardcoded e expostas no código.
  - *Mitigação*: Uso estrito de variáveis de ambiente (`.env`) validadas pelo `zod` ou outro validador, e não comitar o arquivo `.env`.
- **Risco**: Configuração do Docker em máquinas diferentes (Windows vs Mac).
  - *Mitigação*: Usar imagens oficiais e mapeamento de volumes simples.

## Migration Plan

- N/A para banco em produção, pois será a primeira implantação do schema.

## Open Questions

- Precisamos de um endpoint de registro (`POST /register`) agora, ou usaremos seeds para criar o primeiro usuário e testar o login?
