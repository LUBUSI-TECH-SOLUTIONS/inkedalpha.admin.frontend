import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Plus } from "lucide-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CategoryTable } from "./components/tableCategory"
import { useCategory } from "./store/useCategory"

export const CategoryPage = () => {
  const navigate = useNavigate();
  const {fetchCategories, categories} = useCategory()


  useEffect(() => {
    fetchCategories()
  }, [])

  const goToCollections = () => {
    navigate("/categories/new"); 
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Heading
          title={`Categorias ${categories ? `(${categories.length})` : '(0)'}`}
          description="Gestiona tus categorias de productos"
        />
        <Button onClick={goToCollections}>
          <Plus className="mr-2 h4 w-4" />
          Agregar Categoria
        </Button>
      </div>
      <CategoryTable/>  
    </>
  )
}