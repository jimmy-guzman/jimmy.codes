import type { ReactNode } from "react";

import { cn } from "../../lib/cn";

interface ExtLinkProps {
  children?: ReactNode;
  to: `https://${string}.${string}` | `mailto:${string}@${string}.${string}`;
  isIcon?: boolean;
}

export const ExtLink = ({ children, to, isIcon = false }: ExtLinkProps) => {
  return (
    <a
      href={to}
      className={cn(
        isIcon ? "dsy-btn dsy-btn-circle" : "dsy-link-hover dsy-link",
      )}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
};
