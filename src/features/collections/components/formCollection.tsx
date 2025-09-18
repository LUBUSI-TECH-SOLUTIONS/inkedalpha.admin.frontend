import * as z from "zod"
import type { CollectionType } from "@/features/collections/types/collectionType";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Loader2, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn, formatDate } from "@/lib/utils";
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useCollection } from "../store/useCollection";

const formSchema = z.object({
  collection_name:
    z.string()
      .min(2, { message: "Collection name must be at least 2 characters." })
      .max(50, { message: "Collection name must be at most 50 characters." }),
  collection_description:
    z.string()
      .min(2, { message: "Collection description must be at least 2 characters." })
      .max(200, { message: "Collection description must be at most 200 characters." }),
  image:
    z.file()
      .optional(),
  start_date:
    z.date()
      .optional(),
  end_date:
    z.date()
      .optional()
})

type CollectionFormValues = z.infer<typeof formSchema>;

export const FormColection = () => {

  const {
    selectedCollection,
    updateCollection,
    createCollection,
    isLoading
  } = useCollection();

  const title = selectedCollection ? "Editar Colección" : "Crear Colección";
  const description = selectedCollection ? "Edita la colección" : "Crea una nueva colección";
  const toastMessage = selectedCollection ? "Colección actualizada." : "Colección creada.";
  const action = selectedCollection ? "Guardar cambios" : "Crear colección";

  const [preview, setPreview] = useState<string | null>(null);
  const form = useForm<CollectionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: selectedCollection
      ? {
        collection_name: selectedCollection.collection_name || "",
        collection_description: selectedCollection.collection_description || "",
        // collection_image: typeof selectedCollection.collection_image === "string" ? selectedCollection.collection_image : "",
        start_date: selectedCollection.start_date ? new Date(selectedCollection.start_date) : undefined,
        end_date: selectedCollection.end_date ? new Date(selectedCollection.end_date) : undefined,
      }
      : {
        collection_name: "",
        collection_description: "",
        image: undefined,
        start_date: undefined,
        end_date: undefined,
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

  const onSubmit = (data: CollectionFormValues) => {
    const { collection_name, collection_description, image, start_date, end_date } = data;

    const collectionData: CollectionType = {
      collection_name,
      collection_description,
      image: image || null,
      start_date: formatDate(start_date),
      end_date: formatDate(end_date),
    };
    if (selectedCollection) {
      // Actualizar colección existente
      updateCollection({
        ...collectionData,
        collection_id: selectedCollection.collection_id
      }).then(() => {
        toast.success(toastMessage);
      }).catch(() => {
        toast.error("Error al actualizar la colección.");
      });
    }
    else {
      // Crear nueva colección
      createCollection(collectionData).then(() => {
        toast.success(toastMessage);
        form.reset(); // Reiniciar el formulario después de crear
        setPreview(null); // Limpiar la vista previa
      }).catch(() => {
        toast.error("Error al crear la colección.");
      });
    }


  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description={description}
        />
        {selectedCollection && (
          <Button
            disabled={isLoading}
            variant="destructive"
            size="sm">
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full pt-3"
        >
          <div className="md:grid md:grid-cols-2 gap-8">
            <div className="md:grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="collection_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulo</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Nombre de la colección"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Nombre de la colección.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="collection_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Descripción de la colección"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Breve descripción de la colección.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inicio Colección</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isLoading}
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}>
                            {
                              field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Selecciona la fecha</span>
                              )
                            }
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() // Deshabilitar fechas pasadas
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Fecha en la cual se dara inicio a la colección.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fin Colección</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isLoading}
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}>
                            {
                              field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Selecciona la fecha</span>
                              )
                            }
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() // Deshabilitar fechas pasadas
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Fecha en la cual se finaliza la colección.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
            <div className="flex flex-col items-center gap-4 border p-4 rounded-lg shadow-sm">
              {preview || selectedCollection?.collection_image && (
                <>
                  <h2 className="font-medium text-lg">
                    Vista previa
                  </h2>
                  <img
                    src={preview || selectedCollection?.collection_image || undefined}
                    alt="Vista previa"
                    className="w-96 h-64 object-cover rounded-lg shadow-lg"
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagen</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file); // Guardamos el objeto File en el form
                          }
                          handleFileChange(e); // Actualizamos la vista previa
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Imagen representativa de la colección.
                    </FormDescription>
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