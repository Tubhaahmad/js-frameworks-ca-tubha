"use client";

import Link from "next/link";
import { useShoppingCart } from "../../store/cart";
import { use } from "react";

export default function CartPage() {
  const items = useShoppingCart((state) => state.items);
  const removeItem = useShoppingCart((state) => state.removeItem);
  const setQuantity = useShoppingCart((state) => state.setQuantity);

  const total = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Cart</h1>
        <p className="mt-2">Your cart is empty.</p>
        <Link href="/" className="mt-4 inline-block underline">
          Back to Products
        </Link>
      </main>
    );
  }

  return (
    <main className="p-6 bg-white h-200">
      <h1 className="text-2xl font-bold text-black">Cart</h1>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 rounded border bg-white p-4">
            <img
              src={item.imageUrl}
              alt={item.imageAlt}
              className="h-20 w-20 rounded object-cover"
            />

            <div className="flex-1">
              <p className="font-semibold text-black">{item.title}</p>

              <p className="text-sm text-gray-600">
                Price: {item.unitPrice} kr
              </p>

              {/* Quantity controls + remove */}
              <div className="mt-2 flex items-center gap-2 text-mist-700">
                <button
                  className="rounded border px-2"
                  onClick={() => setQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>

                <span className="w-8 text-center">{item.quantity}</span>

                <button
                  className="rounded border px-2"
                  onClick={() => setQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>

                <button
                  className="ml-4 text-red-600 hover:underline"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Line total */}
            <div className="font-semibold text-black">
              {(item.unitPrice * item.quantity).toFixed(2)} kr
            </div>
          </div>
        ))}
      </div>

      {/* Total + Checkout */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-lg font-bold text-black">
          Total: {total.toFixed(2)} kr
        </p>

        <Link
          href="/checkout/success"
          className="rounded bg-stone-800 px-4 py-2 text-white hover:bg-zinc-800"
        >
          Checkout
        </Link>
      </div>
    </main>
  );
}
