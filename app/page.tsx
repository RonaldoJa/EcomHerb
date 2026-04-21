import { Metadata } from "next";
import Link from "next/link";
import { getAllProducts, getSaleProducts } from "@/services/productService";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { STORE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${STORE_NAME} — Inicio`,
};

export const revalidate = 60;

export default async function HomePage() {
  const [products, saleProducts] = await Promise.all([
    getAllProducts(),
    getSaleProducts(),
  ]);
  const featured = products.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="bg-[#faf9f7] border-b border-[#dad4c8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 flex flex-col items-center text-center gap-6">
          <span className="inline-block bg-[#faf9f7] border border-[#dad4c8] text-[#55534e] text-xs font-semibold uppercase tracking-[1.08px] px-3 py-1 rounded-full">
            Suplementos deportivos · Envíos a todo el país
          </span>
          <h1 className="text-4xl sm:text-6xl font-semibold text-black leading-tight max-w-2xl"
            style={{ letterSpacing: "-2px" }}>
            Suplementos para llevar tu entrenamiento al siguiente nivel
          </h1>
          <p className="text-lg text-[#9f9b93] max-w-lg leading-relaxed">
            Proteínas, creatinas, vitaminas y más. Haz tu pedido en segundos directo por WhatsApp. Sin formularios, sin complicaciones.
          </p>
          <div className="flex gap-3 flex-wrap justify-center mt-2">
            <Link href="/catalogo">
              <Button variant="primary" className="px-6 py-3 text-base rounded-2xl">
                Ver catálogo
              </Button>
            </Link>
            {saleProducts.length > 0 && (
              <Link href="#ofertas">
                <Button variant="ghost" className="px-6 py-3 text-base rounded-2xl">
                  🏷️ Ver ofertas
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Ofertas — Lemon swatch (only when there are sale products) */}
      {saleProducts.length > 0 && (
        <section id="ofertas" className="bg-[#d08a11] py-14 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[1.08px] text-[#f8cc65] mb-1">
                  Tiempo limitado
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white leading-tight flex items-center gap-2">
                  🏷️ Ofertas especiales
                </h2>
              </div>
              <Link href="/catalogo"
                className="text-sm text-[#f8cc65] hover:text-white transition-colors font-medium self-start sm:self-auto">
                Ver catálogo completo →
              </Link>
            </div>
            <ProductGrid products={saleProducts} />
          </div>
        </section>
      )}

      {/* Categories section — Matcha swatch */}
      <section className="bg-[#02492a] py-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[1.08px] text-[#84e7a5] mb-1">
                Lo que encontrarás
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white leading-tight">
                Categorías
              </h2>
            </div>
            <Link href="/catalogo"
              className="text-sm text-[#84e7a5] hover:text-white transition-colors font-medium self-start sm:self-auto">
              Ver todo el catálogo →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { cat: "Proteínas", emoji: "💪", color: "bg-[#084d33]" },
              { cat: "Creatinas", emoji: "⚡", color: "bg-[#0a5c3d]" },
              { cat: "Ganadores de peso", emoji: "🏋️", color: "bg-[#086040]" },
              { cat: "Vitaminas", emoji: "💊", color: "bg-[#0d6b47]" },
              { cat: "Pre-entrenos", emoji: "🔥", color: "bg-[#0a5c3d]" },
              { cat: "Quemadores", emoji: "🌡️", color: "bg-[#084d33]" },
              { cat: "Snacks", emoji: "🥜", color: "bg-[#0d6b47]" },
              { cat: "Varios", emoji: "📦", color: "bg-[#086040]" },
            ].map(({ cat, emoji, color }) => (
              <Link
                key={cat}
                href={`/catalogo?categoria=${encodeURIComponent(cat)}`}
                className={`${color} border border-[#1a7a4f] rounded-2xl p-4 flex flex-col gap-2 hover:border-[#84e7a5] transition-colors group`}
              >
                <span className="text-2xl">{emoji}</span>
                <span className="text-white text-sm font-medium leading-tight group-hover:text-[#84e7a5] transition-colors">
                  {cat}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-[#dad4c8] bg-[#faf9f7] py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Elige tu producto", desc: "Filtra por categoría o busca directamente lo que necesitas.", emoji: "🛍️" },
              { step: "02", title: "Agrega al carrito", desc: "Acumula todos tus productos en un solo pedido.", emoji: "🛒" },
              { step: "03", title: "Pide por WhatsApp", desc: "Te enviamos un mensaje pre-redactado. Sin registros, sin tarjetas.", emoji: "💬" },
            ].map(({ step, title, desc, emoji }) => (
              <div key={step} className="flex gap-4 items-start">
                <span className="text-2xl shrink-0">{emoji}</span>
                <div>
                  <p className="text-xs font-mono font-bold text-[#9f9b93] mb-0.5">{step}</p>
                  <p className="font-semibold text-black text-base mb-1">{title}</p>
                  <p className="text-sm text-[#9f9b93] leading-relaxed">{desc}</p>
                </div>
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
