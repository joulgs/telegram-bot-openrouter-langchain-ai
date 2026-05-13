import { config } from "./config.ts"

export class LLMService {
    private config

    constructor(configOverride: any) {
        this.config = configOverride ?? config
    }

    async generate(prompt: string) {
        console.log('Generating response for prompt:', prompt)

        return {
            content: `This is a simulated response for the prompt: "${prompt}"`
        }
    }
}
