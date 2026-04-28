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
      <div className="grid gap-5 border-b border-white/10 px-5 py-5 md:grid-cols-[0.8fr,1.2fr] md:px-6">
        <div className="space-y-3">
          <div className="chip w-fit rounded-xl px-3 py-2 normal-case tracking-normal">
            <Bot className="h-4 w-4" />
            Resume-backed assistant
          </div>
          <h3 className="font-display text-xl text-white md:text-2xl">Ask about work, projects, or fit.</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {assistantPrompts.map((prompt) => (
            <button
              key={prompt.id}
              type="button"
              onClick={() => handlePrompt(prompt.prompt)}
              className="chip rounded-xl px-3 py-2 text-left normal-case tracking-normal text-white/70 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {prompt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 p-5 md:p-6">
        <div className="scrollbar-thin max-h-[460px] space-y-3 overflow-y-auto pr-1">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={cn(
                  "max-w-3xl rounded-[22px] border px-4 py-3 text-sm leading-6 md:text-[14px]",
                  message.role === "assistant"
                    ? "border-white/10 bg-white/[0.05] text-white/72"
                    : "ml-auto border-transparent bg-gradient-to-r from-accent to-accentSecondary text-slate",
                )}
              >
                <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em]">
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
              className="max-w-sm rounded-[22px] border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white/60"
            >
              Thinking...
            </motion.div>
          ) : null}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handlePrompt(input);
          }}
          className="flex flex-col gap-3 rounded-[20px] border border-white/10 bg-white/[0.04] p-3 md:flex-row"
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="min-h-[52px] flex-1 bg-transparent text-sm text-white placeholder:text-white/35"
            placeholder="Ask about projects, systems, or experience..."
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
