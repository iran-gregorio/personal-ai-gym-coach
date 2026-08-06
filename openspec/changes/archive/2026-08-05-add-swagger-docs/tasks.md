## 1. Instalação e Setup Base

- [x] 1.1 Instalar as dependências de produção: `npm install swagger-ui-express swagger-jsdoc` no projeto `backend`.
- [x] 1.2 Instalar os types de desenvolvimento: `npm install -D @types/swagger-ui-express @types/swagger-jsdoc` no projeto `backend`.
- [x] 1.3 Criar o arquivo `apps/backend/src/config/swagger.ts` com a configuração base do OpenAPI, configurando a leitura dos arquivos de rota para o `swagger-jsdoc`.

## 2. Configuração do Express (`index.ts`)

- [x] 2.1 Importar o Swagger no `index.ts`.
- [x] 2.2 Substituir a rota `app.get('/')` que retorna "Hello World" pela configuração do `swagger-ui-express` para servir a interface UI gerada pelo `swagger-jsdoc`.

## 3. Adição da Documentação nos Endpoints (JSDoc)

- [x] 3.1 Adicionar bloco JSDoc OpenAPI no `index.ts` para documentar a rota `/api/health`.
- [x] 3.2 Adicionar bloco JSDoc OpenAPI no arquivo `apps/backend/src/modules/auth/auth.routes.ts` documentando a rota `/api/auth/login` (request body esperado, retornos 200, 400 e 401).

## 4. Validação

- [x] 4.1 Rodar a validação do TypeScript (`npm run build` ou `tsc --noEmit`).
- [x] 4.2 Levantar a aplicação (`npm run dev`) e testar manualmente acessando `http://localhost:3001/` para garantir que o Swagger UI carrega e os endpoints de Health e Login estão visíveis.
