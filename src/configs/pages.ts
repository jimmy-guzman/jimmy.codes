export const BASE_TITLE = "Jimmy Guzman Moreno";

export const pages = {
  about: {
    description:
      "Lead Engineer with 9+ years of experience delivering high-performance systems and scalable platforms. Engineering leader focused on mentorship, technical strategy, and improving developer experience.",
    heading: "About Me",
    keywords: [
      "jimmy guzman",
      "lead engineer",
      "software engineering leadership",
      "scalable systems",
      "developer experience",
      "mentorship",
      "technical strategy",
      "target",
      "ameriprise",
    ],
    title: `About Me | ${BASE_TITLE}`,
  },

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

  bookmarks: {
    description: "A personal running list of saved links and references.",
    heading: "Bookmarks",
    keywords: ["bookmarks", "saved links", "references"],
    title: `Bookmarks | ${BASE_TITLE}`,
  },
  home: {
    description:
      "Lead Engineer focused on high-performance systems, scalable architecture, and great developer experience. I enjoy mentoring, technical strategy, and building modern software.",
    heading: "Hi, I'm Jimmy",
    keywords: [
      "jimmy guzman",
      "lead engineer",
      "software engineer",
      "software architecture",
      "developer experience",
      "typescript",
      "react",
      "nextjs",
      "astro",
      "frontend",
      "backend",
    ],
    title: BASE_TITLE,
  },

  notes: {
    description:
      "Quick notes and references on software, architecture, code, and developer experience.",
    heading: "Notes",
    keywords: [
      "jimmy guzman notes",
      "technical notes",
      "software engineering",
      "developer experience",
      "web development",
    ],
    title: `Notes | ${BASE_TITLE}`,
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
} as const;
