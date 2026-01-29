interface Tech {
  link: `https://${string}.${string}`;
  title: string;
  icon: `icon-[${"logos" | "simple-icons" | "skill-icons"}--${string}]`;
}

export const techDaily = [
  {
    icon: "icon-[logos--react]",
    link: "https://react.dev/",
    title: "React",
  },
  {
    icon: "icon-[logos--typescript-icon]",
    link: "https://www.typescriptlang.org/",
    title: "TypeScript",
  },
  {
    icon: "icon-[logos--react-router]",
    link: "https://reactrouter.com/",
    title: "React Router",
  },
  {
    icon: "icon-[logos--nodejs-icon]",
    link: "https://nodejs.org/",
    title: "Node.js",
  },
  {
    icon: "icon-[simple-icons--fastify]",
    link: "https://fastify.dev/",
    title: "Fastify",
  },
  {
    icon: "icon-[simple-icons--express]",
    link: "https://expressjs.com/",
    title: "Express",
  },
  {
    icon: "icon-[logos--kotlin-icon]",
    link: "https://kotlinlang.org/",
    title: "Kotlin",
  },
  {
    icon: "icon-[logos--ktor-icon]",
    link: "https://ktor.io/",
    title: "Ktor",
  },
  {
    icon: "icon-[logos--postgresql]",
    link: "https://www.postgresql.org/",
    title: "PostgreSQL",
  },
  {
    icon: "icon-[simple-icons--prisma]",
    link: "https://www.prisma.io/",
    title: "Prisma",
  },
  {
    icon: "icon-[simple-icons--apachekafka]",
    link: "https://kafka.apache.org/",
    title: "Kafka",
  },
  {
    icon: "icon-[logos--redis]",
    link: "https://redis.io/",
    title: "Redis",
  },
  {
    icon: "icon-[logos--playwright]",
    link: "https://playwright.dev/",
    title: "Playwright",
  },
  {
    icon: "icon-[logos--vitest]",
    link: "https://vitest.dev/",
    title: "Vitest",
  },
  {
    icon: "icon-[logos--msw-icon]",
    link: "https://mswjs.io/",
    title: "MSW",
  },
  {
    icon: "icon-[logos--vitejs]",
    link: "https://vite.dev/",
    title: "Vite",
  },
  {
    icon: "icon-[logos--turborepo-icon]",
    link: "https://turbo.build/repo/docs",
    title: "Turborepo",
  },
  {
    icon: "icon-[logos--grafana]",
    link: "https://grafana.com/",
    title: "Grafana",
  },
  {
    icon: "icon-[logos--docker-icon]",
    link: "https://docker.com/",
    title: "Docker",
  },
] satisfies Tech[];

export const techLearning = [
  {
    icon: "icon-[simple-icons--openai]",
    link: "https://openai.com/",
    title: "OpenAI",
  },
  {
    icon: "icon-[simple-icons--ollama]",
    link: "https://ollama.com/",
    title: "Ollama",
  },
  {
    icon: "icon-[simple-icons--langchain]",
    link: "https://langchain.com/",
    title: "LangChain",
  },
  {
    icon: "icon-[simple-icons--rust]",
    link: "https://www.rust-lang.org/",
    title: "Rust",
  },
  {
    icon: "icon-[logos--go]",
    link: "https://go.dev/",
    title: "Go",
  },
  {
    icon: "icon-[logos--cloudflare-workers-icon]",
    link: "https://workers.cloudflare.com/",
    title: "Cloudflare Workers",
  },
] satisfies Tech[];

export const techLove = [
  {
    icon: "icon-[simple-icons--astro]",
    link: "https://astro.build/",
    title: "Astro",
  },
  {
    icon: "icon-[logos--nextjs-icon]",
    link: "https://nextjs.org/",
    title: "Next.js",
  },
  {
    icon: "icon-[logos--hono]",
    link: "https://hono.dev/",
    title: "Hono",
  },
  {
    icon: "icon-[skill-icons--elysia-dark]",
    link: "https://elysiajs.com/",
    title: "Elysia",
  },
  {
    icon: "icon-[logos--biomejs-icon]",
    link: "https://biomejs.dev/",
    title: "Biome",
  },
  {
    icon: "icon-[simple-icons--oxc]",
    link: "https://oxc.rs/",
    title: "OXC",
  },
  {
    icon: "icon-[logos--tailwindcss-icon]",
    link: "https://tailwindcss.com/",
    title: "TailwindCSS",
  },
  {
    icon: "icon-[logos--graphql]",
    link: "https://graphql.org/",
    title: "GraphQL",
  },
  {
    icon: "icon-[logos--bun]",
    link: "https://bun.sh/",
    title: "Bun",
  },
  {
    icon: "icon-[simple-icons--drizzle]",
    link: "https://orm.drizzle.team/",
    title: "Drizzle",
  },
  {
    icon: "icon-[logos--neon-icon]",
    link: "https://neon.tech/",
    title: "Neon",
  },
  {
    icon: "icon-[logos--opentelemetry-icon]",
    link: "https://opentelemetry.io/",
    title: "OpenTelemetry",
  },
  {
    icon: "icon-[logos--nx]",
    link: "https://nx.dev/",
    title: "NX",
  },
  {
    icon: "icon-[logos--github-actions]",
    link: "https://github.com/features/actions",
    title: "GitHub Actions",
  },
] satisfies Tech[];

export const titles = {
  daily: "Tech I Use Daily",
  learning: "Tech I'm Learning",
  love: "Tech I Love",
};
