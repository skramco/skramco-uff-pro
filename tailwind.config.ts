import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        surface: "var(--surface)",
        "surface-raised": "var(--surface-raised)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        "ink-secondary": "var(--ink-secondary)",
        "accent-quiet": "var(--accent-quiet)",
        "accent-dark": "var(--accent-dark)",
        hairline: "var(--hairline)",
        positive: "var(--positive)",
        warning: "var(--warning)",
        nav: "var(--nav)",
        "uff-red": "#e10404",
        "uff-red-ink": "#b00303",
        "uff-red-tint": "#fef2f2",
        "uff-ink": "#1f292e",
        "uff-ink-2": "#37474f",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        data: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["var(--type-caption)", { lineHeight: "1rem" }],
        sm: ["var(--type-sm)", { lineHeight: "1.25rem" }],
        base: ["var(--type-body)", { lineHeight: "1.625" }],
        nav: ["var(--type-nav)", { lineHeight: "1.5rem" }],
        lg: ["var(--type-lg)", { lineHeight: "1.75rem" }],
        xl: ["var(--type-xl)", { lineHeight: "1.75rem" }],
        "2xl": ["var(--type-2xl)", { lineHeight: "2rem" }],
        "3xl": ["var(--type-3xl)", { lineHeight: "2.25rem" }],
        "4xl": ["var(--type-4xl)", { lineHeight: "1.1" }],
        "5xl": ["var(--type-5xl)", { lineHeight: "1.05" }],
      },
      borderRadius: {
        lg: "var(--radius-card)",
        md: "var(--radius)",
        sm: "var(--radius)",
        card: "10px",
        pill: "20px",
      },
      transitionDuration: {
        DEFAULT: "150ms",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.15s ease-out",
        "accordion-up": "accordion-up 0.15s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
