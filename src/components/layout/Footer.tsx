import { getPayload } from "payload";
import config from "@payload-config";
import Link from "next/link";
import React from 'react'

function SocialIcon({ platform }: { platform: string }) {
  const icons: Record<string, React.ReactElement> = {
    instagram: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>),
    twitter:   (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>),
    facebook:  (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>),
    tiktok:    (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z"/></svg>),
    linkedin:  (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>),
    youtube:   (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>),
  };
  return icons[platform] ?? null;
}

const FALLBACK = {
  brandName: "bkglamm", tagline: "Beauty made for you.",
  copyrightText: "All rights reserved.",
  columns: [
    { heading: "Services", links: [{ label: "All looks", href: "/shop", openInNewTab: false }, { label: "Book now", href: "/contact", openInNewTab: false }] },
    { heading: "Company",  links: [{ label: "About", href: "/about", openInNewTab: false }, { label: "Contact", href: "/contact", openInNewTab: false }] },
    { heading: "Legal",    links: [{ label: "Privacy Policy", href: "/privacy", openInNewTab: false }, { label: "Terms", href: "/terms", openInNewTab: false }] },
  ],
  socials: [], bottomLinks: [],
};

async function getFooterData() {
  try {
    const payload = await getPayload({ config });
    const data    = await payload.findGlobal({ slug: "site-footer" });
    return {
      brandName:     data.brandName     || FALLBACK.brandName,
      tagline:       data.tagline       || FALLBACK.tagline,
      copyrightText: data.copyrightText || FALLBACK.copyrightText,
      columns:       ((data.columns     as any[])?.length > 0) ? data.columns     : FALLBACK.columns,
      socials:       ((data.socials     as any[])?.length > 0) ? data.socials     : FALLBACK.socials,
      bottomLinks:   ((data.bottomLinks as any[])?.length > 0) ? data.bottomLinks : FALLBACK.bottomLinks,
    };
  } catch { return FALLBACK; }
}

export default async function Footer() {
  const { brandName, tagline, columns, socials, copyrightText, bottomLinks } =
    await getFooterData();

  return (
    <footer
      className="mt-24"
      style={{ background: "#0e0b08", borderTop: "1px solid #2e2419" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16 space-y-14">

        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <span
              className="font-display text-xl font-semibold"
              style={{ color: "#c9a96e" }}
            >
              {brandName}
            </span>
            <p
              className="text-sm font-body leading-relaxed max-w-[200px]"
              style={{ color: "#9a8470" }}
            >
              {tagline}
            </p>

            {/* Social icons — CSS hover via .hover-social */}
            {(socials as any[]).length > 0 && (
              <div className="flex items-center gap-3 pt-2">
                {(socials as any[]).map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="hover-social"
                  >
                    <SocialIcon platform={s.platform} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns — CSS hover via .hover-gold-muted */}
          {(columns as any[]).map((col, i) => (
            <div key={i} className="space-y-4">
              <p
                className="text-[0.7rem] font-body font-medium tracking-[0.12em] uppercase"
                style={{ color: "#8a6e3e" }}
              >
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {(col.links as any[]).map((link, j) => (
                  <li key={j}>
                    <Link
                      href={link.href}
                      target={link.openInNewTab ? "_blank" : undefined}
                      rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                      className="text-sm font-body hover-gold-muted"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid #2e2419" }}
        >
          <p className="text-xs font-body" style={{ color: "#5a4e42" }}>
            © {new Date().getFullYear()} {brandName}. {copyrightText}
          </p>

          {(bottomLinks as any[]).length > 0 && (
            <div className="flex items-center gap-6">
              {(bottomLinks as any[]).map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="text-xs font-body hover-gold-faint"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}