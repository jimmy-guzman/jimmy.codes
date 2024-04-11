import { Bars3Icon } from "@heroicons/react/24/solid";

import { NavLink } from "../atoms/nav-link";
import { navLinks } from "../constants";

export const Mobile = () => {
  return (
    <div className="dsy-dropdown">
      <div
        tabIndex={0}
        role="button"
        className="dsy-btn dsy-btn-ghost lg:hidden"
      >
        <Bars3Icon className="h-5 w-5" />
      </div>
      <ul
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        className="dsy-menu dsy-dropdown-content dsy-menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
      >
        {navLinks.map(({ path, name }) => {
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
