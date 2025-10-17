import { create } from "zustand";
import { ImageService } from "@/features/products/service/imageService"; // Ajusta la ruta según tu estructura

interface ImageState {
  imagesByIndex: Record<number, string[]>; // 👈 imágenes separadas por índice
  loading: boolean;
  error: string | null;

  uploadImages: (index: number, files: File | File[]) => Promise<void>;
  reset: (index?: number) => void;
}

export const useUploadImageStore = create<ImageState>((set) => ({
  imagesByIndex: {},
  loading: false,
  error: null,

  uploadImages: async (index, files) => {
    try {
      set({ loading: true, error: null });

      const fileArray = Array.isArray(files) ? files : [files];

      const uploadPromises = fileArray.map(async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        const res = await ImageService.createImage(formData);
        return res.data.image_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      // ✅ Agregamos las imágenes nuevas al índice correspondiente
      set((state) => ({
        imagesByIndex: {
          ...state.imagesByIndex,
          [index]: [
            ...(state.imagesByIndex[index] || []),
            ...uploadedUrls,
          ],
        },
        loading: false,
      }));
    } catch (error: any) {
      console.error("Error al subir imagen:", error);
      set({
        loading: false,
        error: error.message || "Error al subir la imagen.",
      });
    }
  },

  // 👇 Permite resetear un índice específico o todo el store
  reset: (index) => {
    if (typeof index === "number") {
      set((state) => {
        const updated = { ...state.imagesByIndex };
        delete updated[index];
        return { imagesByIndex: updated };
      });
    } else {
      set({ imagesByIndex: {}, loading: false, error: null });
    }
  },
}));
