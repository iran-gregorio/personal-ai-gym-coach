## 1. Setup e Dependências

- [x] 1.1 Instalar o pacote `@serwist/next` (ou equivalente selecionado) no `apps/frontend`
- [x] 1.2 Mover as imagens geradas do ícone (192x192, 512x512) para a pasta `apps/frontend/public/icons/`

## 2. Configuração do PWA (Next.js)

- [x] 2.1 Adicionar a configuração do Serwist no arquivo de configuração do Next.js (por exemplo `next.config.mjs`)
- [x] 2.2 Criar o arquivo de escopo do service worker (`apps/frontend/sw.ts`) definindo as rotas de cache offline (`NetworkFirst`)
- [x] 2.3 Criar o arquivo `manifest.ts` no diretório app (ou public) definindo as propriedades da PWA (nome, display standalone, cores, caminhos para os ícones)

## 3. Integração de UI (Meta Tags)

- [x] 3.1 Atualizar o `apps/frontend/app/layout.tsx` para incluir o `<link rel="apple-touch-icon">`
- [x] 3.2 Atualizar o `layout.tsx` com as meta tags necessárias para status bar do iOS e `theme-color`
- [x] 3.3 Testar o carregamento da página no ambiente de desenvolvimento verificando o aba "Application" do DevTools (para confirmar detecção do Manifest e registro do Service Worker)
