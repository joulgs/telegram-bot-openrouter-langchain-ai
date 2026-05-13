# Telegram Bot IA

Bot de Telegram em TypeScript com IA.

### Stack usada

- Node.js
- TypeScript
- Telegram Bot API
- OpenRouter SDK
- LangChain Core
- LangGraph CLI

## Como Rodar

### Requisitos

- Node.js v24 ou superior
- um bot token criado no BotFather
- uma API key válida da OpenRouter

### 1. Instalar dependencias

```bash
npm ci
```

### 2. Configurar ambiente

Copie o arquivo de exemplo:

```bash
cp .env-example .env
```

Preencha as variáveis:

```env
TELEGRAM_BOT_TOKEN=seu_token_do_telegram
OPENROUTER_API_KEY=sua_chave_da_openrouter
```

### 3. Iniciar o bot

```bash
npm run dev
```

Se tudo estiver correto, o processo sobe o polling do Telegram e passa a responder novas mensagens.

## Como Rodar o Grafo com LangGraph

O repositório raiz também expõe um grafo via LangGraph CLI:

```bash
npm run langgraph:serve
```

O exemplo inicial foi obtido a partir do template obtido pelo comando:

```bash
npx @langchain/langgraph-cli new
```

## Proximos Passos Naturais

1. Conectar o fluxo do Telegram ao grafo em `src/agent/graph.ts`.
2. Extrair prompts, modelos e limites para configuração mais flexível.
3. Adicionar testes reais para `LLMService` e para o handler do bot.
4. Melhorar tratamento de erro e observabilidade.
