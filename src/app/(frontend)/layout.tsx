import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | bkglamm",
    default:  "bkglamm",
  },
  description: "get glamm'd up",
  openGraph: {
    siteName: "bkglamm",
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