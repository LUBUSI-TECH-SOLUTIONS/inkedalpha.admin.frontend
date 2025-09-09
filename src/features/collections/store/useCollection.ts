import { CollectionService } from "../service/collectionServicce";
import type { CollectionType } from "../types/collectionType";
import { create } from "zustand";


interface CollectionStore {
  collections: CollectionType[];
  selectedCollection: CollectionType | null;
  isLoading: boolean;

  fetchCollections: () => Promise<void>;
  createCollection: (collectionData: CollectionType) => Promise<void>;
  selectCollection: (collection: CollectionType | null) => void;
}

export const useCollection = create<CollectionStore>((set) => ({
  collections: [],
  selectedCollection: null,
  isLoading: false,

  fetchCollections: async () => {
    set({ isLoading: true });
    try {
      const response = await CollectionService.getAllCollections();
      set({ collections: response.data });
    } catch (error: unknown) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  createCollection: async (collectionData) => {
    set({ isLoading: true });
    try {
      const response = await CollectionService.createCollection(collectionData);
      set((state) => ({ collections: [...state.collections, response.data] }));
    } catch (error: unknown) {
      throw error;
    }
  },

  selectCollection: (collection) => set({ selectedCollection: collection })

}))