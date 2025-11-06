import type { AxiosResponse } from "axios";
import type { SizeType } from "../types/sizeType";
import { toast } from "sonner";
import axios from "axios";
import apiClient from "@/app/apiClient";

export const SizeService = {
  getAllSizes: async ():
    Promise<AxiosResponse<SizeType[]>> => {
    try {
      const response: AxiosResponse<SizeType[]>
        = await apiClient.get<SizeType[]>('v1/size-options');
      return response;
    } catch (error: unknown) {
      let errorMessage = "Error al obtener las tallas.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  createSize: async (sizeData: SizeType):
    Promise<AxiosResponse<SizeType>> => {
    try {
      const response: AxiosResponse<SizeType>
        = await apiClient.post<SizeType>('v1/create-size-option', sizeData);
      toast.success("Talla creada exitosamente.");
      return response;
    } catch (error: unknown) {
      let errorMessage = "Error al crear la talla.";
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

  updatedSize: async (sizeData: SizeType):
    Promise<AxiosResponse<SizeType>> => {
    try {
      const response: AxiosResponse<SizeType>
        = await apiClient.patch<SizeType>(`v1/update-size-option/${sizeData.size_id}`, sizeData);
      toast.success("Talla actualizada exitosamente.");
      return response;

    } catch (error: unknown) {
      let errorMessage = "Error al actualizar la talla.";
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

  deleteSize: async (size_id: string):
    Promise<AxiosResponse<{ message: string }>> => {
    try {
      const response: AxiosResponse<{ message: string }>
        = await apiClient.delete<{ message: string }>(`v1/delete-size-option/${size_id}`);
      toast.success("Talla eliminado exitosamente.");
      return response;
    } catch (error: unknown) {
      let errorMessage = "Error al eliminar el Talla.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
}