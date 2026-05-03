import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
      style={{ background: "#0e0b08" }}
    >
      {/* Ambient gold glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      <div className="relative z-10 space-y-6">
        <p className="font-display font-light leading-none select-none" style={{ fontSize: "8rem", color: "#2e2419" }}>
          404
        </p>
        <h1 className="font-display text-3xl font-normal" style={{ color: "#f0e6d3" }}>
          Page not found
        </h1>
        <p className="font-body text-base leading-relaxed max-w-sm mx-auto" style={{ color: "#9a8470" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4 pt-2">
          <Link
            href="/"
            className="font-body text-sm tracking-widest uppercase font-medium px-6 py-3 rounded-full transition-all"
            style={{ color: "#c9a96e", border: "1px solid rgba(201,169,110,0.35)", background: "transparent" }}
          >
            Go home
          </Link>
          <Link
            href="/shop"
            className="font-body text-sm tracking-widest uppercase font-normal transition-colors"
            style={{ color: "#5a4e42" }}
          >
            Browse looks →
          </Link>
        </div>
      </div>
    </main>
  );
}