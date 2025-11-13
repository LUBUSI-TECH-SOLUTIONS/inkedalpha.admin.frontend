import type { AxiosResponse } from "axios";
import type { ProductResponse } from "../types/productsType";
import { toast } from "sonner";
import axios, { AxiosHeaders } from "axios";
import apiClient from "@/app/apiClient";

type ProductServiceParams = {
  product_id?: string;
  collection_id?: string;
  product_category_id?: string;
  include_details?: boolean;
  single?: boolean;
}

export const ProductService = {
  getAllProducts: async (params: ProductServiceParams): 
    Promise<AxiosResponse< ProductResponse | ProductResponse[]>> => {
    try {
      const response: AxiosResponse<ProductResponse[]> = await apiClient.get("v1/product", {
        params: {
         product_id: params.product_id,
         collection_id: params.collection_id,
         product_category_id: params.product_category_id,
         include_details: params.include_details ?? false,
        },
        headers: new AxiosHeaders(),
      });

      if(params.single === true && Array.isArray(response.data)) {
        const singleResponse : AxiosResponse<ProductResponse> = {
          ...response,
          data: response.data[0],
        }
        return singleResponse;
      }

      if( params.single === true && !Array.isArray(response.data)){
        return response as unknown as AxiosResponse<ProductResponse>;
      }

      if(params.single !== true){
        const arrayResponse: AxiosResponse<ProductResponse[]> = {
          ...response,
          data: Array.isArray(response.data) ? response.data : [response.data],
        };
        return arrayResponse;
      }
      
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
  createProduct: async (
    productData: ProductResponse
  ): Promise<AxiosResponse<ProductResponse>> => {
    try {
      const response: AxiosResponse<ProductResponse> =
        await apiClient.post<ProductResponse>("v1/product/full", productData);
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
  },
};
