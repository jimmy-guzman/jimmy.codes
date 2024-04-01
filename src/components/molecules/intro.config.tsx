import type { IconType } from '@icons-pack/react-simple-icons'
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
} from '@icons-pack/react-simple-icons'

interface Technology {
  Icon: IconType
  link: `https://${string}.${string}`
  name: string
}

export const commonTechnologies = [
  {
    name: 'TypeScript',
    Icon: SiTypescript,
    link: 'https://www.typescriptlang.org',
  },
  {
    name: 'React',
    Icon: SiReact,
    link: 'https://reactjs.org',
  },
  {
    name: 'Next.js',
    Icon: SiNextdotjs,
    link: 'https://nextjs.org',
  },
  {
    name: 'Node.js',
    Icon: SiNodedotjs,
    link: 'https://nodejs.org',
  },
  {
    name: 'tailwindcss',
    Icon: SiTailwindcss,
    link: 'https://www.typescriptlang.org',
  },
  {
    name: 'Vitest',
    Icon: SiVitest,
    link: 'https://vitest.dev',
  },
  {
    name: 'Testing Library',
    Icon: SiTestinglibrary,
    link: 'https://testing-library.com',
  },
  {
    name: 'Playwright',
    Icon: SiPlaywright,
    link: 'https://playwright.dev',
  },
  {
    name: 'PostgreSQL',
    Icon: SiPostgresql,
    link: 'https://www.postgresql.org',
  },
  {
    name: 'Docker',
    Icon: SiDocker,
    link: 'https://www.docker.com',
  },
] satisfies Technology[]
