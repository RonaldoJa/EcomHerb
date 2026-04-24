import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { getProductBySlug, getAllProducts } from "@/services/productService";
import { formatPrice } from "@/lib/utils/formatPrice";
import { portableTextToPlain } from "@/lib/utils/portableTextToPlain";
import {
  getEffectivePrice,
  getDiscountPercent,
  getMaxQuantity,
} from "@/lib/utils/saleUtils";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { STORE_NAME } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_ICONS: Record<string, string> = {
  "Proteínas": "💪",
  "Creatinas": "⚡",
  "Ganadores de peso": "🏋️",
  "Vitaminas": "💊",
  "Pre-entrenos": "🔥",
  "Quemadores": "🌡️",
  "Snacks": "🥜",
  "Varios": "📦",
};

const CATEGORY_BENEFITS: Record<string, Array<{ icon: string; title: string; desc: string }>> = {
  "Proteínas": [
    { icon: "💪", title: "Síntesis muscular", desc: "Activa la síntesis de proteínas musculares post-entrenamiento." },
    { icon: "⚡", title: "Recuperación rápida", desc: "Reduce el daño muscular y el dolor post-ejercicio." },
    { icon: "🎯", title: "Alta biodisponibilidad", desc: "Se absorbe más rápido que otras fuentes de proteína." },
    { icon: "⚖️", title: "Control de peso", desc: "La proteína aumenta la saciedad y preserva la masa muscular." },
  ],
  "Creatinas": [
    { icon: "⚡", title: "Fuerza explosiva", desc: "Aumenta los niveles de fosfocreatina para esfuerzos máximos." },
    { icon: "🏋️", title: "Más repeticiones", desc: "Retrasa la fatiga muscular para entrenamientos más intensos." },
    { icon: "🧠", title: "Función cognitiva", desc: "La creatina también beneficia el rendimiento cerebral." },
    { icon: "💦", title: "Sin retención hídrica", desc: "Fórmula avanzada sin el hinchazón del monohidrato estándar." },
  ],
  "Vitaminas": [
    { icon: "🛡️", title: "Inmunidad reforzada", desc: "Potencia las defensas naturales del organismo." },
    { icon: "🌟", title: "Antioxidante potente", desc: "Neutraliza radicales libres y reduce el estrés oxidativo." },
    { icon: "💊", title: "Alta absorción", desc: "Fórmula de alta biodisponibilidad para máximo aprovechamiento." },
    { icon: "⚡", title: "Energía celular", desc: "Participa activamente en procesos energéticos del cuerpo." },
  ],
  "Pre-entrenos": [
    { icon: "🔥", title: "Energía inmediata", desc: "Activación rápida sin crash posterior." },
    { icon: "🎯", title: "Enfoque mental", desc: "Concentración máxima en cada repetición." },
    { icon: "💉", title: "Pump extremo", desc: "Mayor flujo sanguíneo para un pump duradero." },
    { icon: "⏱️", title: "Mayor resistencia", desc: "Retrasa la acumulación de ácido láctico." },
  ],
  "Ganadores de peso": [
    { icon: "🏋️", title: "Calorías densas", desc: "Alto aporte calórico para superávit fácil." },
    { icon: "💪", title: "Proteína de calidad", desc: "Soporta el crecimiento y la recuperación muscular." },
    { icon: "⚡", title: "Carbos de acción mixta", desc: "Energía inmediata y sostenida para entrenar más." },
    { icon: "🧬", title: "Sin grasas trans", desc: "Perfil lipídico limpio sin aceites hidrogenados." },
  ],
  "Quemadores": [
    { icon: "🔥", title: "Termogénesis", desc: "Aumenta el gasto calórico en reposo y en actividad." },
    { icon: "⚡", title: "Energía limpia", desc: "Sin nerviosismo ni crash gracias a estimulantes naturales." },
    { icon: "🎯", title: "Suprime el apetito", desc: "Reduce los antojos y mejora el control calórico." },
    { icon: "🌿", title: "Ingredientes naturales", desc: "Extractos botánicos sin aditivos agresivos." },
  ],
  "Snacks": [
    { icon: "🥜", title: "Proteína real", desc: "Fuentes naturales de proteína de calidad." },
    { icon: "🌿", title: "Sin ultraprocesados", desc: "Sin conservantes artificiales ni colorantes." },
    { icon: "⚡", title: "Energía sostenida", desc: "Grasas saludables y fibra para durar más." },
    { icon: "😋", title: "Delicioso", desc: "Bocado saludable que satisface sin culpa." },
  ],
};

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };

  const plainDesc = portableTextToPlain(product.description);
  return {
    title: `${product.name} | ${STORE_NAME}`,
    description: plainDesc,
    openGraph: {
      title: product.name,
      description: plainDesc,
      images: product.imageUrl ? [{ url: product.imageUrl }] : [],
    },
  };
}

export const revalidate = 60;

