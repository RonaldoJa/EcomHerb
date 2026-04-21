import { sanityClient, isSanityConfigured } from "@/lib/sanity/client";
import { ALL_PRODUCTS_QUERY, PRODUCT_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import type { IProduct } from "@/types";

export async function getAllProducts(): Promise<IProduct[]> {
  if (!isSanityConfigured) return [];
  return sanityClient.fetch<IProduct[]>(ALL_PRODUCTS_QUERY);
}

export async function getProductBySlug(slug: string): Promise<IProduct | null> {
  if (!isSanityConfigured) return null;
  return sanityClient.fetch<IProduct | null>(PRODUCT_BY_SLUG_QUERY, { slug });
}
