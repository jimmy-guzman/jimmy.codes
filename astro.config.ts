import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField, fontProviders } from "astro/config";
import expressiveCode from "astro-expressive-code";
import expressiveCodeTwoSlash from "expressive-code-twoslash";
import { h } from "hastscript";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCallouts from "rehype-callouts";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeUnwrapImages from "rehype-unwrap-images";

const vercelUrl = process.env.VERCEL_URL;
const vercelEnv = process.env.VERCEL_ENV;

export default defineConfig({
  prefetch: true,
  site:
    vercelEnv === "production"
      ? "https://jimmy.codes"
      : vercelUrl
        ? `https://${vercelUrl}`
        : "http://localhost:4321",
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
    clientPrerender: true,
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
  markdown: {
    gfm: true,
    rehypePlugins: [
      [rehypeExternalLinks, { target: "_blank", rel: "noopener" }],
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          content: [
            h("span", {
              "aria-hidden": "true",
              class:
                "icon-[lucide--link] absolute left-0 top-1/2 -translate-y-1/2 " +
                "opacity-0 group-hover:opacity-100 transition-opacity duration-150 " +
                "text-base-content/50 h-[1em] w-[1em]",
            }),
          ],
          properties: {
            className: "group relative block pl-[1.5em] -ml-[1.5em] link-hover",
            tabindex: "-1",
          },
        },
      ],
      rehypeUnwrapImages,
      rehypeCallouts,
    ],
  },
  integrations: [
    expressiveCode({
      themes: ["kanagawa-dragon", "kanagawa-lotus"],
      themeCssSelector: (theme) => {
        if (theme.type === "light") return `[data-theme='light']`;

        return `[data-theme='dark']`;
      },
      useDarkModeMediaQuery: false,
      shiki: { transformers: [transformerColorizedBrackets()] },
      plugins: [expressiveCodeTwoSlash()],
    }),
    mdx(),
    sitemap(),
  ],
});
