import { create } from "zustand";
import type { ProductResponse } from "../types/productsType";
import { ProductService } from "../service/productService";

interface ProductState {
  products: ProductResponse[];
  selectedProduct: ProductResponse | null;
  isLoading: boolean;
  fetchProducts: () => Promise<void>;
  createProduct: (productData: ProductResponse) => Promise<void>;
  selectProduct: (product: ProductResponse | null) => void;

  reset: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  selectedProduct: null,
  isLoading: false,

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await ProductService.getAllProducts();
      set({ products: response.data });
    } catch (error: unknown) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  createProduct: async (productData) => {
    set({ isLoading: true });
    try {
      const response = await ProductService.createProduct(productData);
      set((state) => ({
        products: [...state.products, response.data],
      }));
    } catch (error: unknown) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  selectProduct: (product) => {
    set({ selectedProduct: product });
  },
  reset: () => {
    set({ products: [], selectedProduct: null, isLoading: false });
  }
}));