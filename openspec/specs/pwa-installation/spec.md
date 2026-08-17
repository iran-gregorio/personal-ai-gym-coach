## ADDED Requirements

### Requirement: Instalação PWA
O sistema DEVE permitir que o usuário instale a aplicação na tela inicial do seu dispositivo móvel (Android/iOS) a partir de um navegador compatível. O sistema DEVE fornecer um arquivo de Web App Manifest válido contendo as definições de display como `standalone`, além do nome do aplicativo e configurações de tema.

#### Scenario: Instalação no Android (Chrome)
- **WHEN** o usuário acessa a aplicação pelo Google Chrome no Android
- **THEN** o navegador detecta a configuração PWA válida e pode exibir a opção "Adicionar à tela inicial"
- **THEN** o ícone configurado no manifest será usado como ícone do app

#### Scenario: Instalação no iOS (Safari)
- **WHEN** o usuário acessa a aplicação pelo Safari no iOS e usa o menu de compartilhamento para "Adicionar à Tela de Início"
- **THEN** a aplicação é salva como um webapp standalone usando o `apple-touch-icon` especificado nas meta tags
