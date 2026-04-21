import { Metadata } from "next";
import { STORE_NAME } from "@/lib/constants";

export const metadata: Metadata = { title: `Términos y Condiciones | ${STORE_NAME}` };

export default function TerminosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-semibold text-black mb-6" style={{ letterSpacing: "-1px" }}>
        Términos y Condiciones
      </h1>
      <p className="text-[#55534e] leading-relaxed">
        Contenido en construcción. Por favor vuelve pronto.
      </p>
    </div>
  );
}
