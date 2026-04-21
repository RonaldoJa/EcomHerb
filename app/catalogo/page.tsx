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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[1.08px] text-[#9f9b93] mb-1">
          Suplementos deportivos
        </p>
        <h1
          className="text-4xl font-semibold text-black leading-tight"
          style={{ letterSpacing: "-1.32px" }}
        >
          Catálogo completo
        </h1>
      </div>

      <CatalogoClient products={products} initialCategory={categoria ?? ""} />
    </div>
  );
}
