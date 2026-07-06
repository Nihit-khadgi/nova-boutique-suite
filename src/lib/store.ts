import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./data";

type CartItem = { product: Product; qty: number; size?: string; color?: string };

type CartState = {
  items: CartItem[];
  wishlist: string[];
  cartOpen: boolean;
  searchOpen: boolean;
  add: (p: Product, opts?: { size?: string; color?: string }) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  toggleWish: (id: string) => void;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
};

export const useStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      cartOpen: false,
      searchOpen: false,
      add: (product, opts) => {
        const existing = get().items.find((i) => i.product.id === product.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i,
            ),
          });
        } else {
          set({ items: [...get().items, { product, qty: 1, ...opts }] });
        }
        set({ cartOpen: true });
      },
      remove: (id) => set({ items: get().items.filter((i) => i.product.id !== id) }),
      setQty: (id, qty) =>
        set({
          items: get()
            .items.map((i) => (i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i)),
        }),
      clear: () => set({ items: [] }),
      toggleWish: (id) =>
        set({
          wishlist: get().wishlist.includes(id)
            ? get().wishlist.filter((x) => x !== id)
            : [...get().wishlist, id],
        }),
      setCartOpen: (v) => set({ cartOpen: v }),
      setSearchOpen: (v) => set({ searchOpen: v }),
    }),
    { name: "novastore", partialize: (s) => ({ items: s.items, wishlist: s.wishlist }) },
  ),
);

export const cartTotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
