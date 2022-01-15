interface BadgeProps {
  children: React.ReactNode
}

export const Badge = ({ children }: BadgeProps): JSX.Element => {
  return (
    <span className='rounded bg-white px-2 py-1 text-xs font-semibold leading-none text-material-gray'>
      {children}
    </span>
  )
}
