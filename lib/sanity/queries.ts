const PRODUCT_FIELDS = `
  _id,
  name,
  slug,
  description,
  price,
  "imageUrl": image.asset->url,
  category,
  inStock,
  onSale,
  salePrice
`;

export const ALL_PRODUCTS_QUERY = `*[_type == "product"] | order(_createdAt desc) {
  ${PRODUCT_FIELDS}
}`;

export const SALE_PRODUCTS_QUERY = `*[_type == "product" && onSale == true] | order(_createdAt desc) {
  ${PRODUCT_FIELDS}
}`;

export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  ${PRODUCT_FIELDS}
}`;
