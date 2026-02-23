"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../../lib/api";

type Props = {
  params: { id: string };
};

export default function ProductPage({ params }: Props) {
  const { id } = params;

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  if (isLoading) return <div className="p-6">Loading product...</div>;
  if (error instanceof Error)
    return <div className="p-6">Error: {error.message}</div>;
  if (!product) return <div className="p-6">Product not found.</div>;

  const hasDiscount = product.discountedPrice < product.price;
  const mainPrice = hasDiscount ? product.discountedPrice : product.price;

  return (
    <main className="p-6">
      <div className="mx-auto max-w-3xl">
        <img
          src={product.image.url}
          alt={product.image.alt || product.title}
          className="w-full h-80 object-cover rounded-lg"
        />

        <h1 className="mt-4 text-3xl font-bold">{product.title}</h1>

        <div className="mt-2 flex items-center gap-3">
          <p className="text-xl font-bold">{mainPrice} kr</p>
          {hasDiscount && (
            <p className="text-gray-500 line-through">{product.price} kr</p>
          )}
        </div>

        <p className="mt-4 text-gray-700">{product.description}</p>

        <p className="mt-4 text-sm text-gray-600">Rating: {product.rating}</p>
      </div>
    </main>
  );
}
