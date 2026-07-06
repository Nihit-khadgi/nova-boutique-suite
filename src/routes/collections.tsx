import { createFileRoute, Link } from "@tanstack/react-router";
import { collections } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — NovaStore" },
      { name: "description", content: "Curated collections at NovaStore." },
    ],
  }),
  component: Collections,
});

function Collections() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Curated edits
      </p>
      <h1 className="mt-2 font-display text-5xl md:text-6xl">Collections</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Six seasonal edits, hand-picked by our design team.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {collections.map((c) => (
          <Link
            key={c.name}
            to="/shop"
            className="group relative block aspect-[4/3] overflow-hidden rounded-3xl"
          >
            <img
              src={c.image}
              alt={c.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
              <p className="text-xs uppercase tracking-widest opacity-80">{c.items} products</p>
              <h2 className="mt-1 font-display text-4xl">{c.name}</h2>
              <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold">
                Explore <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
