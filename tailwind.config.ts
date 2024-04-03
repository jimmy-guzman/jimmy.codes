import typography from "@tailwindcss/typography";
import daisyui from "daisyui";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: ["night"],
    prefix: "dsy-",
    logs: false,
  },
  plugins: [typography, daisyui],
} satisfies Config;
