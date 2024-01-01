import { EnvelopeIcon } from '@heroicons/react/24/solid'
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons'

import { NavLink } from '../../atoms'
import { EMAIL_LINK, GITHUB_LINK, LINKEDIN_LINK, navLinks } from './constants'

export const Tablet = (): JSX.Element => {
  return (
    <>
      <div className='hidden items-center gap-8 text-center sm:flex'>
        {navLinks.map(({ path, name }) => (
          <NavLink to={path} key={name} isBig>
            {name}
          </NavLink>
        ))}
      </div>
      <div className='hidden flex-col items-center justify-around gap-2 sm:flex md:flex-row md:gap-4'>
        <NavLink to={EMAIL_LINK} isExternal>
          <EnvelopeIcon
            title='Mail'
            aria-hidden={false}
            className='h-4 w-4 md:h-6 md:w-6'
          />
        </NavLink>
        <NavLink to={GITHUB_LINK} isExternal>
          <SiGithub className='h-4 w-4 md:h-6 md:w-6' />
        </NavLink>
        <NavLink to={LINKEDIN_LINK} isExternal>
          <SiLinkedin className='h-4 w-4 md:h-6 md:w-6' />
        </NavLink>
      </div>
    </>
  )
}