export default async function ProductoPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const effectivePrice = getEffectivePrice(product);
  const discountPercent = getDiscountPercent(product);
  const maxQty = getMaxQuantity(product);
  const benefits = CATEGORY_BENEFITS[product.category] ?? CATEGORY_BENEFITS["Proteínas"];

  return (
    <div style={{ background: "#fafafa", paddingBottom: 80 }}>
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center gap-1.5 text-[13px]" style={{ color: "#86a896" }}>
          <Link href="/" style={{ color: "#86a896" }}>Inicio</Link>
          <span>›</span>
          <Link href="/catalogo" style={{ color: "#86a896" }}>Catálogo</Link>
          <span>›</span>
          <span style={{ color: "#0f1f14", fontWeight: 500 }}>{product.category}</span>
          <span>›</span>
          <span
            style={{ color: "#0f1f14", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}
          >
            {product.name}
          </span>
        </div>
      </div>

      {/* Hero split */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">

        {/* Left: image (sticky on desktop) */}
        <div className="md:sticky md:top-20">
          <div
            className="relative aspect-square overflow-hidden"
            style={{
              borderRadius: 20,
              border: "1.5px solid #dcfce7",
              background: "#f0fdf4",
              boxShadow: "0 4px 32px rgba(20,83,45,0.1)",
            }}
          >
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl">
                {CATEGORY_ICONS[product.category] ?? "🌿"}
              </div>
            )}
            {product.onSale && (
              <div
                className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl text-sm font-extrabold text-white"
                style={{ background: "#16a34a" }}
              >
                −{discountPercent}% OFF
              </div>
            )}
            {product.isBestSeller && (
              <div
                className="absolute left-4 px-3 py-1 rounded-xl text-[12px] font-bold text-white flex items-center gap-1"
                style={{ background: "#14532d", top: product.onSale ? 56 : 16 }}
              >
                ★ Best Seller
              </div>
            )}
          </div>
        </div>

        {/* Right: info */}
        <div className="flex flex-col gap-5 pt-1">
          {/* Category + rating */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span
              className="text-[11px] font-bold uppercase px-3 py-1 rounded-full"
              style={{
                color: "#16a34a",
                background: "#f0fdf4",
                border: "1px solid #dcfce7",
                letterSpacing: "1px",
              }}
            >
              {CATEGORY_ICONS[product.category]} {product.category}
            </span>
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-sm" style={{ color: "#fbbf24" }}>★</span>
                ))}
              </div>
              <span className="text-[13px]" style={{ color: "#86a896" }}>(47 reseñas)</span>
            </div>
          </div>

          {/* Name */}
          <h1
            className="font-extrabold leading-tight"
            style={{ fontSize: 28, color: "#0f1f14", letterSpacing: "-0.8px" }}
          >
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span
              className="font-extrabold"
              style={{ fontSize: 34, color: "#0f1f14", letterSpacing: "-1px" }}
            >
              {formatPrice(effectivePrice)}
            </span>
            {product.onSale && product.salePrice && (
              <>
                <span className="text-[18px] line-through" style={{ color: "#aab9b1" }}>
                  {formatPrice(product.price)}
                </span>
                <span
                  className="text-[13px] font-bold px-2.5 py-1 rounded-lg"
                  style={{ background: "#dcfce7", color: "#15803d" }}
                >
                  Ahorras {formatPrice(product.price - product.salePrice)}
                </span>
              </>
            )}
          </div>

          {/* Stock warning */}
          {!product.inStock && (
            <div
              className="flex items-center gap-2 p-3 rounded-xl"
              style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
            >
              <span className="text-base">😔</span>
              <span className="text-[13px] font-semibold" style={{ color: "#6b7280" }}>
                Agotado — Notifícame cuando llegue
              </span>
            </div>
          )}

          {/* Bulk discount banner */}
          {product.bulkDiscountMinQty && product.bulkDiscountPercent && (
            <div
              className="flex items-center gap-3 p-3.5 rounded-2xl"
              style={{ background: "#f0fdf4", border: "1px solid #84e7a5" }}
            >
              <span className="text-xl shrink-0">🎁</span>
              <p className="text-sm font-medium" style={{ color: "#02492a" }}>
                Compra <strong>{product.bulkDiscountMinQty}+</strong> unidades y obtén un{" "}
                <strong>{product.bulkDiscountPercent}% de descuento</strong> adicional automático.
              </p>
            </div>
          )}

          {/* Add to cart */}
          <AddToCartButton product={product} />

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[14px] font-bold text-white transition-all"
            style={{ background: "#25D366", textDecoration: "none" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.853L.057 23.927l6.228-1.634A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.006-1.368l-.36-.213-3.7.971.986-3.606-.235-.371A9.818 9.818 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z" />
            </svg>
            Pedir por WhatsApp
          </a>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-2">
            {[
              ["🚚", "Envío rápido", "Llega en 24-48h"],
              ["🔒", "Pago seguro", "SSL certificado"],
              ["↩️", "Garantía", "30 días devolución"],
            ].map(([icon, t, d]) => (
              <div
                key={t}
                className="p-2.5 rounded-xl text-center"
                style={{ background: "#f0fdf4", border: "1px solid #dcfce7" }}
              >
                <div className="text-lg mb-1">{icon}</div>
                <div className="text-[11px] font-bold" style={{ color: "#0f1f14" }}>{t}</div>
                <div className="text-[10px]" style={{ color: "#86a896" }}>{d}</div>
              </div>
            ))}
          </div>

          {/* Info row */}
          <div className="flex items-center gap-4 text-[12px]" style={{ color: "#9f9b93" }}>
            <span>📦 Máx. {maxQty} unidades por pedido</span>
            {product.inStock && (
              <span className="font-medium" style={{ color: "#078a52" }}>✓ En stock</span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Description tab */}
        <div
          className="mb-8 rounded-2xl overflow-hidden"
          style={{ background: "white", border: "1.5px solid #f0fdf4" }}
        >
          <div
            className="px-6 py-4"
            style={{ background: "#052e16" }}
          >
            <h2 className="text-[16px] font-bold text-white">Descripción del producto</h2>
          </div>
          <div
            className="px-6 py-5 prose prose-sm max-w-none"
            style={{ color: "#5a7a6a" }}
          >
            <PortableText
              value={product.description}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="mb-3 text-[15px] leading-relaxed" style={{ color: "#5a7a6a" }}>{children}</p>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="mb-3 space-y-2" style={{ paddingLeft: "1.25rem" }}>{children}</ul>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => (
                    <li className="text-[15px] leading-relaxed" style={{ color: "#5a7a6a", listStyleType: "disc" }}>{children}</li>
                  ),
                },
                marks: {
                  strong: ({ children }) => <strong style={{ color: "#0f1f14", fontWeight: 600 }}>{children}</strong>,
                  em: ({ children }) => <em>{children}</em>,
                },
              }}
            />
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-8">
          <h2
            className="text-[22px] font-extrabold mb-5"
            style={{ color: "#0f1f14", letterSpacing: "-0.4px" }}
          >
            Beneficios principales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="flex flex-col gap-2.5 p-5 rounded-2xl transition-all"
                style={{ background: "white", border: "1.5px solid #f0fdf4" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px]"
                  style={{ background: "#f0fdf4", border: "1px solid #dcfce7" }}
                >
                  {b.icon}
                </div>
                <h4 className="text-[15px] font-bold" style={{ color: "#0f1f14" }}>{b.title}</h4>
                <p className="text-[13px] leading-relaxed" style={{ color: "#86a896" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Usage instructions */}
        <div className="mb-8">
          <h2
            className="text-[22px] font-extrabold mb-5"
            style={{ color: "#0f1f14", letterSpacing: "-0.4px" }}
          >
            Modo de uso
          </h2>
          <div className="flex flex-col gap-3 max-w-xl">
            {[
              { step: "1", t: "Preparación", d: "Mezcla la porción recomendada con 250–300ml de agua fría, leche o tu bebida favorita." },
              { step: "2", t: "Timing", d: "Consume preferiblemente post-entrenamiento en los primeros 30 minutos." },
              { step: "3", t: "Frecuencia", d: "Sigue las indicaciones del empaque según tus objetivos diarios." },
              { step: "4", t: "Almacenamiento", d: "Conservar en lugar fresco y seco. Una vez abierto, consumir en 60 días." },
            ].map(({ step, t, d }) => (
              <div
                key={step}
                className="flex gap-4 p-4 rounded-2xl"
                style={{ background: "white", border: "1.5px solid #f0fdf4" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold text-base shrink-0"
                  style={{ background: "#16a34a" }}
                >
                  {step}
                </div>
                <div>
                  <p className="text-[14px] font-bold mb-1" style={{ color: "#0f1f14" }}>{t}</p>
                  <p className="text-[13px] leading-relaxed" style={{ color: "#5a7a6a" }}>{d}</p>
                </div>
              </div>
            ))}
            <div
              className="p-3.5 rounded-2xl"
              style={{ background: "#fff7ed", border: "1px solid #fed7aa" }}
            >
              <p className="text-[13px] leading-relaxed" style={{ color: "#92400e" }}>
                ⚠️ <strong>Advertencia:</strong> Este producto es un suplemento alimenticio. No sustituye una dieta variada. Consultar con un profesional de la salud ante cualquier duda.
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp note */}
        <div
          className="p-4 rounded-2xl text-sm leading-relaxed"
          style={{ border: "1px dashed #dcfce7", background: "white", color: "#86a896" }}
        >
          Al hacer clic en <strong style={{ color: "#0f1f14" }}>"Agregar al carrito"</strong> y luego en{" "}
          <strong style={{ color: "#0f1f14" }}>"Pedir por WhatsApp"</strong>, se abrirá un chat con tu pedido pre-redactado.
        </div>
      </div>
    </div>
  );
}
