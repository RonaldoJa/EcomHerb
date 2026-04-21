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
      title: "Precio (COP)",
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
          { title: "Electrónica", value: "Electrónica" },
          { title: "Ropa", value: "Ropa" },
          { title: "Hogar", value: "Hogar" },
          { title: "Deportes", value: "Deportes" },
          { title: "Belleza", value: "Belleza" },
          { title: "Alimentos", value: "Alimentos" },
          { title: "Otros", value: "Otros" },
        ],
      },
    }),
    defineField({
      name: "inStock",
      title: "En stock",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "image",
    },
  },
});
