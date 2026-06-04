export type Review = {
  id: string;
  username: string;
  rating: number;
  description: string;
};

export type ProductImage = {
  url: string;
  alt: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  image: ProductImage;
  rating: number;
  tags: string[];
  reviews: Review[];
};

export type ProductsMeta = {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
};

export type GetProductsResponse = {
  data: Product[];
  meta: ProductsMeta;
};
