import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { CategoryFilter } from "@/components/shop/CategoryFilter";

interface ShopPageProps {
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({ searchParams }: ShopPageProps) {
  const { category } = await searchParams;
  return {
    title: category ? `${category}` : "Shop All Prints",
    description: "Browse our collection of watercolor digital prints. Instant download.",
  };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category } = await searchParams;

  const products = await prisma.product.findMany({
    where: {
      active: true,
      ...(category ? { category } : {}),
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Page header */}
      <div className="mb-10">
        <p className="text-[10px] tracking-widest uppercase font-sans text-rose-dusty mb-2">
          Digital Prints
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-light text-walnut mb-2">
          {category ?? "All Prints"}
        </h1>
        <p className="text-sm font-sans text-walnut/50">
          {products.length} {products.length === 1 ? "print" : "prints"} · Instant download
        </p>
      </div>

      {/* Filter */}
      <div className="mb-8">
        <Suspense>
          <CategoryFilter />
        </Suspense>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-linen mb-8" />

      {/* Grid */}
      <ProductGrid products={products as any[]} />
    </div>
  );
}
