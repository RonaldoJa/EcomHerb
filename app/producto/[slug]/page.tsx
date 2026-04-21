import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts } from "@/services/productService";
import { formatPrice } from "@/lib/utils/formatPrice";
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
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center gap-5">
          {product.category && (
            <span className="inline-block self-start bg-[#faf9f7] border border-[#dad4c8] text-[#55534e] text-xs font-semibold uppercase tracking-[1.08px] px-3 py-1 rounded-full">
              {product.category}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-semibold text-black leading-tight"
            style={{ letterSpacing: "-1px" }}>
            {product.name}
          </h1>
          <p className="text-[#55534e] text-base leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-2 py-2">
            <span className="text-3xl font-semibold text-black">{formatPrice(product.price)}</span>
            {!product.inStock && (
              <span className="text-sm text-[#fc7981] font-medium">Agotado</span>
            )}
          </div>

          <AddToCartButton product={product} />

          <div className="mt-2 p-4 rounded-2xl border border-dashed border-[#dad4c8] bg-white text-sm text-[#9f9b93] leading-relaxed">
            Al hacer clic en <strong className="text-black">"Agregar al carrito"</strong> y luego en{" "}
            <strong className="text-black">"Pedir por WhatsApp"</strong>, se abrirá un chat con tu pedido pre-redactado.
          </div>
        </div>
      </div>
    </div>
  );
}
