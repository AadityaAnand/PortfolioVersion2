import { useState } from "react";
import { LockKeyhole, LogIn } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";

type AdminLoginPanelProps = {
  isSubmitting: boolean;
  error: string | null;
  onSubmit: (input: { email: string; password: string }) => Promise<void>;
};

export function AdminLoginPanel({ isSubmitting, error, onSubmit }: AdminLoginPanelProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <GlassPanel className="mx-auto w-full max-w-xl p-6 md:p-7">
      <div className="mb-6 flex items-center gap-3">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-accent">
          <LockKeyhole className="h-5 w-5" />
        </div>
        <div>
          <p className="section-lead">Admin login</p>
          <h2 className="mt-1 font-display text-2xl text-white">Sign in to write.</h2>
        </div>
      </div>

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await onSubmit({ email, password });
        }}
        className="space-y-4"
      >
        <div className="space-y-2">
          <label htmlFor="admin-email" className="text-xs uppercase tracking-[0.18em] text-white/42">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="min-h-[52px] w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-white/28"
            placeholder="you@domain.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="admin-password" className="text-xs uppercase tracking-[0.18em] text-white/42">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="min-h-[52px] w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-white/28"
            placeholder="Your admin password"
          />
        </div>

        {error ? (
          <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100/85">
            {error}
          </div>
        ) : null}

        <div className="space-y-3 pt-2">
          <button type="submit" className="action-link action-link-primary w-full" disabled={isSubmitting}>
            <LogIn className="mr-2 h-4 w-4" />
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
          <p className="text-sm text-white/45">
            Create your admin user in Supabase first, then sign in here.
          </p>
        </div>
      </form>
    </GlassPanel>
  );
}
