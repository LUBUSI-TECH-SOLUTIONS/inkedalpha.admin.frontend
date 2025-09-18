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

  updateCollection: async (collectionId: string, collectionData: CollectionType):
    Promise<AxiosResponse<CollectionType>> => {
    try {
      const response: AxiosResponse<CollectionType>
        = await apiClient.patch<CollectionType>(`v1/update-collection/${collectionId}`, collectionData);
      toast.success("Colección actualizada exitosamente.");
      return response;
    } catch (error: unknown) {
      let errorMessage = "Error al actualizar la colección.";
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

  deleteCollection: async (collectionId: string):
    Promise<AxiosResponse<{ message: string }>> => {
    try {
      const response: AxiosResponse<{ message: string }>
        = await apiClient.delete<{ message: string }>(`v1/delete-collection/${collectionId}`);
      toast.success("Colección eliminada exitosamente.");
      return response;
    } catch (error: unknown) {
      let errorMessage = "Error al eliminar la colección.";
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

  toggleCollection: async (collectionId: string):
    Promise<AxiosResponse<CollectionType>> => {
    try {
      const response: AxiosResponse<CollectionType>
        = await apiClient.patch<CollectionType>(`v1/toggle-collection/${collectionId}`);
      toast.success("Estado de la colección actualizado exitosamente.");
      return response;
    } catch (error: unknown) {
      let errorMessage = "Error al actualizar el estado de la colección.";
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