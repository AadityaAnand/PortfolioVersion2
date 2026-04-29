import type { ThoughtPost } from "@/types/thoughts";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const thoughtQueryKey = "thought";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getThoughtPostIdentifier(post: ThoughtPost) {
  return post.slug?.trim() || slugify(post.title) || post.id;
}

export function getThoughtIdentifierFromLocation() {
  if (typeof window === "undefined") {
    return null;
  }

  return new URL(window.location.href).searchParams.get(thoughtQueryKey);
}

export function buildThoughtShareUrl(post: ThoughtPost) {
  const identifier = getThoughtPostIdentifier(post);
  const thoughtsPath = getThoughtsArchivePath();

  if (typeof window === "undefined") {
    return `${thoughtsPath}?${thoughtQueryKey}=${encodeURIComponent(identifier)}#thoughts`;
  }

  const url = new URL(window.location.origin);
  url.pathname = thoughtsPath;
  url.searchParams.set(thoughtQueryKey, identifier);
  url.hash = "thoughts";
  return url.toString();
}

export function syncThoughtUrl(post: ThoughtPost | null) {
  if (typeof window === "undefined") {
    return;
  }

  const url = new URL(window.location.href);

  if (post) {
    url.searchParams.set(thoughtQueryKey, getThoughtPostIdentifier(post));
    url.hash = "thoughts";
  } else {
    url.searchParams.delete(thoughtQueryKey);
    if (!url.hash) {
      url.hash = "thoughts";
    }
  }

  window.history.replaceState({}, "", url.toString());
}

function getThoughtsArchivePath() {
  const baseUrl = import.meta.env.BASE_URL || "/";
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  return `${normalizedBase || ""}/thoughts`;
}
