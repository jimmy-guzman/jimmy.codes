import type { KnipConfig } from "knip";

export default {
  entry: ["src/pwa.ts"],
  ignoreBinaries: ["pandoc"],
  ignoreDependencies: [
    "@iconify-json/*",
    "gitzy",
    "@commitlint/cli",
    "markdownlint",
  ],
  paths: {
    "@/*": ["./src/*"],
  },
} satisfies KnipConfig;
