import type { ProductResponse } from "../types/productsType"

interface ProductCartProps {
  product: ProductResponse
}

export const ProductCart = ({
  product
}: ProductCartProps) => {
  return (
    <div className="border rounded p-2 w-60 grid grid-cols-1 grid-rows-5 gap-4 items-center">

      <div className="row-span-3"></div>
      <div className="row-span-2 row-start-4">
        <h3 className="font-medium">{product.product_name}</h3>
        <p className="text-sm text-gray-600">{product.description}</p>
      </div>
    </div>
  )
}