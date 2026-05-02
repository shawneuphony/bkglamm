import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

// ── Generate static params for all published products ─────────
export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "products",
      where: { status: { equals: "published" } },
      limit: 1000,
      select: { slug: true },
    });
    return result.docs.map((p: any) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

// ── Metadata ──────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "products",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });
    const product = result.docs[0] as any;
    if (!product) return { title: "Product not found" };
    return {
      title: product.name,
      description: product.description ?? "",
    };
  } catch {
    return { title: "Product" };
  }
}

// ── Page ──────────────────────────────────────────────────────
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "products",
    where: {
      slug:   { equals: slug },
      status: { equals: "published" },
    },
    depth: 2,
    limit: 1,
  });

  const product = result.docs[0] as any;
  if (!product) notFound();

  const primaryImage =
    product.images?.[0]?.image?.url ?? "/placeholder.jpg";
  const primaryAlt =
    product.images?.[0]?.alt ??
    product.images?.[0]?.image?.alt ??
    product.name;

  const categoryLabel =
    typeof product.category === "object"
      ? product.category?.title
      : product.category;

  const isOnSale =
    product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <main className="min-h-screen bg-[#09090f] pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">

        {/* Back link */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 font-body text-[0.75rem] tracking-widest uppercase text-white/35 hover:text-white/70 transition-colors mb-12"
        >
          ← Back to catalog
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Images ── */}
          <div className="space-y-3">
            {/* Primary image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white/[0.04] border border-white/[0.07]">
              <Image
                src={primaryImage}
                alt={primaryAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Thumbnail strip */}
            {product.images?.length > 1 && (
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {product.images.map((img: any, i: number) => {
                  const url = img?.image?.url ?? img?.image ?? "";
                  const alt = img?.alt ?? product.name;
                  return (
                    <div
                      key={i}
                      className="relative shrink-0 w-20 h-24 rounded-xl overflow-hidden bg-white/[0.04] border border-white/[0.07]"
                    >
                      <Image
                        src={url}
                        alt={alt}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Details ── */}
          <div className="space-y-8 lg:pt-4">

            {/* Category + featured */}
            <div className="flex items-center gap-2">
              {categoryLabel && (
                <span className="text-[0.65rem] font-body font-semibold tracking-[0.12em] uppercase text-white/35 border border-white/10 px-2.5 py-1 rounded-full">
                  {categoryLabel}
                </span>
              )}
              {product.featured && (
                <span className="text-[0.65rem] font-body font-semibold tracking-[0.12em] uppercase text-amber-400/70 border border-amber-400/20 px-2.5 py-1 rounded-full">
                  Featured
                </span>
              )}
            </div>

            {/* Name */}
            <h1 className="font-display text-4xl md:text-5xl font-normal text-white/90 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-body text-2xl font-medium text-white/90">
                P{product.price.toFixed(2)}
              </span>
              {isOnSale && (
                <span className="font-body text-lg text-white/30 line-through">
                  P{product.compareAtPrice.toFixed(2)}
                </span>
              )}
              {isOnSale && (
                <span className="font-body text-sm text-rose-400 font-medium">
                  Save P{(product.compareAtPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="font-body text-base text-white/50 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Stock */}
            <p className="font-body text-sm text-white/30">
              {product.stock > 0
                ? `${product.stock} in stock`
                : "Out of stock"}
            </p>

            {/* CTA */}
            <div className="flex gap-3 pt-2">
              <button
                disabled={product.stock === 0}
                className="flex-1 font-body text-[0.8rem] tracking-widest uppercase font-medium text-white/90 bg-white/10 hover:bg-white/20 border border-white/[0.18] hover:border-white/35 py-4 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {product.stock > 0 ? "Add to cart" : "Out of stock"}
              </button>
              <button
                disabled={product.stock === 0}
                className="font-body text-[0.8rem] tracking-widest uppercase font-medium text-white/90 bg-white/[0.06] hover:bg-white/15 border border-white/10 px-6 py-4 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ♡
              </button>
            </div>

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {product.tags.map((t: { tag: string }, i: number) => (
                  <span
                    key={i}
                    className="font-body text-[0.65rem] tracking-widest uppercase text-white/25 border border-white/[0.07] px-2.5 py-1 rounded-full"
                  >
                    {t.tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}