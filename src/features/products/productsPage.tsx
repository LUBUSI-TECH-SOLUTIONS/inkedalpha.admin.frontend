import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProductsPage = () => {
  const navigate = useNavigate();

  const goToProducts = () => {
    navigate("/products/new");
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Heading
          title={`Productos`}
          description="Gestiona tus productos"
        />
        <Button onClick={goToProducts}>
          <Plus className="mr-2 h4 w-4" />
          Agregar Producto
        </Button>
      </div>
      {/* <ProductTable/> */}
    </>
  )
}