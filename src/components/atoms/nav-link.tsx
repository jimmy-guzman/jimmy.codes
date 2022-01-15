import clsx from 'clsx'
import { useRouter } from 'next/router'

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
  isExternal,
  to,
}: NavLinkProps): JSX.Element => {
  const router = useRouter()

  return (
    <NextLink
      href={to}
      className={clsx('hover:text-spring-green-250', {
        'text-slate-300': router.pathname !== to,
        'text-spring-green-250': router.pathname === to,
        'font-semi-bold text-xl md:text-xl lg:mt-0': isBig,
      })}
      isExternal={isExternal}
    >
      {children}
    </NextLink>
  )
}
