import { getPayload } from "payload";
import config from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import HeroClient from "./HeroClient";

type BackgroundType  = "gradient" | "image" | "video";
type OverlayOpacity  = "light" | "medium" | "heavy";

interface HeroData {
  backgroundType:   BackgroundType;
  backgroundImage?: { url?: string; alt?: string } | null;
  backgroundVideo?: { url?: string }               | null;
  overlayOpacity:   OverlayOpacity;
  gradientColors: {
    topRight:    string;
    bottomLeft:  string;
    midLeft:     string;
    bottomRight: string;
  };
  headline:     string;
  badge:        string;
  scrollLabel:  string;
  primaryCta:   { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

const FALLBACK: HeroData = {
  backgroundType:  "gradient",
  backgroundImage: null,
  backgroundVideo: null,
  overlayOpacity:  "medium",
  gradientColors: {
    topRight:    "#C9962A",
    bottomLeft:  "#8D5524",
    midLeft:     "#4A2912",
    bottomRight: "#F5C842",
  },
  headline:     "A living catalog.",
  badge:        "New arrivals every week",
  scrollLabel:  "Scroll",
  primaryCta:   { label: "Browse the catalog", href: "/shop"  },
  secondaryCta: { label: "Learn more",          href: "/about" },
};

async function getHeroData(): Promise<HeroData> {
  try {
    const payload = await getPayload({ config });
    const data    = await payload.findGlobal({
      slug:  "homepage-hero",
      depth: 1,
    });

    return {
      backgroundType:  (data.backgroundType  as BackgroundType)  || "gradient",
      overlayOpacity:  (data.overlayOpacity  as OverlayOpacity)  || "medium",
      backgroundImage: (data.backgroundImage as any)             ?? null,
      backgroundVideo: (data.backgroundVideo as any)             ?? null,
      gradientColors: {
        topRight:    data.gradientColors?.topRight    || FALLBACK.gradientColors.topRight,
        bottomLeft:  data.gradientColors?.bottomLeft  || FALLBACK.gradientColors.bottomLeft,
        midLeft:     data.gradientColors?.midLeft     || FALLBACK.gradientColors.midLeft,
        bottomRight: data.gradientColors?.bottomRight || FALLBACK.gradientColors.bottomRight,
      },
      headline:     data.headline              || FALLBACK.headline,
      badge:        data.badge                 ?? FALLBACK.badge,
      scrollLabel:  data.scrollLabel           ?? FALLBACK.scrollLabel,
      primaryCta: {
        label: data.primaryCta?.label          || FALLBACK.primaryCta.label,
        href:  data.primaryCta?.href           || FALLBACK.primaryCta.href,
      },
      secondaryCta: {
        label: data.secondaryCta?.label        || FALLBACK.secondaryCta.label,
        href:  data.secondaryCta?.href         || FALLBACK.secondaryCta.href,
      },
    };
  } catch (err) {
    console.warn("[Hero] Could not fetch homepage-hero global, using fallback.", err);
    return FALLBACK;
  }
}

const overlayMap: Record<OverlayOpacity, string> = {
  light:  "bg-black/20",
  medium: "bg-black/50",
  heavy:  "bg-black/75",
};

export default async function Hero() {
  const data = await getHeroData();
  const {
    backgroundType,
    backgroundImage,
    backgroundVideo,
    overlayOpacity,
    gradientColors,
    headline,
    badge,
    scrollLabel,
    primaryCta,
    secondaryCta,
  } = data;

  const imageUrl = backgroundImage?.url ?? null;
  const videoUrl = backgroundVideo?.url ?? null;
  const imageAlt = backgroundImage?.alt ?? headline;

  return (
    <section className="relative min-h-screen bg-background overflow-hidden flex flex-col items-center justify-end pb-36">

      {backgroundType === "image" && imageUrl && (
        <>
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className={`absolute inset-0 z-[1] ${overlayMap[overlayOpacity]}`} />
          <div
            className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px",
            }}
          />
        </>
      )}

      {(backgroundType === "gradient" || backgroundType === "video") && (
        <HeroClient
          backgroundType={backgroundType}
          videoUrl={videoUrl ?? undefined}
          overlayOpacity={overlayOpacity}
          colors={gradientColors}
        />
      )}

      <div className="relative z-10 text-center px-6 mb-20 space-y-6">
        {badge && (
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur border border-primary/20 text-primary-foreground/70 text-[0.68rem] font-body font-medium tracking-[0.1em] uppercase px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
              {badge}
            </span>
          </div>
        )}
        <h1
          className="font-display font-normal text-foreground/90 leading-none tracking-tight"
          style={{ fontSize: "clamp(3.2rem, 8vw, 6.5rem)" }}
        >
          {headline}
        </h1>
      </div>

      {scrollLabel && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-[0.6rem] font-body tracking-[0.18em] uppercase text-muted-foreground">
            {scrollLabel}
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-primary/40" />
        </div>
      )}

      <div className="relative z-20 flex items-center gap-4 mb-10">
        <Link
          href={primaryCta.href}
          className="font-body text-[0.75rem] tracking-[0.1em] uppercase font-medium text-primary-foreground bg-primary hover:bg-primary/80 border border-primary/30 px-7 py-3 rounded-full transition-all"
        >
          {primaryCta.label}
        </Link>
        <Link
          href={secondaryCta.href}
          className="font-body text-[0.75rem] tracking-[0.1em] uppercase font-normal text-muted-foreground hover:text-primary transition-colors"
        >
          {secondaryCta.label} →
        </Link>
      </div>
    </section>
  );
}