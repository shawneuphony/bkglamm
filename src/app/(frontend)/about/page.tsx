import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

// ── Fallback data ─────────────────────────────────────────────
const FALLBACK = {
  hero: {
    eyebrow:  "Our story",
    headline: "We curate what matters.",
    subtext:
      "We started with a simple belief — that great products shouldn't be hard to find. So we built a catalog that does the searching for you.",
    image: null,
  },
  mission: {
    label:     "What we believe",
    statement: "Our mission is to connect people with products that are made thoughtfully, priced fairly, and built to last.",
    pillars: [
      { title: "Thoughtful curation",  description: "Every product is reviewed before it reaches the catalog." },
      { title: "Honest pricing",       description: "No hidden fees, no inflated compare-at prices."           },
      { title: "Built to last",        description: "We only list products built with longevity in mind."      },
    ],
  },
  stats: [
    { value: "500+",   label: "Products curated"  },
    { value: "12,000", label: "Happy customers"   },
    { value: "3",      label: "Years running"     },
    { value: "100%",   label: "Quality verified"  },
  ],
  team: {
    label:    "The people behind it",
    headline: "Built by a small team with big taste.",
    members:  [],
  },
  cta: {
    headline:    "Ready to explore the catalog?",
    subtext:     "Browse products curated for real life.",
    buttonLabel: "Shop now",
    buttonHref:  "/shop",
  },
};

// ── Data fetching ─────────────────────────────────────────────
async function getAboutData() {
  try {
    const payload = await getPayload({ config });
    const data    = await payload.findGlobal({ slug: "about-page", depth: 1 });
    return {
      hero: {
        eyebrow:  data.hero?.eyebrow  || FALLBACK.hero.eyebrow,
        headline: data.hero?.headline || FALLBACK.hero.headline,
        subtext:  data.hero?.subtext  || FALLBACK.hero.subtext,
        image:    (data.hero?.image   as any) ?? null,
      },
      mission: {
        label:     data.mission?.label     || FALLBACK.mission.label,
        statement: data.mission?.statement || FALLBACK.mission.statement,
        pillars:   (data.mission?.pillars  && data.mission.pillars.length > 0)
          ? data.mission.pillars
          : FALLBACK.mission.pillars,
      },
      stats:   (data.stats  && (data.stats as any[]).length  > 0) ? data.stats  as any[] : FALLBACK.stats,
      team: {
        label:    data.team?.label    || FALLBACK.team.label,
        headline: data.team?.headline || FALLBACK.team.headline,
        members:  (data.team?.members && (data.team.members as any[]).length > 0)
          ? data.team.members as any[]
          : FALLBACK.team.members,
      },
      cta: {
        headline:    data.cta?.headline    || FALLBACK.cta.headline,
        subtext:     data.cta?.subtext     || FALLBACK.cta.subtext,
        buttonLabel: data.cta?.buttonLabel || FALLBACK.cta.buttonLabel,
        buttonHref:  data.cta?.buttonHref  || FALLBACK.cta.buttonHref,
      },
    };
  } catch {
    return FALLBACK;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:       "About",
    description: "Learn about who we are and what we stand for.",
  };
}

// ── Page ──────────────────────────────────────────────────────
export default async function AboutPage() {
  const { hero, mission, stats, team, cta } = await getAboutData();

  return (
    <main className="min-h-screen bg-[#09090f] text-white">

      {/* ── Hero ── */}
      <section className="pt-40 pb-20 px-6 lg:px-10 max-w-5xl mx-auto">
        <div className="space-y-6 max-w-2xl">
          {hero.eyebrow && (
            <p className="text-[0.68rem] font-body tracking-[0.18em] uppercase text-white/35">
              {hero.eyebrow}
            </p>
          )}
          <h1
            className="font-display font-normal text-white/90 leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
          >
            {hero.headline}
          </h1>
          {hero.subtext && (
            <p className="font-body text-lg text-white/45 leading-relaxed max-w-xl">
              {hero.subtext}
            </p>
          )}
        </div>

        {/* Hero image */}
        {hero.image?.url && (
          <div className="mt-16 relative w-full aspect-[16/7] rounded-2xl overflow-hidden border border-white/[0.07]">
            <Image
              src={hero.image.url}
              alt={hero.image.alt ?? hero.headline}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1024px"
              className="object-cover object-center"
            />
          </div>
        )}
      </section>

      {/* ── Stats row ── */}
      {stats.length > 0 && (
        <section className="py-16 px-6 lg:px-10 border-y border-white/[0.06]">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat: any, i: number) => (
              <div key={i} className="space-y-1 text-center md:text-left">
                <p className="font-display text-4xl md:text-5xl font-normal text-white/85">
                  {stat.value}
                </p>
                <p className="font-body text-sm text-white/35 tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Mission ── */}
      <section className="py-24 px-6 lg:px-10 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Statement */}
          <div className="space-y-4">
            {mission.label && (
              <p className="text-[0.68rem] font-body tracking-[0.18em] uppercase text-white/35">
                {mission.label}
              </p>
            )}
            <blockquote
              className="font-display font-normal text-white/80 leading-snug"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
            >
              "{mission.statement}"
            </blockquote>
          </div>

          {/* Pillars */}
          <div className="space-y-4">
            {(mission.pillars as any[]).map((pillar: any, i: number) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.07] space-y-1.5 hover:bg-white/[0.07] transition-colors"
              >
                <p className="font-body text-sm font-medium text-white/75">
                  {pillar.title}
                </p>
                {pillar.description && (
                  <p className="font-body text-sm text-white/35 leading-relaxed">
                    {pillar.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      {team.members.length > 0 && (
        <section className="py-24 px-6 lg:px-10 border-t border-white/[0.06]">
          <div className="max-w-5xl mx-auto space-y-16">

            <div className="space-y-3">
              {team.label && (
                <p className="text-[0.68rem] font-body tracking-[0.18em] uppercase text-white/35">
                  {team.label}
                </p>
              )}
              <h2
                className="font-display font-normal text-white/85"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
              >
                {team.headline}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {team.members.map((member: any, i: number) => (
                <div key={i} className="space-y-4">
                  {/* Photo */}
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white/[0.04] border border-white/[0.07]">
                    {member.photo?.url ? (
                      <Image
                        src={member.photo.url}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-top"
                      />
                    ) : (
                      // Placeholder initials
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-display text-4xl text-white/20">
                          {member.name?.charAt(0) ?? "?"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-0.5 px-1">
                    <p className="font-body text-sm font-medium text-white/80">
                      {member.name}
                    </p>
                    {member.role && (
                      <p className="font-body text-xs text-white/35 tracking-wide">
                        {member.role}
                      </p>
                    )}
                    {member.bio && (
                      <p className="font-body text-xs text-white/30 leading-relaxed pt-1">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-32 px-6 text-center border-t border-white/[0.06]">
        <div className="max-w-lg mx-auto space-y-6">
          {/* Ambient glow */}
          <div className="absolute left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-violet-700/20 blur-[100px] pointer-events-none" />

          <h2
            className="relative font-display font-normal text-white/90"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            {cta.headline}
          </h2>
          {cta.subtext && (
            <p className="relative font-body text-white/40 text-base">
              {cta.subtext}
            </p>
          )}
          <div className="relative pt-2">
            <Link
              href={cta.buttonHref}
              className="inline-flex items-center font-body text-[0.75rem] tracking-[0.12em] uppercase font-medium text-white/90 bg-white/10 hover:bg-white/20 border border-white/[0.18] hover:border-white/35 px-8 py-3.5 rounded-full transition-all"
            >
              {cta.buttonLabel}
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}