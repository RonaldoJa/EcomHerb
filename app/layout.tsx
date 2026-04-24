import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });
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
      <body className={`${inter.className} min-h-screen flex flex-col antialiased`} style={{ background: "#fafafa", color: "#0f1f14" }}>
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
