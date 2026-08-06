# Capability: api-documentation

## Overview
Esta capability garante que o backend do Personal AI Gym Coach possua uma documentação de API interativa, baseada no padrão OpenAPI 3.0, acessível na rota raiz da aplicação. Isso facilita a exploração e o consumo dos endpoints pelo frontend e desenvolvedores.

## Requirements

1. **Acesso à Documentação:**
   - A rota `GET /` da API deve retornar a interface do Swagger UI.
   - Não deve haver exibição de mensagens de texto puro (como "Hello World") na raiz.

2. **Padrão e Especificação:**
   - A documentação gerada deve estar em conformidade com o padrão OpenAPI 3.0.
   - Deve exibir claramente as rotas, métodos HTTP aceitos, parâmetros esperados (body, params, query) e respostas (sucesso e erros) para cada endpoint.

3. **Geração da Documentação:**
   - A documentação base deve ser configurada em um arquivo central, mas as definições específicas de cada rota devem ser geradas através de comentários JSDoc localizados perto de suas respectivas implementações (ex: nos arquivos `.routes.ts`).

4. **Escopo Inicial de Documentação:**
   - Os endpoints atualmente existentes devem ser documentados como parte desta implementação inicial.
   - `GET /api/health`
   - `POST /api/auth/login`
