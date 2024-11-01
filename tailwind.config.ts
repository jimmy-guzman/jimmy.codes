import type { Config } from "tailwindcss";

import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    logs: false,
    prefix: "dsy-",
    themes: ["night"],
  },
  plugins: [typography, daisyui],
} satisfies Config;
