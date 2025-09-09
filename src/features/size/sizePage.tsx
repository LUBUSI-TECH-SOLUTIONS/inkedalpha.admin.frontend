import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { useNavigate } from "react-router-dom";

export const SizePage = () => {
  const navigate = useNavigate();
  const goToSizes = () => {
    navigate("/sizes/new");
  }
  
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Heading
          title="Tallas (0)"
          description="Gestiona tus tallas"
        />
        <Button onClick={goToSizes}>
          Agregar Talla
        </Button>
      </div>
      <div>
        {/* Aquí puedes agregar la tabla o lista de tallas */}
        <p>Aquí se mostrarán las tallas.</p>
      </div>

    </>
  );
}