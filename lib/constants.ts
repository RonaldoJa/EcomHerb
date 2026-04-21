export const WHATSAPP_API_URL = "https://wa.me";
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
export const STORE_NAME = process.env.NEXT_PUBLIC_STORE_NAME ?? "Mi Tienda";

export const STORE_EMAIL = "contacto@elherbario.io";
export const STORE_PHONE = "+593 989792072";
export const STORE_HOURS = "Lun–Vie 9:00am – 6:00pm | Sáb 9:00am – 1:00pm";
export const STORE_INSTAGRAM = "https://instagram.com/elherbario";
export const STORE_FACEBOOK = "https://facebook.com/elherbario";

export const CART_STORAGE_KEY = "ecomm_cart";
export const DEFAULT_MAX_QUANTITY = 6;

export const PRODUCT_CATEGORIES = [
  "Proteínas",
  "Creatinas",
  "Ganadores de peso",
  "Vitaminas",
  "Pre-entrenos",
  "Quemadores",
  "Snacks",
  "Varios",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const SORT_OPTIONS = [
  { label: "Más recientes", value: "newest" },
  { label: "Precio: menor a mayor", value: "price_asc" },
  { label: "Precio: mayor a menor", value: "price_desc" },
  { label: "A–Z", value: "name_asc" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];
