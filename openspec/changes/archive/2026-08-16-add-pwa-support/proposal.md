## Why

Para melhorar a experiência do usuário em dispositivos móveis, precisamos transformar o site em um Progressive Web App (PWA). Isso permite que o usuário adicione o aplicativo à tela inicial do celular com um ícone dedicado, abrindo-o em modo tela cheia (standalone) e fornecendo uma experiência nativa. A longo prazo, isso também estabelece a fundação necessária para enviarmos notificações push (ex: lembretes de treinos).

## What Changes

- Geração e adição de ícones de aplicativo (192x192, 512x512, maskable e apple-touch-icon).
- Criação de um arquivo de Web App Manifest (`manifest.ts` ou `manifest.json`) no frontend Next.js configurando o display para `standalone`.
- Configuração de meta tags específicas de PWA no `layout.tsx` (para cores de tema e suporte a iOS).
- Adição da biblioteca `@serwist/next` (ou similar) para configurar o Service Worker.
- Criação de um Service Worker customizado (`sw.ts`) focado em cache básico network-first e extensível para suporte futuro a Web Push Notifications.

## Capabilities

### New Capabilities
- `pwa-installation`: Permitir a instalação do aplicativo na tela inicial do celular, fornecendo ícones e manifest.
- `service-worker-cache`: Configuração de um Service Worker básico para permitir o funcionamento da PWA e cache de recursos vitais.

### Modified Capabilities


## Impact

- **Frontend:** Alterações na estrutura do Next.js App Router (`layout.tsx`, adição de dependência de service worker, arquivos na pasta `public`).
- **Navegadores suportados:** Usuários de iOS e Android terão a opção de "Adicionar à Tela de Início".
