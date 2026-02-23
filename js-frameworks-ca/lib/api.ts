import type { Product, GetProductsResponse } from "../types/shop";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://v2.api.noroff.dev";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/online-shop`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const json = (await response.json()) as GetProductsResponse;

  return json.data;
}

export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${BASE_URL}/online-shop/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const json = (await response.json()) as { data: Product };

  return json.data;
}
