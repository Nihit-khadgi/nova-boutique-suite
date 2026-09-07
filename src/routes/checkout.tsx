import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore, cartTotal } from "@/lib/store";
import { useState } from "react";
import { Check, Truck, ShieldCheck, ArrowRight, Smartphone, Banknote } from "lucide-react";
import { cn, formatNPR } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — NovaStore" },
      {
        name: "description",
        content:
          "Simple checkout for delivery inside Nepal. Pay with eSewa or cash on delivery. Prices in Nepali rupees.",
      },
      { property: "og:title", content: "Checkout — NovaStore" },
      {
        property: "og:description",
        content: "Fast, simple checkout with eSewa or cash on delivery across Nepal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Checkout,
});

const steps = ["Delivery details", "Delivery method", "Payment", "Review"];

// Delivery options priced in the same base unit as product prices (x100 = Rs)
const deliveryOptions = [
  { id: "standard", name: "Standard", time: "3–5 days · inside Nepal", price: 0 },
  { id: "express", name: "Express", time: "1–2 days · major cities", price: 2.5 },
  { id: "sameday", name: "Same day", time: "Inside Kathmandu Valley", price: 5 },
];

function Checkout() {
  const { items } = useStore();
  const [step, setStep] = useState(0);
  const [delivery, setDelivery] = useState("standard");
  const [pay, setPay] = useState<"esewa" | "cod">("esewa");
  const [esewaId, setEsewaId] = useState("");
  const [esewaPin, setEsewaPin] = useState("");
  const [placed, setPlaced] = useState(false);

  const subtotal = cartTotal(items);
  const shipping = deliveryOptions.find((d) => d.id === delivery)?.price ?? 0;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center md:px-8">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="mt-6 font-display text-4xl">Order placed</h1>
        <p className="mt-3 text-muted-foreground">
          This is a demo store, so no payment was taken and nothing will be shipped.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Amount shown: <span className="font-semibold text-foreground">{formatNPR(total)}</span>
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Keep shopping <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <Link to="/" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        NovaStore
      </Link>
      <h1 className="mt-2 font-display text-4xl md:text-5xl">Checkout</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Delivery inside Nepal · all prices in Nepali rupees
      </p>

      <div className="mt-8 flex items-center gap-3 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm",
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
              <h2 className="font-display text-2xl">Delivery details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm">
                  <span className="mb-1 block text-muted-foreground">Full name</span>
                  <input
                    autoComplete="name"
                    className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary"
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block text-muted-foreground">Mobile number</span>
                  <input
                    inputMode="tel"
                    placeholder="98XXXXXXXX"
                    className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary"
                  />
                </label>
                <label className="text-sm sm:col-span-2">
                  <span className="mb-1 block text-muted-foreground">
                    Delivery address <span className="text-xs">(area, street, house)</span>
                  </span>
                  <input
                    placeholder="e.g. Jhamsikhel, Lalitpur — near Yellow House"
                    className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary"
                  />
                </label>
                <label className="text-sm sm:col-span-2">
                  <span className="mb-1 block text-muted-foreground">
                    Landmark or note for the rider <span className="text-xs">(optional)</span>
                  </span>
                  <input className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary" />
                </label>
              </div>
              <p className="text-xs text-muted-foreground">
                We only ask for what the rider needs — no postal code or country required.
              </p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl">Delivery method</h2>
              {deliveryOptions.map((d) => (
                <label
                  key={d.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-4 rounded-2xl border p-4 hover:bg-secondary",
                    delivery === d.id && "border-primary",
                  )}
                >
                  <input
                    type="radio"
                    name="delivery"
                    checked={delivery === d.id}
                    onChange={() => setDelivery(d.id)}
                    className="accent-primary"
                  />
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-semibold">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.time}</p>
                  </div>
                  <span className="font-semibold">
                    {d.price === 0 ? "Free" : formatNPR(d.price)}
                  </span>
                </label>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-display text-2xl">Payment</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <label
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-2xl border p-4 hover:bg-secondary",
                    pay === "esewa" && "border-primary",
                  )}
                >
                  <input
                    type="radio"
                    name="pay"
                    checked={pay === "esewa"}
                    onChange={() => setPay("esewa")}
                    className="accent-primary"
                  />
                  <EsewaMark />
                  <span className="text-sm font-medium">eSewa wallet</span>
                </label>
                <label
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-2xl border p-4 hover:bg-secondary",
                    pay === "cod" && "border-primary",
                  )}
                >
                  <input
                    type="radio"
                    name="pay"
                    checked={pay === "cod"}
                    onChange={() => setPay("cod")}
                    className="accent-primary"
                  />
                  <Banknote className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Cash on delivery</span>
                </label>
              </div>

              {pay === "esewa" ? (
                <div className="overflow-hidden rounded-2xl border">
                  <div className="flex items-center justify-between bg-[#60BB46] px-5 py-4">
                    <EsewaWordmark />
                    <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                      Demo only
                    </span>
                  </div>
                  <div className="space-y-4 bg-surface p-5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-muted-foreground">Amount to pay</span>
                      <span className="font-display text-2xl">{formatNPR(total)}</span>
                    </div>
                    <label className="block text-sm">
                      <span className="mb-1 block text-muted-foreground">eSewa ID (mobile number)</span>
                      <input
                        value={esewaId}
                        onChange={(e) => setEsewaId(e.target.value)}
                        inputMode="tel"
                        placeholder="98XXXXXXXX"
                        className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary"
                      />
                    </label>
                    <label className="block text-sm">
                      <span className="mb-1 block text-muted-foreground">MPIN</span>
                      <input
                        value={esewaPin}
                        onChange={(e) => setEsewaPin(e.target.value)}
                        type="password"
                        placeholder="••••"
                        maxLength={4}
                        className="w-full rounded-xl border bg-background px-4 py-3 tracking-[0.4em] outline-none focus:border-primary"
                      />
                    </label>
                    <div className="flex items-center gap-2 rounded-xl bg-background p-3 text-xs text-muted-foreground">
                      <Smartphone className="h-4 w-4" />
                      This is a mock eSewa screen for demonstration. Nothing is sent, stored or charged —
                      please don't type a real MPIN.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 rounded-2xl border bg-surface p-5 text-sm">
                  <p className="font-semibold">Pay cash when your order arrives</p>
                  <p className="text-muted-foreground">
                    Please keep {formatNPR(total)} ready for the delivery rider.
                  </p>
                </div>
              )}
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
              <div className="rounded-2xl border bg-surface p-4 text-sm">
                <p className="text-muted-foreground">
                  Paying with{" "}
                  <span className="font-semibold text-foreground">
                    {pay === "esewa" ? "eSewa wallet (demo)" : "cash on delivery"}
                  </span>{" "}
                  ·{" "}
                  <span className="font-semibold text-foreground">
                    {deliveryOptions.find((d) => d.id === delivery)?.name} delivery
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border bg-success/10 p-4 text-sm text-success">
                <ShieldCheck className="h-5 w-5" /> Demo checkout — no real payment is processed
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-40"
              disabled={step === 0}
            >
              Back
            </button>
            <button
              onClick={() =>
                step === steps.length - 1 ? setPlaced(true) : setStep(step + 1)
              }
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
              <dt>Delivery</dt>
              <dd>{shipping === 0 ? "Free" : formatNPR(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t pt-3 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatNPR(total)}</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-muted-foreground">VAT included where applicable.</p>
        </aside>
      </div>
    </div>
  );
}

function EsewaMark() {
  return (
    <span className="grid h-6 w-6 place-items-center rounded-md bg-[#60BB46] text-[11px] font-bold text-white">
      e
    </span>
  );
}

function EsewaWordmark() {
  return (
    <span className="flex items-center gap-2">
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-sm font-bold text-[#60BB46]">
        e
      </span>
      <span className="text-lg font-semibold tracking-tight text-white">
        eSewa
        <span className="ml-1 align-middle text-[10px] font-normal opacity-80">wallet</span>
      </span>
    </span>
  );
}
