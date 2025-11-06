import { create } from "zustand";
import type { ColorType } from "../types/colorType";
import { ColorService } from "../service/colorService";

interface ColorStore {
  colors: ColorType[];
  selectedColor: ColorType | null;
  isLoading: boolean;
  status: 'idle' | 'loading' | 'error' | 'success';

  fetchColors: () => Promise<void>;
  createColor: (colorData: ColorType) => Promise<void>;
  updateColor: (colorData: ColorType) => Promise<void>;
  selectColor: (color: ColorType | null) => void;
  deleteColor: (colorId: string) => void;
  reset: () => void;
}

export const useColorStore = create<ColorStore>((set, get) => ({
  colors: [],
  selectedColor: null,
  isLoading: false,
  status: 'idle',

  fetchColors: async () => {
    set({ isLoading: true });
    try {
      const response = await ColorService.getAllColors();
      set({ colors: response.data, status: 'success' });
    } catch (error: unknown) {
      set({ status: 'error' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  createColor: async (colorData) => {
    set({ isLoading: true });
    try {
      const response = await ColorService.createColor(colorData);
      set((state) => ({ colors: [...state.colors, response.data], status: 'success' }));
      get().reset();
    } catch (error: unknown) {
      set({ status: 'error' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  updateColor: async (colorData) => {
    set({ isLoading: true });
    try {
      const response = await ColorService.updatedColor(colorData);
      set((state) => ({
        colors: state.colors.map((color) =>
          color.color_id === response.data.color_id ? response.data : color
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

  deleteColor: async (colorId) => {
    set({ isLoading: true })
    try {
      await ColorService.deleteColor(colorId)
      set((state) => ({
        colors: state.colors.filter((color) => color.color_id !== colorId)
      }));
    } catch (error: unknown) {
      throw error
    } finally {
      set({ isLoading: false })
    }
  },
  selectColor: (color) => set({ selectedColor: color }),
  reset: () => set({ selectedColor: null })
}))