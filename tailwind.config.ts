import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050816",
        slate: "#0d1324",
        panel: "#10182b",
        accent: "#8cf6da",
        accentSecondary: "#7aa6ff",
        mist: "#d6dff7",
        line: "rgba(255,255,255,0.08)",
      },
      boxShadow: {
        glass: "0 20px 80px rgba(3, 7, 18, 0.45)",
        soft: "0 14px 40px rgba(3, 7, 18, 0.26)",
      },
      backgroundImage: {
        "mesh-grid":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      maxWidth: {
        screen: "1280px",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
