import clsx from 'clsx'
import { usePathname } from 'next/navigation'

import { NextLink } from './next-link'

interface NavLinkProps {
  children: React.ReactNode
  isBig?: boolean
  isExternal?: boolean
  to: string
}

export const NavLink = ({
  children,
  isBig,
  isExternal = false,
  to,
}: NavLinkProps): JSX.Element => {
  const pathname = usePathname()

  return (
    <NextLink
      href={to}
      className={clsx('hover:text-spring-green-250', {
        'text-slate-300': pathname !== to,
        'text-spring-green-250': pathname === to,
        'font-semi-bold text-xl md:text-xl lg:mt-0': isBig,
      })}
      isExternal={isExternal}
    >
      {children}
    </NextLink>
  )
}
