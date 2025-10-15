import { FormProduct } from "./form/formProduct"

export const NewProduct = () => {
  return (
    <div className="flex-col">
       <div className="flex-1 space-x-4 p-8 pt-6">
        <FormProduct/>
       </div>
    </div>
  )
}