type Usage = "daily" | "love" | "learning";

interface Tech {
  link: `https://${string}.${string}`;
  title: string;
  icon: `icon-[${"logos" | "simple-icons" | "skill-icons"}--${string}]`;
  usage: Usage;
}

const usageOrder = { daily: 0, learning: 2, love: 1 };

function sortByUsage(items: Tech[]) {
  return [...items].sort((a, b) => usageOrder[a.usage] - usageOrder[b.usage]);
}

export const techLanguages = sortByUsage([
  {
    icon: "icon-[logos--typescript-icon]",
    link: "https://www.typescriptlang.org/",
    title: "TypeScript",
    usage: "daily",
  },
  {
    icon: "icon-[logos--kotlin-icon]",
    link: "https://kotlinlang.org/",
    title: "Kotlin",
    usage: "daily",
  },
  {
    icon: "icon-[simple-icons--rust]",
    link: "https://www.rust-lang.org/",
    title: "Rust",
    usage: "learning",
  },
  {
    icon: "icon-[logos--go]",
    link: "https://go.dev/",
    title: "Go",
    usage: "learning",
  },
] satisfies Tech[]);

export const techRuntimes = sortByUsage([
  {
    icon: "icon-[logos--nodejs-icon]",
    link: "https://nodejs.org/",
    title: "Node.js",
    usage: "daily",
  },
  {
    icon: "icon-[logos--bun]",
    link: "https://bun.sh/",
    title: "Bun",
    usage: "love",
  },
] satisfies Tech[]);

export const techFullStack = sortByUsage([
  {
    icon: "icon-[logos--nextjs-icon]",
    link: "https://nextjs.org/",
    title: "Next.js",
    usage: "daily",
  },
  {
    icon: "icon-[simple-icons--tanstack]",
    link: "https://tanstack.com/start",
    title: "TanStack Start",
    usage: "daily",
  },
  {
    icon: "icon-[logos--nuxt-icon]",
    link: "https://nuxt.com/",
    title: "Nuxt",
    usage: "love",
  },
  {
    icon: "icon-[simple-icons--astro]",
    link: "https://astro.build/",
    title: "Astro",
    usage: "daily",
  },
] satisfies Tech[]);

export const techFrontend = sortByUsage([
  {
    icon: "icon-[logos--react]",
    link: "https://react.dev/",
    title: "React",
    usage: "daily",
  },
  {
    icon: "icon-[logos--vue]",
    link: "https://vuejs.org/",
    title: "Vue",
    usage: "love",
  },
  {
    icon: "icon-[logos--react-router]",
    link: "https://reactrouter.com/",
    title: "React Router",
    usage: "daily",
  },
  {
    icon: "icon-[simple-icons--tanstack]",
    link: "https://tanstack.com/query",
    title: "TanStack Query",
    usage: "daily",
  },
  {
    icon: "icon-[logos--tailwindcss-icon]",
    link: "https://tailwindcss.com/",
    title: "TailwindCSS",
    usage: "daily",
  },
  {
    icon: "icon-[simple-icons--shadcnui]",
    link: "https://ui.shadcn.com/",
    title: "shadcn/ui",
    usage: "daily",
  },
  {
    icon: "icon-[logos--daisyui-icon]",
    link: "https://daisyui.com/",
    title: "daisyUI",
    usage: "daily",
  },
] satisfies Tech[]);

export const techTooling = sortByUsage([
  {
    icon: "icon-[logos--biomejs-icon]",
    link: "https://biomejs.dev/",
    title: "Biome",
    usage: "love",
  },
  {
    icon: "icon-[simple-icons--oxc]",
    link: "https://oxc.rs/",
    title: "OXC",
    usage: "love",
  },
  {
    icon: "icon-[logos--vitejs]",
    link: "https://vite.dev/",
    title: "Vite",
    usage: "daily",
  },
  {
    icon: "icon-[logos--vitest]",
    link: "https://vitest.dev/",
    title: "Vitest",
    usage: "daily",
  },
  {
    icon: "icon-[logos--playwright]",
    link: "https://playwright.dev/",
    title: "Playwright",
    usage: "daily",
  },
  {
    icon: "icon-[logos--msw-icon]",
    link: "https://mswjs.io/",
    title: "MSW",
    usage: "daily",
  },
  {
    icon: "icon-[logos--turborepo-icon]",
    link: "https://turbo.build/repo/docs",
    title: "Turborepo",
    usage: "daily",
  },
  {
    icon: "icon-[logos--nx]",
    link: "https://nx.dev/",
    title: "NX",
    usage: "daily",
  },
  {
    icon: "icon-[logos--gradle]",
    link: "https://gradle.org/",
    title: "Gradle",
    usage: "daily",
  },
  {
    icon: "icon-[logos--storybook-icon]",
    link: "https://storybook.js.org/",
    title: "Storybook",
    usage: "daily",
  },
] satisfies Tech[]);

