"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  children: React.ReactNode;
  to: string;
  className?: string;
}

export const NavLink = ({ children, to, className }: NavLinkProps) => {
  const pathname = usePathname();

  const isActive = to === "/" ? pathname === to : pathname.startsWith(to);

  return (
    <Link href={to} className={clsx(className, { "dsy-btn-active": isActive })}>
      {children}
    </Link>
  );
};
