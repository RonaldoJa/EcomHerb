import { Metadata } from "next";
import { STORE_NAME } from "@/lib/constants";

export const metadata: Metadata = { title: `Preguntas Frecuentes | ${STORE_NAME}` };

const FAQS = [
  {
    q: "¿Cómo hago un pedido?",
    a: "Agrega los productos que deseas al carrito y presiona 'Pedir por WhatsApp'. Se abrirá un chat con tu pedido ya redactado.",
  },
  {
    q: "¿Cuáles son los métodos de pago?",
    a: "Coordinamos el pago directamente por WhatsApp: transferencia, efectivo o método acordado con el vendedor.",
  },
  {
    q: "¿Hacen envíos a todo el país?",
    a: "Sí. Los costos y tiempos de envío se confirman en el chat de WhatsApp según tu ubicación.",
  },
  {
    q: "¿Puedo devolver un producto?",
    a: "Sí, dentro de los primeros 7 días. Contáctanos por WhatsApp para coordinar la devolución.",
  },
];

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-semibold text-black mb-10" style={{ letterSpacing: "-1px" }}>
        Preguntas Frecuentes
      </h1>
      <div className="space-y-6">
        {FAQS.map(({ q, a }) => (
          <div key={q} className="bg-white border border-[#dad4c8] rounded-2xl p-6"
            style={{ boxShadow: "rgba(0,0,0,0.1) 0px 1px 1px, rgba(0,0,0,0.04) 0px -1px 1px inset" }}>
            <h2 className="font-semibold text-black text-base mb-2">{q}</h2>
            <p className="text-[#55534e] text-sm leading-relaxed">{a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
