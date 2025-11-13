import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, type ProductFormData } from "../schema/productSchema";
import { normalizeProductData } from "../utils/normalizeProductData";
import { useProductStore } from "@/features/products/store/productStore";

export const useProductForm = (id?: string) => {
  const { selectedProduct } = useProductStore();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema) as unknown as Resolver<ProductFormData>,
    defaultValues: selectedProduct && id
      ? normalizeProductData(selectedProduct)
      : {
          product_category_id: "",
          product_name: "",
          description: "",
          model_height: "",
          model_wearing: "",
          care_instructions: "",
          story_time: "",
          attributes: undefined,
          items: [],
          collection_id: "",
        },
  });

  useEffect(() => {
    if (selectedProduct && id) {
      form.reset(normalizeProductData(selectedProduct));
    }
  }, [selectedProduct, id]);

  return form;
};
