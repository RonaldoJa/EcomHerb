export const ALL_PRODUCTS_QUERY = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  name,
  slug,
  description,
  price,
  "imageUrl": image.asset->url,
  category,
  inStock
}`;

export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  description,
  price,
  "imageUrl": image.asset->url,
  category,
  inStock
}`;
