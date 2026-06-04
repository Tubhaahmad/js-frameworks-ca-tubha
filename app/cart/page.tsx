"use client";

import Link from "next/link";
import { useShoppingCart } from "../../store/cart";
import { ShoppingCart } from "lucide-react";

export default function CartPage() {
  const items = useShoppingCart((state) => state.items);
  const removeItem = useShoppingCart((state) => state.removeItem);
  const setQuantity = useShoppingCart((state) => state.setQuantity);

  const total = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );

  return (
    <main className="min-h-screen bg-white px-6 pt-16 pb-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center text-2xl font-light tracking-[0.3em] uppercase text-black mb-10">
          Cart
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <ShoppingCart className="w-10 h-10 text-gray-200" strokeWidth={1} />
            <p className="text-xs uppercase tracking-widest text-gray-400">
              Your cart is empty
            </p>
            <Link
              href="/"
              className="mt-2 text-xs uppercase tracking-widest border border-gray-900 px-8 py-3 text-gray-900 hover:bg-black hover:text-white transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-6">
                  <img
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    className="h-24 w-20 object-cover bg-gray-50 flex-shrink-0"
                  />

                  <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-widest text-gray-900">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {item.unitPrice} kr / unit
                      </p>

                      {/* Quantity controls */}
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          className="w-6 h-6 border border-gray-200 text-xs text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors"
                          onClick={() =>
                            setQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span className="text-xs w-4 text-center text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          className="w-6 h-6 border border-gray-200 text-xs text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors"
                          onClick={() =>
                            setQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>

                        <button
                          className="ml-2 text-xs uppercase tracking-wider text-gray-400 hover:text-red-500 transition-colors"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Line total */}
                    <p className="text-xs font-medium text-gray-900 sm:text-right">
                      {(item.unitPrice * item.quantity).toFixed(2)} kr
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total + Checkout */}
            <div className="mt-8 border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-widest text-gray-900">
                Total:{" "}
                <span className="font-medium">{total.toFixed(2)} kr</span>
              </p>

              <Link
                href="/checkout/success"
                className="w-full sm:w-auto bg-black px-10 py-3 text-xs font-medium tracking-widest uppercase text-white hover:bg-zinc-800 transition-colors duration-200"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
