interface LinkProps {
  children?: React.ReactNode
  isExternal?: boolean
  to: string
}

export const Link = ({ children, isExternal, to }: LinkProps): JSX.Element => {
  return (
    <a
      href={to}
      className='font-medium text-bright-turquoise-350 no-underline hover:underline'
      {...(isExternal && { rel: 'noreferrer', target: '_blank' })}
    >
      {children}
    </a>
  )
}
