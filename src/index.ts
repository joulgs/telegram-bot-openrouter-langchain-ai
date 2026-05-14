import { config } from './config.ts'
import { TelegramBotService } from './services/TelegramBotService.ts'
import { LLMService } from './services/LLMService.ts'

const bot = new TelegramBotService(config)
const llmService = new LLMService(config)

bot.onMessage((msg: any) => {
  const chatId = msg.chat.id
  const text = msg.text || ''

  console.log(`Received message from ${chatId}: ${text}`)

  llmService.generate(text).then((response: any) => {
    console.log('Generated response:', response)
    bot.sendMessage(chatId, response.content || 'Sorry, I couldn\'t generate a response.')
  }).catch((error: any) => {
    console.error('Error generating response:', error)
  })
})

console.log('Telegram bot is running...')
