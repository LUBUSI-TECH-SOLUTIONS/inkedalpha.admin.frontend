import { Button } from "@/components/ui/button"
import { ButtonReturn } from "@/components/ui/buttonReturn"
import { Form } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Trash } from "lucide-react"
import { GeneralDataForm } from "./components/generaDataForm"
import { useForm, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productFormSchema, type ProductFormData } from "./schema/productSchema"
import { ModelInfoForm } from "./components/modelInfoForm"
import { AttributesForm } from "./components/attributesForm"
import { VariantForm } from "@/features/products/components/form/components/variantForm"
// import { ExtraInfoForm } from "@/features/products/components/form/components/extraInfoForm"
import { useProductStore } from "@/features/products/store/productStore"
import { Spinner } from "@/components/ui/spinner"
export const FormProduct = () => {
  const selectedProduct = false
  const { createProduct, isLoading } = useProductStore()

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema) as unknown as Resolver<ProductFormData>,
    defaultValues: {
      product_category_id: "",
      product_name: "",
      description: "",
      model_height: "",
      model_wearing: "",
      care_instructions: "",
      story_time: "",
      attributes: undefined,
      items: [],
      collection_id: ""
    }
  })

  const onSubmit = async (data: any) => {
    try {
      await createProduct(data)
      form.reset()
    } catch (error) {
      throw error
    }
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
      <main className="mx-auto max-w-4xl px-6 py-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <GeneralDataForm />
            <ModelInfoForm />
            {/* <ExtraInfoForm /> */}
            <AttributesForm />
            <VariantForm />
            <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
              {isLoading ? <>
                <Spinner /> Guardando...
              </> : "Guardar Producto"}
            </Button>
          </form>
        </Form>
      </main>
    </>
  )
}