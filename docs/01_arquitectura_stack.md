# Definición de Arquitectura y Stack Tecnológico

## 1. Stack Tecnológico Definitivo
El agente debe construir la aplicación utilizando estrictamente las siguientes tecnologías:
* **Framework:** Next.js (App Router) con React.
* **Lenguaje:** TypeScript (Estricto). Las interfaces son obligatorias para todas las entidades y props.
* **Estilos:** Tailwind CSS.
* **Gestión de Estado (Cliente):** React Context API + LocalStorage custom hook (exclusivo para el carrito, sin librerías externas como Redux).
* **Gestión de Contenido (Backend):** Headless CMS con Sanity.io.
* **Despliegue Objetivo:** Vercel (Hosting serverless).

## 2. Patrones y Estándares (Clean Code y SOLID)
El código generado debe adherirse a lo siguiente:
* **Single Responsibility Principle (SRP):** Separar la lógica de UI de la lógica de negocio. Utilizar Custom Hooks (ej. `useCart`, `useWhatsAppCheckout`) para manejar la lógica fuera de los componentes visuales.
* **Inyección de Dependencias / Abstracción:** Los componentes visuales no deben acceder directamente a `localStorage` ni hacer peticiones fetch directas. Deben usar servicios o hooks intermedios.
* **Nomenclatura:** Nombres descriptivos en inglés para variables, funciones y componentes (ej. `calculateTotal`, `ProductCard`). 
* **Componentización:** Crear componentes pequeños y reutilizables en una carpeta `/components` (ej. `/components/ui/Button`, `/components/cart/CartItem`).