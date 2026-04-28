import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChatPanel } from "@/components/assistant/ChatPanel";

type AssistantSectionProps = {
  request: { id: number; prompt: string } | null;
};

export function AssistantSection({ request }: AssistantSectionProps) {
  return (
    <section id="assistant" className="section-padding pt-6">
      <div className="shell-container space-y-6">
        <SectionHeading
          eyebrow="Assistant"
          title="Ask the portfolio instead of guessing."
        />
        <ChatPanel request={request} />
      </div>
    </section>
  );
}
