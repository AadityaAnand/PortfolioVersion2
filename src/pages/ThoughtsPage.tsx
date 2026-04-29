import { ThoughtsSection } from "@/components/sections/ThoughtsSection";
import { SiteShell } from "@/components/layout/SiteShell";
import { thoughtsPageNavItems } from "@/data/site";

export function ThoughtsPage() {
  return (
    <SiteShell brandHref="/" assistantHref="/#assistant" navItems={thoughtsPageNavItems}>
      <ThoughtsSection variant="page" />
    </SiteShell>
  );
}
