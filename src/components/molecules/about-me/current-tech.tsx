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
  NextJsIcon,
} from '../../../icons'

const technologies = [
  { name: 'React', Icon: ReactIcon },
  { name: 'Next.js', Icon: NextJsIcon },
  { name: 'TypeScript', Icon: TypescriptIcon },
  { name: 'Turborepo', Icon: TurborepoIcon },
  { name: 'Express', Icon: ExpressIcon },
  { name: 'Fastify', Icon: FastifyIcon },
  { name: 'Kafka', Icon: KafkaIcon },
  { name: 'Docker', Icon: DockerIcon },
  { name: 'Postgres', Icon: PostgresIcon },
  { name: 'Redis', Icon: RedisIcon },
]

export const CurrentTechnologies = (): JSX.Element => {
  return (
    <ul>
      {technologies.map(({ name, Icon }) => (
        <li key={name}>
          <span>
            {name}{' '}
            <Icon className='inline-block h-4 align-baseline md:h-6 md:align-text-bottom' />
          </span>
        </li>
      ))}
    </ul>
  )
}
