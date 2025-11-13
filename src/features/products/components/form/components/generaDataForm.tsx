
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCategory } from "@/features/category/store/useCategory"
import { useCollection } from "@/features/collections/store/useCollection"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useFormContext } from "react-hook-form"
import type { ProductFormData } from "../schema/productSchema"

export const GeneralDataForm = () => {
  const { control } = useFormContext<ProductFormData>()
  const { categories, isLoading: isCategoriesLoading } = useCategory()
  const { collections, isLoading: isCollectionsLoading } = useCollection()

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <FormField
          control={control}
          name="collection_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Colección</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full" disabled={isCollectionsLoading}>
                    <SelectValue placeholder="Selecciona una colección" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {collections?.map((collection) => (
                    <SelectItem key={collection.collection_id} value={collection.collection_id}>
                      {collection.collection_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription className="text-xs">
                La colección a la que pertenece este producto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="product_category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full" disabled={isCategoriesLoading}>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.product_category_id} value={category.product_category_id}>
                      {category.category_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription className="text-xs">
                La categoría a la que pertenece este producto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="product_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del producto</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del producto" {...field} />
              </FormControl>
              <FormDescription className="text-xs">
                El nombre del producto debe ser único y descriptivo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descripción del producto"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs">
                Una descripción breve pero informativa del producto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}


