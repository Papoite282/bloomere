import Link from "next/link";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-walnut text-cream/70 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <div>
              <span className="font-display text-2xl font-light tracking-[0.15em] text-cream">
                Bloomere
              </span>
              <span className="block text-[9px] tracking-[0.35em] uppercase text-cream/40 font-sans">
                studio
              </span>
            </div>
            <p className="text-sm font-sans text-cream/50 leading-relaxed">
              Where soft art quietly blooms. Watercolor digital prints for your home, created with care from the first brushstroke.
            </p>
            <a
              href="https://www.instagram.com/mfirmo_08/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-cream/40 hover:text-rose-dusty transition-colors font-sans"
            >
              <Instagram className="w-4 h-4" />
              @mfirmo_08
            </a>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-cream/30 font-sans mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/shop", label: "All Prints" },
                { href: "/shop?category=Botanical+Prints", label: "Botanical Prints" },
                { href: "/shop?category=Fruit+Prints", label: "Fruit Prints" },
                { href: "/shop?category=Soft+Landscapes", label: "Soft Landscapes" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-sans text-cream/50 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-cream/30 font-sans mb-4">Info</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/about", label: "About" },
                { href: "https://bloommerestudio.etsy.com", label: "Etsy Shop", external: true },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm font-sans text-cream/50 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-3 bg-white/5 rounded-sm">
              <p className="text-xs font-sans text-cream/40 leading-relaxed">
                All products are digital downloads. Files are delivered instantly after purchase.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-sans text-cream/30">
            © {new Date().getFullYear()} Bloomere Studio · Lisbon, Portugal
          </p>
          <p className="text-xs font-sans text-cream/30">
            Digital art · Instant download · Made with love
          </p>
        </div>
      </div>
    </footer>
  );
}
