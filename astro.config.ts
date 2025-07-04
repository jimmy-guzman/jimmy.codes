import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField, fontProviders } from "astro/config";

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
  experimental: {
    fonts: [
      {
        name: "Satoshi",
        provider: fontProviders.fontshare(),
        cssVariable: "--font-satoshi",
        weights: [300, 400, 500],
        styles: ["normal"],
      },
    ],
  },
  adapter: vercel(),
  trailingSlash: "never",
});
