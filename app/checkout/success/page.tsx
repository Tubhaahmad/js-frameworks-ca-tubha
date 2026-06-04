"use client";
import { CheckCircle } from "lucide-react";

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
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <CheckCircle className="w-10 h-10 text-gray-300" strokeWidth={1} />

        <div>
          <h1 className="text-sm font-medium tracking-[0.2em] uppercase text-gray-900">
            Order Confirmed
          </h1>
          <p className="mt-2 text-xs uppercase tracking-widest text-gray-400">
            Thank you - your order has been placed
          </p>
        </div>

        <Link
          href="/"
          className="mt-2 text-xs uppercase tracking-widest border border-gray-900 px-8 py-3 text-gray-900 hover:bg-black hover:text-white transition-colors duration-200"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
