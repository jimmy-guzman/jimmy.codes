"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "../../lib/cn";

interface NavLinkProps {
  children: React.ReactNode;
  to: string;
  className?: string;
}

export const NavLink = ({ children, to, className }: NavLinkProps) => {
  const pathname = usePathname();

  const isActive = to === "/" ? pathname === to : pathname.startsWith(to);

  return (
    <Link href={to} className={cn(className, { "dsy-btn-active": isActive })}>
      {children}
    </Link>
  );
};
