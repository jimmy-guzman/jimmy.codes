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
        weights: [400, 700],
        styles: ["normal", "italic"],
        display: "swap",
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
          theme: "obsidian",
          props: {
            containerProps: { class: "my-[1.25rem] callout" },
            titleProps: { class: "callout-title items-center!" },
          },
        },
      ],
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
    favicons({
      themes: ["#1a1a1a", "#e5e5e5"],
      cacheBustingQueryParam: "v3",
      name: "jimmy.codes",
      short_name: "JGM",
      icons: {
        favicons: [
          "favicon.svg",
          "favicon-16x16.png",
          "favicon-32x32.png",
          "favicon-48x48.png",
        ],
        appleStartup: false,
        yandex: true,
        windows: true,
        android: [
          "android-chrome-192x192.png",
          {
            name: "android-chrome-512x512.png",
            sizes: [{ width: 512, height: 512 }],
            purpose: "maskable",
            transparent: true,
            rotate: false,
            offset: 13,
          },
        ],
        appleIcon: [
          "apple-touch-icon.png",
          "apple-touch-icon-precomposed.png",
          "safari-pinned-tab.svg",
        ],
      },
    }),
  ],
});
