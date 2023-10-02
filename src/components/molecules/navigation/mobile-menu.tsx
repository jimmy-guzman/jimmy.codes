import { navLinks, EMAIL_LINK, GITHUB_LINK, LINKEDIN_LINK } from './constants'
import { MailIcon, GithubIcon, LinkedInIcon } from '../../../icons'
import { NavLink } from '../../atoms'

export const MobileMenu = (): JSX.Element => {
  return (
    <div className='absolute right-0 top-10 z-50 flex h-screen w-full flex-col justify-start gap-4 bg-oxford-blue p-4 text-center shadow-md'>
      <div className='flex flex-col justify-center gap-2'>
        {navLinks.map(({ path, name }) => (
          <NavLink to={path} key={name} isBig>
            {name}
          </NavLink>
        ))}
      </div>
      <div className='flex items-center justify-center gap-8'>
        <NavLink to={EMAIL_LINK} isExternal>
          <MailIcon className='h-6 w-6' />
        </NavLink>
        <NavLink to={GITHUB_LINK} isExternal>
          <GithubIcon className='h-6 w-6' />
        </NavLink>
        <NavLink to={LINKEDIN_LINK} isExternal>
          <LinkedInIcon className='h-6 w-6' />
        </NavLink>
      </div>
    </div>
  )
}