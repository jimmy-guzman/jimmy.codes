import type { KnipConfig } from "knip";

export default {
  ignoreDependencies: [
    "@iconify-json/*",
    "gitzy",
    "@commitlint/cli",
    "markdownlint",
    "astro:env", // TODO: remove when https://github.com/webpro-nl/knip/pull/1331 is merged
    "@types/react", // used only for type declarations within twoslash code blocks
  ],
  ignoreBinaries: ["pandoc"],
} satisfies KnipConfig;
