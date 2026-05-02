import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

// Serif display font — matches the editorial darkness of the design
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Clean geometric body font
const body = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Storefront – Curated Products",
  description: "A living catalog of products made for real life.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="antialiased bg-[#09090f] text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}