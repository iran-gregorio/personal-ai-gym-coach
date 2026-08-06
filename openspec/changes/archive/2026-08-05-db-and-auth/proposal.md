## Why

Precisamos estabelecer a infraestrutura inicial de banco de dados e autenticação no backend. Ter essa fundação pronta (banco de dados conectado e um sistema de login funcional) é essencial para podermos escalar e adicionar funcionalidades futuras que necessitam de persistência de dados e controle de acesso, de modo que tudo estará seguro e escalável.

## What Changes

- Adição e configuração do Prisma ORM no backend (TypeScript).
- Adição de script via `docker-compose.yml` para levantar uma base local PostgreSQL.
- Criação do schema inicial contendo a entidade `User` (com id, name, email, password, createdAt, updatedAt).
- Criação de um endpoint de login que:
  - Busca o usuário pelo e-mail.
  - Verifica o hash da senha (bcrypt).
  - Retorna um token JWT assinado válido por 14 dias.

## Capabilities

### New Capabilities
- `user-auth`: Implementação da estrutura base de usuário, autenticação segura por e-mail e senha (hash) gerando um token JWT, bem como a conectividade com banco PostgreSQL usando Prisma.

### Modified Capabilities


## Impact

- **Backend (apps/backend)**: Instalação de dependências como `prisma`, `@prisma/client`, `bcrypt`, `jsonwebtoken` (e seus `@types`).
- Criação do arquivo de configuração de banco de dados via docker (`docker-compose.yml`).
- Atualização das rotas e controladores para o login.
