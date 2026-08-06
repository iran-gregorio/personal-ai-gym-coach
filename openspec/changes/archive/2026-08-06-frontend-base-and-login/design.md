## Context

Atualmente o backend da aplicação "Personal AI Gym Coach" está desenvolvido com rotas de autenticação, mas o frontend não possui nenhuma interface gráfica. Os mockups para a tela de login (`login_desktop_v2` e `login_mobile_v2`) e o Design System com o tema "dark gym" já foram definidos. Precisamos estabelecer a fundação estrutural do frontend em Next.js para permitir a interação do usuário.

## Goals / Non-Goals

**Goals:**
- Configurar o Tailwind CSS no frontend com tokens de cor, tipografia e espaçamento do Design System.
- Implementar a página de Login responsiva unificando as visualizações desktop e mobile.
- Consumir o endpoint `POST /api/auth/login` do backend.
- Exibir mensagens de erro amigáveis sem recarregamento da página (usando tratamento correto do estado).

**Non-Goals:**
- Implementação de outras telas (como Dashboard ou Registro).
- Modificação na lógica ou resposta da API do backend.

## Decisions

- **Unificação de Telas**: Ao invés de ter arquivos separados para Desktop e Mobile, a página de login utilizará as classes responsivas do Tailwind (ex: `md:font-display-lg`) para se adaptar à largura da tela.
- **Tratamento de Estado**: Usaremos os hooks padrão do React (`useState`) para gerenciar as credenciais e o estado de carregamento/erro, já que o formulário de login é simples (apenas e-mail e senha) e não exige dependências complexas como react-hook-form neste momento.
- **Requisições à API**: Utilizaremos `fetch` em componentes Client-Side para realizar o POST. A URL do backend será obtida através da variável de ambiente `NEXT_PUBLIC_API_URL`.

## Risks / Trade-offs

- **[Risk] CORS**: Pode haver bloqueios de CORS ao tentar acessar a API na porta 3000 pelo frontend (que rodará em outra porta). → *Mitigação*: Certificar-se de que o backend (Express) está configurado com `cors()` permitindo a origem do frontend.
- **[Risk] Variável de Ambiente Faltando**: Se `.env.local` não estiver configurado, a requisição falhará. → *Mitigação*: Adicionar fallback ou verificação explícita antes de fazer o fetch, alertando no console se a variável não estiver definida.
