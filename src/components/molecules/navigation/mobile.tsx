'use client'
import { useState } from 'react'

import { MobileMenuButton } from '../../atoms'
import { MobileMenu } from './mobile-menu'

export const Mobile = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className='sm:hidden'>
      {isMobileMenuOpen && <MobileMenu />}
      <MobileMenuButton
        isMobileMenuOpen={isMobileMenuOpen}
        onClick={() => {
          setIsMobileMenuOpen((prevIsMobileMenuOpen) => !prevIsMobileMenuOpen)
        }}
      />
    </div>
  )
}
