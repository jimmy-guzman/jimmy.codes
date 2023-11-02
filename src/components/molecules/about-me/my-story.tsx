import {
  SiExpress,
  SiMongodb,
  SiNodedotjs,
  SiReact,
} from '@icons-pack/react-simple-icons'

import { CurrentTechnologies } from './current-tech'
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
      <CurrentTechnologies />
      My day to day consists of mentoring, ensuring scalability and providing a
      vision for the future. At the moment, I&apos;m working on:
      <ul>
        <li>Building a micro services platform that focus on speed and DX.</li>
        <li>
          Paying down historical debt while incrementally modernizing our UI.
        </li>
        <li>
          Designing and planning the migration from a SPA to a Next.js
          application.
        </li>
      </ul>
    </>
  )
}

export const MyStory = (): JSX.Element => {
  return (
    <>
      <p>
        I&apos;m Jimmy Guzman Moreno, an engineer that specializes in full stack
        development. My passion is to help others deliver the best solutions
        possible.
      </p>
      <TargetDescription />
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
        <SiMongodb className={ICON_CLASS_NAME} />, Express{' '}
        <SiExpress className={ICON_CLASS_NAME} />, ReactJS{' '}
        <SiReact className={ICON_CLASS_NAME} /> and NodeJS{' '}
        <SiNodedotjs className={ICON_CLASS_NAME} />
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
