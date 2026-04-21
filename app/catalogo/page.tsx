import { Metadata } from "next";
import { getAllProducts } from "@/services/productService";
import { ProductGrid } from "@/components/product/ProductGrid";
import { STORE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Catálogo | ${STORE_NAME}`,
  description: "Explora todos nuestros productos disponibles.",
};

export const revalidate = 60;

export default async function CatalogoPage() {
  const products = await getAllProducts();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[1.08px] text-[#9f9b93] mb-1">
          {products.length} productos
        </p>
        <h1
          className="text-4xl font-semibold text-black leading-tight"
          style={{ letterSpacing: "-1.32px" }}
        >
          Catálogo completo
        </h1>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
