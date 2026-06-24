import type { Metadata } from "next";
import { Instagram, ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "About Bloomere Studio — watercolor digital art from Lisbon, Portugal.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="mb-12">
        <p className="text-[10px] tracking-widest uppercase font-sans text-rose-dusty mb-3">The Studio</p>
        <h1 className="font-display text-4xl sm:text-5xl font-light text-walnut leading-tight">
          About Bloomere
        </h1>
      </div>

      <div className="w-full h-px bg-linen mb-12" />

      <div className="prose-bloomere space-y-6">
        <p className="font-display text-xl sm:text-2xl font-light text-walnut/80 leading-relaxed italic">
          "Bloommere Studio was born from my love for watercolor and everything delicate and inspiring."
        </p>

        <p className="text-base font-sans text-walnut/60 leading-relaxed">
          Each piece is created with care, from the very first brushstroke to the final details. Here you will find watercolor illustrations and digital designs made to bring beauty and creativity into your everyday life.
        </p>

        <p className="text-base font-sans text-walnut/60 leading-relaxed">
          Based in Lisbon, Portugal, Bloomere Studio celebrates the quiet beauty found in nature — in the soft hills of the countryside, the delicate leaves of a botanical garden, and the warm colours of Mediterranean fruit. All prints are available as instant digital downloads, so you can bring a piece of that beauty into your home right away.
        </p>
      </div>

      <div className="mt-12 w-full h-px bg-linen" />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="p-6 bg-linen/40 rounded-sm">
          <h3 className="font-display text-lg text-walnut mb-3">Digital Downloads</h3>
          <p className="text-sm font-sans text-walnut/60 leading-relaxed">
            All artwork is sold as high-resolution digital files. Print at home or at your local print shop in any size.
          </p>
        </div>
        <div className="p-6 bg-linen/40 rounded-sm">
          <h3 className="font-display text-lg text-walnut mb-3">Original Art</h3>
          <p className="text-sm font-sans text-walnut/60 leading-relaxed">
            Every print starts as an original watercolor painting, capturing the softness and warmth of hand-made art.
          </p>
        </div>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <a href="https://www.instagram.com/mfirmo_08/" target="_blank" rel="noopener noreferrer"
          className="btn-secondary flex items-center justify-center gap-2">
          <Instagram className="w-4 h-4" /> Follow on Instagram
        </a>
        <a href="https://bloommerestudio.etsy.com" target="_blank" rel="noopener noreferrer"
          className="btn-secondary flex items-center justify-center gap-2">
          <ExternalLink className="w-4 h-4" /> Etsy Shop
        </a>
        <Link href="/shop" className="btn-primary flex items-center justify-center">
          Shop Prints
        </Link>
      </div>
    </div>
  );
}
