import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-0.5 bg-rose-dusty/30 mb-6" />
        <p className="font-display text-2xl text-walnut/40 mb-2">No prints found</p>
        <p className="text-sm font-sans text-walnut/30">
          Try selecting a different category
        </p>
        <div className="w-16 h-0.5 bg-rose-dusty/30 mt-6" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
