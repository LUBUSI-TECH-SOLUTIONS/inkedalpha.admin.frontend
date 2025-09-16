import type { AxiosResponse } from "axios";
import type { ColorType } from "../types/colorType";
import { toast } from "sonner";
import axios from "axios";
import apiClient from "@/app/apiClient";

export const ColorService = {
  getAllColors: async ():
    Promise<AxiosResponse<ColorType[]>> => {
    try {
      const response: AxiosResponse<ColorType[]>
        = await apiClient.get<ColorType[]>('v1/colors');
      return response;
    } catch (error: unknown) {
      let errorMessage = "Error al obtener los colores.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },
  createColor: async (colorData: ColorType):
    Promise<AxiosResponse<ColorType>> => {
    try {
      const response: AxiosResponse<ColorType>
        = await apiClient.post<ColorType>('v1/color', colorData);
      toast.success("Color creado exitosamente.");
      return response;
    } catch (error: unknown) {
      let errorMessage = "Error al crear el color.";
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
  updatedColor: async (colorData: ColorType):
    Promise<AxiosResponse<ColorType>> => {
    try {
      const response: AxiosResponse<ColorType>
        = await apiClient.put<ColorType>(`v1/color/${colorData.color_id}`, colorData);
      toast.success("Color actualizado exitosamente.");
      return response;
    } catch (error: unknown) {
      let errorMessage = "Error al actualizar el color.";
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
  deleteColor: async (color_id: string):
    Promise<AxiosResponse<{ message: string }>> => {
    try {
      const response: AxiosResponse<{ message: string }>
        = await apiClient.delete<{ message: string }>(`v1/color/${color_id}`);
      toast.success("Color eliminado exitosamente.");
      return response;
    } catch (error: unknown) {
      let errorMessage = "Error al eliminar el color.";
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