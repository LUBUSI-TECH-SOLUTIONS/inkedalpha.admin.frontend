import apiClient from "@/app/apiClient";
import axios, { AxiosHeaders } from "axios";
import type { AxiosResponse } from "axios";
import type { CollectionType } from "@/features/collections/types/collectionType";
import { toast } from "sonner";

export const CollectionService = {
  getAllCollections: async ():
    Promise<AxiosResponse<CollectionType[]>> => {
    try {
      const response: AxiosResponse<CollectionType[]>
        = await apiClient.get<CollectionType[]>('v1/collections');
      return response;
    } catch (error: unknown) {
      let errorMessage = "Error al obtener las colecciones.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },

  createCollection: async (collectionData: CollectionType):
    Promise<AxiosResponse<CollectionType>> => {
    try {
      const formData = new FormData();
      if (collectionData.image) {
        formData.append('image', collectionData.image);
      }
      if (collectionData.collection_name) {
        formData.append('collection_name', collectionData.collection_name);
      }
      if (collectionData.collection_description) {
        formData.append('collection_description', collectionData.collection_description);
      }
      if (collectionData.start_date) {
        formData.append('start_date', collectionData.start_date);
      }
      if (collectionData.end_date) {
        formData.append('end_date', collectionData.end_date);
      }

      const response: AxiosResponse<CollectionType>
        = await apiClient.post<CollectionType>('v1/create-collection', formData, {
          headers: AxiosHeaders.from({
            "Content-Type": "multipart/form-data"
          })
        });
      toast.success("Colección creada exitosamente.");
      return response;
    } catch (error: unknown) {
      let errorMessage = "Error al crear la colección.";
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
}