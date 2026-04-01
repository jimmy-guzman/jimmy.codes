import type { KnipConfig } from "knip";

export default {
  ignoreBinaries: ["pandoc"],
  ignoreDependencies: [
    "@iconify-json/*",
    "gitzy",
    "@commitlint/cli",
    "markdownlint",
  ],
} satisfies KnipConfig;
