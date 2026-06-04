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
    <main className="min-h-screen bg-white pt-16 px-6 pb-6">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb + Back */}
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={() => window.history.back()}
            className="text-xs uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors duration-200"
          >
            ← Back
          </button>

          <p className="text-xs uppercase tracking-widest text-gray-400">
            Shop / <span className="text-gray-900">{product.title}</span>
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* Product image */}
          <div className="overflow-hidden bg-gray-50 aspect-3/4 w-full mx-auto">
            <img
              src={product.image.url}
              alt={product.image.alt || product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product info */}
          <div className="flex flex-col justify-center gap-4">
            {/* Title */}
            <div>
              <p className="text-xs tracking-widest uppercase text-gray-400">
                Shop
              </p>
              <h1 className="mt-1 text-sm font-medium tracking-[0.2em] uppercase text-gray-900">
                {product.title}
              </h1>
            </div>

            {/* Discount badge */}
            {hasDiscount && (
              <p className="text-xs font-medium text-red-500 uppercase tracking-wider">
                -
                {Math.round(
                  (1 - product.discountedPrice / product.price) * 100,
                )}
                % off
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-3 h-3 ${star <= Math.round(product.rating) ? "fill-gray-900" : "fill-gray-200"}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-400">
                {product.rating.toFixed(1)} - {product.reviews?.length ?? 0}{" "}
                reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 border-t border-b border-gray-100 py-4">
              <p className="text-lg font-medium text-gray-900">
                {mainPrice} kr
              </p>
              {hasDiscount && (
                <p className="text-sm text-gray-400 line-through">
                  {product.price} kr
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-xs leading-relaxed text-gray-500 tracking-wide">
              {product.description}
            </p>

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-gray-200 px-3 py-1 text-xs uppercase tracking-wider text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Add to Cart */}
            <button
              className="mt-2 w-full bg-black py-4 text-xs font-medium tracking-widest uppercase text-white hover:bg-zinc-800 transition-colors duration-200"
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
        <section className="mt-16 border-t border-gray-100 pt-10">
          <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-gray-900">
            Reviews
          </h2>

          {!product.reviews || product.reviews.length === 0 ? (
            <p className="mt-4 text-xs text-gray-400">No reviews yet.</p>
          ) : (
            <div className="mt-6 space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-900">
                      {review.username}
                    </p>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-2.5 h-2.5 ${star <= Math.round(review.rating) ? "fill-gray-900" : "fill-gray-200"}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-gray-500">
                    {review.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
