## Why

Atualmente, o controlador de autenticação acumula múltiplas responsabilidades: validação de dados, regras de negócio (bcrypt/JWT) e comunicação com o banco de dados (Prisma). Isso fere o princípio da responsabilidade única (SRP) do SOLID, dificultando testes isolados e a escalabilidade do código. Adotar a arquitetura *Vertical Slice* (organização por domínios/features) agora criará uma base robusta e de fácil manutenção para o crescimento do projeto.

## What Changes

- Refatoração da estrutura de diretórios do backend, abandonando a organização por "tipo técnico" (`controllers`, `routes`) em favor de domínios funcionais (`modules/`).
- Criação do módulo `auth` (`apps/backend/src/modules/auth/`) que centralizará rotas, controladores, serviços e schemas de validação.
- Separação da lógica de negócio (geração de JWT e hash) em uma camada de serviço (Service).
- Inclusão da obrigatoriedade de criação de testes unitários para a nova arquitetura (visando o Service e Controller).
- O comportamento e as respostas da API não mudarão; as alterações são puramente arquiteturais e estruturais.

## Capabilities

### New Capabilities
- `architecture-standards`: Especifica os padrões arquiteturais de *Vertical Slices* e responsabilidades (Controller, Service, Repository) que devem ser seguidos pelo backend.

### Modified Capabilities
- `user-auth`: Não haverá mudança de requisitos para o usuário, apenas reorganização de código. Nenhuma alteração de requisitos funcionais ou comportamentais.

## Impact

- **Código:** Os arquivos atuais `src/controllers/auth.ts` e `src/routes/auth.ts` serão removidos e substituídos por `src/modules/auth/auth.controller.ts`, `src/modules/auth/auth.service.ts`, `src/modules/auth/auth.routes.ts` e `src/modules/auth/auth.schema.ts`.
- **APIs e Sistemas:** O endpoint final (`POST /api/auth/login`) continua o mesmo. O Prisma client continuará sendo utilizado da mesma forma.
