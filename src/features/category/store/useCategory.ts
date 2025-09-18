import { CategoryService } from "../service/categoryService";
import type { CategoryType } from "../types/categoryType";
import { create } from "zustand";


interface CategoryStore {
  categories: CategoryType[];
  selectedCategory: CategoryType | null;
  isLoading: boolean;

  fetchCategories: () => Promise<void>;
  createCategory: (categoryData: CategoryType) => Promise<void>;
  updateCategory: (categoryData: CategoryType) => Promise<void>;
  deleteCategory: (categoryId: string) => Promise<void>;
  // toggleCategoryStatus: (categoryId: string) => Promise<void>;
  selectCategory: (category: CategoryType | null) => void;
}

export const useCategory = create<CategoryStore>((set) => ({
  categories: [],
  selectedCategory: null,
  isLoading: false,

  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const response = await CategoryService.getAllCategories();
      set({ categories: response.data });
    } catch (error: unknown) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  createCategory: async (categoryData) => {
    set({ isLoading: true });
    try {
      const response = await CategoryService.createCategory(categoryData);
      set((state) => ({ categories: [...state.categories, response.data] }));
    } catch (error: unknown) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  updateCategory: async (categoryData) => {
    set({ isLoading: true });
    try {
      if (!categoryData.product_category_id) {
        throw new Error("collection_id es requerido para actualizar la colección.");
      }
      const response = await CategoryService.updateCategory(categoryData.product_category_id, categoryData);
      set((state) => ({
        categories: state.categories.map((category) =>
          category.product_category_id === response.data.product_category_id ? response.data : category
        )
      }));
    } catch (error: unknown) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  deleteCategory: async (categoryId) => {
    set({ isLoading: true });
    try {
      await CategoryService.deleteCategory(categoryId);
      set((state) => ({
        categories: state.categories.filter((category) => category.product_category_id !== Number(categoryId))
      }));
    } catch (error: unknown) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // toggleCollectionStatus: async (categoryId) => {
  //   set({ isLoading: true });
  //   try {
  //     const response = await CategoryService.toggleCollection(categoryId);
  //     set((state) => ({
  //       collections: state.collections.map((collection) =>
  //         collection.collection_id === response.data.collection_id ? response.data : collection
  //       )
  //     }));
  //   } catch (error: unknown) {
  //     throw error;
  //   } finally {
  //     set({ isLoading: false });
  //   }
  // },
  selectCategory: (category) => set({ selectedCategory: category })

}))