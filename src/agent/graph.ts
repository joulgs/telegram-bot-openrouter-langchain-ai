import {
    END,
    MessagesZodMeta,
    START,
    StateGraph,
} from '@langchain/langgraph'
import { BaseMessage } from "@langchain/core/messages";
import { withLangGraph } from '@langchain/langgraph/zod'
import { LLMService } from '../services/LLMService.ts';
import { z } from 'zod/v3'
import { chatResponseNode } from './nodes/chatResponseNode.ts';

const GraphState = z.object({
    messages: withLangGraph(
        z.custom<BaseMessage[]>(),
        MessagesZodMeta
    ),
    output: z.string(),
})

export type GraphState = z.infer<typeof GraphState>;

export function buildAgentGraph(llmService: LLMService) {
    const workflow = new StateGraph({
        stateSchema: GraphState
    })
    .addNode("chatResponse", chatResponseNode(llmService))
  
    .addEdge(START, "chatResponse")
    .addEdge("chatResponse", END) 

    return workflow.compile()
}
