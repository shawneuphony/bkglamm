import Link from "next/link";

const LINKS = {
  Shop: [
    { label: "All Products",  href: "/shop" },
    { label: "Categories",    href: "/categories" },
    { label: "New Arrivals",  href: "/shop?sort=new" },
    { label: "Sale",          href: "/shop?filter=sale" },
  ],
  Company: [
    { label: "About",         href: "/about" },
    { label: "Journal",       href: "/journal" },
    { label: "Contact",       href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy",    href: "/privacy" },
    { label: "Terms of Service",  href: "/terms" },
    { label: "Cookie Policy",     href: "/cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#09090f] mt-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">

        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

          {/* Brand blurb */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <span className="font-display text-xl font-semibold text-white/90">
              Storefront
            </span>
            <p className="text-sm font-body text-white/40 leading-relaxed max-w-[200px]">
              A living catalog of products made for real life.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading} className="space-y-4">
              <p className="text-[0.7rem] font-body font-medium tracking-[0.12em] uppercase text-white/30">
                {heading}
              </p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-body text-white/50 hover:text-white/90 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-body text-white/25">
            © {new Date().getFullYear()} Storefront. All rights reserved.
          </p>
          <p className="text-xs font-body text-white/20">
            Built with Next.js & Payload CMS
          </p>
        </div>
      </div>
    </footer>
  );
}