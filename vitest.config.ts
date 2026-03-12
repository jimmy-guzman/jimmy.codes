/// <reference types="vitest" />
import { getViteConfig } from "astro/config";
import { configDefaults } from "vitest/config";

const config = getViteConfig({
  test: {
    coverage: {
      exclude: [
        ...(configDefaults.coverage.exclude ?? []),
        "**/{astro,commitlint,knip,playwright,content}.config.*",
      ],
    },
    exclude: [...configDefaults.exclude, "e2e/*"],
  },
});

export default config;
