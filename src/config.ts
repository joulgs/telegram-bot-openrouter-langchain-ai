console.assert(!!process.env.TELEGRAM_BOT_TOKEN, '⚠️  TELEGRAM_BOT_TOKEN is not defined in environment variables')
console.assert(!!process.env.OPENROUTER_API_KEY, '⚠️  OPENROUTER_API_KEY is not defined in environment variables')

export const config = {
  telegram: { botToken: process.env.TELEGRAM_BOT_TOKEN || '' },
  openRouter: {
    apiKey: process.env.OPENROUTER_API_KEY,
    httpRefer: 'https://github.com/joulgs/telegram-bot-openrouter-langchain-ai',
    models: [
      'google/gemma-4-31b-it:free',
      'openrouter/owl-alpha',
      'qwen/qwen3-coder:free',
    ],
    temperature: 0.2,
    maxTokens: 50,
    systemPrompt: 'You are a helpful assistant.',
    provider: {
      sort: {
        by: 'price', // 'price' | 'latency' | 'throughput'
        partition: 'none'
      }
    }
  }
};
