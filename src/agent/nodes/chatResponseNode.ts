import { AIMessage } from "@langchain/core/messages";
import { type GraphState } from "../graph.ts";
import { LLMService } from "../../services/LLMService.ts";

export function chatResponseNode(llmService: LLMService) {
    return async (state: GraphState): Promise<Partial<GraphState>> => {
    
        const input = state.messages.at(-1)!.text;
        console.log('\n🤖 Generating response with LLM...')
        console.log('User input:', input);

        let responseText = 'Me desculpe, não consegui gerar uma resposta.';

        await llmService.generate(input).then((response: any) => {
            responseText = response.content;
        }).catch((error: any) => {
            console.error('⚠️  Error generating response:', error)
        })

        const aiMessage = new AIMessage(responseText)

        return {
            ...state,
            messages: [
                ...state.messages,
                aiMessage,
            ]
        }
    }
}