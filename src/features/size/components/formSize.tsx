import z from "zod";
import type { SizeType } from "../types/sizeType";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Heading } from "@/components/ui/heading";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface SizeProps {
  initialData?: SizeType | null;
}

const formSchema = z.object({
  size_name: z.string().min(1, {
    message: "El nombre del tamaño es obligatorio"
  }).max(100, {
    message: "El nombre del tamaño debe tener máximo 100 caracteres"
  }),
  size_value: z.string().max(100, {
    message: "El valor del tamaño debe tener máximo 100 caracteres"
  }).optional(),
  sort_order: z.number().min(1, {
    message: "El orden de clasificación debe ser al menos 1"
  }).max(1000, {
    message: "El orden de clasificación debe ser como máximo 1000"
  }).optional(),
})

type SizeFormValues = z.infer<typeof formSchema>

export const FormSize = ({
  initialData
}: SizeProps) => {
  const title = initialData ? 'Edit size' : 'Create size';
  const description = initialData ? 'Edit a size.' : 'Add a new size';
  const toastMessage = initialData ? 'Size updated.' : 'Size created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<SizeFormValues>({
    defaultValues: initialData
      ? {
          size_name: initialData.size_name ?? '',
          sort_order: initialData.sort_order ?? 1,
          size_value: initialData.size_value ?? ''
        }
      : {
          size_name: '',
          sort_order: 1,
          size_value: ''
        }
  })

  const onSubmit = (data: SizeFormValues) => {
    console.log(data);
    toast.success(toastMessage);
  }

  return (
    <>
      <Heading
        title={title}
        description={description}
      />
      {
        initialData && (
          <Button
            disabled={false}
            variant="destructive"
            size="sm"
            onClick={() => console.log("delete")}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )
      }
      <Separator className="my-4" />

      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="md:grid md:grid-cols-3 md:gap-8">
            <FormField 
              control={form.control}
              name="size_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Extra small..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField 
              control={form.control}
              name="size_value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input placeholder="xs..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="sort_order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor en numero</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="12..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}