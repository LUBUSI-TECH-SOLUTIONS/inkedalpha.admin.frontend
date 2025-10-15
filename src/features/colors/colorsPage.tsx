import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useColorStore } from "./store/colorStore";
import { useEffect } from "react";
import { ColorTable } from "./components/tableColor";

export const ColorsPage = () => {
  const navigate = useNavigate();
  const {fetchColors, colors}= useColorStore();

  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  const goToColors = () => {
    navigate("/colors/new");
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Heading
          title={`Colores ${colors ? `(${colors.length})` : '(0)'}`}
          description="Gestiona tus colores"
        />
        <Button onClick={goToColors}>
          <Plus className="mr-2 h4 w-4" />
          Agregar Color
        </Button>
      </div>
      <ColorTable/>
    </>
  )
}