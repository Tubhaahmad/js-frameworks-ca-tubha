"use client";

import Link from "next/link";
import { useShoppingCart } from "../store/cart";

export default function Header() {
  const items = useShoppingCart((state) => state.items);

  const count = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="border-b bg-white p-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link href="/" className="font-bold">
          Shop
        </Link>

        <Link href="/cart" className="font-medium hover:underline">
          Cart ({count})
        </Link>
      </div>
    </header>
  );
}
