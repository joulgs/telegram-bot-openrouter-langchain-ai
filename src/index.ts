import { config } from './config.ts'
import { TelegramBotService } from './services/TelegramBotService.ts'
import { LLMService } from './services/LLMService.ts'

const bot = new TelegramBotService(config)
const llmService = new LLMService(config)

bot.onMessage((msg: any) => {
  const chatId = msg.chat.id
  const text = msg.text || ''

  console.log(`\nReceived message from ${chatId}: ${text}`)

  llmService.generate(text).then((response: any) => {
    bot.sendMessage(chatId, response.content || 'Sorry, I couldn\'t generate a response.')
  }).catch((error: any) => {
    console.error('⚠️  Error generating response:', error)
  })
})

console.log('\n☁️  Telegram IA Bot is ready to receive messages!\n')
