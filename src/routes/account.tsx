import { createFileRoute } from "@tanstack/react-router";
import { User, Package, Heart, MapPin, CreditCard, Bell, Award, LogOut } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — NovaStore" }] }),
  component: Account,
});

const nav = [
  { i: Package, l: "Orders" },
  { i: Heart, l: "Wishlist" },
  { i: MapPin, l: "Addresses" },
  { i: CreditCard, l: "Payment methods" },
  { i: Bell, l: "Notifications" },
  { i: Award, l: "Rewards" },
  { i: User, l: "Profile" },
  { i: LogOut, l: "Sign out" },
];

function Account() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <div className="flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-full gradient-primary text-2xl font-display text-primary-foreground">
          E
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Welcome back
          </p>
          <h1 className="font-display text-4xl">Elena Voss</h1>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr]">
        <nav className="space-y-1 rounded-2xl border bg-card p-2">
          {nav.map((n) => (
            <button
              key={n.l}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            >
              <n.i className="h-4 w-4" /> {n.l}
            </button>
          ))}
        </nav>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { l: "Total orders", v: "12" },
              { l: "Reward points", v: "2,480" },
              { l: "Wishlist", v: "8" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border bg-card p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{s.l}</p>
                <p className="mt-2 font-display text-3xl">{s.v}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl">Recent orders</h2>
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground">
                Shop again
              </Link>
            </div>
            <ul className="mt-4 divide-y">
              {[
                { id: "#NV-2841", d: "Jul 1, 2026", t: "$1,289", s: "Delivered" },
                { id: "#NV-2718", d: "Jun 22, 2026", t: "$348", s: "In transit" },
                { id: "#NV-2611", d: "Jun 8, 2026", t: "$179", s: "Delivered" },
              ].map((o) => (
                <li key={o.id} className="flex items-center justify-between py-3 text-sm">
                  <span className="font-semibold">{o.id}</span>
                  <span className="text-muted-foreground">{o.d}</span>
                  <span>{o.t}</span>
                  <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs text-success">
                    {o.s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
