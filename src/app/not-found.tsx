import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#09090f] flex flex-col items-center justify-center px-6 text-center">

      {/* Ambient glow */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-violet-700/30 blur-[120px] pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <p className="font-display text-[8rem] font-light text-white/10 leading-none select-none">
          404
        </p>

        <h1 className="font-display text-3xl font-semibold text-white/90">
          Page not found
        </h1>

        <p className="font-body text-white/45 max-w-sm mx-auto text-base leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-4 pt-2">
          <Link
            href="/"
            className="font-body text-sm tracking-widest uppercase font-medium text-white/90 glass glass-hover px-6 py-3 rounded-full transition-all"
          >
            Go home
          </Link>
          <Link
            href="/shop"
            className="font-body text-sm tracking-widest uppercase font-normal text-white/45 hover:text-white/80 transition-colors"
          >
            Browse shop →
          </Link>
        </div>
      </div>
    </main>
  );
}