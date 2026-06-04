"use client";

import Link from "next/link";
import { useShoppingCart } from "../store/cart";

export default function Header() {
  const items = useShoppingCart((state) => state.items);

  const count = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-black px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold tracking-[0.2em] uppercase text-white"
        >
          Shop
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            href="/contact"
            className="text-xs tracking-widest uppercase text-gray-400 hover:text-white transition-colors duration-200"
          >
            Contact
          </Link>

          <Link
            href="/cart"
            className="text-xs tracking-widest uppercase text-gray-400 hover:text-white transition-colors duration-200"
          >
            Cart ({count})
          </Link>
        </nav>
      </div>
    </header>
  );
}
