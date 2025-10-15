import { create } from "zustand";
import type { SizeType } from "../types/sizeType";
import { SizeService } from "../service/sizeService";

interface SizeStore {
  sizes: SizeType[];
  selectedSize: SizeType | null;
  isLoading: boolean;
  status: 'idle' | 'loading' | 'error' | 'success';

  fetchSizes: () => Promise<void>;
  createSize: (sizeData: SizeType) => Promise<void>;
  updateSize: (sizeData: SizeType) => Promise<void>;
  selectSize: (size: SizeType | null) => void;
  reset: () => void;
}

export const useSizeStore = create<SizeStore>((set, get) => ({
  sizes: [],
  selectedSize: null,
  isLoading: false,
  status: 'idle',

  fetchSizes: async () => {
    set({ isLoading: true });
    try {
      const response = await SizeService.getAllSizes();
      console.log(response.data);
      set({ sizes: response.data, status: 'success' });
    } catch (error: unknown) {
      set({ status: 'error' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  createSize: async (sizeData) => {
    set({ isLoading: true });
    try {
      const response = await SizeService.createSize(sizeData);
      set((state) => ({ sizes: [...state.sizes, response.data], status: 'success' }));
      get().reset();
    } catch (error: unknown) {
      set({ status: 'error' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateSize: async (sizeData) => {
    set({ isLoading: true });
    try {
      const response = await SizeService.updatedSize(sizeData);
      set((state) => ({
        sizes: state.sizes.map((size) =>
          size.size_id === response.data.size_id ? response.data : size
        ),
        status: 'success'
      }));
      get().reset();
    } catch (error: unknown) {
      set({ status: 'error' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  selectSize: (size) => set({ selectedSize: size }),
  reset: () => set({ selectedSize: null })
}));