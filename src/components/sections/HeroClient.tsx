"use client";

import { useEffect, useRef } from "react";

type BackgroundType = "gradient" | "image" | "video";
type OverlayOpacity = "light" | "medium" | "heavy";

interface HeroClientProps {
  backgroundType:  BackgroundType;
  videoUrl?:       string;
  overlayOpacity?: OverlayOpacity;
  colors?: {
    topRight:    string;
    bottomLeft:  string;
    midLeft:     string;
    bottomRight: string;
  };
}

const overlayMap: Record<OverlayOpacity, string> = {
  light:  "bg-black/20",
  medium: "bg-black/50",
  heavy:  "bg-black/75",
};

export default function HeroClient({
  backgroundType,
  videoUrl,
  overlayOpacity = "medium",
  colors,
}: HeroClientProps) {
  const blobRef  = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (backgroundType !== "gradient") return;
    const onMove = (e: MouseEvent) => {
      if (!blobRef.current) return;
      const x = (e.clientX / window.innerWidth  - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      blobRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [backgroundType]);

  useEffect(() => {
    if (backgroundType !== "video" || !videoRef.current) return;
    videoRef.current.play().catch(() => {});
  }, [backgroundType]);

  if (backgroundType === "gradient") {
    return (
      <div
        ref={blobRef}
        className="absolute inset-0 transition-transform duration-700 ease-out pointer-events-none"
      >
        <div
          className="absolute w-[560px] h-[560px] rounded-full blur-[110px] -top-24 right-12 opacity-70"
          style={{ backgroundColor: colors?.topRight ?? "#C9962A" }}
        />
        <div
          className="absolute w-[440px] h-[440px] rounded-full blur-[100px] bottom-0 -left-16 opacity-65"
          style={{ backgroundColor: colors?.bottomLeft ?? "#8D5524" }}
        />
        <div
          className="absolute w-[360px] h-[360px] rounded-full blur-[90px] top-32 -left-10 opacity-55"
          style={{ backgroundColor: colors?.midLeft ?? "#4A2912" }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full blur-[80px] bottom-20 right-48 opacity-60"
          style={{ backgroundColor: colors?.bottomRight ?? "#F5C842" }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px",
          }}
        />
      </div>
    );
  }

  if (backgroundType === "video" && videoUrl) {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${overlayMap[overlayOpacity]}`} />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px",
          }}
        />
      </div>
    );
  }

  return null;
}