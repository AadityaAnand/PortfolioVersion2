import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Bot, Sparkles } from "lucide-react";
import { assistantPrompts, assistantWelcome } from "@/data/assistant";
import { getMockAssistantReply } from "@/lib/assistant-service";
import type { AssistantMessage } from "@/types/assistant";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/utils";

type ChatPanelProps = {
  request: { id: number; prompt: string } | null;
};

const initialMessages: AssistantMessage[] = [
  {
    id: "assistant-intro",
    role: "assistant",
    content: assistantWelcome,
  },
];

export function ChatPanel({ request }: ChatPanelProps) {
  const [messages, setMessages] = useState<AssistantMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const latestRequest = useRef<number | null>(null);

  useEffect(() => {
    if (!request || request.id === latestRequest.current) {
      return;
    }

    latestRequest.current = request.id;
    handlePrompt(request.prompt);
  }, [request]);

  function handlePrompt(prompt: string) {
    const nextPrompt = prompt.trim();
    if (!nextPrompt) {
      return;
    }

    const userMessage: AssistantMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: nextPrompt,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsReplying(true);

    window.setTimeout(() => {
      const reply: AssistantMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: getMockAssistantReply(nextPrompt),
      };

      setMessages((current) => [...current, reply]);
      setIsReplying(false);
    }, 520);
  }

  return (
    <GlassPanel className="overflow-hidden">
      <div className="grid gap-6 border-b border-white/10 px-5 py-5 md:grid-cols-[0.9fr,1.1fr] md:px-8">
        <div className="space-y-4">
          <div className="chip w-fit">
            <Bot className="h-4 w-4" />
            AI portfolio assistant
          </div>
          <div className="space-y-3">
            <h3 className="font-display text-2xl text-white md:text-3xl">
              A conversational layer on top of the portfolio
            </h3>
            <p className="text-sm leading-7 text-white/65 md:text-base">
              The interface is mock-backed for now, but the content and service layer are already structured so a real AI endpoint can replace it cleanly later.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {assistantPrompts.map((prompt) => (
            <button
              key={prompt.id}
              type="button"
              onClick={() => handlePrompt(prompt.prompt)}
              className="chip text-left normal-case tracking-normal text-white/70 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {prompt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 p-5 md:p-8">
        <div className="scrollbar-thin max-h-[480px] space-y-4 overflow-y-auto pr-1">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={cn(
                  "max-w-3xl rounded-3xl border px-5 py-4 text-sm leading-7 md:text-[15px]",
                  message.role === "assistant"
                    ? "border-white/10 bg-white/[0.05] text-white/72"
                    : "ml-auto border-transparent bg-gradient-to-r from-accent to-accentSecondary text-slate",
                )}
              >
                <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
                  {message.role === "assistant" ? "AI view" : "You asked"}
                </div>
                <p className="whitespace-pre-line">{message.content}</p>
              </motion.div>
            ))}
          </AnimatePresence>

          {isReplying ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-sm rounded-3xl border border-white/10 bg-white/[0.05] px-5 py-4 text-sm text-white/60"
            >
              Thinking through the best way to explain it...
            </motion.div>
          ) : null}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handlePrompt(input);
          }}
          className="flex flex-col gap-3 rounded-[24px] border border-white/10 bg-white/[0.04] p-4 md:flex-row"
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="min-h-[52px] flex-1 bg-transparent text-sm text-white placeholder:text-white/35"
            placeholder="Ask about projects, AI fit, forward deployed work, or backend systems..."
          />
          <button type="submit" className="action-link action-link-primary min-h-[52px] md:min-w-[180px]">
            Send question
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </button>
        </form>
      </div>
    </GlassPanel>
  );
}
