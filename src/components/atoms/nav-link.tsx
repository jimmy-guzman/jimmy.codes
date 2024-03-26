'use client'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

import { NextLink } from './next-link'

interface NavLinkProps {
  children: React.ReactNode
  isExternal?: boolean
  to: string
  className?: string
}

export const NavLink = ({
  children,
  isExternal = false,
  to,
  className,
}: NavLinkProps) => {
  const pathname = usePathname()

  return (
    <NextLink
      href={to}
      className={clsx(className, {
        'dsy-btn-active': pathname === to,
      })}
      isExternal={isExternal}
    >
      {children}
    </NextLink>
  )
}
