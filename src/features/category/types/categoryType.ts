export interface CategoryType {
  product_category_id?: number;
  category_name: string;
  category_image: string;
  image?: File | null;
  category_description: string;
  parent_category_id: number | null;
  parent_category_name: string | null;
}