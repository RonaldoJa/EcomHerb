import type { IProduct } from "@/types";

export function getEffectivePrice(product: IProduct): number {
  return product.onSale && product.salePrice ? product.salePrice : product.price;
}

export function getDiscountPercent(product: IProduct): number {
  if (!product.onSale || !product.salePrice) return 0;
  return Math.round(((product.price - product.salePrice) / product.price) * 100);
}
