import z from "zod";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useColorStore } from "../store/colorStore";
import { ButtonReturn } from "@/components/ui/buttonReturn";

const formSchema = z.object({
  color_name: z.string().min(1, {
    message: "El nombre del color es obligatorio"
  }).max(100, {
    message: "El nombre del color debe tener máximo 100 caracteres"
  }),
  hexadecimal: z.string().min(4).regex(/^#/, {
    message: "El color hexadecimal debe comenzar con #"
  })
})

type ColorFormValues = z.infer<typeof formSchema>

export const FormColor = () => {
  const { selectedColor, updateColor, createColor, isLoading } = useColorStore();

  const title = selectedColor ? 'Edit color' : 'Create color';
  const description = selectedColor ? 'Edit a color.' : 'Add a new color';
  const action = selectedColor ? 'Save changes' : 'Create';

  const onSubmit = (data: ColorFormValues) => {
    try {
      if (selectedColor) {
        updateColor({
          color_id: selectedColor.color_id,
          ...data
        });
      } else {
        createColor(data);
      }
    } catch (error) {
      toast.error('Something went wrong, please try again.');
      console.log(error);
      return;
    }
  }

  const form = useForm<ColorFormValues>({
    defaultValues: selectedColor || {
      color_name: '',
      hexadecimal: '#'
    }
  })

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
        {
          selectedColor && (
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
              name="color_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Nombre del color"
                      {...field}
                    />
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
                        disabled={isLoading}
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                        type="color"
                        className=""
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
          <Button disabled={isLoading} type="submit">
            <Loader2 className={`mr-2 h-4 w-4 animate-spin ${isLoading ? 'inline-block' : 'hidden'}`} />
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}