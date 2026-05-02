import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookNowButton from "@/components/ui/BookNowButton";

export const revalidate = 60;

// ── Static params ─────────────────────────────────────────────
export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config });
    const result  = await payload.find({
      collection: "products",
      where:  { status: { equals: "published" } },
      limit:  1000,
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
    const result  = await payload.find({
      collection: "products",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });
    const product = result.docs[0] as any;
    if (!product) return { title: "Product not found" };
    return {
      title:       product.name,
      description: product.description ?? "",
    };
  } catch {
    return { title: "Product" };
  }
}

// ── Fetch WhatsApp number from SiteSettings ───────────────────
async function getWhatsappNumber(): Promise<string> {
  try {
    const payload = await getPayload({ config });
    const settings = await payload.findGlobal({ slug: "site-settings" });
    return (settings.whatsappNumber as string) || "26771234567";
  } catch {
    return "26771234567"; // fallback
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

  // Fetch product and WhatsApp number in parallel
  const [productResult, whatsappNumber] = await Promise.all([
    payload.find({
      collection: "products",
      where: {
        slug:   { equals: slug },
        status: { equals: "published" },
      },
      depth: 2,
      limit: 1,
    }),
    getWhatsappNumber(),
  ]);

  const product = productResult.docs[0] as any;
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

            {product.images?.length > 1 && (
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
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
          <div className="space-y-7 lg:pt-4">

            {/* Category + featured badges */}
            <div className="flex items-center gap-2 flex-wrap">
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
              {isOnSale && (
                <span className="text-[0.65rem] font-body font-semibold tracking-[0.12em] uppercase text-rose-400/80 border border-rose-400/20 px-2.5 py-1 rounded-full">
                  On sale
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
                <>
                  <span className="font-body text-lg text-white/30 line-through">
                    P{product.compareAtPrice.toFixed(2)}
                  </span>
                  <span className="font-body text-sm text-rose-400 font-medium">
                    Save P{(product.compareAtPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="font-body text-base text-white/50 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Divider */}
            <div className="border-t border-white/[0.07]" />

            {/* Stock indicator */}
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  product.stock > 0 ? "bg-emerald-400" : "bg-white/20"
                }`}
              />
              <p className="font-body text-sm text-white/35">
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </p>
            </div>

            {/* ── Book Now button ── */}
            <BookNowButton
              productName={product.name}
              productPrice={product.price}
              productSlug={product.slug}
              whatsappNumber={whatsappNumber}
              stock={product.stock}
            />

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
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