## ADDED Requirements

### Requirement: Inicialização do Monorepo
O sistema MUST conter um arquivo de workspace (`package.json` base) que gerencia as sub-pastas `/apps/frontend` e `/apps/backend`.

#### Scenario: Instalação das dependências
- **WHEN** o desenvolvedor executa o comando de instalação na raiz
- **THEN** as dependências de todos os workspaces devem ser instaladas com sucesso

### Requirement: Inicialização do Frontend
O sistema MUST possuir um aplicativo Next.js rodando na porta padrão (ou 3000) contendo uma tela de "Hello World".

#### Scenario: Acesso inicial ao frontend
- **WHEN** o usuário acessa a raiz (`/`) da aplicação frontend no navegador
- **THEN** a página deve renderizar "Hello World" sem erros

### Requirement: Inicialização do Backend
O sistema MUST possuir um servidor Node.js com Express e TypeScript rodando (ex: porta 3001) respondendo a uma rota de saúde (healthcheck).

#### Scenario: Chamada de API inicial
- **WHEN** uma requisição GET é feita para a rota `/` ou `/api/health`
- **THEN** o servidor deve retornar uma resposta com status 200 contendo uma mensagem de sucesso ("Hello World").
