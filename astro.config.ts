import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField, fontProviders } from "astro/config";
import expressiveCode from "astro-expressive-code";
import favicons from "astro-favicons";
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
            {
              cssVariable: "--font-og",
              formats: ["woff"],
              name: "JetBrains Mono",
              provider: fontProviders.fontsource(),
              styles: ["normal"],
              weights: [400],
            },
          ],
    svgo: true,
  },

  integrations: [
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
    // Disable favicons during knip analysis
    process.env.KNIP === "true"
      ? undefined
      : favicons({
          cacheBustingQueryParam: "v3",
          icons: {
            android: [
              "android-chrome-192x192.png",
              {
                name: "android-chrome-512x512.png",
                offset: 13,
                purpose: "maskable",
                rotate: false,
                sizes: [{ height: 512, width: 512 }],
                transparent: true,
              },
            ],
            appleIcon: [
              "apple-touch-icon.png",
              "apple-touch-icon-precomposed.png",
              "safari-pinned-tab.svg",
            ],
            appleStartup: false,
            favicons: [
              "favicon.svg",
              "favicon-16x16.png",
              "favicon-32x32.png",
              "favicon-48x48.png",
            ],
            windows: true,
            yandex: true,
          },
          name: "jimmy.codes",
          short_name: "JGM",
          themes: ["#1a1a1a", "#e5e5e5"],
        }),
  ],
  markdown: {
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
                "text-muted h-[1em] w-[1em]",
            }),
          ],
          properties: {
            className: "group relative block pl-[1.5em] -ml-[1.5em]",
            tabindex: "-1",
          },
        },
      ],
      rehypeUnwrapImages,
      [
        rehypeCallouts,
        {
          props: {
            containerProps: { class: "my-[1.25rem] callout" },
            titleProps: { class: "callout-title items-center!" },
          },
          theme: "obsidian",
        },
      ],
    ],
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
