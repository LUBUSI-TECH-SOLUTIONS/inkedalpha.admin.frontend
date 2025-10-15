import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Row } from "@tanstack/react-table"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import type { ColorType } from "../types/colorType" 
import { useColorStore } from "../store/colorStore" 
import { useNavigate } from "react-router-dom"

interface CellActionColorProps {
  row: Row<ColorType>;
}

export const CellActionColor = ({
  row
}: CellActionColorProps) => {

  const {selectColor} = useColorStore()
  const navigate = useNavigate();

  const handleUpdate = () => {
    if(!row.original) return;
    selectColor(row.original)
    navigate(`/colors/${row.original.color_id}`);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          Acciones
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={handleUpdate}>
          <Edit className="mr-2 h-4 w-4"/>
          Actualizar
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash className="mr-2 h-4 w-4"/>
          Desactivar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}