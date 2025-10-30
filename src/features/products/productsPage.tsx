import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "./store/productStore";
import { AllProducts } from "./components/allProdcuts";

export const ProductsPage = () => {
  const navigate = useNavigate();
  const { fetchProducts } = useProductStore();

  const goToProducts = () => {
    navigate("/products/new");
  }

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

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
      <AllProducts/>
    </>
  )
}