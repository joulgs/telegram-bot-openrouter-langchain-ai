import { config } from './config.ts'
import TelegramBot from 'node-telegram-bot-api'

const token = config.TELEGRAM_BOT_TOKEN 

const bot = new TelegramBot(token, { polling: true })

bot.on('message', (msg: any) => {
  const chatId = msg.chat.id
  const text = msg.text || ''

  console.log(`Received message from ${chatId}: ${text}`)

  bot.sendMessage(chatId, `You said: ${text}`)
})

console.log('Telegram bot is running...')
