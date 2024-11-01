import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { SiGithub, SiLinkedin } from "@icons-pack/react-simple-icons";
import Link from "next/link";

import { ExtLink } from "../atoms/ext-link";
import { Logo } from "../atoms/logo";
import { EMAIL_LINK, GITHUB_LINK, LINKEDIN_LINK } from "../constants";
import { Mobile } from "../molecules/mobile";
import { Tablet } from "../molecules/tablet";

export const Navigation = () => {
  return (
    <div className="dsy-navbar bg-base-100">
      <div className="dsy-navbar-start">
        <Mobile />
        <Link className="dsy-btn dsy-btn-ghost text-xl" href="/">
          <Logo />
        </Link>
      </div>
      <div className="dsy-navbar-center hidden lg:flex">
        <Tablet />
      </div>
      <div className="dsy-navbar-end">
        <ExtLink isIcon to={EMAIL_LINK}>
          <EnvelopeIcon
            aria-hidden={false}
            className="h-4 w-4 md:h-6 md:w-6"
            title="Mail"
          />
        </ExtLink>
        <ExtLink isIcon to={GITHUB_LINK}>
          <SiGithub className="h-4 w-4 md:h-6 md:w-6" />
        </ExtLink>
        <ExtLink isIcon to={LINKEDIN_LINK}>
          <SiLinkedin className="h-4 w-4 md:h-6 md:w-6" />
        </ExtLink>
      </div>
    </div>
  );
};
