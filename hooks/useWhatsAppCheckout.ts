"use client";

import { useCallback } from "react";
import { useCart } from "./useCart";
import { buildWhatsAppUrl } from "@/lib/utils/formatWhatsAppMessage";

export function useWhatsAppCheckout() {
  const { items, cartTotal } = useCart();

  const initiateCheckout = useCallback(() => {
    if (items.length === 0) return;
    const url = buildWhatsAppUrl(items, cartTotal);
    window.open(url, "_blank", "noopener,noreferrer");
  }, [items, cartTotal]);

  return { initiateCheckout };
}
