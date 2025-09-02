import * as z from "zod"
import type { CollectionType } from "@/features/collections/types/collectionType";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
  collection_name:
    z.string()
      .min(2, { message: "Collection name must be at least 2 characters." })
      .max(50, { message: "Collection name must be at most 50 characters." }),
  collection_description:
    z.string()
      .min(2, { message: "Collection description must be at least 2 characters." })
      .max(200, { message: "Collection description must be at most 200 characters." }),
  collection_image:
    z.string()
      .optional(),
  start_date:
    z.date()
      .optional(),
  end_date:
    z.date()
      .optional()
})

type CollectionFormValues = z.infer<typeof formSchema>;

interface FormColectionProps {
  initialData?: CollectionType;
}

export const FormColection = ({
  initialData
}: FormColectionProps) => {
  const title = initialData ? "Editar Colección" : "Crear Colección";
  const description = initialData ? "Edita la colección" : "Crea una nueva colección";
  const toastMessage = initialData ? "Colección actualizada." : "Colección creada.";
  const action = initialData ? "Guardar cambios" : "Crear colección";

  const form = useForm<CollectionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
        collection_name: initialData.collection_name || "",
        collection_description: initialData.collection_description || "",
        collection_image: initialData.collection_image || "",
        start_date: initialData.start_date ? new Date(initialData.start_date) : undefined,
        end_date: initialData.end_date ? new Date(initialData.end_date) : undefined,
      }
      : {
        collection_name: "",
        collection_description: "",
        collection_image: "",
        start_date: undefined,
        end_date: undefined,
      }
  })

  const onSubmit = (data: CollectionFormValues) => {
    console.log(data);
    toast.success(toastMessage);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description={description}
        />
        {initialData && (
          <Button
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
            <FormField
              control={form.control}
              name="collection_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input
                      disabled={false}
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
                      disabled={false}
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
          <Button type="submit">{action}</Button>
        </form>
      </Form>
    </>
  )
}