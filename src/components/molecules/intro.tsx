import {
  SiAstro,
  SiKotlin,
  SiRust,
  SiTrpc,
} from '@icons-pack/react-simple-icons'
import Link from 'next/link'

import { ExtLink } from '../atoms/ext-link'
import { Prose } from '../atoms/prose'
import { commonTechnologies } from './intro.config'
import { ICON_CLASS_NAME } from './intro.constants'

// eslint-disable-next-line max-lines-per-function
export const Intro = () => {
  return (
    <Prose>
      <h1>
        Hi, I&apos;m Jimmy{' '}
        <span className='bg-accent bg-clip-text text-transparent'>👋</span>
      </h1>
      <p>
        I&apos;m a engineer with an expertise in full stack development and a
        passion for sharing my knowledge with others.
      </p>
      <p>
        I dabble in a multitude of technologies, but here are the most common:
      </p>
      <ul>
        {commonTechnologies.map(({ name, icon, link }) => (
          <li key={name}>
            <ExtLink to={link}>
              {name} {icon}
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
        <ExtLink to='https://trpc.io'>
          tRPC <SiTrpc className={ICON_CLASS_NAME} />
        </ExtLink>
        ,{' '}
        <ExtLink to='https://www.rust-lang.org'>
          Rust <SiRust className={ICON_CLASS_NAME} />
        </ExtLink>{' '}
        and{' '}
        <ExtLink to='https://kotlinlang.org'>
          Kotlin <SiKotlin className={ICON_CLASS_NAME} />
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
