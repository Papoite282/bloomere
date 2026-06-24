"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { cn } from "@/lib/utils";

export function Header() {
  const { count, setIsOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/shop?category=Botanical+Prints", label: "Botanical" },
    { href: "/shop?category=Fruit+Prints", label: "Fruit" },
    { href: "/shop?category=Soft+Landscapes", label: "Landscapes" },
    { href: "/about", label: "About" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-sm border-b border-linen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex flex-col leading-tight group"
              aria-label="Bloomere Studio home"
            >
              <span className="font-display text-xl font-light tracking-[0.15em] text-walnut group-hover:text-rose-dusty transition-colors">
                Bloomere
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-walnut/50 font-sans">
                studio
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs tracking-widest uppercase text-walnut/60 hover:text-walnut font-sans transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Cart + mobile toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-walnut hover:text-rose-dusty transition-colors"
                aria-label={`Cart, ${count} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-dusty text-white text-[10px] font-sans font-semibold rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-walnut"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 border-t border-linen",
            mobileOpen ? "max-h-80" : "max-h-0"
          )}
        >
          <nav className="flex flex-col py-4 px-6 gap-4 bg-cream">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-xs tracking-widest uppercase text-walnut/60 hover:text-walnut font-sans transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <CartDrawer />
    </>
  );
}
