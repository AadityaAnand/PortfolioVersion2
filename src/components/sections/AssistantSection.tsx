import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChatPanel } from "@/components/assistant/ChatPanel";

type AssistantSectionProps = {
  request: { id: number; prompt: string } | null;
};

export function AssistantSection({ request }: AssistantSectionProps) {
  return (
    <section id="assistant" className="section-padding pt-6">
      <div className="shell-container space-y-8">
        <SectionHeading
          eyebrow="AI Portfolio Assistant"
          title="Ask the portfolio instead of guessing."
          copy="The interface is intentionally conversational. It is meant to show how I think, what I have built, and how I explain technical work when someone needs the useful version, not the resume version."
        />
        <ChatPanel request={request} />
      </div>
    </section>
  );
}
