import type { SVGIconProps } from './types'

export const KotlinIcon = ({ className }: SVGIconProps): JSX.Element => {
  return (
    <svg
      role='img'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      className={className}
    >
      <title>Kotlin</title>
      <path d='M24 24H0V0h24L12 12Z' />
    </svg>
  )
}
