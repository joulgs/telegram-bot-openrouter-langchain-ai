import { config } from '../config.ts';
import { LLMService } from '../services/LLMService.ts';
import { buildAgentGraph } from './graph.ts';

export function buildGraph() {
  const llmClient = new LLMService(config);
  
  return buildAgentGraph(
    llmClient,
  );
}

export const graph = async () => {
  return buildGraph();
};
