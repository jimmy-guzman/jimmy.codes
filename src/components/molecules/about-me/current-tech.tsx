import type { ReactNode } from 'react'

import {
  DockerIcon,
  ExpressIcon,
  FastifyIcon,
  KafkaIcon,
  PostgresIcon,
  ReactIcon,
  RedisIcon,
  TypescriptIcon,
  TurborepoIcon,
} from '../../../icons'

const Technology = ({ children }: { children: ReactNode }) => {
  return (
    <li>
      <span>{children}</span>
    </li>
  )
}

const ICON_CLASS_NAME =
  'inline-block h-4 align-baseline md:h-6 md:align-text-bottom '

export const CurrentTechnologies = (): JSX.Element => {
  return (
    <ul>
      <Technology>
        React <ReactIcon className={ICON_CLASS_NAME} />
      </Technology>
      <Technology>
        Typescript <TypescriptIcon className={ICON_CLASS_NAME} />
      </Technology>
      <Technology>
        Turborepo <TurborepoIcon className={ICON_CLASS_NAME} />
      </Technology>
      <Technology>
        Express <ExpressIcon className={ICON_CLASS_NAME} />
      </Technology>
      <Technology>
        Fastify <FastifyIcon className={ICON_CLASS_NAME} />
      </Technology>
      <Technology>
        Kafka <KafkaIcon className={ICON_CLASS_NAME} />
      </Technology>
      <Technology>
        Docker <DockerIcon className={ICON_CLASS_NAME} />
      </Technology>
      <Technology>
        Postgres <PostgresIcon className={ICON_CLASS_NAME} />
      </Technology>
      <Technology>
        Redis <RedisIcon className={ICON_CLASS_NAME} />
      </Technology>
    </ul>
  )
}
