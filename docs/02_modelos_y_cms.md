# Modelos de Datos, CMS y Gestión de Estado

## 1. Integración con el CMS (Sanity.io)
El agente NO debe usar datos estáticos. Debe configurar la conexión a Sanity usando el cliente oficial.
* **Dependencias a instalar:** `next-sanity` y `@sanity/client`.
* **Configuración:** Crear un archivo `lib/sanity/client.ts` que exporte el cliente configurado usando las variables de entorno `NEXT_PUBLIC_SANITY_PROJECT_ID` y `NEXT_PUBLIC_SANITY_DATASET`.

## 2. Interfaces TypeScript
Crear un archivo `types/index.ts` con las interfaces base:

```typescript
export interface IProduct {
  _id: string; 
  name: string;
  slug: { current: string };
  description: string;
  price: number;
  imageUrl: string; 
  category: string;
  inStock: boolean;
}

export interface ICartItem extends IProduct {
  quantity: number;
}

export interface ICartContext {
  items: ICartItem[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartTotal: number;
  clearCart: () => void;
}