## ADDED Requirements

### Requirement: Padrão Vertical Slices
O sistema DEVE seguir o padrão de arquitetura *Vertical Slices* para todas as funcionalidades do backend. O código relacionado a um domínio específico DEVE ser encapsulado em um módulo dentro do diretório `apps/backend/src/modules/`.

#### Scenario: Criação de uma nova funcionalidade
- **WHEN** um desenvolvedor cria uma nova funcionalidade no backend (ex: `auth`, `users`)
- **THEN** o código DEVE ser organizado de forma que o Controller, Service, Schema e Routes do domínio fiquem dentro da pasta `src/modules/<funcionalidade>`.

### Requirement: Responsabilidades do Controller e Service
O sistema DEVE separar estritamente a camada de transporte (HTTP) da lógica de negócios. O *Controller* DEVE lidar exclusivamente com os objetos de requisição e resposta do Express, além da validação estrutural (Zod). O *Service* DEVE executar as regras de negócio e o acesso ao banco de dados via Prisma, sem conhecimento sobre a infraestrutura HTTP.

#### Scenario: Fluxo de uma requisição HTTP
- **WHEN** uma requisição da API atinge o *Controller*
- **THEN** o *Controller* deve realizar a validação, chamar o *Service* adequado passando apenas dados puros (DTOs), e em seguida formatar o retorno do *Service* (ou tratar as exceções) para enviar a resposta HTTP final.
