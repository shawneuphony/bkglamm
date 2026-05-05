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

// ── Empty state – using product page palette ──────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-40 text-center">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: "#1a1510", border: "1px solid #2e2419" }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ color: "#8a6e3e" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      </div>
      <p className="font-display text-2xl mb-2 drop-shadow" style={{ color: "#f0e6d3" }}>
        No products yet
      </p>
      <p className="font-body text-sm max-w-xs" style={{ color: "#9a8470" }}>
        Add products in the admin panel — they'll appear here automatically.
      </p>
    </div>
  );
}

// ── Product card – pure CSS hover (no event handlers) ─────────
function ProductCard({ product }: { product: Product }) {
  const imageUrl = getImageUrl(product.images);
  const imageAlt = getImageAlt(product);
  const categoryLabel = getCategoryLabel(product.category);
  const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div
        className="relative overflow-hidden rounded-2xl transition-all duration-300 aspect-[3/4]"
        style={{
          background: "#1a1510",
          border: "1px solid #2e2419",
        }}
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 90vw, 40vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Gradient overlay – shown on group hover using CSS only */}
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
          }}
        />

        {isOnSale && (
          <div
            className="absolute top-3 left-3 text-white text-[0.6rem] font-body font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-lg"
            style={{ background: "#c9a96e", color: "#0e0b08" }}
          >
            Sale
          </div>
        )}

        {product.featured && !isOnSale && (
          <div
            className="absolute top-3 left-3 text-[0.6rem] font-body font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-lg"
            style={{ background: "#c9a96e", color: "#0e0b08" }}
          >
            Featured
          </div>
        )}

        <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <span
            className="text-[0.68rem] font-body tracking-widest uppercase px-5 py-2 rounded-full whitespace-nowrap shadow-lg"
            style={{ background: "#0e0b08cc", backdropFilter: "blur(8px)", color: "#c9a96e", border: "1px solid #c9a96e40" }}
          >
            View product
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-1.5 px-1">
        {categoryLabel && (
          <span
            className="inline-block text-[0.62rem] font-body font-semibold tracking-[0.12em] uppercase px-2.5 py-0.5 rounded-full"
            style={{ color: "#8a6e3e", border: "1px solid rgba(138,110,62,0.3)" }}
          >
            {categoryLabel}
          </span>
        )}
        <p
          className="font-display text-[1.1rem] font-normal leading-snug drop-shadow-sm transition-colors group-hover:text-[#c9a96e]"
          style={{ color: "#f0e6d3" }}
        >
          {product.name}
        </p>
        {product.description && (
          <p className="font-body text-[0.8rem] leading-relaxed line-clamp-2" style={{ color: "#9a8470" }}>
            {product.description}
          </p>
        )}
        <div className="flex items-center gap-2.5 pt-0.5">
          <span className="font-body text-sm" style={{ color: "#c9a96e" }}>
            {formatPrice(product.price)}
          </span>
          {isOnSale && (
            <span className="font-body text-sm line-through" style={{ color: "#5a4e42" }}>
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

  const leftCol = products.filter((_, i) => i % 2 === 0);
  const rightCol = products.filter((_, i) => i % 2 !== 0);

  return (
  <section className="w-full px-6 lg:px-10 py-24">
    <div className="max-w-2xl mx-auto flex h-64 items-center justify-center">
      <div className="space-y-2 text-center">
        <h2
          className="font-display text-4xl md:text-7xl font-bold leading-none drop-shadow-lg"
          style={{ color: "#c9a96e" }}
        >
          our look book
        </h2>
      </div>
    </div>

    {/* Mobile: single column block list */}
    <div className="md:hidden max-w-sm mx-auto flex flex-col gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>

    {/* Desktop: staggered two-column layout */}
    <div className="hidden md:grid max-w-4xl mx-auto grid-cols-2 gap-x-40 gap-y-0">
      {/* Left column */}
      <div className="flex flex-col gap-10">
        {leftCol.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Right column – offset downward */}
      <div className="flex flex-col gap-10 mt-36">
        {rightCol.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </section>
);
} /* end */