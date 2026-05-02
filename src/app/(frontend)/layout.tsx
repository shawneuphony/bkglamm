import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Storefront",
    default:  "Storefront – Curated Products",
  },
  description: "A living catalog of products made for real life.",
  openGraph: {
    siteName: "Storefront",
    type: "website",
  },
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}