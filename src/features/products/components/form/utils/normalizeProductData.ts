import type { ProductFormData } from "../schema/productSchema";

export const normalizeProductData = (product: any): ProductFormData => ({
  ...product,
  items: product.items?.map((item: any) => ({
    ...item,
    original_price: String(item.original_price ?? ""),
    sale_price: String(item.sale_price ?? ""),
    variations: item.variations?.map((v: any) => ({
      ...v,
      size_id: v.size_id ?? "",
      qty_in_stock: String(v.qty_in_stock ?? ""),
    })) ?? [],
    images: item.images?.map((img: any) =>
      typeof img === "string"
        ? { image_filename: img }
        : {
            image_filename: String(img.image_filename ?? ""),
            product_image_id: img.product_image_id,
          }
    ) ?? [],
    color_id: item.color_id ?? "",
  })) ?? [],
  attributes: product.attributes?.map((attr: any) => ({
    attribute_name: attr.attribute_name ?? "",
    attribute_value: attr.attribute_value ?? "",
  })) ?? [],
  product_category_id: product.product_category_id ?? "",
  product_name: product.product_name ?? "",
  description: product.description ?? "",
  model_height: product.model_height ?? "",
  model_wearing: product.model_wearing ?? "",
  care_instructions: product.care_instructions ?? "",
  collection_id: product.collections?.[0]?.collection_id ?? "",
  story_time: product.story_time ?? "",
});
