## Context

O backend atualmente concentra lógicas de validação (Zod), regras de negócio (bcrypt/JWT) e acesso ao banco de dados (Prisma) em uma única camada de controle HTTP (`src/controllers/auth.ts`). Com a evolução do aplicativo, especialmente para lidar com as integrações complexas futuras da API do Google Gemini, a manutenção e a possibilidade de se realizar testes de unidade ficariam comprometidas. Iremos transicionar de uma estrutura plana para uma organização orientada a funcionalidades (Vertical Slice).

## Goals / Non-Goals

**Goals:**
- Criar a estrutura base de `modules` na aplicação Node.js.
- Isolar a lógica de autenticação atual em `src/modules/auth/`.
- Garantir a separação entre Responsabilidades de Transporte HTTP (Controller), Lógica de Negócio (Service) e Validação de Dados (Schema/Zod).

**Non-Goals:**
- Não adicionaremos Injeção de Dependências (DI) complexas ou containers neste momento (como Inversify ou Awilix), para manter o projeto leve e simples.
- O acesso a dados continuará sendo feito chamando o `prisma` client diretamente a partir da camada de `Service` (não é necessário criar classes de Repository abstratas ainda).

## Decisions

1. **Adotar Vertical Slices (Agrupamento por Módulo)**
   - **Por quê?** Módulos concentrados como `modules/auth` são mais fáceis de navegar. Quando a autenticação precisar mudar, o desenvolvedor encontra todas as peças (routes, controller, service, validação) na mesma pasta, sem precisar pular entre grandes diretórios monolíticos.

2. **Separação de Papéis dentro do Módulo**
   - **`auth.routes.ts`**: Registra as rotas e mapeia os métodos para os Controllers.
   - **`auth.controller.ts`**: Valida a requisição (Zod), chama o Service passando os dados puros (sem dependência do Express) e formata a resposta HTTP (status code, JSON).
   - **`auth.service.ts`**: Implementa as regras de negócio reais. Aqui vivem a geração do JWT e as chamadas do bcrypt, sem ter conhecimento de objetos `req` ou `res`.
   - **`auth.schema.ts`**: Concentra os validadores Zod para reutilização.

3. **Invocação Direta do Prisma no Service**
   - **Por quê?** O Prisma Client, com a geração de tipos automática, já resolve grande parte das abstrações que um repositório clássico de camada de dados traria. Abstraí-lo precocemente não traz valor significativo nesta fase do projeto.

## Risks / Trade-offs

- **Verboso para pequenas tarefas:** Criar uma nova funcionalidade agora requer a criação de 4 arquivos separados, o que pode parecer um *over-engineering* no começo.
- *Trade-off*: Os ganhos a médio prazo com a testabilidade facilitada da camada de serviço e a clareza mental do código justificam essa verbosidade inicial.
