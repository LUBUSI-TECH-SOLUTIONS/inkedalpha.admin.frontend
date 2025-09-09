import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Plus } from "lucide-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCollection } from "./store/useCollection"
import { CollectionTable } from "./components/tableCollection"

export const CollectionPage = () => {
  const navigate = useNavigate();
  const {fetchCollections} = useCollection()


  useEffect(() => {
    fetchCollections()
  }, [])

  const goToCollections = () => {
    navigate("/collections/new"); 
  };
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Heading
          title="Colecciones (0)"
          description="Gestiona tus colecciones"
        />
        <Button onClick={goToCollections}>
          <Plus className="mr-2 h4 w-4" />
          Agregar Colección
        </Button>
      </div>
      <CollectionTable/>  
    </>
  )
}