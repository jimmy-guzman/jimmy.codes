import { Bars3Icon } from "@heroicons/react/24/solid";

import { NavLink } from "../atoms/nav-link";
import { navLinks } from "../constants";

export const Mobile = () => {
  return (
    <div className="dsy-dropdown">
      <div
        className="dsy-btn dsy-btn-ghost lg:hidden"
        role="button"
        tabIndex={0}
      >
        <Bars3Icon className="h-5 w-5" />
      </div>
      <ul
        className="dsy-menu dsy-dropdown-content dsy-menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        {navLinks.map(({ name, path }) => {
          return (
            <li key={name}>
              <NavLink to={path}>{name}</NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
