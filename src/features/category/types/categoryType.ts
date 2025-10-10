export interface CategoryType {
  product_category_id?: string;
  category_name: string;
  category_image: string;
  image?: File | null;
  category_description: string;
  parent_category_id: string;
  parent_category_name: string;
}