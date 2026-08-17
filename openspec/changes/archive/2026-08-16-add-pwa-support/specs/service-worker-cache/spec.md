## ADDED Requirements

### Requirement: Service Worker Básico
A aplicação DEVE registrar um Service Worker funcional durante seu carregamento inicial no frontend. O Service Worker DEVE suportar estratégias de cache para arquivos estáticos essenciais, permitindo carregamento rápido, utilizando primariamente uma estratégia `NetworkFirst` para garantir que o usuário receba a versão mais recente do aplicativo.

#### Scenario: Interceptação de Requisições
- **WHEN** a aplicação está instalada e o usuário navega entre páginas
- **THEN** o Service Worker intercepta as requisições, servindo os assets estáticos de interface de forma acelerada via cache
- **THEN** os dados dinâmicos são buscados primariamente na rede (NetworkFirst)

### Requirement: Preparação para Web Push
O arquivo do Service Worker (`sw.ts`) DEVE ser customizado e estruturado de forma a permitir a fácil adição futura de listeners para eventos do tipo `push` e `notificationclick`, sem a necessidade de reescrever a integração base com o gerador do PWA.

#### Scenario: Arquitetura Extensível
- **WHEN** um desenvolvedor precisa adicionar lógica de push notification no futuro
- **THEN** o arquivo `sw.ts` possui um escopo claro e não-ofuscado onde os event listeners globais do Worker podem ser acoplados
