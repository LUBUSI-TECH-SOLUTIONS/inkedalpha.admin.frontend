import { useProductStore } from "../store/productStore"
import { ProductCart } from "./productCart"

export const AllProducts = () => {
  const { products, isLoading } = useProductStore()

  return (
    <section className="p-8 pt-6 flex flex-wrap gap-6">
      {
        isLoading ? (
          <div>Cargando</div>
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