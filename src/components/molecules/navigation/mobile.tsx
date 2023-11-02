'use client'
import { useState } from 'react'

import { MobileMenu } from './mobile-menu'
import { MobileMenuButton } from '../../atoms'

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
