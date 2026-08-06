## 1. Configuração de Banco Local e Dependências

- [x] 1.1 Criar o arquivo `docker-compose.yml` na raiz (ou dentro de `apps/backend`) configurando a imagem do `postgres` (última versão) com as variáveis de ambiente necessárias e porta exposta.
- [x] 1.2 Instalar dependências no `apps/backend`: `prisma`, `@prisma/client`, `bcrypt`, `jsonwebtoken`, `zod` e as definições de tipo respectivas (`@types/bcrypt`, `@types/jsonwebtoken`).
- [x] 1.3 Inicializar o prisma no `apps/backend` (`npx prisma init`), que deve gerar a pasta `prisma` e o arquivo `.env`.

## 2. Modelagem do Banco e Migrations

- [x] 2.1 Adicionar a entidade `User` no arquivo `schema.prisma` com os campos `id` (String/UUID), `name` (String), `email` (String, único), `password` (String), `createdAt` e `updatedAt`.
- [x] 2.2 Gerar e aplicar a migration inicial no banco local (rodando no Docker) via `npx prisma migrate dev --name init`.

## 3. Implementação da Autenticação

- [x] 3.1 Criar a validação do payload de login usando `zod` (validando `email` e `password`).
- [x] 3.2 Criar um novo controlador/serviço para autenticação, implementando a lógica de busca do usuário pelo e-mail e comparação da senha com o `bcrypt`.
- [x] 3.3 Adicionar a geração do token JWT contendo o ID do usuário (com validade de `14d`).
- [x] 3.4 Configurar e exportar o endpoint de login (`POST /api/auth/login`) no Express.

## 4. Teste Local

- [x] 4.1 Inserir um usuário mock diretamente no banco ou através de um seed/script temporário, para testar se o login retorna 200 OK com o JWT ao fornecer a senha correta e 401 Unauthorized com senha incorreta.
