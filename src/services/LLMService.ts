import { OpenRouter } from "@openrouter/sdk/sdk/index.js"
import { config, type ConfigType } from "../config.ts"

export class LLMService {
    private config: ConfigType
    private client: OpenRouter

    constructor(configOverride: ConfigType) {
        this.config = configOverride ?? config
        
        this.client = new OpenRouter({
            apiKey: this.config.openRouter.apiKey,
            httpReferer: this.config.openRouter.httpRefer,
        })
    }

    async generate(prompt: string) {
        console.log('🧠 Generating response for prompt:', prompt)

        const response = await this.client.chat.send({
            chatRequest: {
                models: this.config.openRouter.models,
                messages: [
                    { role: 'system', content: this.config.openRouter.systemPrompt },
                    { role: 'user', content: prompt }
                ],
                stream: false,
                temperature: this.config.openRouter.temperature,
                maxTokens: this.config.openRouter.maxTokens,
                provider: this.config.openRouter.provider
            }
        })

        const content = String(response.choices.at(0)?.message.content ?? '')
        console.log('Received response:', content)
        return {
            model: response.model,
            content: content
        }
    }
}
