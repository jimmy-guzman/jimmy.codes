import { useState } from 'react'

import { navLinks, EMAIL_LINK, GITHUB_LINK, LINKEDIN_LINK } from './constants'
import {
  MailIcon,
  GithubIcon,
  LinkedInIcon,
  CloseIcon,
  HamburgerIcon,
} from '../../../icons'
import { NavLink } from '../../atoms'

const MobileMenu = () => {
  return (
    <div className='absolute right-0 top-10 z-50 flex flex-col justify-end gap-4 bg-gray-800 p-4 text-center shadow-md'>
      {navLinks.map(({ path, name }) => (
        <NavLink to={path} key={name} isBig>
          {name}
        </NavLink>
      ))}
      <div className='flex items-center justify-around gap-2'>
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

const MobileMenuButton = ({
  isMobileMenuOpen,
  onClick,
}: {
  isMobileMenuOpen: boolean
  onClick: () => void
}) => {
  return (
    <button
      className='transition delay-150 ease-in-out hover:scale-110'
      onClick={onClick}
    >
      {isMobileMenuOpen ? (
        <CloseIcon className='h-6 w-6 stroke-bright-turquoise-350' />
      ) : (
        <HamburgerIcon className='h-6 w-6 stroke-bright-turquoise-350' />
      )}
    </button>
  )
}

export const Mobile = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {isMobileMenuOpen && <MobileMenu />}
      <MobileMenuButton
        isMobileMenuOpen={isMobileMenuOpen}
        onClick={() => {
          setIsMobileMenuOpen((prevIsMobileMenuOpen) => !prevIsMobileMenuOpen)
        }}
      />
    </>
  )
}
