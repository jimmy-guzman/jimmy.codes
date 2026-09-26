import type { KnipConfig } from "knip";

export default {
  ignoreBinaries: ["pandoc"],
  ignoreDependencies: [
    "@iconify-json/*",
    // missing peer of @astrojs/astro2tsx (via @astrojs/check), needed for astro check
    "@emnapi/runtime",
  ],
  paths: {
    "@/*": ["./src/*"],
  },
} satisfies KnipConfig;
