# Design: Swagger API Documentation

## Abordagem Tecnológica

Para implementar a documentação na raiz da API, utilizaremos o padrão OpenAPI (Swagger) gerado dinamicamente a partir de anotações no próprio código. 

### Bibliotecas Utilizadas:
- `swagger-ui-express`: Middleware para servir a interface gráfica do Swagger UI.
- `swagger-jsdoc`: Ferramenta para ler anotações JSDoc dentro dos arquivos de rotas/controllers e compilar um objeto JSON compatível com a especificação OpenAPI 3.0.

## Decisões de Arquitetura

1. **Geração Dinâmica via JSDoc:** 
   Optamos por escrever a documentação diretamente junto ao código das rotas/controllers (via JSDoc). Isso evita a dessincronização que ocorreria ao manter um arquivo `swagger.yaml` gigantesco e separado da implementação real da nova arquitetura de *Vertical Slices*.

2. **Substituição da Rota Raiz:**
   O endpoint `app.get('/')` que retornava "Hello World" será removido e substituído por `app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs))`. Dessa forma, o acesso raiz da API (ex: `localhost:3001/` ou URL de produção do Cloud Run) exibirá a documentação Swagger diretamente.

3. **Arquivo de Configuração:**
   Criaremos um arquivo central de configuração (`apps/backend/src/config/swagger.ts`) que conterá as definições base da API (título, versão, descrição, servidores) e os caminhos (paths) onde o `swagger-jsdoc` deve buscar as anotações.

## Exemplo de Configuração (Swagger)

```typescript
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Personal AI Gym Coach API',
      version: '1.0.0',
      description: 'Documentação da API do backend',
    },
    servers: [
      { url: 'http://localhost:3001', description: 'Servidor Local' }
    ],
  },
  apis: ['./src/modules/**/*.routes.ts', './index.ts'],
};
```
