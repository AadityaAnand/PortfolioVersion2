import type { ThoughtPost } from "@/types/thoughts";

export const thoughtPosts: ThoughtPost[] = [
  {
    id: "fde-feels-like",
    title: "What forward deployed engineering actually feels like",
    date: "2026-04-10",
    category: "Field Notes",
    tags: ["forward deployed", "product", "systems"],
    excerpt:
      "The interesting part is not just writing code. It is staying close enough to the real problem that the code changes the conversation.",
    readTime: "4 min",
    content: `
## The job is rarely just implementation

What I enjoy most about forward deployed work is the way it collapses boundaries.
You are not sitting at the far end of a requirements pipeline. You are often in the room where the problem is still messy.

That changes how I build.

- I ask better questions earlier.
- I optimize for clarity, not just cleverness.
- I make tradeoffs that help users move forward now, not six months from now.

## The engineering still matters

Being close to the customer does not mean lowering the bar on systems work.
If anything, it raises the bar. You feel immediately when a workflow is brittle, when a data model is too vague, or when an AI feature cannot be trusted in practice.

The best forward deployed engineers I know are pragmatic without becoming sloppy.
That is the balance I aim for.
    `,
    featured: true,
  },
  {
    id: "ai-product-work",
    title: "Building AI features without hiding behind the model",
    date: "2026-03-29",
    category: "AI Engineering",
    tags: ["ai", "product", "llms"],
    excerpt:
      "The model is only one part of the system. The product gets better when the surrounding workflow is designed with the same care.",
    readTime: "5 min",
    content: `
## Models are not the whole product

When an AI feature feels good, it is usually because someone made careful decisions around context, feedback, trust, and failure handling.

I think about AI features as systems:

- What information does the model actually need?
- Where does retrieval help more than prompting harder?
- What happens when the model is uncertain?
- How does the user recover quickly?

## My bias

I like AI products that become more useful because the surrounding interface is honest.
That means fewer magic tricks, more legibility, and clear escape hatches when the model should defer to the human.
    `,
  },
  {
    id: "backend-product-language",
    title: "Backend systems should still speak product language",
    date: "2026-02-18",
    category: "Backend Systems",
    tags: ["backend", "architecture", "product"],
    excerpt:
      "A backend is not just infrastructure. It is part of how the product earns trust.",
    readTime: "3 min",
    content: `
## Why this matters

A backend decision is often a product decision in disguise.
Data freshness, latency, retry behavior, and operator ergonomics all change what users experience.

## How I think about it

I want services that are:

- Easy to reason about
- Safe to change
- Transparent when they fail
- Structured so new features do not create accidental complexity

That is how backend work stays connected to user impact instead of becoming a private engineering exercise.
    `,
  },
];
