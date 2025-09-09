import type { ColorType } from "../types/colorType";
import z from "zod";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ColorProps {
  initialData?: ColorType | null;
}

const formSchema = z.object({
  colour_name: z.string().min(1, {
    message: "El nombre del color es obligatorio"
  }).max(100, {
    message: "El nombre del color debe tener máximo 100 caracteres"
  }),
  hexadecimal: z.string().min(4).regex(/^#/, {
    message: "El color hexadecimal debe comenzar con #"
  })
})

type ColorFormValues = z.infer<typeof formSchema>

export const FormColor = ({
  initialData
}: ColorProps) => {
  const title = initialData ? 'Edit color' : 'Create color';
  const description = initialData ? 'Edit a color.' : 'Add a new color';
  const toastMessage = initialData ? 'Color updated.' : 'Color created.';
  const action = initialData ? 'Save changes' : 'Create';

  const onSubmit = (data: ColorFormValues) => {
    console.log(data);
    toast.success(toastMessage);
  }

  const form = useForm<ColorFormValues>({
    defaultValues: initialData || {
      colour_name: '',
      hexadecimal: '#'
    }
  })

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
              name="colour_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hexadecimal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        id="color"
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                        type="color"
                        className="hidden"
                      />
                      <label
                        htmlFor="color"
                        className="border p-4 rounded-full"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
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