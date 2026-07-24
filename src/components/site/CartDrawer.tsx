import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useStore, cartTotal } from "@/lib/store";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { formatNPR } from "@/lib/utils";

export function CartDrawer() {
  const { cartOpen, setCartOpen, items, setQty, remove } = useStore();
  const subtotal = cartTotal(items);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 12;

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="flex items-center gap-2 font-display text-2xl">
            <ShoppingBag className="h-5 w-5" /> Your Cart
            <span className="ml-auto text-sm font-sans font-normal text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-surface">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold">Your cart is empty</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Discover something you love.
              </p>
            </div>
            <button
              onClick={() => setCartOpen(false)}
              className="rounded-full gradient-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="divide-y">
                {items.map((i) => (
                  <li key={i.product.id} className="flex gap-4 py-4">
                    <img
                      src={i.product.image}
                      alt={i.product.name}
                      className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                            {i.product.brand}
                          </p>
                          <p className="truncate text-sm font-medium">{i.product.name}</p>
                        </div>
                        <button
                          onClick={() => remove(i.product.id)}
                          className="text-muted-foreground hover:text-destructive"
                          aria-label="Remove"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full border">
                          <button
                            onClick={() => setQty(i.product.id, i.qty - 1)}
                            className="grid h-7 w-7 place-items-center"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-medium">{i.qty}</span>
                          <button
                            onClick={() => setQty(i.product.id, i.qty + 1)}
                            className="grid h-7 w-7 place-items-center"
                            aria-label="Increase"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold">
                          ${(i.product.price * i.qty).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t bg-surface px-6 py-5">
              <div className="flex items-center gap-2 rounded-full border bg-background p-1 pl-4">
                <input
                  placeholder="Promo code"
                  className="flex-1 bg-transparent text-sm outline-none"
                />
                <button className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">
                  Apply
                </button>
              </div>
              <dl className="mt-4 space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <dt>Subtotal</dt>
                  <dd>${subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>Shipping</dt>
                  <dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd>
                </div>
                <div className="flex justify-between border-t pt-2 text-base font-semibold">
                  <dt>Total</dt>
                  <dd>${(subtotal + shipping).toFixed(2)}</dd>
                </div>
              </dl>
              <Link
                to="/checkout"
                onClick={() => setCartOpen(false)}
                className="mt-4 flex items-center justify-center gap-2 rounded-full gradient-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
              >
                Checkout <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Free shipping on orders over $100
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
