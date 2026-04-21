import { Metadata } from "next";
import { STORE_NAME } from "@/lib/constants";

export const metadata: Metadata = { title: `Política de Privacidad | ${STORE_NAME}` };

export default function PrivacidadPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-semibold text-black mb-6" style={{ letterSpacing: "-1px" }}>
        Política de Privacidad
      </h1>
      <p className="text-[#55534e] leading-relaxed">
        Contenido en construcción. Por favor vuelve pronto.
      </p>
    </div>
  );
}
