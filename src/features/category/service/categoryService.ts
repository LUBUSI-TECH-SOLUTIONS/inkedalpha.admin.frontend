import apiClient from "@/app/apiClient";
import axios, { AxiosHeaders } from "axios";
import type { AxiosResponse } from "axios";
import type { CategoryType } from "@/features/category/types/categoryType";
import { toast } from "sonner";


export const CategoryService = {
  getAllCategories: async ():
    Promise<AxiosResponse<CategoryType[]>> => {
    try {
      const response: AxiosResponse<CategoryType[]>
        = await apiClient.get<CategoryType[]>('v1/product-categories');
      return response;
    } catch (error: unknown) {
      let errorMessage = "Error al obtener las categorias.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  createCategory: async (categoryData: CategoryType):
    Promise<AxiosResponse<CategoryType>> => {
    try {
      const formData = new FormData();
      if (categoryData.image) {
        formData.append('image', categoryData.image);
      }
      if (categoryData.category_name) {
        formData.append('category_name', categoryData.category_name);
      }
      if (categoryData.category_description) {
        formData.append('category_description', categoryData.category_description);
      }
      if (categoryData.parent_category_id) {
        formData.append('parent_category_id', categoryData.parent_category_id.toString());
      }
      if (categoryData.parent_category_name) {
        formData.append('parent_category_name', categoryData.parent_category_name);
      }

      const response: AxiosResponse<CategoryType>
        = await apiClient.post<CategoryType>('v1/product-category', formData, {
          headers: AxiosHeaders.from({
            "Content-Type": "multipart/form-data"
          })
        });
      toast.success("Categoria creada exitosamente.");
      return response;
    } catch (error: unknown) {
      let errorMessage = "Error al crear la categoria.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  updateCategory: async (categoryData: CategoryType, categoryId: string):
    Promise<AxiosResponse<CategoryType>> => {
    try {
      const response: AxiosResponse<CategoryType>
        = await apiClient.patch<CategoryType>(`v1/product-category/${categoryId}`, categoryData);
      toast.success("Categoria actualizada exitosamente.");
      return response;
    } catch (error: unknown) {
      let errorMessage = "Error al actualizar la Categoria.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  deleteCategory: async (categoryId: string):
    Promise<AxiosResponse<{ message: string }>> => {
    try {
      const response: AxiosResponse<{ message: string }>
        = await apiClient.delete<{ message: string }>(`v1/product-category/${categoryId}`);
      toast.success("Categoria eliminada exitosamente.");
      return response;
    } catch (error: unknown) {
      let errorMessage = "Error al eliminar la categoria.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  // toggleCategory: async (categoryId: string):
  //   Promise<AxiosResponse<CategoryType>> => {
  //   try {
  //     const response: AxiosResponse<CategoryType>
  //       = await apiClient.patch<CategoryType>(`v1/toggle-category/${categoryId}`);
  //     toast.success("Estado de la categoria actualizado exitosamente.");
  //     return response;
  //   } catch (error: unknown) {
  //     let errorMessage = "Error al actualizar el estado de la categoria.";
  //     if (axios.isAxiosError(error)) {
  //       errorMessage = error.response?.data?.message || errorMessage;
  //     }
  //     else if (error instanceof Error) {
  //       errorMessage = error.message;
  //     }
  //     toast.error(errorMessage);
  //     throw new Error(errorMessage);
  //   }
  // }
}