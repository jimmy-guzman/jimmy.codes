"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";

interface NavLinkProps {
  children: React.ReactNode;
  className?: string;
  to: string;
}

export const NavLink = ({ children, className, to }: NavLinkProps) => {
  const pathname = usePathname();

  const isActive = to === "/" ? pathname === to : pathname.startsWith(to);

  return (
    <Link className={cn(className, { "dsy-btn-active": isActive })} href={to}>
      {children}
    </Link>
  );
};
