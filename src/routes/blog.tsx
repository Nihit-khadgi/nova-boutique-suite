import { createFileRoute } from "@tanstack/react-router";
import { blogPosts } from "@/lib/data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — NovaStore" },
      { name: "description", content: "Stories, trends and buying guides." },
    ],
  }),
  component: Blog,
});

function Blog() {
  const [featured, ...rest] = blogPosts;
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        The Journal
      </p>
      <h1 className="mt-2 font-display text-5xl md:text-6xl">Stories, trends & guides</h1>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <a
          href="#"
          className="group relative block aspect-[5/4] overflow-hidden rounded-3xl bg-surface"
        >
          <img
            src={featured.image}
            alt={featured.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-white">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">
              {featured.category}
            </span>
            <h2 className="mt-3 font-display text-4xl">{featured.title}</h2>
            <p className="mt-2 max-w-lg text-sm opacity-80">{featured.excerpt}</p>
          </div>
        </a>
        <div className="grid gap-6">
          {rest.map((p) => (
            <a
              key={p.slug}
              href="#"
              className="group flex gap-5 overflow-hidden rounded-2xl bg-surface p-4"
            >
              <img
                src={p.image}
                alt=""
                className="h-32 w-32 shrink-0 rounded-xl object-cover"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{p.category}</span>·<span>{p.readTime}</span>
                </div>
                <h3 className="mt-1 font-display text-xl">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
