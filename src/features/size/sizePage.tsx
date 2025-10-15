import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { useNavigate } from "react-router-dom";
import { SizeTable } from "./components/tableSize";
import { useSizeStore } from "./store/sizeStore";
import { useEffect } from "react";

export const SizePage = () => {
  const navigate = useNavigate();
  const {fetchSizes, sizes } = useSizeStore(); 

  useEffect(() => {
    fetchSizes();
  }, [fetchSizes]);


  const goToSizes = () => {
    navigate("/sizes/new");
  }
  
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Heading
          title={`Tallas ${sizes ? `(${sizes.length})` : '(0)'}`}
          description="Gestiona tus tallas"
        />
        <Button onClick={goToSizes}>
          Agregar Talla
        </Button>
      </div>
      <SizeTable/>
    </>
  );
}