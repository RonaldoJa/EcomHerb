import type { IProduct } from "@/types";
import type { SortOption } from "@/lib/constants";
import { portableTextToPlain } from "./portableTextToPlain";

export function filterProducts(
  products: IProduct[],
  query: string,
  category: string,
  sort: SortOption
): IProduct[] {
  let result = [...products];

  if (query.trim()) {
    const q = query.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        portableTextToPlain(p.description).toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
    );
  }

  if (category) {
    result = result.filter((p) => p.category === category);
  }

  switch (sort) {
    case "price_asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "name_asc":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "newest":
    default:
      break;
  }

  return result;
}
