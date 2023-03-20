import { Mobile } from './mobile'
import { Tablet } from './tablet'
import { useMatchMedia } from '../../../hooks'
import { Logo, NextLink } from '../../atoms'

export const Navigation = (): JSX.Element => {
  const isTablet = useMatchMedia('(min-width: 768px)')

  return (
    <nav className='relative flex flex-wrap items-center justify-between p-2 md:py-12 md:px-12'>
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
