/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

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
        primary: {
          50: "#FFF9F5",
          100: "#FDEFE8",
          200: "#F8E0D3",
          300: "#F2D2BF",
          400: "#E8BEA6",
          500: "#D9AC92",
          600: "#DA956D",
          700: "#D87840",
          800: "#C45A1D",
          900: "#8C3C0D",
          950: "#6C2A04",
        },
      },
      boxShadow: {
        "b-card":
          "rgba(0, 20, 20, 0.1) 0px 20px 140px 0px, rgba(0, 20, 20, 0.1) 0px 25px 20px 0px, rgb(255, 255, 255) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.04) 0px 0px 0px 1px",
        natural: `rgba(43, 41, 46, 0.2) 0px 20px 80px, rgba(0, 20, 20, 0.04) 0px 0px 0px 1px`,
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
