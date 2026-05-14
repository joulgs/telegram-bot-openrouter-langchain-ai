import {
    END,
    MessagesZodMeta,
    START,
    StateGraph,
} from '@langchain/langgraph'
import { BaseMessage, HumanMessage, AIMessage } from "@langchain/core/messages";
import { withLangGraph } from '@langchain/langgraph/zod'
import { LLMService } from '../services/LLMService.ts';
import { z } from 'zod/v3'

const GraphState = z.object({
    messages: withLangGraph(
        z.custom<BaseMessage[]>(),
        MessagesZodMeta
    ),
    output: z.string(),
})

export type GraphState = z.infer<typeof GraphState>;

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

export function buildAgentGraph(llmService: LLMService) {
    const workflow = new StateGraph({
        stateSchema: GraphState
    })
    .addNode("chatResponse", chatResponseNode(llmService))
  
    .addEdge(START, "chatResponse")
    .addEdge("chatResponse", END) 

    return workflow.compile()
}
