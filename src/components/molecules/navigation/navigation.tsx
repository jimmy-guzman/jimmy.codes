import { Mobile } from './mobile'
import { Tablet } from './tablet'
import { Logo, NextLink } from '../../atoms'

export const Navigation = (): JSX.Element => {
  return (
    <nav className='relative flex flex-wrap items-center justify-between p-2 md:px-12 md:py-12'>
      <NextLink
        href='/'
        className='flex text-xl font-light tracking-widest md:text-2xl'
      >
        <Logo />
      </NextLink>
      <Tablet />
      <Mobile />
    </nav>
  )
}
