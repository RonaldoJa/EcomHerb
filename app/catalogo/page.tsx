import { Metadata } from "next";
import { getAllProducts } from "@/services/productService";
import { CatalogoClient } from "@/components/catalog/CatalogoClient";
import { STORE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Catálogo | ${STORE_NAME}`,
  description: "Proteínas, creatinas, vitaminas, pre-entrenos y más suplementos de calidad.",
};

export const revalidate = 60;

interface PageProps {
  searchParams: Promise<{ categoria?: string }>;
}

export default async function CatalogoPage({ searchParams }: PageProps) {
  const [products, { categoria }] = await Promise.all([
    getAllProducts(),
    searchParams,
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-6">
        <p
          className="text-[11px] font-bold uppercase mb-1.5"
          style={{ color: "#16a34a", letterSpacing: "1px" }}
        >
          Suplementos deportivos
        </p>
        <h1
          className="text-[28px] font-extrabold"
          style={{ color: "#0f1f14", letterSpacing: "-0.5px" }}
        >
          Catálogo
        </h1>
        <p className="text-[14px] mt-1" style={{ color: "#86a896" }}>
          {products.length} productos disponibles
        </p>
      </div>

      <CatalogoClient products={products} initialCategory={categoria ?? ""} />
    </div>
  );
}
