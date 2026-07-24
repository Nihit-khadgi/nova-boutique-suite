import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore, cartTotal } from "@/lib/store";
import { useState } from "react";
import { Check, CreditCard, Truck, ShieldCheck, ArrowRight } from "lucide-react";
import { cn, formatNPR } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — NovaStore" }] }),
  component: Checkout,
});

const steps = ["Shipping", "Delivery", "Payment", "Review"];

function Checkout() {
  const { items } = useStore();
  const [step, setStep] = useState(0);
  const subtotal = cartTotal(items);
  const shipping = subtotal > 100 ? 0 : 12;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <Link to="/" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        NovaStore
      </Link>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Checkout</h1>

      <div className="mt-8 flex items-center gap-3 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i)}
            className={cn(
              "flex items-center gap-2 rounded-full border px-4 py-2 text-sm",
              i === step ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "grid h-5 w-5 place-items-center rounded-full text-[10px] font-semibold",
                i === step ? "bg-background text-foreground" : "bg-secondary",
              )}
            >
              {i < step ? <Check className="h-3 w-3" /> : i + 1}
            </span>
            {s}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-3xl border bg-card p-8">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl">Shipping address</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {["First name", "Last name", "Email", "Phone"].map((l) => (
                  <label key={l} className="text-sm">
                    <span className="mb-1 block text-muted-foreground">{l}</span>
                    <input className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary" />
                  </label>
                ))}
                <label className="text-sm sm:col-span-2">
                  <span className="mb-1 block text-muted-foreground">Address</span>
                  <input className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary" />
                </label>
                {["City", "Postal code", "Country"].map((l) => (
                  <label key={l} className="text-sm">
                    <span className="mb-1 block text-muted-foreground">{l}</span>
                    <input className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary" />
                  </label>
                ))}
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl">Delivery method</h2>
              {[
                { name: "Standard", time: "3-5 business days", price: "Free" },
                { name: "Express", time: "1-2 business days", price: "$18" },
                { name: "Same-day", time: "Within 24 hours", price: "$32" },
              ].map((d, i) => (
                <label
                  key={d.name}
                  className="flex cursor-pointer items-center gap-4 rounded-2xl border p-4 hover:bg-secondary"
                >
                  <input type="radio" name="delivery" defaultChecked={i === 0} className="accent-primary" />
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-semibold">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.time}</p>
                  </div>
                  <span className="font-semibold">{d.price}</span>
                </label>
              ))}
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl">Payment method</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {["Credit Card", "PayPal", "Apple Pay", "Google Pay", "Debit Card", "COD"].map((p) => (
                  <label
                    key={p}
                    className="flex cursor-pointer items-center gap-3 rounded-2xl border p-4 hover:bg-secondary"
                  >
                    <input type="radio" name="pay" defaultChecked={p === "Credit Card"} className="accent-primary" />
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{p}</span>
                  </label>
                ))}
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="text-sm sm:col-span-2">
                  <span className="mb-1 block text-muted-foreground">Card number</span>
                  <input placeholder="4242 4242 4242 4242" className="w-full rounded-xl border bg-background px-4 py-3 outline-none" />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block text-muted-foreground">Expiry</span>
                  <input placeholder="MM/YY" className="w-full rounded-xl border bg-background px-4 py-3 outline-none" />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block text-muted-foreground">CVC</span>
                  <input placeholder="123" className="w-full rounded-xl border bg-background px-4 py-3 outline-none" />
                </label>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl">Order review</h2>
              <ul className="divide-y">
                {items.map((i) => (
                  <li key={i.product.id} className="flex items-center gap-4 py-3">
                    <img src={i.product.image} alt="" className="h-14 w-14 rounded-lg object-cover" />
                    <div className="flex-1 text-sm">
                      <p className="font-medium">{i.product.name}</p>
                      <p className="text-muted-foreground">Qty {i.qty}</p>
                    </div>
                    <span className="font-semibold">{formatNPR(i.product.price * i.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 rounded-2xl border bg-success/10 p-4 text-sm text-success">
                <ShieldCheck className="h-5 w-5" /> Payment secured with 256-bit encryption
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              className="text-sm text-muted-foreground hover:text-foreground"
              disabled={step === 0}
            >
              Back
            </button>
            <button
              onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
              className="inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              {step === steps.length - 1 ? "Place order" : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <aside className="rounded-3xl border bg-surface p-6">
          <p className="font-display text-xl">Order summary</p>
          <ul className="mt-4 space-y-3">
            {items.map((i) => (
              <li key={i.product.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {i.qty} × {i.product.name}
                </span>
                <span>{formatNPR(i.product.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-2 border-t pt-4 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <dt>Subtotal</dt>
              <dd>{formatNPR(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <dt>Shipping</dt>
              <dd>{shipping === 0 ? "Free" : formatNPR(shipping)}</dd>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <dt>Tax</dt>
              <dd>{formatNPR(tax)}</dd>
            </div>
            <div className="flex justify-between border-t pt-3 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatNPR(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
