import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
import tailwindcss from "@tailwindcss/vite";
import AstroPWA from "@vite-pwa/astro";
import {
  defineConfig,
  envField,
  fontProviders,
  svgoOptimizer,
} from "astro/config";
import expressiveCode from "astro-expressive-code";
import mermaid from "astro-mermaid";
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
  adapter: vercel(),
  env: {
    schema: {
      FATHOM_SITE_ID: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    clientPrerender: true,
    svgOptimizer: svgoOptimizer(),
  },
  fonts:
    process.env.TEST === "true"
      ? undefined
      : [
          {
            cssVariable: "--font-mono",
            display: "swap",
            fallbacks: [
              "ui-monospace",
              "SFMono-Regular",
              "Menlo",
              "Monaco",
              "Consolas",
              "monospace",
            ],
            name: "Commit Mono",
            provider: fontProviders.fontsource(),
            styles: ["normal", "italic"],
            weights: [400, 500, 600],
          },
        ],

  integrations: [
    mermaid({ autoTheme: true }),
    expressiveCode({
      plugins: [expressiveCodeTwoSlash()],
      shiki: { transformers: [transformerColorizedBrackets()] },
      styleOverrides: {
        codeFontFamily: "var(--font-mono)",
      },
      themeCssSelector: (theme) => {
        if (theme.type === "light") return `[data-theme='light']`;

        return `[data-theme='dark']`;
      },
      themes: ["kanagawa-dragon", "kanagawa-lotus"],
      useDarkModeMediaQuery: false,
    }),
    mdx(),
    sitemap(),
    // Disable PWA assets generation during knip analysis
    process.env.KNIP === "true"
      ? undefined
      : AstroPWA({
          manifest: {
            background_color: "#f9f9fb",
            display: "standalone",
            name: "jimmy.codes",
            short_name: "JGM",
            theme_color: "#f9f9fb",
          },
          pwaAssets: {
            config: true,
          },
          registerType: "autoUpdate",
          workbox: {
            navigateFallback: "/404",
          },
        }),
  ],
  markdown: {
    processor: unified({
      gfm: true,
      rehypePlugins: [
        [rehypeExternalLinks, { rel: "noopener", target: "_blank" }],
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
                  "text-muted h-[1em] w-[1em] max-h-4 max-w-4",
              }),
            ],
            properties: {
              className: "group relative block pl-5 -ml-5",
              tabindex: "-1",
            },
          },
        ],
        rehypeUnwrapImages,
        [
          rehypeCallouts,
          {
            props: {
              containerProps: { class: "my-5 callout" },
              titleProps: { class: "callout-title items-center!" },
            },
            theme: "obsidian",
          },
        ],
      ],
    }),
  },
  prefetch: true,
  site:
    vercelEnv === "production"
      ? "https://jimmy.codes"
      : vercelUrl
        ? `https://${vercelUrl}`
        : "http://localhost:4321",
  trailingSlash: "never",
  vite: {
    plugins: [tailwindcss()],
  },
});
