## ADDED Requirements

### Requirement: Autenticação via Email e Senha
O sistema DEVE permitir que os usuários façam login usando seu e-mail e senha. O sistema DEVE retornar um token JWT em caso de sucesso.

#### Scenario: Login bem sucedido
- **WHEN** um usuário fornece um e-mail cadastrado e a senha correta
- **THEN** o sistema verifica a senha com `bcrypt`, gera um JWT (com expiração de 14 dias) e retorna o token juntamente com os dados do usuário.

#### Scenario: Credenciais inválidas
- **WHEN** um usuário fornece um e-mail não cadastrado ou a senha incorreta
- **THEN** o sistema recusa a autenticação e retorna um erro 401 Unauthorized.

### Requirement: Estrutura de Usuário
O sistema DEVE armazenar e gerenciar usuários com uma estrutura contendo `id`, `name`, `email`, `password` (em hash), `createdAt` e `updatedAt`.

#### Scenario: Criação de um novo usuário (via seed ou futuro cadastro)
- **WHEN** um usuário é criado no sistema
- **THEN** a senha original DEVE ser hasheada utilizando `bcrypt` antes de ser salva no banco de dados.
