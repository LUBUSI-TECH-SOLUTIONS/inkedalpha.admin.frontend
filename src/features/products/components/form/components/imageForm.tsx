import { Label } from "@/components/ui/label"
import type { ProductFormData } from "../schema/productSchema"
import { useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useUploadImageStore } from "@/features/products/store/imageStore"
import { Spinner } from "@/components/ui/spinner"
import { useEffect } from "react"

interface ImageFormProps {
  index: number
  item: ProductFormData["items"][number]
}

export const ImageForm = ({
  item, index
}: ImageFormProps) => {
  const { control, setValue } = useFormContext<ProductFormData>()
  const { uploadImages, imagesByIndex, loading } = useUploadImageStore()

  const images = imagesByIndex[index] || [];

  useEffect(() => {
    if (images.length > 0) {
      const updatedImages = [...item.images, ...images];
      setValue(`items.${index}.images`, updatedImages);
    }
  }, [images])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) uploadImages(index ,Array.from(files));
  };

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
                  src={_image || "./default.jpg"}
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
              <div>
                <input
                  type="file"
                  id={`images-${index}`}
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={loading}
                />
                {
                  loading ? (
                    <div className="flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/50 px-4 py-8">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <Spinner/> Cargando
                      </span>
                    </div>
                  ) : (
                    <label htmlFor={`images-${index}`}>
                      <div className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/50 px-4 py-8 transition-colors hover:bg-muted">
                        <Upload className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {item.images.length > 0 ? "Agregar más imágenes" : "Seleccionar imágenes"}
                        </span>
                      </div>
                    </label>
                  )
                }
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}