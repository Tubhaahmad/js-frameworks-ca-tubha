"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../../lib/api";
import { useShoppingCart } from "../../../store/cart";

export default function ProductPage() {
  const params = useParams<{ id?: string | string[] }>();
  const addItem = useShoppingCart((state) => state.addItem);
  // Convert id into a proper string
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  // React Query should not run until id is a real string
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id as string),
    enabled: typeof id === "string" && id.length > 0,
  });

  // If we still don't have the id, show a loading message
  if (!id) return <div className="p-6">Loading product...</div>;

  // If React Query is loading data
  if (isLoading) return <div className="p-6">Loading product...</div>;

  // If React Query got an error
  if (error instanceof Error) {
    return <div className="p-6">Error: {error.message}</div>;
  }

  // If the product is missing for some reason
  if (!product) return <div className="p-6">Product not found.</div>;

  // Discount logic
  const hasDiscount = product.discountedPrice < product.price;
  const mainPrice = hasDiscount ? product.discountedPrice : product.price;

  return (
    <main className="min-h-screen bg-zinc-50 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Product image */}
          <img
            src={product.image.url}
            alt={product.image.alt || product.title}
            className="h-80 w-full rounded-lg object-cover"
          />

          {/* Product info */}
          <div className="rounded-lg bg-white p-5 shadow-sm">
            <h1 className="text-2xl font-bold text-zinc-900">
              {product.title}
            </h1>

            {/* Rating */}
            <p className="mt-2 text-sm text-zinc-600">
              Rating: {product.rating}
            </p>

            {/* Price */}
            <div className="mt-4 flex items-center gap-3">
              <p className="text-xl font-bold">{mainPrice} kr</p>

              {hasDiscount && (
                <p className="text-zinc-500 line-through">{product.price} kr</p>
              )}
            </div>

            {/* Description */}
            <p className="mt-4 text-zinc-700">{product.description}</p>

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold">Tags</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <button
              className="mt-6 w-full rounded-md bg-black px-4 py-2 text-white hover:bg-zinc-800"
              onClick={() => {
                addItem(product);
                console.log(
                  "Cart items now:",
                  useShoppingCart.getState().items,
                );
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-zinc-900">Reviews</h2>

          {!product.reviews || product.reviews.length === 0 ? (
            <p className="mt-2 text-zinc-600">No reviews yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {product.reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-lg bg-white p-4 shadow-sm"
                >
                  <p className="font-semibold">{review.username}</p>
                  <p className="text-sm text-zinc-600">
                    Rating: {review.rating}
                  </p>
                  <p className="mt-2 text-zinc-700">{review.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
