## Context

Atualmente os treinos são compostos de exercícios salvos na tabela `WorkoutExercise`. Não há referência visual do movimento (vídeo de execução). Queremos que, ao visualizar o treino, o usuário consiga abrir um vídeo demonstrativo de forma simples. Essa versão inicial permitirá a inserção manual dos vídeos para validar a experiência de uso.

## Goals / Non-Goals

**Goals:**
- Armazenar o URL do vídeo do YouTube para os exercícios do treino (modelo `WorkoutExercise`).
- Exibir a opção para ver o vídeo no painel do usuário no Frontend.
- Criar a interface de modal com iframe nativo do YouTube, com suporte a iniciar no minuto exato fornecido (`?t=`).
- Atualizar a API de backend para suportar CRUD com a nova propriedade `videoUrl`.

**Non-Goals:**
- Buscar os vídeos automaticamente via IA/Youtube API (será implementado no futuro).
- Suporte a outros provedores de vídeo nativo além do YouTube.
- Cache global dos exercícios na base de dados, para evitar URL inserida duplicada entre treinos (fora do escopo dessa v1).

## Decisions

- **Modelo de Dados**: Adicionar o campo `videoUrl String?` ao model `WorkoutExercise` em vez de um repositório global, para manter a implementação inicial simples e permitir customizações (por exemplo, um personal que manda o seu próprio vídeo para o exercício específico de um treino).
- **Abordagem de UI**: Usar um botão expansível ou modal em vez de colocar o `<iframe>` diretamente visível em cada card, para manter a lista compacta no dispositivo móvel. 
- **Embed URL**: O backend pode receber qualquer URL de vídeo do YouTube (ex: youtube.com/watch?v=123) e o frontend será responsável por convertê-lo na formatação de embed (`youtube.com/embed/123`) na hora de montar o `<iframe>`, ou vice e versa. Optamos por apenas validar e salvar a string e delegar a montagem do player para a UI.

## Risks / Trade-offs

- **Experiência em Telas Pequenas** → A renderização de iframes pode ser "pesada" no mobile, portanto o modal deve fazer "lazy-load" do vídeo apenas no momento da abertura.
- **Validação de URL** → O usuário pode colocar links não pertencentes ao YouTube. A mitigação é garantir via DTO (zod) que o `videoUrl` é vazio ou provém do domínio `youtube.com` / `youtu.be`.
