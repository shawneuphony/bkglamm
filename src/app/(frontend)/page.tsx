import Hero from "@/components/sections/Hero";
import CatalogGrid from "@/components/sections/CatalogGrid";

export const revalidate = 60;

export default function HomePage() {
  return (
    <main>
      <Hero />
      <CatalogGrid />
    </main>
  );
}