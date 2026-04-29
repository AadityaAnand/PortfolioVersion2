import { LocalThoughtsContentService } from "@/lib/services/local-thoughts-content-service";
import { LocalThoughtsService } from "@/lib/services/local-thoughts-service";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { SupabaseThoughtsService } from "@/lib/services/supabase-thoughts-service";

const localThoughtsContentService = new LocalThoughtsContentService();
const localThoughtsInteractionService = new LocalThoughtsService();

let supabaseThoughtsService: SupabaseThoughtsService | null = null;

function getSupabaseThoughtsService() {
  const client = getSupabaseBrowserClient();

  if (!client) {
    return null;
  }

  if (!supabaseThoughtsService) {
    supabaseThoughtsService = new SupabaseThoughtsService(client);
  }

  return supabaseThoughtsService;
}

export function areThoughtsAdminFeaturesEnabled() {
  return isSupabaseConfigured();
}

export function getThoughtsContentService() {
  return getSupabaseThoughtsService() ?? localThoughtsContentService;
}

export function getThoughtsInteractionService() {
  return getSupabaseThoughtsService() ?? localThoughtsInteractionService;
}
