import type { IconType } from "@icons-pack/react-simple-icons";

import {
  SiDocker,
  SiNextdotjs,
  SiNodedotjs,
  SiPlaywright,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
  SiVitest,
} from "@icons-pack/react-simple-icons";

interface Technology {
  Icon: IconType;
  link: `https://${string}.${string}`;
  name: string;
}

export const commonTechnologies = [
  {
    Icon: SiTypescript,
    link: "https://www.typescriptlang.org",
    name: "TypeScript",
  },
  {
    Icon: SiReact,
    link: "https://reactjs.org",
    name: "React",
  },
  {
    Icon: SiNextdotjs,
    link: "https://nextjs.org",
    name: "Next.js",
  },
  {
    Icon: SiNodedotjs,
    link: "https://nodejs.org",
    name: "Node.js",
  },
  {
    Icon: SiTailwindcss,
    link: "https://www.typescriptlang.org",
    name: "tailwindcss",
  },
  {
    Icon: SiVitest,
    link: "https://vitest.dev",
    name: "Vitest",
  },
  {
    Icon: SiTestinglibrary,
    link: "https://testing-library.com",
    name: "Testing Library",
  },
  {
    Icon: SiPlaywright,
    link: "https://playwright.dev",
    name: "Playwright",
  },
  {
    Icon: SiPostgresql,
    link: "https://www.postgresql.org",
    name: "PostgreSQL",
  },
  {
    Icon: SiDocker,
    link: "https://www.docker.com",
    name: "Docker",
  },
] satisfies Technology[];
