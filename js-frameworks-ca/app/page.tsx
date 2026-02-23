"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return <div className="p-6">Loading products...</div>;
  }

  if (error instanceof Error) {
    return <div className="p-6">Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="p-6">No products found.</div>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Online Shop</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
