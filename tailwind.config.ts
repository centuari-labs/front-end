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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom theme colors - High Contrast Midnight Palette
        purple: {
          DEFAULT: "#9f7aea",
          light: "#b794f4",
          dark: "#805ad5",
        },
        teal: {
          DEFAULT: "#38d2ac",
          light: "#4fd1c5",
          dark: "#2c7a7b",
        },
        green: {
          DEFAULT: "#48bb78",
          light: "#68d391",
          dark: "#38a169",
        },
        red: {
          DEFAULT: "#f56565",
          light: "#fc8181",
          dark: "#e53e3e",
        },
        amber: {
          DEFAULT: "#ed8936",
          light: "#f6ad55",
          dark: "#dd6b20",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 5px 0 rgba(159, 122, 234, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 15px 3px rgba(159, 122, 234, 0.5)",
          },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 3s infinite",
        "gradient-shift": "gradient-shift 15s ease infinite",
        float: "float 3s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "light-grid":
          "linear-gradient(rgba(159, 122, 234, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(159, 122, 234, 0.05) 1px, transparent 1px)",
        "dark-grid":
          "linear-gradient(rgba(159, 122, 234, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(159, 122, 234, 0.03) 1px, transparent 1px)",
        "gradient-primary": "linear-gradient(135deg, #9f7aea 0%, #b794f4 100%)",
        "gradient-card": "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        "gradient-card-dark": "linear-gradient(135deg, #1e2538 0%, #131a2b 100%)",
        "gradient-purple": "linear-gradient(135deg, #9f7aea 0%, #b794f4 100%)",
        "gradient-dark-purple": "linear-gradient(135deg, #553c9a 0%, #805ad5 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config