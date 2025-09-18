import { CollectionService } from "../service/collectionServicce";
import type { CollectionType } from "../types/collectionType";
import { create } from "zustand";


interface CollectionStore {
  collections: CollectionType[];
  selectedCollection: CollectionType | null;
  isLoading: boolean;

  fetchCollections: () => Promise<void>;
  createCollection: (collectionData: CollectionType) => Promise<void>;
  updateCollection: (collectionData: CollectionType) => Promise<void>;
  deleteCollection: (collectionId: string) => Promise<void>;
  toggleCollectionStatus: (collectionId: string) => Promise<void>;
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
    } finally {
      set({ isLoading: false });
    }
  },
  updateCollection: async (collectionData) => {
    set({ isLoading: true });
    try {
      if (!collectionData.collection_id) {
        throw new Error("collection_id es requerido para actualizar la colección.");
      }
      const response = await CollectionService.updateCollection(collectionData.collection_id, collectionData,);
      set((state) => ({
        collections: state.collections.map((collection) =>
          collection.collection_id === response.data.collection_id ? response.data : collection
        )
      }));
    } catch (error: unknown) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteCollection: async (collectionId) => {
    set({ isLoading: true });
    try {
      await CollectionService.deleteCollection(collectionId);
      set((state) => ({
        collections: state.collections.filter((collection) => collection.collection_id !== collectionId)
      }));
    } catch (error: unknown) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  toggleCollectionStatus: async (collectionId) => {
    set({ isLoading: true });
    try {
      const response = await CollectionService.toggleCollection(collectionId);
      set((state) => ({
        collections: state.collections.map((collection) =>
          collection.collection_id === response.data.collection_id ? response.data : collection
        )
      }));
    } catch (error: unknown) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  selectCollection: (collection) => set({ selectedCollection: collection })

}))