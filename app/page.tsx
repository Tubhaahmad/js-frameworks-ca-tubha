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
        <h1 className="pb-5 text-center text-4xl font-light tracking-[0.3em] uppercase text-black">
          Products
        </h1>

        {/*Search and Sort controls*/}
        <div className="mt-6 pb-3 mx-auto max-w-7xl flex flex-col sm:flex-row gap-3 items-center justify-center px-4">
          {/* Search input */}
          <div className="relative w-full sm:w-72">
            <input
              className="w-full border-b border-gray-300 bg-transparent text-xs tracking-widest uppercase placeholder:text-gray-400 text-gray-900 py-2 pr-4 outline-none focus:border-black transition-colors duration-200"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Search suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-100 shadow-sm z-10">
                <ul>
                  {suggestions.map((p) => (
                    <li
                      key={p.id}
                      className="border-b border-gray-50 last:border-b-0"
                    >
                      <Link
                        href={`/product/${p.id}`}
                        className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition-colors"
                        onClick={() => setSearch("")}
                      >
                        <span className="text-xs uppercase tracking-wider text-gray-800">
                          {p.title}
                        </span>
                        <span className="text-xs text-gray-800">
                          {getDisplayPrice(p)} kr
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sort dropdown */}
          <select
            className="border-b border-gray-300 bg-transparent text-xs tracking-widest uppercase text-gray-600 py-2 outline-none focus:border-black transition-colors duration-200 cursor-pointer"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: low → high</option>
            <option value="price-high">Price: high → low</option>
            <option value="rating-high">Rating: high → low</option>
          </select>
        </div>

        {/* products grid*/}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
