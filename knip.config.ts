import type { KnipConfig } from "knip";

export default {
  ignoreBinaries: ["pandoc"],
  ignoreDependencies: [
    "@iconify-json/*",
    "gitzy",
    "@commitlint/cli",
    "markdownlint",
    "@types/react", // used only for type declarations within twoslash code blocks
  ],
} satisfies KnipConfig;
