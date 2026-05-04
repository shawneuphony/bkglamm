import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

const FALLBACK = {
  hero: { eyebrow: "Our story", headline: "We curate what matters.", subtext: "We started with a simple belief — that great beauty shouldn't be hard to find.", image: null },
  mission: {
    label: "What we believe",
    statement: "Our mission is to make every client feel like the best version of themselves.",
    pillars: [
      { title: "Craft over shortcuts", description: "Every technique is practised, refined, and taken seriously." },
      { title: "You, amplified",       description: "We enhance your natural beauty — not replace it."           },
      { title: "Built on trust",       description: "When you sit in our chair, you're not a booking. You're a person." },
    ],
  },
  stats: [
    { value: "500+", label: "Clients served"      },
    { value: "3+",   label: "Years running"       },
    { value: "100%", label: "Quality guaranteed"  },
  ],
  team: { label: "The people behind it", headline: "Built by a small team with big taste.", members: [] },
  cta:  { headline: "Ready for your glow-up?", subtext: "Book your appointment via WhatsApp.", buttonLabel: "Book now", buttonHref: "/shop" },
};

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
        pillars:   ((data.mission?.pillars as any[])?.length > 0)
  ? data.mission?.pillars as any[]
  : FALLBACK.mission.pillars,
      },
      stats:   ((data.stats as any[])?.length > 0) ? data.stats as any[] : FALLBACK.stats,
      team: {
        label:    data.team?.label    || FALLBACK.team.label,
        headline: data.team?.headline || FALLBACK.team.headline,
        members:  ((data.team?.members as any[])?.length > 0) ? data.team?.members as any[] : [],
      },
      cta: {
        headline:    data.cta?.headline    || FALLBACK.cta.headline,
        subtext:     data.cta?.subtext     || FALLBACK.cta.subtext,
        buttonLabel: data.cta?.buttonLabel || FALLBACK.cta.buttonLabel,
        buttonHref:  data.cta?.buttonHref  || FALLBACK.cta.buttonHref,
      },
    };
  } catch { return FALLBACK; }
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: "About", description: "Learn about BKGlamm and what we stand for." };
}

export default async function AboutPage() {
  const { hero, mission, stats, team, cta } = await getAboutData();

  return (
    <main className="min-h-screen" style={{ background: "#0e0b08", color: "#f0e6d3" }}>

      {/* ── Hero ── */}
      <section className="pt-40 pb-20 px-6 lg:px-10 max-w-5xl mx-auto">
        <div className="space-y-6 max-w-2xl">
          {hero.eyebrow && (
            <p className="text-[0.68rem] font-body tracking-[0.18em] uppercase" style={{ color: "#8a6e3e" }}>
              {hero.eyebrow}
            </p>
          )}
          <h1
            className="font-display font-normal leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "#f0e6d3" }}
          >
            {hero.headline}
          </h1>
          {hero.subtext && (
            <p className="font-body text-lg leading-relaxed max-w-xl" style={{ color: "#9a8470" }}>
              {hero.subtext}
            </p>
          )}
        </div>

        {hero.image?.url && (
          <div
            className="mt-16 relative w-full aspect-[16/7] rounded-2xl overflow-hidden"
            style={{ border: "1px solid #2e2419" }}
          >
            <Image
              src={hero.image.url}
              alt={hero.image.alt ?? hero.headline}
              fill priority
              sizes="(max-width: 1280px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        )}
      </section>

      {/* ── Stats ── */}
      {stats.length > 0 && (
        <section className="py-16 px-6 lg:px-10" style={{ borderTop: "1px solid #2e2419", borderBottom: "1px solid #2e2419" }}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat: any, i: number) => (
              <div key={i} className="space-y-1 text-center md:text-left">
                <p className="font-display text-4xl md:text-5xl font-normal" style={{ color: "#c9a96e" }}>
                  {stat.value}
                </p>
                <p className="font-body text-sm tracking-wide" style={{ color: "#9a8470" }}>
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
          <div className="space-y-4">
            {mission.label && (
              <p className="text-[0.68rem] font-body tracking-[0.18em] uppercase" style={{ color: "#8a6e3e" }}>
                {mission.label}
              </p>
            )}
            <blockquote
              className="font-display font-normal leading-snug"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "#f0e6d3" }}
            >
              "{mission.statement}"
            </blockquote>
          </div>

          {/* Pillar cards — hover via CSS class .card-warm */}
          <div className="space-y-4">
            {(mission.pillars as any[]).map((pillar: any, i: number) => (
              <div key={i} className="card-warm p-5 space-y-1.5">
                <p className="font-body text-sm font-medium" style={{ color: "#c9a96e" }}>
                  {pillar.title}
                </p>
                {pillar.description && (
                  <p className="font-body text-sm leading-relaxed" style={{ color: "#9a8470" }}>
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
        <section className="py-24 px-6 lg:px-10" style={{ borderTop: "1px solid #2e2419" }}>
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="space-y-3">
              {team.label && (
                <p className="text-[0.68rem] font-body tracking-[0.18em] uppercase" style={{ color: "#8a6e3e" }}>
                  {team.label}
                </p>
              )}
              <h2
                className="font-display font-normal"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#f0e6d3" }}
              >
                {team.headline}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {team.members.map((member: any, i: number) => (
                <div key={i} className="space-y-4">
                  <div
                    className="relative aspect-[4/5] rounded-2xl overflow-hidden"
                    style={{ background: "#1a1510", border: "1px solid #2e2419" }}
                  >
                    {member.photo?.url ? (
                      <Image
                        src={member.photo.url}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-display text-4xl" style={{ color: "#3d3020" }}>
                          {member.name?.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-0.5 px-1">
                    <p className="font-body text-sm font-medium" style={{ color: "#f0e6d3" }}>{member.name}</p>
                    {member.role && <p className="font-body text-xs tracking-wide" style={{ color: "#8a6e3e" }}>{member.role}</p>}
                    {member.bio  && <p className="font-body text-xs leading-relaxed pt-1" style={{ color: "#9a8470" }}>{member.bio}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section
        className="py-32 px-6 text-center relative overflow-hidden"
        style={{ borderTop: "1px solid #2e2419" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(201,169,110,0.06) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-lg mx-auto space-y-6">
          <h2
            className="font-display font-normal"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f0e6d3" }}
          >
            {cta.headline}
          </h2>
          {cta.subtext && (
            <p className="font-body text-base" style={{ color: "#9a8470" }}>
              {cta.subtext}
            </p>
          )}
          <div className="pt-2">
            {/* btn-gold-outline — pure CSS hover, no JS needed */}
            <Link href={cta.buttonHref} className="btn-gold-outline">
              {cta.buttonLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}