export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  badge?: "NEW" | "BEST SELLER" | "SALE" | "LIMITED";
  colors?: string[];
  sizes?: string[];
  description?: string;
  features?: string[];
  stock?: number;
};

const img = (seed: string, w = 800, h = 800) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const categories = [
  { name: "Electronics", slug: "electronics", count: 248, image: img("photo-1518770660439-4636190af475"), icon: "Cpu" },
  { name: "Fashion", slug: "fashion", count: 512, image: img("photo-1490481651871-ab68de25d43d"), icon: "Shirt" },
  { name: "Sneakers", slug: "sneakers", count: 186, image: img("photo-1542291026-7eec264c27ff"), icon: "Footprints" },
  { name: "Watches", slug: "watches", count: 94, image: img("photo-1523170335258-f5ed11844a49"), icon: "Watch" },
  { name: "Gaming", slug: "gaming", count: 132, image: img("photo-1542751371-adc38448a05e"), icon: "Gamepad2" },
  { name: "Smart Home", slug: "smart-home", count: 78, image: img("photo-1558002038-1055907df827"), icon: "Home" },
  { name: "Beauty", slug: "beauty", count: 220, image: img("photo-1522337360788-8b13dee7a37e"), icon: "Sparkles" },
  { name: "Fitness", slug: "fitness", count: 145, image: img("photo-1571019613454-1cb2f99b2d8b"), icon: "Dumbbell" },
  { name: "Accessories", slug: "accessories", count: 310, image: img("photo-1548036328-c9fa89d128fa"), icon: "Briefcase" },
];

export const brands = [
  "Apple", "Samsung", "Sony", "Nike", "Adidas", "Puma", "Logitech", "Asus", "Dell", "Lenovo",
];

