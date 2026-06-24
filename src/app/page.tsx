import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/shop/ProductCard";
import { ArrowRight, Download, Leaf, Palette } from "lucide-react";

export default async function HomePage() {
  const featured = await prisma.product.findMany({
    where: { featured: true, active: true },
    take: 6,
  });

  const counts = await prisma.product.groupBy({
    by: ["category"],
    _count: { id: true },
    where: { active: true },
  });

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-cream via-rose-light/20 to-sage/10">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #4A3728 1px, transparent 0)", backgroundSize: "32px 32px" }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 text-center">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-rose-dusty/40" />
            <span className="text-[10px] tracking-[0.4em] uppercase font-sans text-walnut/40">
              Lisbon, Portugal
            </span>
            <div className="w-8 h-px bg-rose-dusty/40" />
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-light text-walnut leading-[1.1] mb-6">
            Where soft art
            <br />
            <em className="text-rose-dusty">quietly blooms</em>
          </h1>
          <p className="text-base sm:text-lg font-sans text-walnut/50 max-w-lg mx-auto leading-relaxed mb-10">
            Watercolor digital prints for your home — botanical art, soft landscapes, and fruit illustrations. Instant download.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shop" className="btn-primary">
              Shop All Prints <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
            <Link href="/about" className="btn-secondary">
              About the Studio
            </Link>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="bg-walnut text-cream py-8">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { icon: Download, label: "Instant Download", desc: "Files delivered immediately after purchase" },
            { icon: Palette, label: "Watercolor Art", desc: "Original hand-painted illustrations" },
            { icon: Leaf, label: "Print at Home", desc: "High-res files ready for any print size" },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Icon className="w-5 h-5 text-rose-dusty" />
              <p className="text-sm font-sans font-medium text-cream">{label}</p>
              <p className="text-xs font-sans text-cream/40">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured prints */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] tracking-widest uppercase font-sans text-rose-dusty mb-2">
              Curated Selection
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-walnut">
              Featured Prints
            </h2>
          </div>
          <Link href="/shop" className="hidden sm:flex items-center gap-1.5 text-xs tracking-widest uppercase font-sans text-walnut/50 hover:text-walnut transition-colors">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product as any} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link href="/shop" className="btn-secondary">
            View all prints
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-linen/40 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl text-walnut text-center mb-10">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { name: "Botanical Prints", href: "/shop?category=Botanical+Prints", desc: "Leaves, flowers, and botanicals in soft watercolor" },
              { name: "Fruit Prints", href: "/shop?category=Fruit+Prints", desc: "Mediterranean fruits and kitchen wall art" },
              { name: "Soft Landscapes", href: "/shop?category=Soft+Landscapes", desc: "Countryside, meadows, and coastal scenes" },
            ].map((cat) => {
              const count = counts.find((c) => c.category === cat.name)?._count.id ?? 0;
              return (
                <Link key={cat.name} href={cat.href}
                  className="group p-7 bg-cream border border-linen hover:border-rose-dusty/30 rounded-sm transition-all duration-300 hover:shadow-sm"
                >
                  <div className="w-8 h-0.5 bg-rose-dusty/30 mb-4 group-hover:w-12 transition-all duration-300" />
                  <h3 className="font-display text-xl text-walnut mb-2">{cat.name}</h3>
                  <p className="text-sm font-sans text-walnut/50 leading-relaxed mb-4">{cat.desc}</p>
                  <p className="text-xs tracking-widest uppercase font-sans text-rose-dusty">
                    {count} prints →
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
