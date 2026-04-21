# Estándares de Programación (Clean Code y SOLID)

El agente debe regirse estrictamente por los siguientes principios para asegurar la escalabilidad y mantenibilidad del código:

## 1. Principios SOLID a aplicar
* **S - Single Responsibility Principle (SRP):** Cada componente, hook o función debe tener una única responsabilidad.
  * *Implementación:* El componente UI `ProductCard` solo debe renderizar. La lógica compleja de carrito debe estar abstraída en el hook `useCart`.
* **O - Open/Closed Principle (OCP):** El código debe estar abierto a la extensión pero cerrado a la modificación.
  * *Implementación:* Utilizar interfaces estrictas de TypeScript (ej. `IProduct`). Si mañana Sanity añade nuevos campos (ej. `discount`), el tipado debe permitir extenderse sin romper los componentes base.
* **D - Dependency Inversion Principle (DIP):** Los componentes de UI no deben acoplarse directamente a las consultas de la base de datos.
  * *Implementación:* Usar la capa de servicios (`productService.ts`) en lugar de escribir consultas GROQ directamente dentro de las páginas de Next.js.

## 2. Reglas de Clean Code
* **Nomenclatura Intencional:** Cero abreviaturas. Usar nombres descriptivos y verbos para las acciones (ej. `calculateCartTotal()`, `formatWhatsAppMessage()`).
* **Sin Magic Numbers/Strings:** Extraer valores fijos (URL de la API de WhatsApp, queries repetitivas de Sanity) a archivos de constantes (ej. `lib/constants.ts`) o variables de entorno.
* **Funciones Puras:** Las funciones matemáticas (cálculo de totales) y de formato de texto (generación del mensaje de WhatsApp) deben ser puras y estar desacopladas de la UI para facilitar pruebas unitarias futuras.
* **Control de Errores:** Manejar adecuadamente los estados de error y carga (`loading states`) en las llamadas a la API de Sanity.
