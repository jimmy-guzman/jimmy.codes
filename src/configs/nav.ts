import { urls } from "./urls";

interface Link {
  href: `/${string}` | `mailto:${string}` | `https://${string}`;
  label: Capitalize<string>;
  icon: `icon-[lucide--${string}]`;
  external?: boolean;
  primary?: boolean;
}

const home: Link = { href: "/", icon: "icon-[lucide--home]", label: "Home" };
const about: Link = {
  href: "/about",
  icon: "icon-[lucide--user]",
  label: "About",
};
const blog: Link = {
  href: "/blog",
  icon: "icon-[lucide--newspaper]",
  label: "Blog",
};
const resume: Link = {
  href: "/resume.pdf",
  icon: "icon-[lucide--file-user]",
  label: "Resume",
};
const email: Link = {
  href: urls.email,
  icon: "icon-[lucide--mail]",
  label: "Email",
};
const github: Link = {
  external: true,
  href: urls.GitHub,
  icon: "icon-[lucide--github]",
  label: "GitHub",
};
const linkedin: Link = {
  external: true,
  href: urls.LinkedIn,
  icon: "icon-[lucide--linkedin]",
  label: "LinkedIn",
};
const rss: Link = {
  href: "/blog/rss.xml",
  icon: "icon-[lucide--rss]",
  label: "RSS",
};

export const mobile: Link[] = [
  { ...about, primary: true },
  { ...blog, primary: true },
  { ...email, primary: true },
  home,
  resume,
  github,
  linkedin,
  rss,
];

export const desktop: Link[] = [
  { ...home, primary: true },
  { ...about, primary: true },
  { ...blog, primary: true },
  { ...resume, primary: true },
  email,
  github,
  linkedin,
  rss,
];
