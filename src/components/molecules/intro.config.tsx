import type { IconType } from '@icons-pack/react-simple-icons'
import {
  SiNodedotjs,
  SiPlaywright,
  SiReact,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
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
    name: 'Testing Library',
    Icon: SiTestinglibrary,
    link: 'https://testing-library.com',
  },
  {
    name: 'Playwright',
    Icon: SiPlaywright,
    link: 'https://playwright.dev',
  },
] satisfies Technology[]
