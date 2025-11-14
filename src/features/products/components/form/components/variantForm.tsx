import { useFormContext } from "react-hook-form"
import type { ProductFormData } from "../schema/productSchema"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useColorStore } from "@/features/colors/store/colorStore"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSizeStore } from "@/features/size/store/sizeStore"
import { ImageForm } from "./imageForm"
import { useProductStore } from "@/features/products/store/productStore"

export const VariantForm = () => {
  const { colors, isLoading: isColorLoading } = useColorStore()
  const { sizes, isLoading: isSizeLoading } = useSizeStore()
  const { isLoading: isProductLoading } = useProductStore()
  const { control, watch, setValue } = useFormContext<ProductFormData>()
  const items = watch("items") || []

  const addItem = () => {
    const newItems = [
      ...items,
      {
        color_id: "",
        original_price: "",
        sale_price: "",
        images: [],
        variations: []
      }
    ]
    setValue("items", newItems)
  }

  const addVariation = (itemIndex: number) => {
    const itemsArray = watch("items")
    const updated = [...itemsArray]
    updated[itemIndex].variations = [
      ...(updated[itemIndex].variations || []),
      { size_id: "", qty_in_stock: "" }
    ]
    setValue("items", updated)
  }

  const removeVariation = (itemIndex: number, variationIndex: number) => {
    const itemsArray = watch("items")
    const updated = [...itemsArray]
    updated[itemIndex].variations = updated[itemIndex].variations.filter((_, i) => i !== variationIndex)
    setValue("items", updated)
  }

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    setValue("items", newItems)
  }

  const formatNumber = (value: string) => {
    // Eliminar todo lo que no sea dígito
    const cleanValue = value.replace(/\D/g, "");

    if (!cleanValue) return "";

    // Formatear con puntos
    return new Intl.NumberFormat("es-CO").format(Number(cleanValue));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-foreground">Variantes de Color</h2>
      {items.map((_item, index) => (
        <div key={index} className="space-y-4 rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">Color {index + 1}</h3>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
              disabled={isProductLoading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <FormField
              control={control}
              name={`items.${index}.color_id`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className="w-full"
                        disabled={isColorLoading || isProductLoading}
                      >
                        <SelectValue placeholder="Selecciona un color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors?.map((color) => (
                        <SelectItem
                          key={color.color_id}
                          value={color.color_id ?? ""}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="h-4 w-4 rounded-full border border-border"
                              style={{ backgroundColor: color.hexadecimal }}
                            />
                            {color.color_name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <FormField
                control={control}
                name={`items.${index}.original_price`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Precio Original</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        disabled={isProductLoading}
                        onChange={(e) => {
                          const formatted = formatNumber(e.target.value);
                          field.onChange(formatted);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`items.${index}.sale_price`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Precio de Venta</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => {
                          const formatted = formatNumber(e.target.value);
                          field.onChange(formatted);
                        }}
                        disabled={isProductLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <ImageForm
              index={index}
              item={_item}
            />

            <div className="space-3">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-medium text-foreground">Talla y Stock</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => addVariation(index)}
                  disabled={isProductLoading}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Talla
                </Button>
              </div>
              {
                _item.variations.map((_variation, varIndex) => (
                  <div
                    key={varIndex}
                    className="space-y-2"
                  >
                    <div className="flex gap-3 rounded-md bg-muted/50 p-3 my-3">
                      <FormField
                        control={control}
                        name={`items.${index}.variations.${varIndex}.size_id`}
                        render={({ field }) => (
                          <FormItem className="flex-1 space-y-2">
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full" disabled={isSizeLoading || isProductLoading}>
                                  <SelectValue placeholder="Selecciona una talla" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {sizes?.map((size) => (
                                  <SelectItem key={size.size_id} value={size.size_id ?? ""}>
                                    {size.size_name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name={`items.${index}.variations.${varIndex}.qty_in_stock`}
                        render={({ field }) => (
                          <FormItem className="flex-1 space-y-2">
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0"
                                {...field}
                                disabled={isProductLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeVariation(index, varIndex)}
                        disabled={isProductLoading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => addItem()}
        disabled={isProductLoading}
      >
        <Plus className="mr-2 h-4 w-4" />
        Agregar Variante
      </Button>
    </div>
  )

}


