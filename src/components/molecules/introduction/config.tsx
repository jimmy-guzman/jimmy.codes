import { ICON_CLASS_NAME } from './constants'
import {
  TypescriptIcon,
  RxjsIcon,
  ReactIcon,
  TailwindcssIcon,
  FastifyIcon,
  TestingLibraryIcon,
  CypressIcon,
} from '../../../icons'

interface CommonTechnology {
  icon?: React.ReactNode
  link: string
  name: string
}

export const commonTechnologies: CommonTechnology[] = [
  {
    name: 'Typescript',
    icon: <TypescriptIcon className={ICON_CLASS_NAME} />,
    link: 'https://www.typescriptlang.org/',
  },
  {
    name: 'RxJs',
    icon: <RxjsIcon className={ICON_CLASS_NAME} />,
    link: 'https://rxjs.dev/',
  },
  {
    name: 'React',
    icon: <ReactIcon className={ICON_CLASS_NAME} />,
    link: 'https://reactjs.org/',
  },
  {
    name: 'tailwindcss',
    icon: <TailwindcssIcon className={ICON_CLASS_NAME} />,
    link: 'https://www.typescriptlang.org/',
  },
  {
    name: 'Fastify',
    icon: <FastifyIcon className={ICON_CLASS_NAME} />,
    link: 'https://www.fastify.io/',
  },
  {
    name: 'Testing Library',
    icon: <TestingLibraryIcon className={ICON_CLASS_NAME} />,
    link: 'https://testing-library.com/',
  },
  {
    name: 'Cypress',
    icon: <CypressIcon className={ICON_CLASS_NAME} />,
    link: 'https://www.cypress.io/',
  },
]
