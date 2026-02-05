import { urls } from "./urls";

interface Link {
  href: `/${string}` | `mailto:${string}` | `https://${string}`;
  label: Capitalize<string>;
  icon: `icon-[lucide--${string}]`;
  external?: boolean;
  primary?: boolean;
}

export const mobile: Link[] = [
  {
    href: "/about",
    icon: "icon-[lucide--user]",
    label: "About",
    primary: true,
  },
  {
    href: "/blog",
    icon: "icon-[lucide--newspaper]",
    label: "Blog",
    primary: true,
  },
  {
    href: urls.email,
    icon: "icon-[lucide--mail]",
    label: "Email",
    primary: true,
  },
  {
    href: "/",
    icon: "icon-[lucide--home]",
    label: "Home",
  },
  {
    href: "/resume.pdf",
    icon: "icon-[lucide--file-user]",
    label: "Resume",
  },
  {
    external: true,
    href: urls.GitHub,
    icon: "icon-[lucide--github]",
    label: "GitHub",
  },
  {
    external: true,
    href: urls.LinkedIn,
    icon: "icon-[lucide--linkedin]",
    label: "LinkedIn",
  },
  {
    href: "/blog/rss.xml",
    icon: "icon-[lucide--rss]",
    label: "RSS",
  },
];

export const desktop: Link[] = [
  {
    href: "/",
    icon: "icon-[lucide--home]",
    label: "Home",
    primary: true,
  },
  {
    href: "/about",
    icon: "icon-[lucide--user]",
    label: "About",
    primary: true,
  },
  {
    href: "/blog",
    icon: "icon-[lucide--newspaper]",
    label: "Blog",
    primary: true,
  },
  {
    href: "/resume.pdf",
    icon: "icon-[lucide--file-user]",
    label: "Resume",
    primary: true,
  },
  {
    href: urls.email,
    icon: "icon-[lucide--mail]",
    label: "Email",
  },
  {
    external: true,
    href: urls.GitHub,
    icon: "icon-[lucide--github]",
    label: "GitHub",
  },
  {
    external: true,
    href: urls.LinkedIn,
    icon: "icon-[lucide--linkedin]",
    label: "LinkedIn",
  },
  {
    href: "/blog/rss.xml",
    icon: "icon-[lucide--rss]",
    label: "RSS",
  },
];
