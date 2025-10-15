import { Label } from "@/components/ui/label"
import type { ProductFormData } from "../schema/productSchema"
import { useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface ImageFormProps {
  index: number
  item: ProductFormData["items"][number]
}

export const ImageForm = ({
  item, index
}: ImageFormProps) => {
  const { control, watch, setValue } = useFormContext<ProductFormData>()
  const handleImageUpload = (itemIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const itemsArray = watch("items")
    const updated = [...itemsArray]
    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))

    updated[itemIndex].images = [...updated[itemIndex].images, ...newImages]
    setValue("items", updated)
  }

  return (
    <div className="space-y-3">
      <Label className="text-lg font-medium text-foreground">Imágenes del Producto</Label>
      {
        item.images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {item.images.map((_image, imgIndex) => (
              <div
                key={imgIndex}
                className="group relative aspect-square overflow-hidden rounded-lg border border-border"
              >
                <img
                  src="./default.jpg"
                  alt="Default"
                  className="h-full w-full object-cover"
                />
                <Button
                  type="button"
                  className="absolute right-1 top-1 rounded-full bg-background/80 p-1 opacity-0 transition-opacity hover:bg-background group-hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      <FormField
        control={control}
        name={`items.${index}.images`}
        render={() => (
          <FormItem>
            <FormLabel>Subir Imágenes</FormLabel>
            <FormControl>
              <input
                type="file"
                id={`images-${index}`}
                multiple
                accept="image/*"
                onChange={(e) => handleImageUpload(index, e)}
                className="hidden"
              />
              <label htmlFor={`images-${index}`}>
                <div className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/50 px-4 py-8 transition-colors hover:bg-muted">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {item.images.length > 0 ? "Agregar más imágenes" : "Seleccionar imágenes"}
                  </span>
                </div>
              </label>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}