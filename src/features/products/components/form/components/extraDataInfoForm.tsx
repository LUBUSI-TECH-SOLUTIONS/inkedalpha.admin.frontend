import { useFormContext } from "react-hook-form"
import type { ProductFormData } from "../schema/productSchema"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useProductStore } from "@/features/products/store/productStore"

export const ExtraInfoForm = () => {
  const { control } = useFormContext<ProductFormData>()
  const { isLoading: isProductLoading } = useProductStore()

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="care_instructions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Instrucciones de Cuidado</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Instrucciones de cuidado del producto"
                {...field}
                rows={3}
                disabled={isProductLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="story_time"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Historia</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Historia del producto"
                {...field}
                rows={3}
                disabled={isProductLoading}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}