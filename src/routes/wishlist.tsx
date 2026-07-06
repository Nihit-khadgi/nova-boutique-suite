import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/site/ProductCard";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — NovaStore" }] }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Saved for later
      </p>
      <h1 className="mt-2 font-display text-5xl md:text-6xl">Wishlist</h1>

      {items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl border bg-surface p-16 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-background">
            <Heart className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="font-display text-2xl">No favourites yet</p>
          <p className="text-sm text-muted-foreground">
            Tap the heart on any product to save it here.
          </p>
          <Link
            to="/shop"
            className="mt-2 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Discover products
          </Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
