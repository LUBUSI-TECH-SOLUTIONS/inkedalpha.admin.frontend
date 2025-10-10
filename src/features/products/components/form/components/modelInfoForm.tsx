import { useFormContext } from "react-hook-form"
import type { ProductFormData } from "../schema/productSchema"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const ModelInfoForm = () => {
  const { control } = useFormContext<ProductFormData>()

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-foreground">Información del Modelo</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          control={control}
          name="model_height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Altura del Modelo (cm)</FormLabel>
              <FormControl>
                <Input placeholder="ej. 175cm" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="model_wearing"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Talla del Modelo</FormLabel>
              <FormControl>
                <Input placeholder="ej. M" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      </div>
    </div>
  )
}