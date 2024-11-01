import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface ExtLinkProps {
  children?: ReactNode;
  isIcon?: boolean;
  to: `https://${string}.${string}` | `mailto:${string}@${string}.${string}`;
}

export const ExtLink = ({ children, isIcon = false, to }: ExtLinkProps) => {
  return (
    <a
      className={cn(
        isIcon ? "dsy-btn dsy-btn-circle" : "dsy-link-hover dsy-link",
      )}
      href={to}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
};
