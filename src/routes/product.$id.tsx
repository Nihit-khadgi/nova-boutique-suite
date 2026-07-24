import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { Product } from "@/lib/data";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/site/ProductCard";
import { useStore } from "@/lib/store";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  BadgeCheck,
  Minus,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { cn, formatNPR } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — NovaStore` },
          {
            name: "description",
            content: loaderData.product.description ?? `${loaderData.product.name} at NovaStore.`,
          },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [{ title: "Product" }],
  }),
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-lg p-16 text-center">
      <p>{error.message}</p>
      <button onClick={reset} className="mt-4 underline">
        Retry
      </button>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-lg p-16 text-center">
      <h1 className="font-display text-4xl">Product not found</h1>
      <Link to="/shop" className="mt-4 inline-block underline">
        Back to shop
      </Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const { add, toggleWish, wishlist } = useStore();
  const wished = wishlist.includes(product.id);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(product.colors?.[0]);
  const [size, setSize] = useState(product.sizes?.[0]);
  const [tab, setTab] = useState<"description" | "specs" | "reviews">("description");

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const gallery = [product.image, product.image, product.image, product.image];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> ·{" "}
        <Link to="/shop" className="hover:text-foreground">Shop</Link> ·{" "}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-3xl bg-surface">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {gallery.map((g, i) => (
              <button key={i} className="aspect-square overflow-hidden rounded-xl bg-surface ring-1 ring-transparent hover:ring-primary">
                <img src={g} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {product.brand}
          </p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.round(product.rating) ? "fill-accent text-accent" : "text-muted",
                  )}
                />
              ))}
              <span className="ml-1 font-medium">{product.rating}</span>
            </div>
            <span className="text-muted-foreground">·</span>
            <a href="#reviews" className="text-muted-foreground hover:text-foreground">
              {product.reviews} reviews
            </a>
            <span className="text-muted-foreground">·</span>
            <span className="flex items-center gap-1 text-success">
              <BadgeCheck className="h-4 w-4" /> In stock
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl">{formatNPR(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatNPR(product.originalPrice)}
                </span>
                <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">
                  Save {formatNPR(product.originalPrice - product.price)}
                </span>
              </>
            )}
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            {product.description ??
              "A signature piece from the NovaStore atelier, engineered with premium materials and finished by hand."}
          </p>

          {product.colors && (
            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Color
              </p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={cn(
                      "h-10 w-10 rounded-full border-2 transition",
                      color === c ? "border-primary ring-2 ring-primary/20" : "border-border",
                    )}
                    style={{ backgroundColor: c }}
                    aria-label={c}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Size
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      "min-w-[48px] rounded-full border px-3 py-2 text-sm transition",
                      size === s
                        ? "border-primary bg-primary text-primary-foreground"
                        : "hover:bg-secondary",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="grid h-11 w-11 place-items-center"
                aria-label="Decrease"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="grid h-11 w-11 place-items-center"
                aria-label="Increase"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => {
                for (let i = 0; i < qty; i++) add(product, { color, size });
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-full gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
            >
              <ShoppingBag className="h-4 w-4" /> Add to Cart · {formatNPR(product.price * qty)}
            </button>
            <button
              onClick={() => toggleWish(product.id)}
              className="grid h-12 w-12 place-items-center rounded-full border transition hover:bg-secondary"
              aria-label="Wishlist"
            >
              <Heart className={cn("h-5 w-5", wished && "fill-destructive text-destructive")} />
            </button>
          </div>

          <div className="mt-8 grid gap-3 rounded-2xl border bg-surface p-4 text-sm sm:grid-cols-3">
            {[
              { icon: Truck, label: "Free delivery" },
              { icon: RotateCcw, label: "30-day returns" },
              { icon: ShieldCheck, label: "2-year warranty" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-2">
                <f.icon className="h-4 w-4 text-muted-foreground" />
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-20">
        <div className="flex gap-1 border-b">
          {(["description", "specs", "reviews"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "border-b-2 px-4 py-3 text-sm font-medium capitalize transition",
                tab === t
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {t === "specs" ? "Specifications" : t}
            </button>
          ))}
        </div>
        <div className="py-8">
          {tab === "description" && (
            <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                {product.description ??
                  "Every detail of this product has been considered — from the sourcing of raw materials to the final quality inspection in our atelier."}
              </p>
              {product.features && (
                <ul className="grid gap-2 pt-2 sm:grid-cols-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-foreground">
                      <BadgeCheck className="h-4 w-4 text-success" /> {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {tab === "specs" && (
            <dl className="max-w-2xl divide-y">
              {[
                ["Brand", product.brand],
                ["Category", product.category],
                ["SKU", product.id.toUpperCase()],
                ["Stock", `${product.stock ?? "In stock"}`],
                ["Warranty", "2 years"],
                ["Shipping", "2-day worldwide express"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-2 py-3 text-sm">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          )}
          {tab === "reviews" && (
            <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
              <div className="rounded-2xl border bg-surface p-6">
                <p className="font-display text-6xl">{product.rating}</p>
                <div className="mt-2 flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Based on {product.reviews} reviews
                </p>
              </div>
              <ul className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="rounded-2xl border p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      Verified Customer
                      <BadgeCheck className="h-4 w-4 text-success" />
                    </div>
                    <div className="mt-1 flex gap-0.5">
                      {[0, 1, 2, 3, 4].map((s) => (
                        <Star key={s} className="h-3 w-3 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Outstanding quality — exceeded every expectation. Feels premium in hand and
                      shipping was lightning fast.
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="mb-8 font-display text-3xl">You may also like</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
