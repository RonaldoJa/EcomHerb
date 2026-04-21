# Historias de Usuario Detalladas y Requerimientos Adicionales

## 1. Historias de Usuario (Criterios de Aceptación)

El agente debe implementar el sistema cumpliendo estrictamente con la siguiente matriz:

| ID | Historia de Usuario | Criterios de Aceptación Técnicos |
| :--- | :--- | :--- |
| **HU-01** | Como cliente, quiero ver un catálogo de productos con sus imágenes, nombres y precios. | - Página principal muestra el grid consumiendo la API de Sanity.<br>- Implementar estado de carga (Skeleton Loader) mientras se hace el fetch. |
| **HU-02** | Como cliente, quiero ver el detalle de un producto específico. | - Implementar enrutamiento dinámico en Next.js (ej. `app/producto/[slug]/page.tsx`).<br>- Fetch individual usando el slug desde Sanity. |
| **HU-03** | Como cliente, quiero agregar productos a un carrito de compras. | - Al accionar "Agregar", se actualiza el Contexto.<br>- Un badge numérico en el Header Header refleja la cantidad total de ítems al instante. |
| **HU-04** | Como cliente, quiero revisar mi carrito para modificar las cantidades o eliminar productos. | - El Drawer del carrito permite modificar la propiedad `quantity` de cada ítem.<br>- Permite eliminar el ítem del array.<br>- Recalcula el Gran Total dinámicamente. |
| **HU-05** | Como cliente, quiero enviar mi pedido por WhatsApp para finalizar la compra. | - El carrito no debe vaciarse automáticamente al hacer clic (por si el usuario cancela en la app de WhatsApp).<br>- La URL de `wa.me` debe generarse utilizando `encodeURIComponent` sobre la plantilla de texto. |

## 2. Adiciones Estratégicas y Técnicas (Obligatorias)

El agente debe asegurar la implementación de los siguientes requerimientos de calidad:

* **Hidratación Segura del LocalStorage:** Al usar Next.js (SSR), el agente debe asegurarse de leer el `localStorage` solo en el ciclo de vida del cliente (ej. dentro de un `useEffect` o verificando `typeof window !== 'undefined'`) para evitar el error común de *Hydration Mismatch*.
* **Optimización SEO y Open Graph Dinámico:**
  * Utilizar la API de Metadata de Next.js (`export const metadata` o `generateMetadata`).
  * Las páginas de detalles de productos (`[slug]`) deben generar dinámicamente etiquetas Open Graph (`og:title`, `og:image`) para que al compartir el enlace del producto en redes o WhatsApp, se despliegue una tarjeta enriquecida con la foto y el nombre del producto.
* **Optimización de Imágenes:** Toda imagen consumida desde Sanity debe ser renderizada exclusivamente con el componente `<Image />` de Next.js. El agente debe configurar el dominio del CDN de Sanity en el archivo `next.config.mjs` (o `.js`) para permitir la optimización nativa.