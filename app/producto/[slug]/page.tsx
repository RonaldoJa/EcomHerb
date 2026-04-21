import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts } from "@/services/productService";
import { formatPrice } from "@/lib/utils/formatPrice";
import { getEffectivePrice, getDiscountPercent, getMaxQuantity } from "@/lib/utils/saleUtils";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { STORE_NAME } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };

  return {
    title: `${product.name} | ${STORE_NAME}`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Image */}
        <div className="relative aspect-square rounded-3xl overflow-hidden border border-[#dad4c8] bg-[#faf9f7]"
          style={{ boxShadow: "rgba(0,0,0,0.1) 0px 1px 1px, rgba(0,0,0,0.04) 0px -1px 1px inset" }}>
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
            <div className="w-full h-full bg-[#eee9df]" />
          )}
          {product.onSale && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1 bg-[#fc7981] text-white text-xs font-bold uppercase tracking-[1.08px] px-3 py-1.5 rounded-full shadow-md">
                🏷️ OFERTA {discountPercent > 0 && `−${discountPercent}%`}
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {product.category && (
              <span className="bg-[#faf9f7] border border-[#dad4c8] text-[#55534e] text-xs font-semibold uppercase tracking-[1.08px] px-3 py-1 rounded-full">
                {product.category}
              </span>
            )}
            {product.onSale && (
              <span className="bg-[#fff5f5] border border-[#fc7981] text-[#fc7981] text-xs font-semibold uppercase tracking-[1.08px] px-3 py-1 rounded-full">
                En oferta
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold text-black leading-tight"
            style={{ letterSpacing: "-1px" }}>
            {product.name}
          </h1>

          <p className="text-[#55534e] text-base leading-relaxed">{product.description}</p>

          {/* Price block */}
          <div className="flex items-end gap-3 py-2">
            <span className="text-3xl font-semibold text-black">
              {formatPrice(effectivePrice)}
            </span>
            {product.onSale && product.salePrice && (
              <div className="flex flex-col">
                <span className="text-base text-[#9f9b93] line-through leading-tight">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs font-semibold text-[#fc7981]">
                  Ahorras {formatPrice(product.price - product.salePrice)}
                </span>
              </div>
            )}
            {!product.inStock && (
              <span className="text-sm text-[#fc7981] font-medium">Agotado</span>
            )}
          </div>

          <AddToCartButton product={product} />

          {/* Bulk discount banner */}
          {product.bulkDiscountMinQty && product.bulkDiscountPercent && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#f0fdf4] border border-[#84e7a5]">
              <span className="text-xl shrink-0">🎁</span>
              <p className="text-sm text-[#02492a] font-medium">
                Compra <strong>{product.bulkDiscountMinQty}+</strong> unidades y obtén un{" "}
                <strong>{product.bulkDiscountPercent}% de descuento</strong> adicional automático.
              </p>
            </div>
          )}

          {/* Info row */}
          <div className="flex items-center gap-4 text-xs text-[#9f9b93]">
            <span>📦 Máx. {maxQty} unidades por pedido</span>
            {product.inStock && <span className="text-[#078a52] font-medium">✓ En stock</span>}
          </div>

          <div className="p-4 rounded-2xl border border-dashed border-[#dad4c8] bg-white text-sm text-[#9f9b93] leading-relaxed">
            Al hacer clic en <strong className="text-black">"Agregar al carrito"</strong> y luego en{" "}
            <strong className="text-black">"Pedir por WhatsApp"</strong>, se abrirá un chat con tu pedido pre-redactado.
          </div>
        </div>
      </div>
    </div>
  );
}
