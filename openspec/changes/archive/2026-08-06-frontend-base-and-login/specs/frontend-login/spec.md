## ADDED Requirements

### Requirement: Autenticação de Usuário no Frontend
O sistema DEVE permitir que um usuário insira suas credenciais (e-mail e senha) para acessar o aplicativo através de uma tela de login responsiva que se comunica com o backend. A interface DEVE tratar os diferentes estados da requisição e apresentar um feedback amigável ao usuário.

#### Scenario: Login bem-sucedido
- **WHEN** o usuário preenche credenciais válidas e clica em "Entrar/Acessar Sistema"
- **THEN** o sistema envia a requisição para a API de login
- **THEN** o botão de envio muda para estado de carregamento (desabilitado)
- **THEN** após resposta 200 OK da API, o sistema redireciona o usuário para o `/dashboard` (rota futura)
- **THEN** a sessão do usuário é gerenciada e salva (cookies ou local storage definidos pela resposta da API).

#### Scenario: Credenciais inválidas (Erro 401)
- **WHEN** o usuário preenche credenciais incorretas e clica em "Entrar/Acessar Sistema"
- **THEN** a requisição retorna um erro HTTP 401 ou 400
- **THEN** a interface NÃO recarrega a página
- **THEN** a interface exibe uma mensagem de erro clara informando credenciais inválidas (ex: "E-mail ou senha incorretos").

#### Scenario: Falha de comunicação com a API (Network Error)
- **WHEN** o servidor está fora do ar ou o usuário está sem internet
- **THEN** a requisição falha
- **THEN** a interface exibe uma mensagem de erro genérica apropriada (ex: "Falha de conexão com o servidor. Tente novamente mais tarde.").
