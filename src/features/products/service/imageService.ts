import apiClient from "@/app/apiClient";
import axios, { AxiosHeaders, type AxiosResponse } from "axios";
import { toast } from "sonner";

export const ImageService = {
  createImage: async (imageData: FormData):
    Promise<AxiosResponse<{ image_url: string }>> => {
    const formData = new FormData();
    if (imageData) {
      formData.append('image', imageData.get('image') as Blob);
    }
    try {
      const response: AxiosResponse<{ image_url: string }>
        = await apiClient.post<{ image_url: string }>('v1/product-image', formData, {
          headers: AxiosHeaders.from({
            "Content-Type": "multipart/form-data"
          })
        });
      toast.success("Imagen subida exitosamente.");
      return response;
    } catch (error: unknown) {
      let errorMessage = "Error al subir la imagen.";
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