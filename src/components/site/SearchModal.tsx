import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useStore } from "@/lib/store";
import { products, categories } from "@/lib/data";
import { Search, TrendingUp, Clock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";

export function SearchModal() {
  const { searchOpen, setSearchOpen } = useStore();
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const s = q.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.brand.toLowerCase().includes(s) ||
          p.category.toLowerCase().includes(s),
      )
      .slice(0, 6);
  }, [q]);

  return (
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent className="top-24 max-w-2xl translate-y-0 gap-0 p-0 sm:top-32">
        <div className="flex items-center gap-3 border-b px-5 py-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, brands, categories..."
            className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded border bg-surface px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline">
            ESC
          </kbd>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {results.length > 0 ? (
            <ul className="space-y-1">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    to="/product/$id"
                    params={{ id: p.id }}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-3 rounded-xl p-2 hover:bg-secondary"
                  >
                    <img src={p.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {p.brand} · {p.category}
                      </p>
                    </div>
                    <span className="text-sm font-semibold">${p.price}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="space-y-6">
              <div>
                <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5" /> Trending
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Wireless Headphones", "Sneakers", "Watches", "Vitamin C", "Standing Desk"].map(
                    (t) => (
                      <button
                        key={t}
                        onClick={() => setQ(t)}
                        className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium hover:bg-muted"
                      >
                        {t}
                      </button>
                    ),
                  )}
                </div>
              </div>
              <div>
                <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> Categories
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {categories.slice(0, 6).map((c) => (
                    <Link
                      key={c.slug}
                      to="/shop"
                      onClick={() => setSearchOpen(false)}
                      className="rounded-xl bg-surface p-3 text-sm font-medium hover:bg-muted"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
