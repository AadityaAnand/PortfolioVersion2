export type AssistantPrompt = {
  id: string;
  label: string;
  prompt: string;
};

export type AssistantMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

export type AssistantReply = {
  prompt: string;
  answer: string;
};
