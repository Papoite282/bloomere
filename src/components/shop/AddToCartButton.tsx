"use client";

import { ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/components/cart/CartProvider";
import { useState } from "react";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = items.some((i) => i.product.id === product.id);

  function handle() {
    if (inCart) return;
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  if (inCart || justAdded) {
    return (
      <button disabled className="btn-primary w-full bg-sage cursor-default flex items-center justify-center gap-2">
        <Check className="w-4 h-4" /> Added to cart
      </button>
    );
  }

  return (
    <button onClick={handle} className="btn-primary w-full flex items-center justify-center gap-2">
      <ShoppingBag className="w-4 h-4" /> Add to Cart
    </button>
  );
}
