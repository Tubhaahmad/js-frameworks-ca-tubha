"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "../types/shop";

//cart item is the product + quantity
export type CartItem = {
  id: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  unitPrice: number; //the price we charge - discounted if available
  quantity: number;
};

type CartStore = {
  items: CartItem[];

  //actions - functions that will change the cart
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

//choose discounted price when it exists, otherwise regular price.
function getUnitPrice(product: Product) {
  const hasDiscount = product.discountedPrice < product.price;
  return hasDiscount ? product.discountedPrice : product.price;
}

//convert Product (from API) into CartItem (for cart storage).
function toCartItem(product: Product): CartItem {
  return {
    id: product.id,
    title: product.title,
    imageUrl: product.image.url,
    imageAlt: product.image.alt || product.title,
    unitPrice: getUnitPrice(product),
    quantity: 1,
  };
}

//zustand store and persist to localStorage
//persist - cart stays after refresh
export const useShoppingCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      //Add a product to cart.
      //if it already exists, increase quanity by 1
      addItem: (product) => {
        const items = get().items;
        const existing = items.find((item) => item.id === product.id);

        if (existing) {
          const updated = items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );

          set({ items: updated });
          return;
        }

        set({ items: [...items, toCartItem(product)] });
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      setQuantity: (id, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((item) => item.id !== id) });
          return;
        }

        const updated = get().items.map((item) =>
          item.id === id ? { ...item, quantity } : item,
        );

        set({ items: updated });
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage", //key name in localStorage
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
