interface BadgeProps {
  children: React.ReactNode
}

export const Badge = ({ children }: BadgeProps) => {
  return <span className='dsy-badge dsy-badge-neutral'>{children}</span>
}
