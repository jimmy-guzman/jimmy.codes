import {
  SiApachekafka,
  SiDocker,
  SiExpress,
  SiFastify,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiTurborepo,
  SiTypescript,
} from '@icons-pack/react-simple-icons'

const technologies = [
  { name: 'React', Icon: SiReact },
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'Turborepo', Icon: SiTurborepo },
  { name: 'Express', Icon: SiExpress },
  { name: 'Fastify', Icon: SiFastify },
  { name: 'Kafka', Icon: SiApachekafka },
  { name: 'Docker', Icon: SiDocker },
  { name: 'Postgres', Icon: SiPostgresql },
  { name: 'Redis', Icon: SiRedis },
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
