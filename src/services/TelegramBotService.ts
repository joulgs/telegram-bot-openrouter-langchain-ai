import TelegramBot from 'node-telegram-bot-api'
import { config, type ConfigType } from '../config.ts'

export class TelegramBotService {
    private config: ConfigType
    private bot: TelegramBot

    constructor(configOverride: ConfigType) {
        this.config = configOverride ?? config

        this.bot = new TelegramBot(
            this.config.telegram.botToken, 
            { polling: true }
        )

        console.log('\n🤖 Telegram bot is running...')
        return this
    }

    onMessage(callback: (msg: any) => void) {
        this.bot.on('message', callback)
    }

    sendMessage(chatId: number, text: string) {
        this.bot.sendMessage(chatId, text)
    }
}
