"use client";

import { MessageCircle } from "lucide-react";
import { WHATSAPP_API_URL, WHATSAPP_NUMBER } from "@/lib/constants";

export function WhatsAppFloat() {
  const href = `${WHATSAPP_API_URL}/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "¡Hola! Me gustaría consultar sobre sus productos."
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white rounded-[1584px] px-4 py-3 font-medium text-sm shadow-lg hover:bg-[#1ebe5d] transition-colors clay-btn-hover group"
    >
      <MessageCircle size={20} strokeWidth={2} />
      <span className="hidden sm:block">¿Consultas?</span>
    </a>
  );
}
