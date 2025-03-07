import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      FATHOM_SITE_ID: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
});
