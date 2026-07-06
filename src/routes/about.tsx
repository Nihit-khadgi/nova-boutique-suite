import { createFileRoute } from "@tanstack/react-router";
import { stats } from "@/lib/data";
import { Counter } from "@/components/site/Counter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NovaStore" },
      { name: "description", content: "Our story, mission and values." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center md:px-8 md:py-32">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Our story
          </p>
          <h1 className="mt-4 font-display text-5xl leading-tight md:text-7xl">
            We believe great products <em className="italic gradient-text">elevate</em> everyday life.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            NovaStore was founded in 2019 with a simple idea — bring the world's most thoughtful
            products under one roof, delivered with the care of a personal shopper.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-3 md:px-8">
        {[
          {
            k: "Mission",
            v: "Make premium products accessible without compromising craft or care.",
          },
          {
            k: "Vision",
            v: "To be the world's most trusted destination for considered goods.",
          },
          {
            k: "Values",
            v: "Craft. Honesty. Longevity. Service that feels human at every touchpoint.",
          },
        ].map((b) => (
          <div key={b.k}>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {b.k}
            </p>
            <p className="mt-3 font-display text-2xl leading-snug">{b.v}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <div className="grid grid-cols-2 gap-6 rounded-3xl bg-surface p-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-5xl gradient-text">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 md:px-8">
        <h2 className="font-display text-4xl">The people behind NovaStore</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {[
            { n: "Elena Voss", r: "Founder & CEO", i: "photo-1494790108377-be9c29b29330" },
            { n: "Marcus Chen", r: "Head of Design", i: "photo-1500648767791-00dcc994a43e" },
            { n: "Priya Rao", r: "VP Product", i: "photo-1438761681033-6461ffad8d80" },
            { n: "Diego Rossi", r: "Head of Operations", i: "photo-1472099645785-5658abf4ff4e" },
          ].map((p) => (
            <div key={p.n} className="text-center">
              <img
                src={`https://images.unsplash.com/${p.i}?auto=format&fit=crop&w=400&h=400&q=80`}
                alt={p.n}
                className="mx-auto aspect-square w-full rounded-2xl object-cover"
              />
              <p className="mt-4 font-semibold">{p.n}</p>
              <p className="text-sm text-muted-foreground">{p.r}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