export const techBackend = sortByUsage([
  {
    icon: "icon-[logos--hono]",
    link: "https://hono.dev/",
    title: "Hono",
    usage: "love",
  },
  {
    icon: "icon-[skill-icons--elysia-dark]",
    link: "https://elysiajs.com/",
    title: "Elysia",
    usage: "love",
  },
  {
    icon: "icon-[simple-icons--fastify]",
    link: "https://fastify.dev/",
    title: "Fastify",
    usage: "daily",
  },
  {
    icon: "icon-[simple-icons--express]",
    link: "https://expressjs.com/",
    title: "Express",
    usage: "daily",
  },
  {
    icon: "icon-[logos--ktor-icon]",
    link: "https://ktor.io/",
    title: "Ktor",
    usage: "daily",
  },
  {
    icon: "icon-[logos--graphql]",
    link: "https://graphql.org/",
    title: "GraphQL",
    usage: "daily",
  },
  {
    icon: "icon-[logos--postgresql]",
    link: "https://www.postgresql.org/",
    title: "PostgreSQL",
    usage: "daily",
  },
  {
    icon: "icon-[simple-icons--prisma]",
    link: "https://www.prisma.io/",
    title: "Prisma",
    usage: "daily",
  },
  {
    icon: "icon-[simple-icons--drizzle]",
    link: "https://orm.drizzle.team/",
    title: "Drizzle",
    usage: "love",
  },
  {
    icon: "icon-[logos--redis]",
    link: "https://redis.io/",
    title: "Redis",
    usage: "daily",
  },
  {
    icon: "icon-[simple-icons--apachekafka]",
    link: "https://kafka.apache.org/",
    title: "Kafka",
    usage: "daily",
  },
  {
    icon: "icon-[logos--neon-icon]",
    link: "https://neon.tech/",
    title: "Neon",
    usage: "love",
  },
  {
    icon: "icon-[simple-icons--sqlite]",
    link: "https://www.sqlite.org/",
    title: "SQLite",
    usage: "daily",
  },
  {
    icon: "icon-[simple-icons--turso]",
    link: "https://turso.tech/",
    title: "Turso",
    usage: "love",
  },
] satisfies Tech[]);

export const techInfrastructure = sortByUsage([
  {
    icon: "icon-[logos--kubernetes]",
    link: "https://kubernetes.io/",
    title: "Kubernetes",
    usage: "daily",
  },
  {
    icon: "icon-[logos--cloudflare-workers-icon]",
    link: "https://workers.cloudflare.com/",
    title: "Cloudflare Workers",
    usage: "love",
  },
  {
    icon: "icon-[logos--grafana]",
    link: "https://grafana.com/",
    title: "Grafana",
    usage: "daily",
  },
  {
    icon: "icon-[logos--opentelemetry-icon]",
    link: "https://opentelemetry.io/",
    title: "OpenTelemetry",
    usage: "daily",
  },
  {
    icon: "icon-[logos--docker-icon]",
    link: "https://docker.com/",
    title: "Docker",
    usage: "daily",
  },
  {
    icon: "icon-[logos--github-actions]",
    link: "https://github.com/features/actions",
    title: "GitHub Actions",
    usage: "daily",
  },
  {
    icon: "icon-[simple-icons--temporal]",
    link: "https://temporal.io/",
    title: "Temporal",
    usage: "learning",
  },
] satisfies Tech[]);

export const techAI = sortByUsage([
  {
    icon: "icon-[simple-icons--ollama]",
    link: "https://ollama.com/",
    title: "Ollama",
    usage: "learning",
  },
  {
    icon: "icon-[simple-icons--langchain]",
    link: "https://langchain.com/",
    title: "LangChain",
    usage: "learning",
  },
  {
    icon: "icon-[simple-icons--openai]",
    link: "https://platform.openai.com/",
    title: "OpenAI SDK",
    usage: "daily",
  },
  {
    icon: "icon-[simple-icons--anthropic]",
    link: "https://www.anthropic.com/",
    title: "Anthropic SDK",
    usage: "daily",
  },
] satisfies Tech[]);

export const titles = {
  ai: "AI",
  backend: "Backend",
  frontend: "Frontend",
  fullStack: "Full Stack",
  infrastructure: "Infrastructure",
  languages: "Languages",
  runtimes: "Runtimes",
  tooling: "Tooling",
};
