"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/demo", label: "Gap Analyzer" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white" onClick={() => setOpen(false)}>
          ClaimPilot AI
        </Link>
        <nav className="hidden items-center gap-4 text-sm text-slate-300 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-sky-300">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/demo" className="btn-primary px-3 py-1.5 text-xs" onClick={() => setOpen(false)}>
            Analyzer
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-slate-200"
            aria-expanded={open}
            aria-controls="claimpilot-mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden>{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="claimpilot-mobile-nav"
          className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-white/10 px-6 py-4 md:hidden"
          aria-label="Mobile"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-slate-200 hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
