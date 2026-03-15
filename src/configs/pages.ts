export const BASE_TITLE = "Jimmy Guzman Moreno";

export const pages = {
  blog: {
    description:
      "Articles on building software, system design, architecture, and developer experience.",
    heading: "Blog",
    keywords: [
      "jimmy guzman blog",
      "software engineering articles",
      "system design",
      "software architecture",
      "developer experience",
      "typescript",
      "react",
      "astro",
      "web development",
    ],
    title: `Blog | ${BASE_TITLE}`,
  },

  notFound: {
    description: "The page you're looking for does not exist.",
    heading: "404",
    keywords: ["404", "not found", "error"],
    title: `404 | ${BASE_TITLE}`,
  },

  rss: {
    description:
      "Articles and notes on building software, system design, architecture, and developer experience.",
    title: `RSS | ${BASE_TITLE}`,
  },
  site: {
    description:
      "Jimmy Guzman Moreno's blogfolio — exploring software engineering, scalable systems, and developer experience.",
    title: "Jimmy Guzman Moreno's blogfolio",
  },

  tags: {
    description: "Browse all blog post tags",
    heading: "All Tags",
    keywords: ["blog", "tags", "posts"],
    title: `All Tags | ${BASE_TITLE}`,
  },

  uses: {
    description: "Tech I love, use daily, and am currently learning.",
    heading: "Uses",
    keywords: ["tech stack", "tools", "uses", "typescript", "react", "astro"],
    title: `Uses | ${BASE_TITLE}`,
  },
} as const;
