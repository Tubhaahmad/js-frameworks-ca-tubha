import Link from "next/link";
import type { Product } from "../types/shop";

export default function ProductCard({ product }: { product: Product }) {
  // check if the product is discounted //
  const hasDiscount = product.discountedPrice < product.price;

  // what price to show as the main price, the discounted price if there is a discount, otherwise the regular price //
  const mainPrice = hasDiscount ? product.discountedPrice : product.price;

  // calculate the discount percentage if there is a discount //
  const discount = hasDiscount
    ? Math.round((1 - product.discountedPrice / product.price) * 100)
    : 0;

  return (
    <Link
      href={`/product/${product.id}`}
      className="block border rounded-lg p-3 hover:shadow-sm transition"
    >
      {/* product image */}
      <div className="relative">
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
            -{discount}%
          </div>
        )}

        <img
          src={product.image.url}
          alt={product.image.alt || product.title}
          className="w-full h-44 object-cover rounded"
        />
      </div>

      {/* text content */}
      <div className="mt-2">
        <h2 className="text-lg font-semibold">{product.title}</h2>

        <div className="mt-2 flex items-center gap-2">
          <p className="font-bold">{mainPrice} kr</p>

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
