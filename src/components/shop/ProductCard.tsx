"use client";

import Link from "next/link";
import { ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/components/cart/CartProvider";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

const CATEGORY_COLORS: Record<string, string> = {
  "Botanical Prints": "text-sage",
  "Fruit Prints": "text-rose-dusty",
  "Soft Landscapes": "text-walnut/50",
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = items.some((i) => i.product.id === product.id);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) return;
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  const categoryColor = CATEGORY_COLORS[product.category] ?? "text-walnut/50";

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <article className="product-card rounded-sm bg-linen/30 border border-linen hover:border-rose-dusty/30 transition-colors duration-300">
        {/* Image placeholder with gradient */}
        <div className="relative aspect-[4/5] bg-gradient-to-br from-linen via-rose-light/30 to-sage/10 overflow-hidden rounded-t-sm">
          <div className="product-image absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2 px-6">
              <div className="w-12 h-0.5 bg-rose-dusty/30 mx-auto" />
              <p className="font-display text-sm italic text-walnut/30 leading-relaxed">
                {product.name}
              </p>
              <div className="w-12 h-0.5 bg-rose-dusty/30 mx-auto" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 space-y-3">
          <div>
            <p className={`text-[10px] tracking-widest uppercase font-sans font-medium ${categoryColor} mb-1.5`}>
              {product.category}
            </p>
            <h3 className="font-display text-base font-medium text-walnut leading-snug line-clamp-2">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-display text-lg text-walnut">
              {formatPrice(product.price)}
            </span>
            <button
              onClick={handleAdd}
              aria-label={inCart ? "In cart" : `Add ${product.name} to cart`}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-sans tracking-wide
                transition-all duration-200
                ${inCart || justAdded
                  ? "bg-sage text-white"
                  : "bg-rose-dusty/10 text-rose-dark hover:bg-rose-dusty hover:text-white"
                }
              `}
            >
              {inCart || justAdded ? (
                <><Check className="w-3 h-3" /> Added</>
              ) : (
                <><ShoppingBag className="w-3 h-3" /> Add</>
              )}
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}