export const products: Product[] = [
  {
    id: "nova-aero-max",
    name: "Aero Max Wireless Headphones",
    brand: "Sony",
    category: "Electronics",
    price: 349,
    originalPrice: 449,
    rating: 4.9,
    reviews: 2841,
    image: img("photo-1505740420928-5e560c06d30e"),
    badge: "BEST SELLER",
    colors: ["#111", "#e5e5e5", "#c19a6b"],
    stock: 42,
    description:
      "Studio-grade wireless headphones with adaptive noise cancellation and 40-hour battery life.",
    features: ["Adaptive ANC", "40h battery", "Hi-Res audio", "Multipoint pairing"],
  },
  {
    id: "nova-runner-01",
    name: "Runner 01 Performance Sneaker",
    brand: "Nike",
    category: "Sneakers",
    price: 189,
    originalPrice: 220,
    rating: 4.8,
    reviews: 1520,
    image: img("photo-1542291026-7eec264c27ff"),
    badge: "NEW",
    colors: ["#0a0a0a", "#ffffff", "#f97316"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    stock: 68,
  },
  {
    id: "nova-chrono-lx",
    name: "Chrono LX Automatic Watch",
    brand: "Nova Atelier",
    category: "Watches",
    price: 1290,
    originalPrice: 1490,
    rating: 4.9,
    reviews: 412,
    image: img("photo-1523170335258-f5ed11844a49"),
    badge: "LIMITED",
    colors: ["#c9a24c", "#8a8a8a"],
    stock: 12,
  },
  {
    id: "nova-bag-atlas",
    name: "Atlas Leather Weekender",
    brand: "Nova Studio",
    category: "Accessories",
    price: 429,
    rating: 4.7,
    reviews: 318,
    image: img("photo-1548036328-c9fa89d128fa"),
    colors: ["#3b2a1a", "#0a0a0a"],
    stock: 24,
  },
  {
    id: "nova-glow-lamp",
    name: "Glow Ambient Smart Lamp",
    brand: "Nova Home",
    category: "Smart Home",
    price: 149,
    originalPrice: 199,
    rating: 4.6,
    reviews: 890,
    image: img("photo-1558002038-1055907df827"),
    badge: "SALE",
    stock: 120,
  },
  {
    id: "nova-play-controller",
    name: "Play Pro Wireless Controller",
    brand: "Logitech",
    category: "Gaming",
    price: 159,
    rating: 4.7,
    reviews: 1104,
    image: img("photo-1592840496694-26d035b52b48"),
    badge: "NEW",
    colors: ["#0a0a0a", "#ffffff"],
    stock: 82,
  },
  {
    id: "nova-serum",
    name: "Radiance Vitamin C Serum",
    brand: "Nova Beauty",
    category: "Beauty",
    price: 68,
    originalPrice: 89,
    rating: 4.8,
    reviews: 2103,
    image: img("photo-1522337360788-8b13dee7a37e"),
    badge: "BEST SELLER",
    stock: 300,
  },
  {
    id: "nova-flex-dumbbell",
    name: "Flex Adjustable Dumbbell 40kg",
    brand: "Nova Fit",
    category: "Fitness",
    price: 549,
    originalPrice: 699,
    rating: 4.8,
    reviews: 640,
    image: img("photo-1571019613454-1cb2f99b2d8b"),
    badge: "SALE",
    stock: 30,
  },
  {
    id: "nova-desk-oak",
    name: "Signature Oak Standing Desk",
    brand: "Nova Living",
    category: "Home & Living",
    price: 899,
    rating: 4.9,
    reviews: 231,
    image: img("photo-1517705008128-361805f42e86"),
    stock: 18,
  },
  {
    id: "nova-jacket-mono",
    name: "Monolith Technical Jacket",
    brand: "Nova Wear",
    category: "Fashion",
    price: 289,
    originalPrice: 349,
    rating: 4.7,
    reviews: 512,
    image: img("photo-1490481651871-ab68de25d43d"),
    badge: "NEW",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#0a0a0a", "#5b5b5b", "#c19a6b"],
    stock: 90,
  },
  {
    id: "nova-earbuds-air",
    name: "Air Pro Wireless Earbuds",
    brand: "Apple",
    category: "Electronics",
    price: 249,
    rating: 4.9,
    reviews: 5820,
    image: img("photo-1590658268037-6bf12165a8df"),
    badge: "BEST SELLER",
    stock: 200,
  },
  {
    id: "nova-notebook",
    name: "Executive Leather Notebook",
    brand: "Nova Studio",
    category: "Office Essentials",
    price: 79,
    rating: 4.6,
    reviews: 190,
    image: img("photo-1531346878377-a5be20888e57"),
    stock: 220,
  },
];

export const collections = [
  { name: "Summer Collection", image: img("photo-1483985988355-763728e1935b"), items: 48 },
  { name: "Gaming Setup", image: img("photo-1542751371-adc38448a05e"), items: 32 },
  { name: "Luxury Watches", image: img("photo-1523170335258-f5ed11844a49"), items: 26 },
  { name: "Office Essentials", image: img("photo-1517705008128-361805f42e86"), items: 54 },
  { name: "Travel Collection", image: img("photo-1488646953014-85cb44e25828"), items: 41 },
  { name: "Minimal Living", image: img("photo-1616486338812-3dadae4b4ace"), items: 37 },
];

export const testimonials = [
  {
    name: "Sofia Reyes",
    location: "New York, USA",
    rating: 5,
    review:
      "The packaging alone feels like a luxury unboxing. NovaStore has completely replaced how I shop for premium goods.",
    avatar: img("photo-1494790108377-be9c29b29330", 200, 200),
  },
  {
    name: "Kenji Tanaka",
    location: "Tokyo, Japan",
    rating: 5,
    review:
      "Fastest international shipping I have ever experienced. The Chrono LX watch is absolutely stunning in person.",
    avatar: img("photo-1500648767791-00dcc994a43e", 200, 200),
  },
  {
    name: "Amelia Clarke",
    location: "London, UK",
    rating: 5,
    review:
      "Every product feels curated. It is the closest thing to walking through an Apple store online.",
    avatar: img("photo-1438761681033-6461ffad8d80", 200, 200),
  },
  {
    name: "Lucas Almeida",
    location: "São Paulo, Brazil",
    rating: 5,
    review:
      "Support answered within minutes and shipped a replacement the same day. This is what premium service looks like.",
    avatar: img("photo-1472099645785-5658abf4ff4e", 200, 200),
  },
];

export const stats = [
  { label: "Happy Customers", value: 100, suffix: "K+" },
  { label: "Orders Delivered", value: 50, suffix: "K+" },
  { label: "Premium Brands", value: 500, suffix: "+" },
  { label: "Satisfaction Rate", value: 98, suffix: "%" },
];

export const blogPosts = [
  {
    slug: "future-of-shopping-2026",
    title: "The Future of Shopping in 2026",
    excerpt: "How AI, AR, and hyper-curation are reshaping premium commerce.",
    image: img("photo-1556742049-0cfed4f6a45d"),
    category: "Tech Trends",
    date: "Jul 2, 2026",
    readTime: "6 min",
  },
  {
    slug: "capsule-wardrobe-guide",
    title: "Building a Modern Capsule Wardrobe",
    excerpt: "Ten timeless pieces every discerning wardrobe should own.",
    image: img("photo-1490481651871-ab68de25d43d"),
    category: "Fashion",
    date: "Jun 24, 2026",
    readTime: "8 min",
  },
  {
    slug: "smart-home-essentials",
    title: "The Smart Home Essentials Guide",
    excerpt: "Devices that quietly upgrade your daily rituals.",
    image: img("photo-1558002038-1055907df827"),
    category: "Home",
    date: "Jun 12, 2026",
    readTime: "5 min",
  },
];
