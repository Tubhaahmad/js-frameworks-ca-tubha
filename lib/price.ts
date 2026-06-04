export function isDiscounted(price: number, discountedPrice: number) {
  return discountedPrice < price;
}

//calculate discount percentage for the product//
export function calculateDiscountPercentage(
  price: number,
  discountedPrice: number,
) {
  if (price <= 0) return 0;
  return Math.round((1 - discountedPrice / price) * 100);
}
