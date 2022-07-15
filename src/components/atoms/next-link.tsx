import Link from 'next/link'

import type { LinkProps } from 'next/link'

type NextLinkProps = LinkProps & {
  children: React.ReactNode
  className?: string
  href: string
  isExternal?: boolean
}

/**
 * Standard way of using the Next's `Link` tag together with the `a` tag
 * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/issues/402
 */
export const NextLink = ({
  href,
  className,
  children,
  isExternal,
  ...rest
}: NextLinkProps): JSX.Element => {
  return (
    <Link href={href} {...rest}>
      <a
        href={href}
        className={className}
        {...(isExternal && { rel: 'noreferrer', target: '_blank' })}
      >
        {children}
      </a>
    </Link>
  )
}
