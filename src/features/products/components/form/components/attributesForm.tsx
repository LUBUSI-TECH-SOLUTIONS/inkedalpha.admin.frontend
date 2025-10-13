import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"
import type { ProductFormData } from "../schema/productSchema"
import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const AttributesForm = () => {
  const { control, watch, setValue } = useFormContext<ProductFormData>()
  const attributes = watch("attributes") || []
  const addAttribute = () => {
    const newAttributes = [...attributes, { attribute_name: "", attribute_value: "" }]
    setValue("attributes", newAttributes)
  }
  const removeAttribute = (index: number) => {
    const newAttributes = attributes.filter((_, i) => i !== index)
    setValue("attributes", newAttributes)
  }
  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-foreground">Atributos</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addAttribute}>
            <Plus className="mr-2 h-4 w-4" />
            Agregar Atributo
          </Button>
        </div>
      </div>
      {
        attributes.map((_attr, index) => (
          <div
            key={index}
            className="space-y-2"
          >
            <div className="flex gap-4">
              <FormField
                control={control}
                name={`attributes.${index}.attribute_name`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Nombre del Atributo</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del atributo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`attributes.${index}.attribute_value`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Valor del Atributo</FormLabel>
                    <FormControl>
                      <Input placeholder="Valor del atributo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeAttribute(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))
      }
    </>
  )
}