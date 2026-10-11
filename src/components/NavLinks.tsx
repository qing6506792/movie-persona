"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/config/site";

const baseClass =
  "inline-flex min-h-11 items-center rounded-full px-2.5 text-sm transition-colors hover:bg-white/5 hover:text-cream sm:px-3";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map((item) => {
        const active =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`${baseClass} ${
              active ? "bg-white/5 text-cream" : "text-mist"
            }`}
          >
            {item.short ? (
              <>
                <span className="sm:hidden">{item.short}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </>
            ) : (
              item.label
            )}
          </Link>
        );
      })}
    </>
  );
}