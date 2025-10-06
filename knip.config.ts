import type { KnipConfig } from "knip";

export default {
  ignoreDependencies: [
    "@iconify-json/*",
    "gitzy",
    "@commitlint/cli",
    "markdownlint",
  ],
  compilers: {
    css: (text: string) => {
      return [...text.matchAll(/@(?:import|plugin)\s+["']([^"']+)["']/g)]
        .map(([_, dep]) => `import "${dep}";`)
        .join("\n");
    },
  },
  ignoreBinaries: ["pandoc"],
} satisfies KnipConfig;
