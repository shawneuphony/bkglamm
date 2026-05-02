import { getPayload } from "payload";
import config from "@payload-config";
import NavbarClient from "./NavbarClient";

// Fallback data shown if the Navigation global hasn't been seeded yet
const FALLBACK = {
  logo: "Storefront",
  links: [
    { label: "Shop",       href: "/shop",       openInNewTab: false },
    { label: "Categories", href: "/categories", openInNewTab: false },
    { label: "About",      href: "/about",      openInNewTab: false },
    { label: "Journal",    href: "/journal",    openInNewTab: false },
    { label: "Contact",    href: "/contact",    openInNewTab: false },
  ],
  cta: { label: "Shop Now", href: "/shop" },
};

async function getNavigation() {
  try {
    const payload = await getPayload({ config });
    const nav = await payload.findGlobal({ slug: "navigation" });

    return {
      logo:  nav.logo  || FALLBACK.logo,
      links: (nav.links && nav.links.length > 0) ? nav.links : FALLBACK.links,
      cta: {
        label: nav.cta?.label || FALLBACK.cta.label,
        href:  nav.cta?.href  || FALLBACK.cta.href,
      },
    };
  } catch (err) {
    // If Payload isn't ready yet (e.g. first boot), return fallback silently
    console.warn("[Navbar] Could not fetch navigation global, using fallback.", err);
    return FALLBACK;
  }
}

export default async function Navbar() {
  const { logo, links, cta } = await getNavigation();

  return (
    <NavbarClient
      logo={logo}
      links={links as { label: string; href: string; openInNewTab?: boolean }[]}
      cta={cta}
    />
  );
}