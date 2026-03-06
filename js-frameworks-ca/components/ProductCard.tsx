import Link from "next/link";
import type { Product } from "../types/shop";

export default function ProductCard({ product }: { product: Product }) {
  console.log("Product Data:", product); // Log product for debugging

  const hasDiscount = product.discountedPrice < product.price;
  const mainPrice = hasDiscount ? product.discountedPrice : product.price;
  const discount = hasDiscount
    ? Math.round((1 - product.discountedPrice / product.price) * 100)
    : 0;

  return (
    <Link
      href={`/product/${product.id}`}
      className="block border rounded-lg p-3 hover:shadow-sm transition"
    >
      <div className="relative">
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-red-700 text-white text-xs px-2 py-1 rounded">
            -{discount}%
          </div>
        )}
        <img
          src={product.image.url}
          alt={product.image.alt || product.title}
          className="w-full h-44 object-cover rounded"
        />
      </div>
      <div className="mt-2">
        <h2 className="text-lg text-black font-semibold">{product.title}</h2>
        <p className="mt-1 text-sm text-gray-600">
          Rating: <span className="font-medium">{product.rating}</span>
        </p>
        <div className="mt-2 flex items-center gap-2">
          <p className="font-bold text-black">{mainPrice} kr</p>
          {hasDiscount && (
            <p className="text-sm text-gray-500 line-through">
              {product.price} kr
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
