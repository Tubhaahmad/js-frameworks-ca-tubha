"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/api";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/shop";

//use discountedPrice when available, otherwise use price.
//sorting + showing prices in search results.
function getDisplayPrice(product: Product): number {
  const hadDiscount = product.discountedPrice < product.price;
  return hadDiscount ? product.discountedPrice : product.price;
}

//only allow these values
type SortOption = "recommended" | "price-low" | "price-high" | "rating-high";

export default function HomePage() {
  //what user types in the search box and selected sort option
  const [search, setSearch] = useState<string>("");

  //selected sort options
  const [sort, setSort] = useState<SortOption>("recommended");

  //fetching products from API (tanstack query will cache the result)
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return <div className="p-6">Loading products...</div>;
  }

  if (error instanceof Error) {
    return <div className="p-6">Error: {error.message}</div>;
  }

  if (!products) return <div className="p-6">No products found.</div>;

  //first filter products by search text or titles
  const query = search.trim().toLowerCase();
  const filteredProducts =
    query.length === 0
      ? products
      : products?.filter((p) => p.title.toLowerCase().includes(query));

  //then sort the filtered products - copying the array first
  const sortedProducts = [...filteredProducts];

  if (sort === "price-low") {
    sortedProducts.sort((a, b) => getDisplayPrice(a) - getDisplayPrice(b));
  }

  if (sort === "price-high") {
    sortedProducts.sort((a, b) => getDisplayPrice(b) - getDisplayPrice(a));
  }

  if (sort === "rating-high") {
    sortedProducts.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  //search results container - shows a small list under the search bar of the products
  const suggestions = query.length === 0 ? [] : sortedProducts.slice(0, 6); //show max six results

  return (
    <main className="p-6 bg-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-black">Products</h1>

        {/*Search and Sort controls*/}
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {/*searcu input */}
          <div>
            <label className="mt-4 text-black grid gap-3 md:grid-cols-2">
              Search
            </label>
            <input
              className="mt-1 w-full rounded border text-black p-2"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/*clickable results container */}
            {suggestions.length > 0 && (
              <div className="mt-2 rounded border bg-white shadow-sm">
                <ul>
                  {suggestions.map((p) => (
                    <li key={p.id} className="border-b last:border-b-0">
                      <Link
                        href={`/product/${p.id}`}
                        className="flex items-center justify-between p-2 hover:bg-zinc-50"
                        onClick={() => setSearch("")} // optional: clear after click
                      >
                        <span className="font-medium">{p.title}</span>
                        <span className="text-sm text-zinc-600">
                          {getDisplayPrice(p)} kr
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/*sorting dropdown */}
            <div>
              <label className="text-m text-black font-medium">Sort</label>

              <select
                className="mt-1 text-black w-full rounded border bg-white p-2"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: low → high</option>
                <option value="price-high">Price: high → low</option>
                <option value="rating-high">Rating: high → low</option>
              </select>
            </div>
          </div>
        </div>

        {/* products grid*/}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
