import { defineType, defineField } from "sanity";

export const productSchema = defineType({
  name: "product",
  title: "Producto",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (rule) => rule.required().min(2).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: "price",
      title: "Precio (USD)",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "image",
      title: "Imagen principal",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Proteínas", value: "Proteínas" },
          { title: "Creatinas", value: "Creatinas" },
          { title: "Ganadores de peso", value: "Ganadores de peso" },
          { title: "Vitaminas", value: "Vitaminas" },
          { title: "Pre-entrenos", value: "Pre-entrenos" },
          { title: "Quemadores", value: "Quemadores" },
          { title: "Snacks", value: "Snacks" },
          { title: "Varios", value: "Varios" },
        ],
      },
    }),
    defineField({
      name: "inStock",
      title: "En stock",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "onSale",
      title: "¿En oferta?",
      type: "boolean",
      initialValue: false,
      description: "Activa esto para marcar el producto como oferta y mostrar el precio rebajado.",
    }),
    defineField({
      name: "salePrice",
      title: "Precio de oferta (USD)",
      type: "number",
      description: "Precio rebajado. Solo aplica si '¿En oferta?' está activo.",
      validation: (rule) =>
        rule.custom((salePrice, context) => {
          const doc = context.document as { onSale?: boolean; price?: number };
          if (doc?.onSale && !salePrice) return "Debes ingresar el precio de oferta.";
          if (salePrice && doc?.price && salePrice >= doc.price)
            return "El precio de oferta debe ser menor al precio original.";
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "image",
      onSale: "onSale",
    },
    prepare({ title, subtitle, media, onSale }) {
      return {
        title: onSale ? `🏷️ ${title}` : title,
        subtitle,
        media,
      };
    },
  },
});
