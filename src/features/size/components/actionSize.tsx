import type { Row } from "@tanstack/react-table";
import type { SizeType } from "../types/sizeType";
import { useSizeStore } from "../store/sizeStore";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

interface CellActionSizeProps {
  row: Row<SizeType>;
}

export const CellActionSize = ({
  row
}: CellActionSizeProps) => {
  const { selectSize } = useSizeStore()
  const navigate = useNavigate();

  const handleUpdate = () => {
    if (!row.original) return;
    selectSize(row.original)
    navigate(`/sizes/${row.original.size_id}`);
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
        <DropdownMenuItem variant="destructive" >
          <Trash/>
          Desactivar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}