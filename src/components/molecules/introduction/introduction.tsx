import { AstroIcon, RustIcon, TauriIcon } from '../../../icons'
import { Link, Prose } from '../../atoms'
import { commonTechnologies } from './config'
import { ICON_CLASS_NAME } from './constants'

export const Introduction = (): JSX.Element => {
  return (
    <Prose>
      <h1>
        Hi, I&apos;m Jimmy{' '}
        <span className='bg-witch-haze-50 bg-clip-text text-transparent'>
          👋
        </span>
      </h1>
      <p>
        I&apos;m a engineer with an expertise in front end development and a
        passion for sharing my knowledge with others.
      </p>
      <p>
        I dabble in a multitude of technologies, but here are the most common:
      </p>
      <ul>
        {commonTechnologies.map(({ name, icon, link }) => (
          <li key={name}>
            <Link to={link} isExternal>
              {name} {icon}
            </Link>
          </li>
        ))}
      </ul>
      <p>
        And I&apos;m currently playing with{' '}
        <Link to='https://astro.build/' isExternal>
          Astro <AstroIcon className={ICON_CLASS_NAME} />
        </Link>
        ,{' '}
        <Link to='https://tauri.studio/' isExternal>
          Tauri <TauriIcon className={ICON_CLASS_NAME} />
        </Link>{' '}
        and{' '}
        <Link to='https://www.rust-lang.org/' isExternal>
          Rust <RustIcon className={ICON_CLASS_NAME} />
        </Link>
        .
      </p>
      <p>
        To find out <Link to='/about'>more about me</Link> or to{' '}
        <Link to='/blog'>read my blog</Link>.{' '}
        <span className='bg-hot-pink-400 bg-clip-text text-transparent'>
          ❤️
        </span>
      </p>
    </Prose>
  )
}
