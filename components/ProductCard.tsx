import Link from "next/link";
import type { Product } from "../types/shop";

export default function ProductCard({ product }: { product: Product }) {
  const hasDiscount = product.discountedPrice < product.price;
  const mainPrice = hasDiscount ? product.discountedPrice : product.price;
  const discount = hasDiscount
    ? Math.round((1 - product.discountedPrice / product.price) * 100)
    : 0;

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        <img
          src={product.image.url}
          alt={product.image.alt || product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        {hasDiscount && (
          <span className="absolute top-2 right-2 bg-black text-white text-[10px] font-medium tracking-widest uppercase px-2 py-0.5">
            -{discount}%
          </span>
        )}
      </div>

      <div className="pt-2.5">
        <h2 className="text-xs font-medium text-gray-900 uppercase tracking-wider truncate">
          {product.title}
        </h2>
        <div className="flex items-center gap-0.5 mt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-2.5 h-2.5 ${star <= Math.round(product.rating) ? "fill-gray-900" : "fill-gray-200"}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-[10px] text-gray-400 ml-1">
            {product.rating.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-900">{mainPrice} kr</span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              {product.price} kr
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
