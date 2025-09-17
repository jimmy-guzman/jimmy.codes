interface Tech {
  link: `https://${string}.${string}`;
  title: string;
  icon: `icon-[${"logos" | "simple-icons"}--${string}]`;
}

export const techDaily = [
  {
    link: "https://react.dev/",
    title: "React",
    icon: "icon-[logos--react]",
  },
  {
    link: "https://www.typescriptlang.org/",
    title: "TypeScript",
    icon: "icon-[logos--typescript-icon]",
  },
  {
    link: "https://reactrouter.com/",
    title: "React Router",
    icon: "icon-[logos--react-router]",
  },
  {
    link: "https://nodejs.org/",
    title: "Node.js",
    icon: "icon-[logos--nodejs-icon]",
  },
  {
    link: "https://fastify.dev/",
    title: "Fastify",
    icon: "icon-[simple-icons--fastify]",
  },
  {
    link: "https://expressjs.com/",
    title: "Express",
    icon: "icon-[simple-icons--express]",
  },
  {
    link: "https://kotlinlang.org/",
    title: "Kotlin",
    icon: "icon-[logos--kotlin-icon]",
  },
  {
    link: "https://www.postgresql.org/",
    title: "PostgreSQL",
    icon: "icon-[logos--postgresql]",
  },
  {
    link: "https://kafka.apache.org/",
    title: "Kafka",
    icon: "icon-[simple-icons--apachekafka]",
  },
  {
    link: "https://redis.io/",
    title: "Redis",
    icon: "icon-[logos--redis]",
  },
  {
    link: "https://playwright.dev/",
    title: "Playwright",
    icon: "icon-[logos--playwright]",
  },
  {
    link: "https://vitest.dev/",
    title: "Vitest",
    icon: "icon-[logos--vitest]",
  },
  {
    link: "https://mswjs.io/",
    title: "MSW",
    icon: "icon-[logos--msw-icon]",
  },
  {
    link: "https://vite.dev/",
    title: "Vite",
    icon: "icon-[logos--vitejs]",
  },
  {
    link: "https://turbo.build/repo/docs",
    title: "Turborepo",
    icon: "icon-[logos--turborepo-icon]",
  },
  {
    link: "https://grafana.com/",
    title: "Grafana",
    icon: "icon-[logos--grafana]",
  },
  {
    link: "https://docker.com/",
    title: "Docker",
    icon: "icon-[logos--docker-icon]",
  },
] satisfies Tech[];

export const techLearning = [
  {
    link: "https://openai.com/",
    title: "OpenAI",
    icon: "icon-[simple-icons--openai]",
  },
  {
    link: "https://ollama.com/",
    title: "Ollama",
    icon: "icon-[simple-icons--ollama]",
  },
  {
    title: "LangChain",
    link: "https://langchain.com/",
    icon: "icon-[simple-icons--langchain]",
  },
  {
    link: "https://workers.cloudflare.com/",
    title: "Cloudflare Workers",
    icon: "icon-[logos--cloudflare-workers-icon]",
  },
  {
    link: "https://www.rust-lang.org/",
    title: "Rust",
    icon: "icon-[simple-icons--rust]",
  },
  {
    link: "https://expo.dev/",
    title: "Expo",
    icon: "icon-[simple-icons--expo]",
  },
] satisfies Tech[];

export const techLove = [
  {
    link: "https://astro.build/",
    title: "Astro",
    icon: "icon-[simple-icons--astro]",
  },
  {
    link: "https://qwik.builder.io/",
    title: "Qwik",
    icon: "icon-[logos--qwik-icon]",
  },
  {
    link: "https://nextjs.org/",
    title: "Next.js",
    icon: "icon-[simple-icons--nextdotjs]",
  },
  {
    link: "https://biomejs.dev/",
    title: "Biome",
    icon: "icon-[simple-icons--biome]",
  },
  {
    link: "https://tailwindcss.com/",
    title: "TailwindCSS",
    icon: "icon-[logos--tailwindcss-icon]",
  },
  {
    link: "https://graphql.org/",
    title: "GraphQL",
    icon: "icon-[logos--graphql]",
  },
  {
    link: "https://bun.sh/",
    title: "Bun",
    icon: "icon-[logos--bun]",
  },
  {
    link: "https://orm.drizzle.team/",
    title: "Drizzle",
    icon: "icon-[simple-icons--drizzle]",
  },
  {
    link: "https://neon.tech/",
    title: "Neon",
    icon: "icon-[logos--neon-icon]",
  },
  {
    link: "https://opentelemetry.io/",
    title: "OpenTelemetry",
    icon: "icon-[logos--opentelemetry-icon]",
  },
  {
    link: "https://nx.dev/",
    title: "NX",
    icon: "icon-[logos--nx]",
  },
  {
    title: "GitHub Actions",
    icon: "icon-[logos--github-actions]",
    link: "https://github.com/features/actions",
  },
] satisfies Tech[];

export const titles = {
  daily: "Tech I Use Daily",
  learning: "Tech I'm Learning",
  love: "Tech I Love",
};
