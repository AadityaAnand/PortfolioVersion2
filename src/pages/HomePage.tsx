import { useMemo, useState } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { AssistantSection } from "@/components/sections/AssistantSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { StorySection } from "@/components/sections/StorySection";
import { ThoughtsSection } from "@/components/sections/ThoughtsSection";

type AssistantRequest = {
  id: number;
  prompt: string;
} | null;

export function HomePage() {
  const [assistantRequest, setAssistantRequest] = useState<AssistantRequest>(null);

  const assistantController = useMemo(
    () => ({
      ask(prompt: string) {
        setAssistantRequest({
          id: Date.now(),
          prompt,
        });
        document.getElementById("assistant")?.scrollIntoView({ behavior: "smooth", block: "start" });
      },
    }),
    [],
  );

  return (
    <SiteShell>
      <HeroSection onAskAssistant={() => assistantController.ask("Tell me about Aaditya")} />
      <AssistantSection request={assistantRequest} />
      <StorySection />
      <ExperienceSection />
      <ProjectsSection onAskAssistant={assistantController.ask} />
      <ThoughtsSection />
      <SkillsSection />
      <ContactSection />
    </SiteShell>
  );
}
