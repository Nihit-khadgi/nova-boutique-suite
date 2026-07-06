import { Link } from "@tanstack/react-router";
import { Heart, Eye, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import type { Product } from "@/lib/data";
import { cn } from "@/lib/utils";

const badgeStyles: Record<string, string> = {
  NEW: "bg-primary text-primary-foreground",
  "BEST SELLER": "bg-accent text-accent-foreground",
  SALE: "bg-destructive text-destructive-foreground",
  LIMITED: "bg-foreground text-background",
};

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add, toggleWish, wishlist } = useStore();
  const wished = wishlist.includes(product.id);
  const discount = product.originalPrice
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="group relative"
    >
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="block overflow-hidden rounded-2xl bg-surface"
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-x-3 top-3 flex items-start justify-between">
            <div className="flex flex-col gap-1">
              {product.badge && (
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wider",
                    badgeStyles[product.badge],
                  )}
                >
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold text-destructive backdrop-blur">
                  -{discount}%
                </span>
              )}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWish(product.id);
              }}
              aria-label="Wishlist"
              className="grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground backdrop-blur transition hover:scale-110"
            >
              <Heart className={cn("h-4 w-4", wished && "fill-destructive text-destructive")} />
            </button>
          </div>
          <div className="absolute inset-x-3 bottom-3 flex translate-y-4 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.preventDefault();
                add(product);
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-3 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Add to Cart
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              aria-label="Quick view"
              className="grid h-10 w-10 place-items-center rounded-full bg-background text-foreground shadow-sm transition hover:scale-105"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Link>
      <div className="mt-4 space-y-1 px-1">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-muted-foreground">
          <span>{product.brand}</span>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-accent text-accent" />
            {product.rating}
            <span className="text-muted-foreground/70">({product.reviews})</span>
          </span>
        </div>
        <Link to="/product/$id" params={{ id: product.id }}>
          <h3 className="line-clamp-1 text-sm font-medium">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2 pt-1">
          <span className="text-base font-semibold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
