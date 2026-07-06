import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, categories, brands } from "@/lib/data";
import { ProductCard } from "@/components/site/ProductCard";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All — NovaStore" },
      { name: "description", content: "Browse the full NovaStore catalog." },
    ],
  }),
  component: Shop,
});

const sorts = ["Newest", "Popular", "Price: Low to High", "Price: High to Low", "Best Rated"];

function Shop() {
  const [cat, setCat] = useState<string | null>(null);
  const [brand, setBrand] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [sort, setSort] = useState(sorts[0]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice);
    if (cat) list = list.filter((p) => p.category === cat);
    if (brand) list = list.filter((p) => p.brand === brand);
    switch (sort) {
      case "Price: Low to High":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "Best Rated":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [cat, brand, maxPrice, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          The Shop
        </p>
        <h1 className="mt-2 font-display text-5xl md:text-6xl">All products</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {filtered.length} premium items curated across every category.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-8">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Category
            </p>
            <div className="space-y-1">
              <button
                onClick={() => setCat(null)}
                className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm ${!cat ? "bg-secondary font-medium" : "hover:bg-secondary"}`}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setCat(c.name)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-sm ${cat === c.name ? "bg-secondary font-medium" : "hover:bg-secondary"}`}
                >
                  {c.name}
                  <span className="text-xs text-muted-foreground">{c.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Brand
            </p>
            <div className="flex flex-wrap gap-1.5">
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => setBrand(brand === b ? null : b)}
                  className={`rounded-full border px-3 py-1 text-xs ${brand === b ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Max Price
              </p>
              <span className="text-sm font-semibold">${maxPrice}</span>
            </div>
            <input
              type="range"
              min={50}
              max={1500}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing {filtered.length} products</p>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none rounded-full border bg-background py-2 pl-4 pr-9 text-sm outline-none"
              >
                {sorts.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
