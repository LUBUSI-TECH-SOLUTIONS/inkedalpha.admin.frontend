import { useProductStore } from "../store/productStore"
import { ProductCart } from "./productCart"

export const AllProducts = () => {
  const { products } = useProductStore()

  return (
    <section className="p-8 pt-6 flex flex-wrap gap-6">
      {
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