import { EnvelopeIcon } from '@heroicons/react/24/solid'
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons'

import { Logo, NavLink, NextLink } from '../../atoms'
import { EMAIL_LINK, GITHUB_LINK, LINKEDIN_LINK } from './constants'
import { Mobile } from './mobile'
import { Tablet } from './tablet'

export const Navigation = () => {
  return (
    <div className='dsy-navbar bg-base-100'>
      <div className='dsy-navbar-start'>
        <Mobile />
        <NextLink href='/' className='dsy-btn dsy-btn-ghost text-xl'>
          <Logo />
        </NextLink>
      </div>
      <div className='dsy-navbar-center hidden lg:flex'>
        <Tablet />
      </div>
      <div className='dsy-navbar-end'>
        <NavLink to={EMAIL_LINK} isExternal className='dsy-btn dsy-btn-circle'>
          <EnvelopeIcon
            title='Mail'
            aria-hidden={false}
            className='h-4 w-4 md:h-6 md:w-6'
          />
        </NavLink>
        <NavLink to={GITHUB_LINK} isExternal className='dsy-btn dsy-btn-circle'>
          <SiGithub className='h-4 w-4 md:h-6 md:w-6' />
        </NavLink>
        <NavLink
          to={LINKEDIN_LINK}
          isExternal
          className='dsy-btn dsy-btn-circle'
        >
          <SiLinkedin className='h-4 w-4 md:h-6 md:w-6' />
        </NavLink>
      </div>
    </div>
  )
}
