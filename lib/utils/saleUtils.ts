import type { IProduct } from "@/types";
import { DEFAULT_MAX_QUANTITY } from "@/lib/constants";

export function getEffectivePrice(product: IProduct): number {
  return product.onSale && product.salePrice ? product.salePrice : product.price;
}

export function getDiscountPercent(product: IProduct): number {
  if (!product.onSale || !product.salePrice) return 0;
  return Math.round(((product.price - product.salePrice) / product.price) * 100);
}

export function hasBulkDiscount(product: IProduct, quantity: number): boolean {
  return (
    !!product.bulkDiscountMinQty &&
    !!product.bulkDiscountPercent &&
    quantity >= product.bulkDiscountMinQty
  );
}

export function getBulkUnitPrice(product: IProduct, quantity: number): number {
  const base = getEffectivePrice(product);
  if (!hasBulkDiscount(product, quantity)) return base;
  return base * (1 - product.bulkDiscountPercent! / 100);
}

export function getItemTotal(product: IProduct, quantity: number): number {
  return getBulkUnitPrice(product, quantity) * quantity;
}

export function getMaxQuantity(product: IProduct): number {
  return product.maxQuantity ?? DEFAULT_MAX_QUANTITY;
}
