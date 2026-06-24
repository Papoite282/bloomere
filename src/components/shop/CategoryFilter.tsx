"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const categories = [
  { value: "", label: "All Prints" },
  { value: "Botanical Prints", label: "Botanical" },
  { value: "Fruit Prints", label: "Fruit" },
  { value: "Soft Landscapes", label: "Landscapes" },
];

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") ?? "";

  function select(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => select(cat.value)}
          className={cn(
            "category-pill",
            active === cat.value ? "category-pill-active" : "category-pill-inactive"
          )}
          aria-pressed={active === cat.value}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
