import { NavLink } from '../../atoms'
import { navLinks } from './constants'

export const Tablet = () => {
  return (
    <ul className='dsy-menu dsy-menu-horizontal gap-2 px-1'>
      {navLinks.map(({ path, name }) => (
        <li key={name}>
          <NavLink to={path}>{name}</NavLink>
        </li>
      ))}
    </ul>
  )
}
