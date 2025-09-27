export const BASE_TITLE = "Jimmy Guzman Moreno";

export const pages = {
  site: {
    title: "Jimmy Guzman Moreno's blogfolio",
    description:
      "Jimmy Guzman Moreno's blogfolio — exploring software engineering, scalable systems, and developer experience.",
  },
  home: {
    title: BASE_TITLE,
    heading: "Hi, I'm Jimmy",
    description:
      "Lead Engineer focused on high-performance systems, scalable architecture, and great developer experience. I enjoy mentoring, technical strategy, and building modern software.",
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
  },

  about: {
    title: `About Me | ${BASE_TITLE}`,
    heading: "About Me",
    description:
      "Lead Engineer with 9+ years of experience delivering high-performance systems and scalable platforms. Engineering leader focused on mentorship, technical strategy, and improving developer experience.",
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
  },

  blog: {
    title: `Blog | ${BASE_TITLE}`,
    heading: "Blog",
    description:
      "Articles on building software, system design, architecture, and developer experience.",
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
  },

  notes: {
    title: `Notes | ${BASE_TITLE}`,
    heading: "Notes",
    description:
      "Quick notes and references on software, architecture, code, and developer experience.",
    keywords: [
      "jimmy guzman notes",
      "technical notes",
      "software engineering",
      "developer experience",
      "web development",
    ],
  },

  bookmarks: {
    title: `Bookmarks | ${BASE_TITLE}`,
    heading: "Bookmarks",
    description: "A personal running list of saved links and references.",
    keywords: ["bookmarks", "saved links", "references"],
  },

  rss: {
    title: `RSS | ${BASE_TITLE}`,
    description:
      "Articles and notes on building software, system design, architecture, and developer experience.",
  },

  notFound: {
    title: `404 | ${BASE_TITLE}`,
    heading: "404",
  },
} as const;
