import { EnvelopeIcon } from '@heroicons/react/24/solid'
import { SiGithub, SiLinkedin } from '@icons-pack/react-simple-icons'
import Link from 'next/link'

import { ExtLink, Logo } from '../../atoms'
import { EMAIL_LINK, GITHUB_LINK, LINKEDIN_LINK } from './constants'
import { Mobile } from './mobile'
import { Tablet } from './tablet'

export const Navigation = () => {
  return (
    <div className='dsy-navbar bg-base-100'>
      <div className='dsy-navbar-start'>
        <Mobile />
        <Link href='/' className='dsy-btn dsy-btn-ghost text-xl'>
          <Logo />
        </Link>
      </div>
      <div className='dsy-navbar-center hidden lg:flex'>
        <Tablet />
      </div>
      <div className='dsy-navbar-end'>
        <ExtLink to={EMAIL_LINK} isIcon>
          <EnvelopeIcon
            title='Mail'
            aria-hidden={false}
            className='h-4 w-4 md:h-6 md:w-6'
          />
        </ExtLink>
        <ExtLink to={GITHUB_LINK} isIcon>
          <SiGithub className='h-4 w-4 md:h-6 md:w-6' />
        </ExtLink>
        <ExtLink to={LINKEDIN_LINK} isIcon>
          <SiLinkedin className='h-4 w-4 md:h-6 md:w-6' />
        </ExtLink>
      </div>
    </div>
  )
}
