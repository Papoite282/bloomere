"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, ArrowLeft, Lock, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, totalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const total = totalPrice();

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-bloom-rose-light flex items-center justify-center mx-auto mb-6">
          <ShoppingBag
            size={28}
            className="text-bloom-rose"
            strokeWidth={1.5}
          />
        </div>
        <h1 className="font-display text-bloom-earth text-3xl font-medium mb-3">
          Your cart is empty
        </h1>
        <p className="font-body text-bloom-stone text-sm mb-8">
          Looks like you haven't added any prints yet.
        </p>
        <Link href="/shop">
          <Button variant="primary" size="lg">
            Browse all prints
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 font-body text-sm text-bloom-stone hover:text-bloom-earth transition-colors mb-3"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Continue shopping
          </Link>
          <h1 className="font-display text-bloom-earth text-4xl font-medium">
            Your Cart
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="font-body text-xs text-bloom-stone/50 hover:text-bloom-stone transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map(({ product }) => (
            <div
              key={product.id}
              className="flex gap-4 bg-white rounded-card p-4 shadow-bloom"
            >
              <div className="relative w-20 h-20 rounded-soft overflow-hidden flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
                <div className="image-placeholder absolute inset-0 -z-10" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-bloom-earth text-sm font-medium leading-snug mb-1">
                  {product.title}
                </h3>
                <p className="font-body text-xs text-bloom-stone/60 mb-2">
                  Digital download · Instant access
                </p>
                <p className="font-display italic text-bloom-earth">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeItem(product.id)}
                className="p-2 rounded-soft hover:bg-bloom-rose-light transition-colors self-start"
                aria-label={`Remove ${product.title}`}
              >
                <Trash2
                  size={15}
                  className="text-bloom-stone"
                  strokeWidth={1.5}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white rounded-card p-6 shadow-bloom sticky top-24">
            <h2 className="font-display text-bloom-earth text-xl font-medium mb-5">
              Order Summary
            </h2>

            <div className="space-y-3 mb-5">
              {items.map(({ product }) => (
                <div key={product.id} className="flex justify-between">
                  <span className="font-body text-sm text-bloom-stone truncate mr-2 max-w-[60%]">
                    {product.shortTitle}
                  </span>
                  <span className="font-body text-sm text-bloom-earth flex-shrink-0">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-bloom-rose/20 pt-4 mb-6 flex justify-between">
              <span className="font-body font-medium text-bloom-earth">
                Total
              </span>
              <span className="font-display text-bloom-earth text-xl">
                ${total.toFixed(2)}
              </span>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? (
                "Redirecting..."
              ) : (
                <>
                  <Lock size={14} strokeWidth={1.5} />
                  Checkout securely
                </>
              )}
            </Button>

            <p className="text-center text-xs text-bloom-stone/50 font-body mt-3">
              Powered by Stripe · SSL encrypted
            </p>

            <div className="mt-4 p-3 rounded-soft bg-bloom-sage-light">
              <p className="font-body text-xs text-bloom-stone leading-relaxed">
                💾 All prints are{" "}
                <strong className="text-bloom-earth">digital downloads</strong>.
                After payment you'll receive instant access to your files.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
