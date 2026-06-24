import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: "Bloomere Studio — Where soft art quietly blooms",
    template: "%s | Bloomere Studio",
  },
  description:
    "Watercolor digital prints for your home. Botanical art, soft landscapes, and fruit illustrations by Márcia Firmo. Instant download.",
  keywords: [
    "watercolor prints",
    "botanical wall art",
    "digital download",
    "cottagecore decor",
    "printable art",
    "soft landscapes",
  ],
  authors: [{ name: "Márcia Firmo", url: "https://www.instagram.com/mfirmo_08/" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Bloomere Studio",
    title: "Bloomere Studio — Where soft art quietly blooms",
    description:
      "Watercolor digital prints for your home. Botanical art, soft landscapes, and fruit illustrations. Instant download.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
