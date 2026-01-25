# jimmy.codes

> My personal blogfolio ✍🏼 🧑🏻‍💻
>
> **[🌐 Visit the site](https://jimmy.codes)**

## 🛠 Tech Stack

### **Frontend**

- **Framework:** [Astro](https://astro.build/) - Static site builder optimized for content
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) - Utility-first CSS framework
- **UI Components:** [daisyUI](https://daisyui.com) - Tailwind CSS component library
- **Content:** [MDX](https://mdxjs.com/) - Markdown with JSX support
- **Icons:** [Iconify](https://iconify.design/) - Unified icon framework with 200k+ icons
- **Fonts:** [Commit Mono](https://commitmono.com/) via Fontsource
- **Typography:** [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)

### **Code Highlighting**

- **[Expressive Code](https://expressive-code.com/)** - Enhanced code blocks with features like:
  - Line highlighting and line numbers
  - File names and titles
  - Diff highlighting
  - Copy button
- **[Shiki](https://shiki.matsu.io/)** - Accurate syntax highlighting
- **[TypeScript TwoSlash](https://github.com/expressive-code/twoslash)** - TypeScript type hover hints
- **[Colorized Brackets](https://shiki.matsu.io/packages/colorized-brackets)** - Rainbow brackets
- **Themes:** Kanagawa Dragon (dark) & Kanagawa Lotus (light)

### **Markdown Processing**

- **[rehype-autolink-headings](https://github.com/rehypejs/rehype-autolink-headings)** - Auto-generate heading links
- **[rehype-external-links](https://github.com/rehypejs/rehype-external-links)** - Handle external links properly
- **[rehype-slug](https://github.com/rehypejs/rehype-slug)** - Add IDs to headings
- **[rehype-callouts](https://github.com/mkosir/rehype-callouts)** - GitHub/Obsidian-style callouts
- **[rehype-unwrap-images](https://github.com/remarkjs/rehype-unwrap-images)** - Remove paragraph wrappers from images

### **Dev Tools & Quality**

- **Runtime:** [Bun](https://bun.sh/) - Fast JavaScript runtime and package manager
- **Type Checking:** [TypeScript](https://www.typescriptlang.org/) with strict mode
- **Linting:** [Biome](https://biomejs.dev/) - Fast linter & formatter (replaces ESLint + Prettier for JS/TS)
- **Formatting:** [Prettier](https://prettier.io) for Astro & Markdown files
- **Markdown Linting:** [markdownlint](https://github.com/DavidAnson/markdownlint)
- **Testing:** [Vitest](https://vitest.dev/) for unit tests + [Playwright](https://playwright.dev/) for E2E
- **Git Hooks:** [Lefthook](https://github.com/evilmartians/lefthook) - Fast git hook manager
- **Commits:** [Commitlint](https://commitlint.js.org/) with conventional commits
- **Dependency Management:** [Knip](https://knip.dev/) - Find unused dependencies

### **Build & Infrastructure**

- **Bundler:** Astro with Vite
- **Adapter:** [@astrojs/vercel](https://docs.astro.build/en/guides/integrations-guide/vercel/)
- **Integrations:**
  - [@astrojs/mdx](https://docs.astro.build/en/guides/markdown-content/#mdx-only-features) - MDX support
  - [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) - Automatic sitemap generation
  - [@astrojs/rss](https://docs.astro.build/en/guides/rss/) - RSS feed generation
  - [astro-favicons](https://github.com/relagit/astro-favicons) - Automated favicon generation
- **Image Optimization:** Built-in Astro Image with Sharp
- **SVGO:** Automated SVG optimization
- **Coverage:** [@vitest/coverage-v8](https://vitest.dev/guide/coverage.html)

### **Services & Deployment**

- **Hosting:** [Vercel](https://vercel.com/) with automatic deployments
- **Analytics:** [Fathom](https://usefathom.com/) - Privacy-first, GDPR-compliant analytics
- **CI/CD:** GitHub Actions for testing and quality checks

## ⚡ Getting Started

Make sure you have [Bun](https://bun.sh/) installed, then run:

```bash
bun install
bun run dev
```

Open [http://localhost:4321](http://localhost:4321) to view it in the browser.

## 🔧 Available Scripts

| Script                 | Description                                           |
| ---------------------- | ----------------------------------------------------- |
| `bun run dev`          | Start development server with Bun runtime             |
| `bun run build`        | Build for production                                  |
| `bun run preview`      | Preview production build locally                      |
| `bun run test`         | Run unit tests with Vitest in watch mode              |
| `bun run coverage`     | Generate test coverage report                         |
| `bun run e2e`          | Run E2E tests with Playwright                         |
| `bun run typecheck`    | Type check TypeScript and Astro files                 |
| `bun run lint`         | Lint code with Biome and markdown with markdownlint   |
| `bun run lint:fix`     | Auto-fix linting issues                               |
| `bun run format`       | Format code with Biome and Prettier                   |
| `bun run build:resume` | Generate PDF resume from Markdown using Pandoc        |
| `bun run knip`         | Find unused dependencies and exports                  |
| `bun run up`           | Interactive dependency updates with npm-check-updates |

## 📝 Content Structure

```txt
src/content/
├── posts/        # Blog posts in MDX format
└── config.ts     # Content collections schema with Zod validation
```

Blog posts include frontmatter for metadata:

```yaml
title: Post Title
publishDate: 2024-01-01
updatedDate: 2024-01-15
description: A short description
keywords: [react, typescript, web]
tags: [React, TypeScript] # Max 5 tags from predefined enum
shortTitle: Short # Optional, max 40 chars
```

## 🔐 Environment Variables

| Variable         | Description                                                   |
| ---------------- | ------------------------------------------------------------- |
| `FATHOM_SITE_ID` | [Fathom Analytics](https://usefathom.com/) site ID (optional) |

## 🏗️ Project Structure

```txt
├── e2e/                 # Playwright E2E tests
├── public/              # Static assets
│   ├── resume.md        # Resume in Markdown format
│   └── og/              # Open Graph images
├── src/
│   ├── assets/          # Images and other assets
│   │   └── images/      # Optimized images
│   ├── components/      # Astro components
│   │   └── *.spec.ts    # Component unit tests
│   ├── configs/         # Configuration files
│   │   ├── pages.ts     # Page metadata
│   │   ├── tech.ts      # Tech stack icons
│   │   └── urls.ts      # Site URLs
│   ├── content/         # Content collections
│   │   └── posts/       # MDX blog posts
│   ├── layouts/         # Page layouts
│   │   ├── BaseLayout.astro      # Base HTML layout
│   │   ├── PageLayout.astro      # Standard page layout
│   │   └── ContentLayout.astro   # Blog post layout
│   ├── pages/           # Route pages (file-based routing)
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── blog/
│   │   └── rss.xml.ts   # RSS feed
│   ├── styles/          # Global styles
│   │   └── global.css   # Tailwind v4 + daisyUI themes
│   └── utils/           # Utility functions
├── astro.config.ts      # Astro configuration
├── biome.json           # Biome configuration
├── lefthook.yml         # Git hooks configuration
├── playwright.config.ts # Playwright configuration
├── prettier.config.mjs  # Prettier configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── vitest.config.ts     # Vitest configuration
```

## 🧪 Testing

### Unit & Integration Tests

Run Vitest tests with coverage:

```bash
bun run test        # Watch mode
bun run coverage    # Coverage report
```

Tests use `experimental_AstroContainer` for component testing.

### End-to-End Tests

Run Playwright tests across browsers:

```bash
bun run e2e
```

Tests run on Chromium, Firefox, and WebKit. In CI, tests run with 2 retries and parallel execution.

## 🚀 Deployment

The site is automatically deployed to [Vercel](https://vercel.com/):

- **Production:** Every push to `main` → [jimmy.codes](https://jimmy.codes)
- **Preview:** Every pull request → unique preview URL
- **Framework Preset:** Astro with Vercel adapter
- **Build Command:** `bun run build`
- **Output Directory:** `dist/`

## 💪 Contributing

Found a bug or have a suggestion? Feel free to open an issue or submit a pull request!
