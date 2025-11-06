import z from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Heading } from "@/components/ui/heading";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ButtonReturn } from "@/components/ui/buttonReturn";
import { useSizeStore } from "../store/sizeStore";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const formSchema = z.object({
  size_name: z.string().min(1, {
    message: "El nombre del tamaño es obligatorio"
  }).max(100, {
    message: "El nombre del tamaño debe tener máximo 100 caracteres"
  }),
  sort_order: z.number().min(1, {
    message: "El orden de clasificación debe ser al menos 1"
  }).max(1000, {
    message: "El orden de clasificación debe ser como máximo 1000"
  }).optional(),
})

type SizeFormValues = z.infer<typeof formSchema>

export const FormSize = () => {
  const { id } = useParams()

  const {
    reset,
    selectedSize,
    createSize,
    updateSize,
  } = useSizeStore();

  const title = selectedSize ? 'Edit size' : 'Create size';
  const description = selectedSize ? 'Edit a size.' : 'Add a new size';
  const action = selectedSize ? 'Save changes' : 'Create';

  const form = useForm<SizeFormValues>({
    defaultValues: selectedSize
      ? {
        ...selectedSize,
      }
      : {
        size_name: '',
        sort_order: 1
      }
  })

  useEffect(() => {
    if (!id) {
      reset();
      form.reset();
      return;
    }
  }, [id])

  const onSubmit = (data: SizeFormValues) => {
    try {
      if (selectedSize) {
        updateSize({
          size_id: selectedSize.size_id,
          ...data,
          sort_order: data.sort_order ?? 1,
        });
      } else {
        createSize({
          ...data,
          sort_order: data.sort_order ?? 1,
        });
      }
    } catch (error) {
      toast.error('Something went wrong, please try again.');
      console.log(error);
      return;
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center mb-4">
          <ButtonReturn variant="ghost" />
          <Heading
            title={title}
            description={description}
          />
        </div>
        {
          selectedSize && (
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
      </div>
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