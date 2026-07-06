import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Facebook, Youtube, Send } from "lucide-react";

const cols = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", to: "/shop" },
      { label: "Best Sellers", to: "/shop" },
      { label: "Collections", to: "/collections" },
      { label: "Gift Cards", to: "/gift-cards" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Journal", to: "/blog" },
      { label: "Careers", to: "/careers" },
      { label: "Press", to: "/press" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "FAQs", to: "/faq" },
      { label: "Shipping", to: "/shipping" },
      { label: "Returns", to: "/returns" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
      { label: "Refund Policy", to: "/refunds" },
      { label: "Affiliate", to: "/affiliate" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg gradient-primary">
                <span className="font-display text-lg text-primary-foreground">N</span>
              </div>
              <span className="font-display text-2xl tracking-tight">NovaStore</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Premium products curated for modern lifestyles. Shipped from our global fulfillment
              network with love.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex max-w-md items-center gap-2 rounded-full border bg-background p-1 pl-4"
            >
              <input
                type="email"
                placeholder="Enter your email for 10% off"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button className="grid h-9 w-9 place-items-center rounded-full gradient-primary text-primary-foreground transition hover:opacity-90">
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-6 flex gap-2">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full border text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold">{col.title}</h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-sm text-muted-foreground transition hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} NovaStore. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {["VISA", "MC", "AMEX", "PAYPAL", "APPLE", "GPAY"].map((p) => (
              <span
                key={p}
                className="rounded-md border bg-background px-2 py-1 text-[10px] font-semibold tracking-wider"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
