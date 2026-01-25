import type { KnipConfig } from "knip";

export default {
  ignoreBinaries: ["pandoc"],
  ignoreDependencies: [
    "@iconify-json/*",
    "gitzy",
    "@commitlint/cli",
    "markdownlint",
    "@types/react", // used only for type declarations within twoslash code blocks,
    "sharp", // used for overriding the version of sharp used in devDependencies for image processing in docs
  ],
} satisfies KnipConfig;
