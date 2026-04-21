import { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from "@/services/productService";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { STORE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${STORE_NAME} — Inicio`,
};

export const revalidate = 60;

export default async function HomePage() {
  const products = await getAllProducts();
  const featured = products.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="bg-[#faf9f7] border-b border-[#dad4c8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 flex flex-col items-center text-center gap-6">
          <span className="inline-block bg-[#faf9f7] border border-[#dad4c8] text-[#55534e] text-xs font-semibold uppercase tracking-[1.08px] px-3 py-1 rounded-full">
            Envíos a todo el país
          </span>
          <h1 className="text-4xl sm:text-6xl font-semibold text-black leading-tight tracking-tight max-w-2xl"
            style={{ letterSpacing: "-2px" }}>
            Productos que te van a encantar
          </h1>
          <p className="text-lg text-[#9f9b93] max-w-lg leading-relaxed">
            Explora nuestro catálogo y haz tu pedido en segundos directo por WhatsApp. Sin formularios, sin complicaciones.
          </p>
          <div className="flex gap-3 flex-wrap justify-center mt-2">
            <Link href="/catalogo">
              <Button variant="primary" className="px-6 py-3 text-base rounded-2xl">
                Ver catálogo
              </Button>
            </Link>
            <Link href="/catalogo">
              <Button variant="ghost" className="px-6 py-3 text-base rounded-2xl">
                ¿Cómo funciona?
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Swatch section — Matcha */}
      <section className="bg-[#02492a] py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[1.08px] text-[#84e7a5] mb-1">
              Fácil y rápido
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white leading-tight">
              Compra en 3 pasos
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center sm:text-left">
            {[
              { step: "01", text: "Elige tu producto" },
              { step: "02", text: "Agrega al carrito" },
              { step: "03", text: "Pide por WhatsApp" },
            ].map(({ step, text }) => (
              <div key={step} className="flex flex-col items-center sm:items-start gap-1">
                <span className="text-[#84e7a5] font-mono text-sm font-bold">{step}</span>
                <span className="text-white font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[1.08px] text-[#9f9b93] mb-1">
              Selección
            </p>
            <h2 className="text-3xl font-semibold text-black leading-tight" style={{ letterSpacing: "-0.88px" }}>
              Productos destacados
            </h2>
          </div>
          <Link href="/catalogo">
            <Button variant="ghost" className="hidden sm:flex text-sm px-4 py-2">
              Ver todos
            </Button>
          </Link>
        </div>
        <ProductGrid products={featured} />
        <div className="flex justify-center mt-10 sm:hidden">
          <Link href="/catalogo">
            <Button variant="ghost">Ver catálogo completo</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
