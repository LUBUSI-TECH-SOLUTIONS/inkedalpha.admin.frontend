import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useCategory } from "../store/useCategory";
import { ButtonReturn } from "@/components/ui/buttonReturn";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const formSchema = z.object({
  category_name:
    z.string()
      .min(2, { message: "Category name must be at least 2 characters." })
      .max(50, { message: "Category name must be at most 50 characters." }),
  category_description:
    z.string()
      .min(2, { message: "Category description must be at least 2 characters." })
      .max(200, { message: "Category description must be at most 200 characters." }),
  image:
    z.file()
      .optional(),
  parent_category_id:
    z.string()
      .optional(),
})

type CategoryFormValues = z.infer<typeof formSchema>;

export const FormCategory = () => {
  const { id } = useParams();
  const {
    createCategory,
    updateCategory,
    selectCategory,
    selectedCategory,
    isLoading
  } = useCategory();

  const title = selectedCategory ? "Editar Categoría" : "Crear Categoría";
  const description = selectedCategory ? "Edita la categoría seleccionada" : "Crea una nueva categoría";
  const toastMessage = selectedCategory ? "Categoría actualizada exitosamente." : "Categoría creada exitosamente.";
  const action = selectedCategory ? "Guardar cambios" : "Crear categoría";

  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    if (!id) {
      selectCategory(null);
      form.reset();
      setPreview(null);
      return;
    }
  }, [id]);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: selectedCategory
      ? {
        category_name: selectedCategory.category_name || "",
        category_description: selectedCategory.category_description || "",
        parent_category_id: selectedCategory.parent_category_id ? selectedCategory.parent_category_id : undefined,
      }
      : {
        category_name: "",
        category_description: "",
        image: undefined,
        parent_category_id: undefined
      }
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files && files[0]; // obtiene el primer archivo si existe
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl); // guardamos la url temporal en el estado
    }
  };

  const onSubmit = (data: CategoryFormValues) => {
    const { category_name, category_description, image, parent_category_id } = data;

    // Remove product_category_id from categoryData before spreading
    const { product_category_id, ...categoryDataWithoutId } = {
      ...selectedCategory,
      category_name,
      category_description,
      image: image || null,
      parent_category_id: parent_category_id || "",
      category_image: selectedCategory?.category_image || "",
      parent_category_name: ""
    };

    if (selectedCategory) {
      updateCategory({
        product_category_id: selectedCategory.product_category_id,
        ...categoryDataWithoutId
      }).then(() => {
        toast.success(toastMessage);
      }).catch(() => {
        toast.error("Error al actualizar la categoría");
      });

    } else {
      createCategory({
        product_category_id: "",
        ...categoryDataWithoutId
      }).then(() => {
        toast.success(toastMessage);
        form.reset();
        setPreview(null);
      }).catch(() => {
        toast.error("Error al crear la categoría");
      });
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ButtonReturn variant="ghost" />
          <Heading
            title={title}
            description={description}
          />

        </div>
        {selectedCategory && (
          <Button
            disabled={isLoading}
            variant="destructive"
            size="sm">
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator className="my-2" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full pt-3"
        >
          <div className="md:grid md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="category_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Categoria</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Nombre de la Categoria"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Nombre de la categoria.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Descripción de la categoria"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Breve descripción de la categoria.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="parent_category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria Padre</FormLabel> 
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="ID Categoria Padre"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      ID de la categoria padre si aplica.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */} {/* Implementacion futura con Select */}

            </div>
            <div className="flex flex-col items-center gap-4 border p-4 rounded-lg shadow-sm">
              {preview && (
                <>
                  <h2 className="font-medium text-lg">
                    Vista previa
                  </h2>
                  <img
                    src={preview || selectedCategory?.category_image || undefined}
                    alt="Vista previa"
                    className="w-96 h-64 object-cover rounded-lg shadow-lg"
                  />
                </>
              )}
              {
                selectedCategory?.category_image && (
                  <img
                    src={selectedCategory.category_image}
                    alt="Imagen de la categoria"
                    className="w-96 h-64 object-cover rounded-lg shadow-lg"
                  />
                )
              }
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file);
                            handleFileChange(e);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
          </div>
          <Button disabled={isLoading} type="submit">
            <Loader2 className={`mr-2 h-4 w-4 animate-spin ${isLoading ? 'inline-block' : 'hidden'}`} />
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}