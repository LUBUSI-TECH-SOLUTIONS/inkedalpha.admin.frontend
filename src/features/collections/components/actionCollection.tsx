import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Row } from "@tanstack/react-table"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import type { CollectionType } from "../types/collectionType"
import { useCollection } from "../store/useCollection"
import { useNavigate } from "react-router-dom"

interface CellActionCollectionProps {
  row: Row<CollectionType>;
}

export const CellActionCollection = ({
  row
}: CellActionCollectionProps) => {

  const {selectCollection} = useCollection()
  const navigate = useNavigate();

  const handleUpdate = () => {
    if(!row.original) return;
    selectCollection(row.original)
    navigate(`/collections/${row.original.collection_id}`);
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