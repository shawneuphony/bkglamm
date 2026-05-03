import type { Metadata } from "next";
import CatalogGrid from "@/components/sections/CatalogGrid";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse our full catalog of curated products.",
};

// Revalidate every 60 seconds so new products appear without a full redeploy
export const revalidate = 60;

export default function ShopPage() {
  return (
    <main className="min-h-screen pt-28" style={{ background: "#0e0b08" }}>
      <CatalogGrid />
    </main>
  );
}