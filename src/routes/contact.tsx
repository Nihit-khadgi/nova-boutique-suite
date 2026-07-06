import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — NovaStore" },
      { name: "description", content: "Get in touch with the NovaStore team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Get in touch
      </p>
      <h1 className="mt-2 font-display text-5xl md:text-6xl">We'd love to hear from you.</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Whether it's a product question or partnership idea — our team responds within one hour on
        business days.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4 rounded-3xl border bg-card p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block text-muted-foreground">Name</span>
              <input className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary" />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-muted-foreground">Email</span>
              <input className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary" />
            </label>
          </div>
          <label className="block text-sm">
            <span className="mb-1 block text-muted-foreground">Subject</span>
            <input className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-muted-foreground">Message</span>
            <textarea
              rows={6}
              className="w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-primary"
            />
          </label>
          <button className="rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
            Send message
          </button>
        </form>

        <div className="space-y-4">
          {[
            { i: Mail, l: "Email", v: "hello@novastore.com" },
            { i: Phone, l: "Phone", v: "+1 (415) 555-0198" },
            { i: MapPin, l: "Studio", v: "88 Market St, San Francisco, CA" },
            { i: MessageCircle, l: "Live chat", v: "Available 24/7" },
          ].map((c) => (
            <div key={c.l} className="flex items-start gap-3 rounded-2xl border p-5">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary text-primary-foreground">
                <c.i className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{c.l}</p>
                <p className="font-semibold">{c.v}</p>
              </div>
            </div>
          ))}
          <div className="aspect-video overflow-hidden rounded-2xl border">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
              alt="Map"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
