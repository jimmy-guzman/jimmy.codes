/// <reference types="vitest" />
import { getViteConfig } from "astro/config";
import { configDefaults } from "vitest/config";

const baseConfig = getViteConfig({
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

export default async (env: Parameters<typeof baseConfig>[0]) => {
  const config = await baseConfig(env);
  // Remove astro:server plugin — it calls environment.runner.import() in
  // configureServer which pulls in CJS modules (cookie, rollup/native, …)
  // that Vite's ModuleRunner cannot evaluate. The plugin is only needed for
  // the Astro dev server, not for running/covering unit tests.
  // this ultimately prevents "ReferenceError: exports is not defined" when
  // running vitest coverage in an Astro project v6
  config.plugins = (config.plugins ?? []).filter((p) => {
    if (p && typeof p === "object" && "name" in p) {
      return p.name !== "astro:server";
    }

    return true;
  });
  return config;
};
