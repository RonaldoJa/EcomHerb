import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartToast } from "@/components/cart/CartToast";
import { WhatsAppFloat } from "@/components/common/WhatsAppFloat";
import { STORE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: STORE_NAME,
    template: `%s | ${STORE_NAME}`,
  },
  description:
    "Los mejores productos con la experiencia de compra más sencilla. Pide directamente por WhatsApp.",
  openGraph: {
    siteName: STORE_NAME,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-[#faf9f7] antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <CartToast />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}
