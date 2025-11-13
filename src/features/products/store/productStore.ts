import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProductResponse } from "../types/productsType";
import { ProductService } from "../service/productService";

interface ProductState {
  products: ProductResponse[];
  selectedProduct: ProductResponse | null;
  isLoading: boolean;

  fetchProducts: (force?: boolean) => Promise<void>;
  fetchSingleProduct: (product: ProductResponse) => Promise<void>;
  createProduct: (productData: ProductResponse) => Promise<void>;
  selectProduct: (product: ProductResponse | null) => void;
  reset: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      selectedProduct: null,
      isLoading: false,

      fetchProducts: async (force = false) => {
        const { products } = get();

        if (products.length > 0 && !force) return;

        set({ isLoading: true });
        try {
          const response = await ProductService.getAllProducts({
            include_details: false,
          });
          const data = Array.isArray(response.data)
            ? response.data
            : [response.data];
          set({ products: data });
        } catch (error: unknown) {
          console.error("Error al obtener productos:", error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      fetchSingleProduct: async (product) => {
        const { selectedProduct } = get();

        if (selectedProduct && selectedProduct.product_id === product.product_id) {
          return; 
        }

        set({ isLoading: true });
        try {
          const response = await ProductService.getAllProducts({
            product_id: product.product_id,
            include_details: true,
            single: true,
          });

          const data = Array.isArray(response.data)
            ? response.data[0]
            : response.data;

          set({ selectedProduct: data });
        } catch (error) {
          console.error("Error al obtener producto:", error);
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
        } catch (error) {
          console.error("Error al crear producto:", error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      selectProduct: (product) => {
        set({ selectedProduct: product });
      },

      reset: () => {
        set({ selectedProduct: null });
      },
    }),

    {
      name: "product-store",
      partialize: (state) => ({
        products: state.products,
        selectedProduct: state.selectedProduct,
      }),
    }
  )
);
