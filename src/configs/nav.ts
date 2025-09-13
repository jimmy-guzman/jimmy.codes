interface Link {
  href: `/${string}` | `mailto:${string}` | `https://${string}`;
  label: string;
  icon: `icon-[${"lucide" | "mdi" | "simple-icons"}--${string}]`;
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
    href: "mailto:hi@jimmy.codes",
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
    icon: "icon-[mdi--resume]",
    download: true,
  },
  {
    href: "https://github.com/jimmy-guzman",
    label: "GitHub",
    icon: "icon-[simple-icons--github]",
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/jimmy-guzman-moreno",
    label: "LinkedIn",
    icon: "icon-[simple-icons--linkedin]",
    external: true,
  },
  {
    href: "/rss.xml",
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
    icon: "icon-[mdi--resume]",
    download: true,
    primary: true,
  },
  {
    href: "mailto:hi@jimmy.codes",
    label: "Email",
    icon: "icon-[lucide--mail]",
  },
  {
    href: "https://github.com/jimmy-guzman",
    label: "GitHub",
    icon: "icon-[simple-icons--github]",
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/jimmy-guzman-moreno",
    label: "LinkedIn",
    icon: "icon-[simple-icons--linkedin]",
    external: true,
  },
  {
    href: "/rss.xml",
    label: "RSS",
    icon: "icon-[lucide--rss]",
  },
];
