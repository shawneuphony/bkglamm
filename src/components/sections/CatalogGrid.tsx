import { getPayload } from "payload";
import config from "@payload-config";
import Image from "next/image";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────
interface MediaObject {
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface ProductImage {
  image: MediaObject | string;
  alt?: string;
}

interface CategoryObject {
  id: string;
  title?: string;
  slug?: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  images: ProductImage[];
  category: CategoryObject | string;
  featured: boolean;
  status: string;
}

// ── Data fetching ─────────────────────────────────────────────
async function getProducts(): Promise<Product[]> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "products",
      where: { status: { equals: "published" } },
      sort: "-featured,-createdAt",
      limit: 100,
      depth: 2,
    });
    return result.docs as unknown as Product[];
  } catch (err) {
    console.error("[CatalogGrid] Failed to fetch products:", err);
    return [];
  }
}

// ── Helpers ───────────────────────────────────────────────────
function getImageUrl(images: ProductImage[]): string {
  const first = images?.[0];
  if (!first) return "/placeholder.jpg";
  const img = first.image;
  if (typeof img === "string") return img;
  return img?.url ?? "/placeholder.jpg";
}

function getImageAlt(product: Product): string {
  const first = product.images?.[0];
  if (!first) return product.name;
  return (
    first.alt ??
    (typeof first.image !== "string" ? first.image?.alt : undefined) ??
    product.name
  );
}

function getCategoryLabel(category: CategoryObject | string): string {
  if (!category) return "";
  if (typeof category === "string") return category;
  return category.title ?? "";
}

function formatPrice(price: number): string {
  return `P${price.toFixed(2)}`;
}

// ── Empty state ───────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-40 text-center">
      <div className="w-14 h-14 rounded-2xl bg-[#C9962A]/[0.08] border border-[#C9962A]/15 flex items-center justify-center mb-6">
        <svg
          className="w-6 h-6 text-[#C9962A]/30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      </div>
      <p className="font-display text-2xl text-[#C9962A]/40 mb-2">
        No products yet
      </p>
      <p className="font-body text-sm text-[#C9962A]/25 max-w-xs">
        Add products in the admin panel — they'll appear here automatically.
      </p>
    </div>
  );
}

// ── Product card ──────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const imageUrl      = getImageUrl(product.images);
  const imageAlt      = getImageAlt(product);
  const categoryLabel = getCategoryLabel(product.category);
  const isOnSale      =
    product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <Link href={`/shop/${product.slug}`} className="group block">

      {/* Image */}
      <div className="relative overflow-hidden rounded-2xl bg-[#2A1500]/60 border border-[#C9962A]/[0.12] aspect-[3/4]">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 90vw, 40vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#1A0D04]/0 group-hover:bg-[#1A0D04]/20 transition-all duration-300" />

        {/* Sale badge */}
        {isOnSale && (
          <div className="absolute top-3 left-3 bg-rose-500/85 backdrop-blur-sm text-white text-[0.6rem] font-body font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full">
            Sale
          </div>
        )}

        {/* Featured badge */}
        {product.featured && !isOnSale && (
          <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-[0.6rem] font-body font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full">
            Featured
          </div>
        )}

        {/* View hint */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <span className="bg-[#1A0D04]/60 backdrop-blur-md border border-[#C9962A]/30 text-[#F5C842]/90 text-[0.68rem] font-body tracking-widest uppercase px-5 py-2 rounded-full whitespace-nowrap">
            View product
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 space-y-1.5 px-1">
        {categoryLabel && (
          <span className="inline-block text-[0.62rem] font-body font-semibold tracking-[0.12em] uppercase text-[#C9962A]/50 border border-[#C9962A]/[0.18] px-2.5 py-0.5 rounded-full">
            {categoryLabel}
          </span>
        )}
        <p className="font-display text-[1.1rem] font-normal text-[#F5DC90]/85 group-hover:text-[#F5C842] transition-colors leading-snug">
          {product.name}
        </p>
        {product.description && (
          <p className="font-body text-[0.8rem] text-[#C9962A]/40 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="flex items-center gap-2.5 pt-0.5">
          <span className="font-body text-sm text-[#F5DC90]/75">
            {formatPrice(product.price)}
          </span>
          {isOnSale && (
            <span className="font-body text-sm text-[#C9962A]/30 line-through">
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ── Main component ────────────────────────────────────────────
export default async function CatalogGrid() {
  const products = await getProducts();

  if (products.length === 0) return <EmptyState />;

  // Split products into left and right columns
  const leftCol  = products.filter((_, i) => i % 2 === 0);
  const rightCol = products.filter((_, i) => i % 2 !== 0);

  return (
    <section className="w-full px-6 lg:px-10 py-24">

      {/* Section header */}
      <div className="max-w-2xl mx-auto flex h-64 items-center justify-center">
        <div className="space-y-2 ">
          <h2 className="font-display text-4xl md:text-7xl font-bold text-[#F5DC90]/90 leading-none">
            get glamm'd up!
          </h2>
        </div>
      </div>

      {/*
        Two-column offset grid:
        - Centred on the page (max-w-2xl keeps it narrow and editorial)
        - Left column: starts at the top (no offset)
        - Right column: pushed down by ~140px to create the stagger
        Both columns share the same gap between cards
      */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-x-40 gap-y-0">

        {/* Left column */}
        <div className="flex flex-col gap-10">
          {leftCol.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Right column — offset downward */}
        <div className="flex flex-col gap-10 mt-36">
          {rightCol.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}