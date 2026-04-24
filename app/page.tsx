import { Metadata } from "next";
import Link from "next/link";
import { getAllProducts, getSaleProducts } from "@/services/productService";
import { ProductGrid } from "@/components/product/ProductGrid";
import { STORE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${STORE_NAME} — Inicio`,
};

export const revalidate = 60;

const CATEGORY_ICONS: Record<string, string> = {
  "Proteínas": "💪",
  "Pre-entrenos": "🔥",
  "Vitaminas": "💊",
  "Creatinas": "⚡",
  "Ganadores de peso": "🏋️",
  "Quemadores": "🌡️",
  "Snacks": "🥜",
};

export default async function HomePage() {
  const [products, saleProducts] = await Promise.all([
    getAllProducts(),
    getSaleProducts(),
  ]);
  const featured = products.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)",
          padding: "80px 20px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(34,197,94,0.12)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(34,197,94,0.08)", pointerEvents: "none" }} />

        <div className="max-w-2xl mx-auto relative">
          <span
            className="inline-block text-[11px] font-bold uppercase px-3.5 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(34,197,94,0.15)",
              border: "1px solid rgba(34,197,94,0.3)",
              color: "#86efac",
              letterSpacing: "1px",
            }}
          >
            🌿 Suplementos naturales · Envíos nacionales
          </span>

          <h1
            className="font-extrabold leading-tight mb-5"
            style={{ fontSize: "clamp(32px,6vw,60px)", color: "white", letterSpacing: "-2px", lineHeight: 1.05 }}
          >
            Nutre tu cuerpo,{" "}
            <span style={{ color: "#22c55e" }}>alcanza tu meta</span>
          </h1>

          <p
            className="text-[18px] leading-relaxed mb-9 max-w-md mx-auto"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Proteínas, creatinas, vitaminas y más. Haz tu pedido en segundos directamente por WhatsApp.
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-bold text-white transition-all"
              style={{
                background: "#16a34a",
                boxShadow: "0 4px 16px rgba(34,197,94,0.4)",
              }}
            >
              Ver catálogo completo →
            </Link>
            {saleProducts.length > 0 && (
              <Link
                href="#ofertas"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                }}
              >
                🏷️ Ver ofertas
              </Link>
            )}
          </div>

          {/* Stats row */}
          <div className="flex justify-center gap-8 mt-12 flex-wrap">
            {[["500+", "Clientes felices"], ["12", "Categorías"], ["48h", "Entrega rápida"]].map(([n, l]) => (
              <div key={n} className="text-center">
                <div className="text-[24px] font-extrabold" style={{ color: "#22c55e", letterSpacing: "-0.5px" }}>{n}</div>
                <div className="text-[12px] mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ background: "#fafafa", padding: "64px 0", borderBottom: "1px solid #f0fdf4" }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[11px] font-bold uppercase mb-2" style={{ color: "#16a34a", letterSpacing: "1px" }}>
                Explora por categoría
              </p>
              <h2 className="text-[32px] font-extrabold" style={{ color: "#0f1f14", letterSpacing: "-0.8px", lineHeight: 1 }}>
                ¿Qué estás buscando?
              </h2>
            </div>
            <Link
              href="/catalogo"
              className="text-[13px] font-semibold px-4 py-2 rounded-xl transition-all hidden sm:flex items-center gap-1.5"
              style={{ border: "1.5px solid #dcfce7", color: "#14532d", background: "none" }}
            >
              Ver catálogo completo
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>

          {/* Top 3 large cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            {[
              { cat: "Proteínas", desc: "Whey, caseína, vegana y más. Recuperación y crecimiento muscular.", bg: "linear-gradient(135deg,#052e16,#14532d)", accent: "#4ade80" },
              { cat: "Pre-entrenos", desc: "Energía, enfoque y pump para cada sesión.", bg: "linear-gradient(135deg,#1e1b4b,#312e81)", accent: "#a5b4fc" },
              { cat: "Vitaminas", desc: "Micronutrientes para salud y bienestar diario.", bg: "linear-gradient(135deg,#713f12,#92400e)", accent: "#fcd34d" },
            ].map(({ cat, desc, bg, accent }) => {
              const count = products.filter((p) => p.category === cat).length;
              return (
                <Link
                  key={cat}
                  href={`/catalogo?categoria=${encodeURIComponent(cat)}`}
                  className="flex flex-col justify-between text-left rounded-2xl p-6 transition-all"
                  style={{ background: bg, minHeight: 160, textDecoration: "none" }}
                >
                  <div>
                    <div className="text-3xl mb-2.5">{CATEGORY_ICONS[cat]}</div>
                    <div className="text-[17px] font-bold text-white mb-1.5" style={{ letterSpacing: "-0.2px" }}>{cat}</div>
                    <div className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{desc}</div>
                  </div>
                  <div className="flex items-center justify-between mt-5">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ color: accent, background: "rgba(255,255,255,0.1)" }}>
                      {count} productos
                    </span>
                    <span className="text-[18px] font-bold" style={{ color: accent }}>→</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom 4 smaller cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { cat: "Creatinas", bg: "#f0fdf4", border: "#bbf7d0" },
              { cat: "Ganadores de peso", bg: "#eff6ff", border: "#bfdbfe" },
              { cat: "Quemadores", bg: "#fff7ed", border: "#fed7aa" },
              { cat: "Snacks", bg: "#fefce8", border: "#fde68a" },
            ].map(({ cat, bg, border }) => {
              const count = products.filter((p) => p.category === cat).length;
              return (
                <Link
                  key={cat}
                  href={`/catalogo?categoria=${encodeURIComponent(cat)}`}
                  className="flex flex-col gap-2 p-4 rounded-2xl transition-all"
                  style={{ background: bg, border: `1.5px solid ${border}`, textDecoration: "none" }}
                >
                  <span className="text-[22px]">{CATEGORY_ICONS[cat]}</span>
                  <div>
                    <div className="text-[14px] font-bold" style={{ color: "#0f1f14" }}>{cat}</div>
                    <div className="text-[12px]" style={{ color: "#86a896" }}>{count} productos</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sale Products */}
      {saleProducts.length > 0 && (
        <section id="ofertas" style={{ padding: "64px 20px", background: "#fafafa" }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-7">
              <div>
                <p className="text-[11px] font-bold uppercase mb-1.5" style={{ color: "#ef4444", letterSpacing: "0.8px" }}>
                  Tiempo limitado
                </p>
                <h2 className="text-[28px] font-bold" style={{ color: "#0f1f14", letterSpacing: "-0.5px" }}>
                  🏷️ Ofertas especiales
                </h2>
              </div>
              <Link
                href="/catalogo"
                className="text-[13px] font-medium px-4 py-2.5 rounded-xl transition-all hidden sm:block"
                style={{ border: "1.5px solid #dcfce7", background: "white", color: "#3d5a47" }}
              >
                Ver todas →
              </Link>
            </div>
            <ProductGrid products={saleProducts} />
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section style={{ padding: "64px 20px", background: "white" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-7">
            <div>
              <p className="text-[11px] font-bold uppercase mb-1.5" style={{ color: "#86a896", letterSpacing: "0.8px" }}>
                Selección
              </p>
              <h2 className="text-[28px] font-bold" style={{ color: "#0f1f14", letterSpacing: "-0.5px" }}>
                Productos destacados
              </h2>
            </div>
            <Link
              href="/catalogo"
              className="text-[13px] font-medium px-4 py-2.5 rounded-xl transition-all hidden sm:block"
              style={{ border: "1.5px solid #dcfce7", background: "white", color: "#3d5a47" }}
            >
              Ver todos →
            </Link>
          </div>
          <ProductGrid products={featured} />
        </div>
      </section>

      {/* How it works — compact strip */}
      <section style={{ background: "white", borderTop: "1px solid #f0fdf4", borderBottom: "1px solid #f0fdf4", padding: "28px 20px" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-0 flex-wrap">
          {[
            { n: "01", icon: "🛍️", t: "Elige tu producto" },
            { n: "02", icon: "🛒", t: "Agrega al carrito" },
            { n: "03", icon: "💬", t: "Pide por WhatsApp" },
          ].map(({ n, icon, t }, i) => (
            <div key={n} className="flex items-center">
              <div className="flex items-center gap-2.5 px-5 py-2">
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0"
                  style={{ background: "#f0fdf4", border: "1px solid #dcfce7" }}
                >
                  {icon}
                </span>
                <div>
                  <span className="text-[10px] font-bold mr-1.5" style={{ color: "#aab9b1", fontFamily: "monospace" }}>{n}</span>
                  <span className="text-[13px] font-semibold" style={{ color: "#0f1f14" }}>{t}</span>
                </div>
              </div>
              {i < 2 && (
                <span className="text-[18px] font-light mx-1" style={{ color: "#dcfce7" }}>→</span>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
