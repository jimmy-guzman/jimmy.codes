import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField, fontProviders } from "astro/config";
import expressiveCode from "astro-expressive-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeUnwrapImages from "rehype-unwrap-images";

const autoLinkHeadingOpts = {
  behavior: "prepend",
  properties: {
    before: "#",
    className: `relative before:content-[attr(before)] before:absolute before:right-0.5 before:text-gray-600 hover:before:text-accent before:font-light`,
    tabindex: "-1",
  },
};

export default defineConfig({
  site: "https://jimmy.codes",

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

  markdown: {
    gfm: true,

    rehypePlugins: [
      [rehypeExternalLinks, { target: "_blank", rel: "noopener" }],
      rehypeSlug,
      [rehypeAutolinkHeadings, autoLinkHeadingOpts],
      rehypeUnwrapImages,
    ],
  },

  integrations: [
    expressiveCode({
      themes: ["catppuccin-mocha"],
      shiki: { transformers: [transformerColorizedBrackets()] },
    }),
    mdx(),
    sitemap(),
  ],
});
