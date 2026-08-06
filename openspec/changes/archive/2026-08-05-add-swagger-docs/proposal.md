## Why

Atualmente, a rota raiz (`/`) do backend retorna uma string estática "Hello World", o que não agrega valor e expõe uma rota desnecessária. Substituir esse comportamento por uma interface de documentação da API (Swagger UI) centraliza o acesso à documentação, facilitando o trabalho de integração do frontend (Next.js) com o backend e servindo como um catálogo vivo dos endpoints disponíveis.

## What Changes

- Remoção do endpoint `GET /` que retorna texto puro.
- Instalação e configuração do `swagger-ui-express` e `swagger-jsdoc` no backend.
- Criação de uma configuração base do Swagger que documenta as rotas existentes (ex: `/api/auth/login` e `/api/health`).
- Mapeamento da rota raiz (`/`) para renderizar a interface do Swagger UI.

## Capabilities

### New Capabilities
- `api-documentation`: Introdução de documentação interativa e padronizada (OpenAPI/Swagger) para os endpoints do backend.

### Modified Capabilities
Nenhuma.

## Impact

- **Código:** Modificação do `index.ts` para servir o Swagger na rota `/`. Adição de comentários JSDoc nos controllers para geração automática da documentação (ex: `auth.controller.ts`).
- **APIs e Sistemas:** O endpoint `/` deixará de ser um endpoint de teste e passará a servir a UI do Swagger. O frontend não será impactado diretamente, mas os desenvolvedores terão documentação interativa disponível.
