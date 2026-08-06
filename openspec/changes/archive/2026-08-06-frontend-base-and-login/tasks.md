## 1. Configuração Inicial

- [x] 1.1 Atualizar `apps/frontend/tailwind.config.ts` com as cores, fontes, bordas e espaçamentos do Design System (`design_system_asset...md`).
- [x] 1.2 Configurar o arquivo `.env.local` na pasta `apps/frontend` adicionando a variável `NEXT_PUBLIC_API_URL`.

## 2. Estilos Globais e Layout

- [x] 2.1 Adicionar as fontes Montserrat, Inter e JetBrains Mono (via Google Fonts no `app/layout.tsx` ou equivalente).
- [x] 2.2 Atualizar `apps/frontend/src/app/globals.css` para incluir a cor de fundo preta, utilitários para `input-glow` e estilo para o autofill dos navegadores.

## 3. Tela de Login

- [x] 3.1 Criar o componente e a rota da página de Login (ex: `apps/frontend/src/app/login/page.tsx`).
- [x] 3.2 Estruturar o formulário responsivo baseado nos arquivos de mockup (`login_desktop_v2` e `login_mobile_v2`), unificando as classes responsivas do Tailwind (`md:`, `lg:`).
- [x] 3.3 Adicionar ícones correspondentes usando Material Symbols.

## 4. Integração de API e Tratamento de Estado

- [x] 4.1 Adicionar estados locais (`useState`) para capturar e-mail, senha, carregamento (`isLoading`) e mensagens de erro (`error`).
- [x] 4.2 Implementar a função `onSubmit` no formulário de login utilizando `fetch` para `POST /api/auth/login`.
- [x] 4.3 Tratar o sucesso redirecionando para o `/dashboard`.
- [x] 4.4 Tratar exceções de rede e erros 401 mostrando feedback visual amigável sem recarregar a página.
