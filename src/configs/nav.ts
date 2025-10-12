import { urls } from "./urls";

interface Link {
  href: `/${string}` | `mailto:${string}` | `https://${string}`;
  label: string;
  icon: `icon-[lucide--${string}]`;
  external?: boolean;
  download?: boolean;
  primary?: boolean;
}

export const mobile: Link[] = [
  {
    href: "/about",
    label: "About",
    icon: "icon-[lucide--user]",
    primary: true,
  },
  {
    href: "/blog",
    label: "Blog",
    icon: "icon-[lucide--newspaper]",
    primary: true,
  },
  {
    href: urls.email,
    label: "Email",
    icon: "icon-[lucide--mail]",
    primary: true,
  },
  {
    href: "/",
    label: "Home",
    icon: "icon-[lucide--home]",
  },
  {
    href: "/resume.pdf",
    label: "Resume",
    icon: "icon-[lucide--file-user]",
    download: true,
  },
  {
    href: urls.GitHub,
    label: "GitHub",
    icon: "icon-[lucide--github]",
    external: true,
  },
  {
    href: urls.LinkedIn,
    label: "LinkedIn",
    icon: "icon-[lucide--linkedin]",
    external: true,
  },
  {
    href: "/blog/rss.xml",
    label: "RSS",
    icon: "icon-[lucide--rss]",
  },
];

export const desktop: Link[] = [
  {
    href: "/",
    label: "Home",
    icon: "icon-[lucide--home]",
    primary: true,
  },
  {
    href: "/about",
    label: "About",
    icon: "icon-[lucide--user]",
    primary: true,
  },
  {
    href: "/blog",
    label: "Blog",
    icon: "icon-[lucide--newspaper]",
    primary: true,
  },
  {
    href: "/resume.pdf",
    label: "Resume",
    icon: "icon-[lucide--file-user]",
    download: true,
    primary: true,
  },
  {
    href: urls.email,
    label: "Email",
    icon: "icon-[lucide--mail]",
  },
  {
    href: urls.GitHub,
    label: "GitHub",
    icon: "icon-[lucide--github]",
    external: true,
  },
  {
    href: urls.LinkedIn,
    label: "LinkedIn",
    icon: "icon-[lucide--linkedin]",
    external: true,
  },
  {
    href: "/blog/rss.xml",
    label: "RSS",
    icon: "icon-[lucide--rss]",
  },
];
