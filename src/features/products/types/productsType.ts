export interface ProductResponse {
  product_id: string;
  product_category_id: string;
  product_category_name: string;
  product_name: string;
  description: string;
  model_height: string;
  model_wearing: string;
  care_instructions: string;
  story_time: string;
  attributes: ProductAttribute[];
  items: ProductItem[];
  collections: ProductCollection[];
}

export interface ProductAttribute {
  attribute_name: string;
  attribute_value: string;
}

export interface ProductItem {
  product_item_id: string;
  color_id: string;
  color_name: string;
  hexadecimal: string;
  original_price: number;
  sale_price: number;
  images: ProductImage[];
  variations: ProductVariation[];
}

export interface ProductImage {
  product_image_id: string;
  image_filename: string;
}

export interface ProductVariation {
  variation_id: string;
  size_id: string;
  size_name: string;
  qty_in_stock: number;
}

export interface ProductCollection {
  additionalProp1: Record<string, unknown>;
}
