"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useShoppingCart } from "../../../store/cart";

export default function SuccessPage() {
  const clearCart = useShoppingCart((state) => state.clearCart);

  // When this page loads, clear the cart
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Checkout successful</h1>
      <p className="mt-2">
        Thank you for your order! Your cart has been cleared.
      </p>

      <Link href="/" className="mt-4 inline-block underline">
        Back to shop
      </Link>
    </main>
  );
}
