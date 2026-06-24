"use client";

import { useCart } from "./CartProvider";
import { X, ShoppingBag, Trash2, Download } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: items.map((i) => ({ id: i.product.id, price: i.product.price })) }),
      });
      const data = await res.json();
      if (data.url) {
        clearCart();
        window.location.href = data.url;
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-walnut/30 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-cream shadow-2xl",
          "flex flex-col transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-linen">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-walnut/50" />
            <span className="font-display text-lg text-walnut">Your Cart</span>
            {items.length > 0 && (
              <span className="text-xs font-sans text-walnut/40">({items.length})</span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-walnut/40 hover:text-walnut transition-colors rounded-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <div className="w-14 h-14 rounded-full bg-linen flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-walnut/30" />
              </div>
              <p className="font-display text-lg text-walnut/50">Your cart is empty</p>
              <p className="text-sm font-sans text-walnut/30">Add some prints to get started</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-4 group">
                  <div className="w-16 h-16 bg-linen/50 rounded-sm flex items-center justify-center shrink-0">
                    <Download className="w-5 h-5 text-walnut/30" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-sans font-medium text-walnut truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs font-sans text-walnut/40 mt-0.5">
                      {item.product.category}
                    </p>
                    <p className="text-sm font-sans font-semibold text-rose-dark mt-1">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-walnut/30 hover:text-rose-dark transition-all"
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-linen space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-sans text-walnut/60">Total</span>
              <span className="font-display text-2xl text-walnut">{formatPrice(total)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Preparing checkout…" : "Checkout with Stripe"}
            </button>
            <p className="text-center text-xs font-sans text-walnut/30">
              Digital downloads · Instant delivery
            </p>
          </div>
        )}
      </div>
    </>
  );
}
