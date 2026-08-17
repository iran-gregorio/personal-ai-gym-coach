## Context

O projeto atual é uma aplicação Next.js (App Router) sem suporte a PWA. O usuário acessa a aplicação via navegador padrão. Para melhorar a retenção e a experiência mobile, a aplicação será configurada como Progressive Web App (PWA). Além de permitir que o aplicativo seja adicionado à tela inicial, isso estabelece a base para recursos futuros como Notificações Push via Web Push API. O suporte offline completo não é um requisito imediato.

## Goals / Non-Goals

**Goals:**
- Permitir que os usuários instalem a aplicação na tela inicial (Android e iOS).
- Configurar corretamente o Web App Manifest e gerar ícones adequados.
- Implementar um Service Worker base para viabilizar a PWA.
- Preparar a estrutura do Service Worker para receber eventos push no futuro.

**Non-Goals:**
- Suporte offline completo (sincronização de dados, background sync).
- Implementação de fato das Push Notifications neste escopo (apenas deixar a fundação pronta).
- Refatoração de UI/UX para padrões nativos além das meta-tags de status bar.

## Decisions

**Decisão 1: Biblioteca de PWA para Next.js**
- **Escolha:** `@serwist/next`
- **Alternativas:** `next-pwa` (descontinuada), service worker nativo manual.
- **Rationale:** `@serwist/next` é a evolução direta e moderna do `next-pwa` focada no App Router e suporta integração limpa com Workbox e Next.js nativamente sem dores de cabeça de build.

**Decisão 2: Estratégia de Caching**
- **Escolha:** Network-First (e assets estáticos em cache).
- **Rationale:** Como não teremos um modo offline sofisticado, queremos garantir que o usuário veja a versão mais atual dos dados da aplicação sempre que houver conexão. O cache de estáticos garante que o "esqueleto" do app carregue rápido e passe nos critérios de PWA do Lighthouse.

**Decisão 3: Custom Service Worker File**
- **Escolha:** Usar um arquivo `sw.ts` dedicado.
- **Rationale:** Em vez de usar um SW totalmente auto-gerado, teremos um arquivo para exportar as configurações do Serwist e, crucialmente, adicionar o listener de `push` e `notificationclick` posteriormente sem ter que reconfigurar o build process inteiro.

## Risks / Trade-offs

- **[Risk] Compatibilidade iOS:** O Safari no iOS é notoriamente rigoroso com PWAs (como necessitar de `<link rel="apple-touch-icon">` explicitamente e splash screens manuais dependendo da versão).
  → **Mitigação:** Certificar que as meta tags e o `apple-mobile-web-app-capable` estão perfeitamente configurados no `layout.tsx`.
- **[Risk] Cache "preso" (Stale Cache):** Se a estratégia de cache for muito agressiva, usuários podem ver versões antigas do app.
  → **Mitigação:** Usar `NetworkFirst` para rotas dinâmicas e configurar o `sw` para dar update automaticamente quando houver uma nova versão do app (`skipWaiting` e `clientsClaim`).
