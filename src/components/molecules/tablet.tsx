import { NavLink } from "../atoms/nav-link";
import { navLinks } from "../constants";

export const Tablet = () => {
  return (
    <ul className="dsy-menu dsy-menu-horizontal gap-2 px-1">
      {navLinks.map(({ name, path }) => {
        return (
          <li key={name}>
            <NavLink to={path}>{name}</NavLink>
          </li>
        );
      })}
    </ul>
  );
};
