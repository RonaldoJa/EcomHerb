import type { IProduct } from "@/types";
import { ProductCard } from "./ProductCard";
import { SkeletonCard } from "@/components/ui/SkeletonCard";

interface ProductGridProps {
  products: IProduct[];
  isLoading?: boolean;
}

const SKELETON_COUNT = 6;

export function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-2xl font-semibold text-black mb-2">Sin productos disponibles</p>
        <p className="text-[#9f9b93]">Vuelve pronto, estamos actualizando el catálogo.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
