import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  BadgeCheck,
  Zap,
  Award,
  Users,
  Star,
  Sparkles,
} from "lucide-react";
import {
  categories,
  products,
  collections,
  testimonials,
  stats,
  brands,
  blogPosts,
} from "@/lib/data";
import { ProductCard } from "@/components/site/ProductCard";
import { formatNPR } from "@/lib/utils";
import { CountdownTimer } from "@/components/site/CountdownTimer";
import { Counter } from "@/components/site/Counter";

export const Route = createFileRoute("/")({
  component: Home,
});

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over $100 worldwide" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "Encrypted and PCI compliant" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day hassle-free returns" },
  { icon: Headphones, title: "24/7 Support", desc: "Real humans, always available" },
  { icon: BadgeCheck, title: "Authentic Products", desc: "Verified from trusted brands" },
  { icon: Zap, title: "Fast Delivery", desc: "2-day express worldwide" },
  { icon: Award, title: "2-Year Warranty", desc: "On every electronic product" },
  { icon: Users, title: "Trusted by 100K+", desc: "Community of loyal shoppers" },
];

function Home() {
  const trending = products.slice(0, 8);
  const bestSellers = products.filter((p) => p.badge === "BEST SELLER");
  const newArrivals = products.filter((p) => p.badge === "NEW");
  const flashProduct = products.find((p) => p.originalPrice) ?? products[0];
  const flashPercent = 62;

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-16 md:grid-cols-2 md:px-8 md:pb-32 md:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3 w-3 text-accent" />
              New Season · 2026 Collection
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl">
              Discover the <em className="italic gradient-text">Future</em> of Shopping.
            </h1>
            <p className="mt-6 max-w-lg text-base text-muted-foreground md:text-lg">
              Premium products curated for modern lifestyles — from studio-grade electronics
              to signature fashion, delivered from our global network.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 rounded-full gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
              >
                Shop Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-7 py-3.5 text-sm font-semibold backdrop-blur transition hover:bg-background"
              >
                Explore Collection
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {testimonials.slice(0, 4).map((t) => (
                  <img
                    key={t.name}
                    src={t.avatar}
                    alt=""
                    className="h-8 w-8 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                ))}
                <span className="ml-2 font-medium text-foreground">4.9</span> from 12,000+ reviews
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-primary-glow/30 to-accent/20 blur-3xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-elegant">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
                alt="Featured lifestyle"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-80">Featured</p>
                  <p className="mt-1 font-display text-2xl">Summer Editorial</p>
                </div>
                <Link
                  to="/collections"
                  className="grid h-12 w-12 place-items-center rounded-full bg-white text-black transition hover:scale-110"
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="absolute -right-4 top-8 hidden rounded-2xl bg-background p-4 shadow-elegant md:block">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Trending
              </p>
              <p className="mt-1 font-display text-xl">+248%</p>
              <p className="text-xs text-muted-foreground">This week</p>
            </div>
            <div className="absolute -left-4 bottom-16 hidden items-center gap-2 rounded-full bg-background p-2 pr-4 shadow-elegant md:flex">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-success/20">
                <BadgeCheck className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-xs font-semibold">Free shipping</p>
                <p className="text-[10px] text-muted-foreground">On orders over $100</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE BRANDS */}
      <section className="border-y bg-surface/50 py-8">
        <div className="mx-auto max-w-7xl overflow-hidden px-4 md:px-8">
          <div className="flex items-center justify-around gap-12 opacity-60">
            {brands.map((b) => (
              <span
                key={b}
                className="font-display text-xl tracking-tight text-muted-foreground md:text-2xl"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Shop by category
            </p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Featured Categories</h2>
          </div>
          <Link
            to="/shop"
            className="hidden items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground sm:flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {categories.slice(0, 8).map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <Link
                to="/shop"
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-surface"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="font-display text-xl md:text-2xl">{c.name}</p>
                  <p className="text-xs opacity-80">{c.count} products</p>
                </div>
                <div className="absolute right-3 top-3 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-white/90 text-black opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TRENDING PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Hot right now
            </p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Trending Products</h2>
          </div>
          <Link
            to="/shop"
            className="hidden items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground sm:flex"
          >
            Shop all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {trending.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* FLASH SALE */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground md:p-14">
          <div className="absolute inset-0 gradient-glow opacity-60" />
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
          <div className="relative grid gap-10 md:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-background/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur">
                <Zap className="h-3 w-3 text-accent" /> Flash Sale
              </span>
              <h2 className="mt-4 font-display text-5xl leading-tight md:text-6xl">
                Up to 60% off <br /> ends soon.
              </h2>
              <p className="mt-3 max-w-md text-sm opacity-80">
                Limited stock, limited time. Once it's gone, it's gone.
              </p>
              <div className="mt-6">
                <CountdownTimer />
              </div>
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-xs opacity-80">
                  <span>{flashProduct.stock} items claimed</span>
                  <span>{flashPercent}% sold</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-background/15">
                  <motion.div
                    className="h-full rounded-full gradient-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${flashPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                  />
                </div>
              </div>
              <Link
                to="/shop"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:opacity-90"
              >
                Shop the sale <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-3xl">
                <img
                  src={flashProduct.image}
                  alt={flashProduct.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-2xl bg-background p-4 text-foreground shadow-elegant">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {flashProduct.brand}
                </p>
                <p className="mt-1 max-w-[180px] text-sm font-semibold">{flashProduct.name}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg font-bold">{formatNPR(flashProduct.price)}</span>
                  {flashProduct.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      {formatNPR(flashProduct.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      {bestSellers.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Loved by many
              </p>
              <h2 className="mt-2 font-display text-4xl md:text-5xl">Best Sellers</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {bestSellers.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* COLLECTIONS */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Curated edits
          </p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Premium Collections</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-6 md:grid-rows-2 md:[&>*:nth-child(1)]:col-span-3 md:[&>*:nth-child(1)]:row-span-2 md:[&>*:nth-child(2)]:col-span-3 md:[&>*:nth-child(3)]:col-span-2 md:[&>*:nth-child(4)]:col-span-2 md:[&>*:nth-child(5)]:col-span-2 md:[&>*:nth-child(6)]:col-span-2">
          {collections.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-3xl md:aspect-auto"
            >
              <img
                src={c.image}
                alt={c.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <p className="text-[10px] uppercase tracking-widest opacity-80">
                  {c.items} products
                </p>
                <p className="font-display text-2xl md:text-3xl">{c.name}</p>
                <Link
                  to="/shop"
                  className="mt-3 inline-flex w-fit items-center gap-1.5 text-sm font-semibold opacity-90 hover:opacity-100"
                >
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      {newArrivals.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Just dropped
              </p>
              <h2 className="mt-2 font-display text-4xl md:text-5xl">New Arrivals</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {newArrivals.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* WHY US */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            The NovaStore standard
          </p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Why Shop With Us</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="rounded-2xl border bg-card p-6 transition hover:shadow-elegant"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl gradient-primary text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 font-semibold">{f.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid grid-cols-2 gap-6 rounded-3xl border bg-surface p-10 md:grid-cols-4 md:p-14">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-5xl md:text-6xl gradient-text">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            From the community
          </p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Loved by thousands</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border bg-card p-6"
            >
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.review}"</p>
              <div className="mt-6 flex items-center gap-3 border-t pt-4">
                <img src={t.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
                <BadgeCheck className="h-4 w-4 text-success" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-10 text-primary-foreground md:p-16">
          <div className="absolute -right-16 top-0 h-64 w-64 rounded-full bg-accent/40 blur-3xl" />
          <div className="relative mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-background/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              Members only
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-6xl">Get 10% off your first order.</h2>
            <p className="mt-4 text-sm opacity-80">
              Join the NovaStore inner circle for early drops, private sales, and stories from our
              atelier.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full border border-background/20 bg-background/10 p-1 pl-5 backdrop-blur"
            >
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-primary-foreground/60"
              />
              <button className="rounded-full bg-background px-5 py-2.5 text-sm font-semibold text-foreground">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              The Journal
            </p>
            <h2 className="mt-2 font-display text-4xl md:text-5xl">Latest Stories</h2>
          </div>
          <Link
            to="/blog"
            className="hidden items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground sm:flex"
          >
            All posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to="/blog"
              className="group block overflow-hidden rounded-2xl bg-surface"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-background px-2 py-0.5">{post.category}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl">{post.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            @novastore
          </p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">Follow the moment</h2>
        </div>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {products.slice(0, 6).map((p) => (
            <a
              key={p.id}
              href="#"
              className="group relative block aspect-square overflow-hidden rounded-xl"
            >
              <img
                src={p.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 transition group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
