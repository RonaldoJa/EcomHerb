import type { ICartItem } from "@/types";
import { formatPrice } from "./formatPrice";
import { getBulkUnitPrice, getItemTotal, hasBulkDiscount } from "./saleUtils";
import { STORE_NAME, WHATSAPP_API_URL, WHATSAPP_NUMBER } from "../constants";

export function formatWhatsAppMessage(items: ICartItem[], total: number): string {
  const lines = items.map((item) => {
    const saleTag = item.onSale ? " 🏷️" : "";
    const bulkTag = hasBulkDiscount(item, item.quantity)
      ? ` (−${item.bulkDiscountPercent}% vol.)`
      : "";
    const lineTotal = getItemTotal(item, item.quantity);
    return `• ${item.name}${saleTag} x${item.quantity}${bulkTag} — ${formatPrice(lineTotal)}`;
  });

  const message = [
    `¡Hola ${STORE_NAME}! 👋 Me gustaría hacer el siguiente pedido:`,
    "",
    ...lines,
    "",
    `*Total: ${formatPrice(total)}*`,
    "",
    "Por favor confirmar disponibilidad y forma de pago. ¡Gracias!",
  ].join("\n");

  return message;
}

export function buildWhatsAppUrl(items: ICartItem[], total: number): string {
  const message = formatWhatsAppMessage(items, total);
  return `${WHATSAPP_API_URL}/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
