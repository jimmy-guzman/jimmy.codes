import { MailIcon, GithubIcon, LinkedInIcon } from '../../../icons'
import { NavLink } from '../../atoms'
import { navLinks, EMAIL_LINK, GITHUB_LINK, LINKEDIN_LINK } from './constants'

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
          <MailIcon className='h-4 w-4 md:h-6 md:w-6' />
        </NavLink>
        <NavLink to={GITHUB_LINK} isExternal>
          <GithubIcon className='h-4 w-4 md:h-6 md:w-6' />
        </NavLink>
        <NavLink to={LINKEDIN_LINK} isExternal>
          <LinkedInIcon className='h-4 w-4 md:h-6 md:w-6' />
        </NavLink>
      </div>
    </>
  )
}
