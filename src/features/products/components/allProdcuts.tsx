import { Spinner } from "@/components/ui/spinner"
import { useProductStore } from "../store/productStore"
import { ProductCart } from "./productCart"

export const AllProducts = () => {
  const { products, isLoading} = useProductStore()

  return (
    <section className="p-8 pt-6 flex flex-wrap gap-6">
      {
        isLoading ? (
          <div className="text-center w-full flex items-center justify-center"          >
            <Spinner className="h-5 w-4 animate-spin" />
          </div>
        ) :
          products.map((product) => (
            <ProductCart
              key={product.product_id}
              product={product}
            />
          ))
      }
    </section>
  )
}