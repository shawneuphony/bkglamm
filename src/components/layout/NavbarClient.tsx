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
  cta: { label: string; href: string };
}

export default function NavbarClient({ logo, links, cta }: NavbarClientProps) {
  const [open, setOpen]       = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY]     = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY || y < 80);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

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
        {/*
          Pill nav — warm dark glass with gold border,
          matching the navbar visible in the screenshot
        */}
        <nav
          className="w-full max-w-5xl flex items-center justify-between px-6 md:px-8 py-3 md:py-3.5 rounded-full"
          style={{
            background: "rgba(14, 11, 8, 0.65)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(201, 169, 110, 0.25)",
          }}
        >
          {/* Brand */}
          <Link
            href="/"
            className="font-display text-[1.05rem] md:text-[1.1rem] font-semibold tracking-wide transition-colors"
            style={{ color: "#c9a96e" }}
          >
            {logo}
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-9">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  target={link.openInNewTab ? "_blank" : undefined}
                  rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                  className="text-[0.72rem] font-body font-normal tracking-[0.1em] uppercase transition-colors"
                  style={{ color: "rgba(240, 230, 211, 0.55)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#c9a96e")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(240, 230, 211, 0.55)")}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA — gold outlined pill matching screenshot */}
          <Link
            href={cta.href}
            className="hidden md:inline-flex items-center font-body text-[0.72rem] font-semibold tracking-[0.1em] uppercase px-5 py-2.5 rounded-full transition-all"
            style={{
              color: "#c9a96e",
              border: "1px solid rgba(201, 169, 110, 0.5)",
              background: "transparent",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(201, 169, 110, 0.1)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(201, 169, 110, 0.8)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(201, 169, 110, 0.5)";
            }}
          >
            {cta.label}
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-1 transition-colors"
            style={{ color: "#c9a96e" }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col pt-24 px-8 gap-6 md:hidden transition-all duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ background: "rgba(10, 8, 5, 0.97)", backdropFilter: "blur(24px)" }}
      >
        {links.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-display text-3xl font-light transition-colors"
            style={{
              color: "rgba(240, 230, 211, 0.7)",
              transitionDelay: open ? `${i * 40}ms` : "0ms",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#c9a96e")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(240, 230, 211, 0.7)")}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href={cta.href}
          className="mt-4 inline-flex self-start font-body text-sm tracking-widest uppercase font-medium px-6 py-3 rounded-full"
          style={{
            color: "#c9a96e",
            border: "1px solid rgba(201, 169, 110, 0.4)",
          }}
          onClick={() => setOpen(false)}
        >
          {cta.label}
        </Link>
      </div>
    </>
  );
}