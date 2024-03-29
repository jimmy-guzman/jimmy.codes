import {
  SiCypress,
  SiFastify,
  SiNextdotjs,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
} from '@icons-pack/react-simple-icons'
import type { ReactNode } from 'react'

import { ICON_CLASS_NAME } from './intro.constants'

interface Technology {
  icon: ReactNode
  link: `https://${string}.${string}`
  name: string
}

export const commonTechnologies = [
  {
    name: 'TypeScript',
    icon: <SiTypescript className={ICON_CLASS_NAME} />,
    link: 'https://www.typescriptlang.org/',
  },
  {
    name: 'Next.js',
    icon: <SiNextdotjs className={ICON_CLASS_NAME} />,
    link: 'https://nextjs.org/',
  },
  {
    name: 'React',
    icon: <SiReact className={ICON_CLASS_NAME} />,
    link: 'https://reactjs.org/',
  },
  {
    name: 'tailwindcss',
    icon: <SiTailwindcss className={ICON_CLASS_NAME} />,
    link: 'https://www.typescriptlang.org/',
  },
  {
    name: 'Fastify',
    icon: <SiFastify className={ICON_CLASS_NAME} />,
    link: 'https://www.fastify.io/',
  },
  {
    name: 'Prisma',
    icon: <SiPrisma className={ICON_CLASS_NAME} />,
    link: 'https://www.prisma.io/',
  },
  {
    name: 'Testing Library',
    icon: <SiTestinglibrary className={ICON_CLASS_NAME} />,
    link: 'https://testing-library.com/',
  },
  {
    name: 'Cypress',
    icon: <SiCypress className={ICON_CLASS_NAME} />,
    link: 'https://www.cypress.io/',
  },
] satisfies Technology[]
