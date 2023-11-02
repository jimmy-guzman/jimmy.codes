import { EnvelopeIcon } from '@heroicons/react/24/solid'
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons'

import { navLinks, EMAIL_LINK, GITHUB_LINK, LINKEDIN_LINK } from './constants'
import { NavLink } from '../../atoms'

export const Tablet = (): JSX.Element => {
  return (
    <>
      <div className='flex items-center gap-8 text-center'>
        {navLinks.map(({ path, name }) => (
          <NavLink to={path} key={name} isBig>
            {name}
          </NavLink>
        ))}
      </div>
      <div className='flex flex-col items-center justify-around gap-2 md:flex-row md:gap-4'>
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
