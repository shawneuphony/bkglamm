"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
  openInNewTab?: boolean;
}

interface NavbarClientProps {
  logo: string;
  links: NavLink[];
  cta: {
    label: string;
    href: string;
  };
}

export default function NavbarClient({ logo, links, cta }: NavbarClientProps) {
  const [open, setOpen]       = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY]     = useState(0);

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY || y < 80);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 flex justify-center px-4 md:px-8 pt-5 md:pt-7 transition-all duration-500",
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}
      >
        <nav className="w-full max-w-5xl flex items-center justify-between px-5 md:px-7 py-3 md:py-3.5 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/10">

          {/* Brand */}
          <Link
            href="/"
            className="font-display text-[1.05rem] md:text-[1.1rem] font-semibold text-white/90 tracking-wide hover:text-white transition-colors"
          >
            {logo}
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7 lg:gap-9">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  target={link.openInNewTab ? "_blank" : undefined}
                  rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                  className="text-[0.73rem] font-body font-normal tracking-[0.08em] uppercase text-white/50 hover:text-white/95 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <Link
            href={cta.href}
            className="hidden md:inline-flex items-center text-[0.73rem] font-body font-medium tracking-[0.06em] uppercase text-white/90 bg-white/10 hover:bg-white/20 border border-white/[0.18] hover:border-white/35 px-5 py-2.5 rounded-full transition-all"
          >
            {cta.label}
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/70 hover:text-white p-1 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile full-screen drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/92 backdrop-blur-xl flex flex-col pt-24 px-8 gap-6 md:hidden",
          "transition-all duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Mobile links */}
        {links.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            target={link.openInNewTab ? "_blank" : undefined}
            rel={link.openInNewTab ? "noopener noreferrer" : undefined}
            className="font-display text-3xl font-light text-white/70 hover:text-white transition-colors"
            style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        {/* Mobile CTA */}
        <Link
          href={cta.href}
          className="mt-4 inline-flex self-start text-sm font-body tracking-widest uppercase font-medium text-white/90 bg-white/10 border border-white/20 hover:bg-white/20 px-6 py-3 rounded-full transition-all"
          onClick={() => setOpen(false)}
        >
          {cta.label}
        </Link>
      </div>
    </>
  );
}