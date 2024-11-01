import Link from "next/link";

import { ExtLink } from "../atoms/ext-link";
import { Prose } from "../atoms/prose";
import { commonTechnologies } from "./intro.config";

const ICON_CLASS_NAME = "inline-block h-4 fill-white align-baseline";

export const Intro = () => {
  return (
    <Prose>
      <h1>
        Hi, I&apos;m Jimmy{" "}
        <span className="bg-accent bg-clip-text text-transparent">👋</span>
      </h1>
      <p>
        I&apos;m an engineer specializing in <strong>full stack</strong>{" "}
        development. My primary experience lies in <strong>leadership</strong>{" "}
        roles, where I have successfully delivered scalable solutions and
        mentored teams.
      </p>
      <p>
        I have expertise in various technologies, but here are the ones I use
        most frequently:
      </p>
      <ul>
        {commonTechnologies.map(({ Icon, link, name }) => {
          return (
            <li key={name}>
              <ExtLink to={link}>
                {name} <Icon className={ICON_CLASS_NAME} />
              </ExtLink>
            </li>
          );
        })}
      </ul>
      <p>
        For{" "}
        <Link className="dsy-link-hover dsy-link" href="/about">
          more information about me
        </Link>{" "}
        or to{" "}
        <Link className="dsy-link-hover dsy-link" href="/blog">
          read my blog
        </Link>
        , please follow the links.
        <span className="bg-accent bg-clip-text text-transparent">❤️</span>
      </p>
    </Prose>
  );
};
