interface LinkProps {
  children?: React.ReactNode
  isExternal?: boolean
  to: string
}

export const Link = ({ children, isExternal, to }: LinkProps) => {
  return (
    <a
      href={to}
      className='dsy-link-hover dsy-link'
      {...(isExternal && { rel: 'noreferrer', target: '_blank' })}
    >
      {children}
    </a>
  )
}
