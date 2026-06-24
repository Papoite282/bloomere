import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { Download, Check, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return { title: "Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug, active: true } });
  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: { category: product.category, id: { not: product.id }, active: true },
    take: 4,
    orderBy: { featured: "desc" },
  });

  const features = [
    "High-resolution JPEG/PNG file",
    "Ready to print at home or at a print shop",
    "Multiple size options included",
    "Instant digital download",
    "Personal use license",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-sans text-walnut/40 mb-8">
        <Link href="/shop" className="hover:text-walnut transition-colors">Shop</Link>
        <span>/</span>
        <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-walnut transition-colors">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-walnut/70 truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Image */}
        <div className="aspect-[4/5] bg-gradient-to-br from-linen via-rose-light/40 to-sage/10 rounded-sm flex items-center justify-center relative overflow-hidden">
          <div className="text-center space-y-4 px-8">
            <div className="w-16 h-0.5 bg-rose-dusty/30 mx-auto" />
            <p className="font-display text-xl italic text-walnut/25 leading-relaxed">
              {product.name}
            </p>
            <div className="w-16 h-0.5 bg-rose-dusty/30 mx-auto" />
            <p className="text-xs font-sans text-walnut/20 tracking-widest uppercase">
              Digital Print
            </p>
          </div>
          {product.featured && (
            <span className="absolute top-4 left-4 bg-rose-dusty text-white text-[10px] tracking-widest uppercase font-sans px-2.5 py-1 rounded-sm">
              Featured
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-[10px] tracking-widest uppercase font-sans text-rose-dusty mb-3">
            {product.category}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-walnut leading-tight mb-4">
            {product.name}
          </h1>
          <p className="font-display text-3xl text-walnut mb-6">
            {formatPrice(product.price)}
          </p>

          <p className="text-sm font-sans text-walnut/60 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-8">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm font-sans text-walnut/60">
                <Check className="w-3.5 h-3.5 text-sage shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <div className="space-y-3">
            <AddToCartButton product={product as any} />
            {product.etsy_url && (
              <a
                href={product.etsy_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View on Etsy
              </a>
            )}
          </div>

          <div className="mt-8 p-4 bg-linen/40 rounded-sm flex items-start gap-3">
            <Download className="w-4 h-4 text-sage mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-sans font-medium text-walnut mb-1">Instant Digital Download</p>
              <p className="text-xs font-sans text-walnut/50 leading-relaxed">
                After purchase you will receive a secure download link via email and on the order confirmation page.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20 pt-12 border-t border-linen">
          <h2 className="font-display text-2xl text-walnut mb-8">More from {product.category}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((p) => (
              <Link key={p.id} href={`/shop/${p.slug}`}
                className="group p-4 bg-linen/30 border border-linen hover:border-rose-dusty/30 rounded-sm transition-colors"
              >
                <div className="aspect-square bg-gradient-to-br from-linen to-rose-light/20 rounded-sm mb-3 flex items-center justify-center">
                  <div className="w-8 h-0.5 bg-rose-dusty/20" />
                </div>
                <p className="text-xs font-sans text-walnut/70 line-clamp-2 mb-1">{p.name}</p>
                <p className="text-sm font-display text-walnut">{formatPrice(p.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
