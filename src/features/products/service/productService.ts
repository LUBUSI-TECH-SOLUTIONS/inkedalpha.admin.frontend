import type { AxiosResponse } from "axios";
import type { ProductResponse } from "../types/productsType";
import { toast } from "sonner";
import axios from "axios";
import apiClient from "@/app/apiClient";

export const ProductService = {
  getAllProducts: async ():
    Promise<AxiosResponse<ProductResponse[]>> => {
    try {
      const response: AxiosResponse<ProductResponse[]>
        = await apiClient.get<ProductResponse[]>('v1/products');
      return response;
    } catch (error: unknown) {
      let errorMessage = "Error al obtener los productos.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },
  getProductById: async (product_id: string):
    Promise<AxiosResponse<ProductResponse>> => {
    try {
      const response: AxiosResponse<ProductResponse>
        = await apiClient.get<ProductResponse>(`v1/products/${product_id}/details`);
      return response;
    } catch (error: unknown) {
      let errorMessage = "Error al obtener el producto.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },
  createProduct: async (productData: ProductResponse ):
    Promise<AxiosResponse<ProductResponse>> => {
    try {
      const response: AxiosResponse<ProductResponse>
        = await apiClient.post<ProductResponse>('v1/product/full', productData);
      toast.success("Producto creado exitosamente.");
      return response;
    } catch (error: unknown) {
      let errorMessage = "Error al crear el producto.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
}