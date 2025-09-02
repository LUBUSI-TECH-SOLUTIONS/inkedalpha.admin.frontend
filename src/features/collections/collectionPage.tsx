import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const CollectionPage = () => {
  const navigate = useNavigate();

  const goToCollections = () => {
    navigate("/collections/new"); // 👈 tu nueva ruta
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Colecciones (0)"
          description="Gestiona tus colecciones"
        />
        <Button onClick={goToCollections}>
          <Plus className="mr-2 h4 w-4" />
          Agregar Colección
        </Button>
      </div>
      <Separator className="my-2" />
    </>
  )
}