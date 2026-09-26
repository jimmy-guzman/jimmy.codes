import type { KnipConfig } from "knip";

export default {
  entry: ["src/pwa.ts"],
  ignoreBinaries: ["pandoc"],
  ignoreDependencies: [
    "@iconify-json/*",
    "gitzy",
    // missing peer of @astrojs/astro2tsx (via @astrojs/check), needed for astro check
    "@emnapi/runtime",
  ],
  paths: {
    "@/*": ["./src/*"],
  },
} satisfies KnipConfig;
