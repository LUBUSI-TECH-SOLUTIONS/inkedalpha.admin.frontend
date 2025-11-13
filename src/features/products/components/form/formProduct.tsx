import { Button } from "@/components/ui/button";
import { ButtonReturn } from "@/components/ui/buttonReturn";
import { Form } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { GeneralDataForm } from "./components/generaDataForm";
import { ModelInfoForm } from "./components/modelInfoForm";
import { AttributesForm } from "./components/attributesForm";
import { VariantForm } from "./components/variantForm";
import { ExtraInfoForm } from "./components/extraDataInfoForm";

import { useProductStore } from "@/features/products/store/productStore";
import { useCategory } from "@/features/category/store/useCategory";
import { useCollection } from "@/features/collections/store/useCollection";
import { useSizeStore } from "@/features/size/store/sizeStore";
import { useColorStore } from "@/features/colors/store/colorStore";

import { useProductForm } from "./hooks/useProductForm";
import { getFormTitles } from "./utils/formTitles";

export const FormProduct = () => {
  const { createProduct, isLoading, selectedProduct, reset } = useProductStore();
  const { id } = useParams();

  const { fetchCategories } = useCategory();
  const { fetchCollections } = useCollection();
  const { fetchColors } = useColorStore();
  const { fetchSizes } = useSizeStore();

  const form = useProductForm(id);
  const { title, description, action } = getFormTitles(selectedProduct);

  useEffect(() => {
    if (id) return;
    fetchCategories();
    fetchCollections();
    fetchColors();
    fetchSizes();
    reset();
  }, [id]);

  const onSubmit = async (data: any) => {
    try {
      await createProduct(data);
      form.reset();
    } catch (error) {
      throw error;
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <section className="mx-auto max-w-4xl px-6 py-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <ButtonReturn variant="ghost" />
          <Heading title={title} description={description} />
        </div>
        {selectedProduct && (
          <Button
            disabled
            variant="destructive"
            size="sm"
            onClick={() => console.log("delete")}
          >
            <Trash className="mr-2 h-4 w-4" />
          </Button>
        )}
      </header>

      <Separator className="my-4" />

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <GeneralDataForm />
          <ModelInfoForm />
          <ExtraInfoForm />
          <AttributesForm />
          <VariantForm />

          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner /> Guardando...
              </>
            ) : (
              action
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
};
