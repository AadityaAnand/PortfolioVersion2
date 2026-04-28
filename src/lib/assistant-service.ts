import { assistantReplies } from "@/data/assistant";

export function getMockAssistantReply(prompt: string) {
  const normalizedPrompt = prompt.trim().toLowerCase();
  const directMatch = assistantReplies.find(
    (item) => item.prompt.trim().toLowerCase() === normalizedPrompt,
  );

  if (directMatch) {
    return directMatch.answer;
  }

  if (normalizedPrompt.includes("project")) {
    return assistantReplies.find((item) => item.prompt.includes("projects"))?.answer ?? fallbackReply;
  }

  if (normalizedPrompt.includes("ai")) {
    return assistantReplies.find((item) => item.prompt.includes("AI engineering"))?.answer ?? fallbackReply;
  }

  if (normalizedPrompt.includes("forward deployed")) {
    return assistantReplies.find((item) => item.prompt.includes("forward deployed"))?.answer ?? fallbackReply;
  }

  if (normalizedPrompt.includes("backend")) {
    return assistantReplies.find((item) => item.prompt.includes("backend systems"))?.answer ?? fallbackReply;
  }

  return fallbackReply;
}

const fallbackReply =
  "The short version: I like working on AI-powered and systems-heavy products where the problem is still a little messy. If you want, ask about projects, backend systems, or why I think the forward deployed model fits how I work.";
