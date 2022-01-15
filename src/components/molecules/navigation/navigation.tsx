import { useMatchMedia } from '../../../hooks'
import { Logo, NextLink } from '../../atoms'
import { Mobile } from './mobile'
import { Tablet } from './tablet'

export const Navigation = (): JSX.Element => {
  const isTablet = useMatchMedia('(min-width: 768px)')

  return (
    <nav className='p relative flex flex-wrap items-center justify-between bg-gray-800 p-2 md:py-12 md:px-12'>
      <NextLink
        href='/'
        className='flex text-xl font-light tracking-widest md:text-2xl'
      >
        <Logo />
      </NextLink>

      {isTablet ? <Tablet /> : <Mobile />}
    </nav>
  )
}
