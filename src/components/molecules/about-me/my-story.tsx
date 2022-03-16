import {
  DockerIcon,
  ExpressIcon,
  FastifyIcon,
  KafkaIcon,
  MongoDBIcon,
  NodeJsIcon,
  PostgresIcon,
  ReactIcon,
  RedisIcon,
  TypescriptIcon,
} from '../../../icons'
import { Link } from '../../atoms'

const ICON_CLASS_NAME =
  'inline-block h-4 align-baseline md:h-6 md:align-text-bottom '

const TargetDescription = () => {
  return (
    <>
      I&apos;m currently a Lead Engineer at{' '}
      <Link to='https://www.target.com/' isExternal>
        Target
      </Link>{' '}
      where I drive full stack solutions for supply chain inventory management
      applications. The main technologies that I interact with are:
      <ul>
        <li>
          React <ReactIcon className={ICON_CLASS_NAME} />
        </li>
        <li>
          Typescript <TypescriptIcon className={ICON_CLASS_NAME} />
        </li>
        <li>
          Express <ExpressIcon className={ICON_CLASS_NAME} />
        </li>
        <li>
          Fastify <FastifyIcon className={ICON_CLASS_NAME} />
        </li>
        <li>
          Kafka <KafkaIcon className={ICON_CLASS_NAME} />
        </li>
        <li>
          Docker <DockerIcon className={ICON_CLASS_NAME} />
        </li>
        <li>
          Postgres <PostgresIcon className={ICON_CLASS_NAME} />
        </li>
        <li>
          Redis <RedisIcon className={ICON_CLASS_NAME} />
        </li>
      </ul>
      My day to day consists of mentoring, ensuring scalability and providing a
      vision for the future.
    </>
  )
}

export const MyStory = (): JSX.Element => {
  return (
    <>
      <p>
        I&apos;m Jimmy Guzman Moreno, an engineer that specializes in front end
        development. My passion is to help others deliver the best solutions
        possible.
      </p>
      <p>
        <TargetDescription />
      </p>
      <p>
        Before that, I worked at{' '}
        <Link to='https://www.ameriprise.com/' isExternal>
          Ameriprise Financial
        </Link>{' '}
        where I began as an engineer and by the end of my tenure I was serving
        as a Senior Lead Engineer. At Ameriprise, I have put on multiple hats
        such as leading the full stack guest experience platform, leading a core
        component library, leading the core and standards team, and paving the
        way for the next gen platform focused on developer experience.
      </p>
      <p>
        Briefly before Ameriprise, I worked as a teaching assistant at the{' '}
        <Link to='https://bootcamp.umn.edu/coding/' isExternal>
          University of Minnesota Coding Boot Camp
        </Link>{' '}
        that focused on the MERN stack (MongoDB{' '}
        <MongoDBIcon className={ICON_CLASS_NAME} />, Express{' '}
        <ExpressIcon className={ICON_CLASS_NAME} />, ReactJS{' '}
        <ReactIcon className={ICON_CLASS_NAME} /> and NodeJS{' '}
        <NodeJsIcon className={ICON_CLASS_NAME} />
        ).
      </p>
      <p>Finally, prior to that, I worked as a freelance web developer.</p>
      <p>
        In a past life, I worked various jobs in diverse industries such as
        education, warehouse, and customer service.
      </p>
    </>
  )
}
