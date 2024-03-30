import {
  SiAstro,
  SiBun,
  SiKotlin,
  SiRust,
} from '@icons-pack/react-simple-icons'
import Link from 'next/link'

import { ExtLink } from '../atoms/ext-link'
import { Prose } from '../atoms/prose'
import { commonTechnologies } from './intro.config'

const ICON_CLASS_NAME = 'inline-block h-4 fill-white align-baseline'

// eslint-disable-next-line max-lines-per-function
export const Intro = () => {
  return (
    <Prose>
      <h1>
        Hi, I&apos;m Jimmy{' '}
        <span className='bg-accent bg-clip-text text-transparent'>👋</span>
      </h1>
      <p>
        I&apos;m a engineer with an expertise in <strong>full stack</strong>{' '}
        development. I have primarily worked in <strong>leadership</strong>{' '}
        roles, successfully delivering scalable solutions and mentoring teams.
      </p>
      <ul>
        <li>I&apos;m currently working at Target as a Lead Engineer.</li>
        <li>I&apos;m based out of Minneapolis, MN and California.</li>
        <li>I love reading fiction, biking and sipping on coffee.</li>
      </ul>
      <p>
        I dabble in a multitude of technologies, but here are the most common:
      </p>
      <ul>
        {commonTechnologies.map(({ name, Icon, link }) => (
          <li key={name}>
            <ExtLink to={link}>
              {name} <Icon className={ICON_CLASS_NAME} />
            </ExtLink>
          </li>
        ))}
      </ul>
      <p>
        And I&apos;m currently playing with{' '}
        <ExtLink to='https://astro.build'>
          Astro <SiAstro className={ICON_CLASS_NAME} />
        </ExtLink>
        ,{' '}
        <ExtLink to='https://www.rust-lang.org'>
          Rust <SiRust className={ICON_CLASS_NAME} />
        </ExtLink>
        ,{' '}
        <ExtLink to='https://kotlinlang.org'>
          Kotlin <SiKotlin className={ICON_CLASS_NAME} />
        </ExtLink>{' '}
        and{' '}
        <ExtLink to='https://bun.sh/'>
          Bun <SiBun className={ICON_CLASS_NAME} />
        </ExtLink>
        .
      </p>
      <p>
        To find out{' '}
        <Link href='/about' className='dsy-link-hover dsy-link'>
          more about me
        </Link>{' '}
        or to{' '}
        <Link href='/blog' className='dsy-link-hover dsy-link'>
          read my blog
        </Link>
        . <span className='bg-accent bg-clip-text text-transparent'>❤️</span>
      </p>
    </Prose>
  )
}
