import { config } from './config.ts'
import TelegramBot from 'node-telegram-bot-api'
import { LLMService } from './LLMService.ts'

const token = config.TELEGRAM_BOT_TOKEN 

const bot = new TelegramBot(token, { polling: true })

const llmService = new LLMService(config)

bot.on('message', (msg: any) => {
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
