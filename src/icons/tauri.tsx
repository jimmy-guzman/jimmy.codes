import { SVGIconProps } from './types'

export const TauriIcon = ({ className }: SVGIconProps): JSX.Element => {
  return (
    <svg
      role='img'
      viewBox='0 0 200 240'
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      className={className}
    >
      <title>Tauri</title>
      <path d='M143.1 84a22 22 0 11-44 0 22 22 0 0144 0z' />
      <circle cx='84.1' cy='147' r='22' />
      <path d='M166.7 154.5a84 84 0 01-29 11.8 59 59 0 002.9-26.6 59 59 0 10-67.4-90.1A98 98 0 0041 59a84 84 0 11125.7 95.5zM42 74.3l20.6 2.5a59 59 0 012.6-11.7A84 84 0 0042 74.3z' />
      <path d='M38.4 76.5a84 84 0 0129.2-11.9 58.9 58.9 0 00-3.3 26.7 59 59 0 1067.7 90 98 98 0 0032.2-9.3A84 84 0 1138.4 76.5zm124.7 80.2l-.4.2.4-.2z' />
    </svg>
  )
}
