import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ColorsPage = () => {
  const navigate = useNavigate();

  const goToColors = () => {
    navigate("/colors/new");
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Heading
          title="Colores (0)"
          description="Gestiona tus colores"
        />
        <Button onClick={goToColors}>
          <Plus className="mr-2 h4 w-4" />
          Agregar Color
        </Button>
      </div>
      <div>
        {/* Aquí puedes agregar la tabla o lista de colores */}
        <p>Aquí se mostrarán los colores.</p>
      </div>
    </>
  )
}