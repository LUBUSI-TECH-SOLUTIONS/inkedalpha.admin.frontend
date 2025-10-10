import { Button } from "@/components/ui/button"
import { ButtonReturn } from "@/components/ui/buttonReturn"
import { Form } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Trash } from "lucide-react"
import { GeneralDataForm } from "./components/generaDataForm"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productFormSchema, type ProductFormData } from "./schema/productSchema"
import { ModelInfoForm } from "./components/modelInfoForm"
import { ExtraInfoForm } from "./components/extraInfoForm"

export const FormProduct = () => {
  const selectedProduct = false

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      product_category_id: "",
      product_name: "",
      description: "",
      model_height: "",
      model_wearing: "",
      care_instructions: "",
      story_time: "",
      attributes: [], // always defined as array
      items: [],
      collection_id: ""
    }
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ButtonReturn variant="ghost" />
          <Heading
            title="Nuevo Producto"
            description="Crea un nuevo producto"
          />
        </div>
        {
          selectedProduct && (
            <Button
              disabled={true}
              variant="destructive"
              size="sm"
              onClick={() => console.log("delete")}
            >
              <Trash className="mr-2 h-4 w-4" />
            </Button>
          )
        }
      </div>
      <Separator className="my-4" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <GeneralDataForm />
          <ModelInfoForm/>
          <ExtraInfoForm/>
        </form>
      </Form>
    </>
  )
}