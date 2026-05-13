import { BaseMessage, BaseMessageLike } from "@langchain/core/messages";
import { StateGraph, Annotation, messagesStateReducer } from "@langchain/langgraph";

export const StateAnnotation = Annotation.Root({
  messages: Annotation<BaseMessage[], BaseMessageLike[]>({
    reducer: messagesStateReducer,
    default: () => [],
  }),
});

const callModel = async ( ) => {
  console.log("langchain graph node called");
  return {
    messages: [
      {
        role: "assistant",
        content: `Hi there! How are you?`,
      },
    ],
  };
};

export const route = (
  state: typeof StateAnnotation.State,
): "__end__" | "callModel" => {
  if (state.messages.length > 0) {
    return "__end__";
  }
  // Loop back
  return "callModel";
};

const builder = new StateGraph(StateAnnotation)
  .addNode("callModel", callModel)
  
  .addEdge("__start__", "callModel")
  .addConditionalEdges("callModel", route);

export const graph = builder.compile();
