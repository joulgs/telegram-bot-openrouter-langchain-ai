import { config } from './config.ts'
import { TelegramBotService } from './services/TelegramBotService.ts'
import { buildGraph } from './agent/factory.ts'
import { HumanMessage } from '@langchain/core/messages'

const bot = new TelegramBotService(config)
const graph = buildGraph()

bot.onMessage(async (msg: any) => {
  const chatId = msg.chat.id
  const text = msg.text || ''

  console.log(`\nReceived message from ${chatId}: ${text}`)

  const response = await graph.invoke({
    messages: [new HumanMessage(text)],
  })
  
  bot.sendMessage(chatId, String(response.messages.at(-1)?.content))
})

console.log('\n☁️  Telegram IA Bot is ready to receive messages!\n')
