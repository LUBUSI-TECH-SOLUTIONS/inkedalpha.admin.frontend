import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Row } from "@tanstack/react-table"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import type { ColorType } from "../types/colorType"
import { useColorStore } from "../store/colorStore"
import { useNavigate } from "react-router-dom"
import { AlertModal } from "@/components/mdoal/alertModal"
import { useState } from "react"

interface CellActionColorProps {
  row: Row<ColorType>;
}

export const CellActionColor = ({
  row
}: CellActionColorProps) => {

  const { selectColor, isLoading, deleteColor } = useColorStore()
  const navigate = useNavigate();

  const [open, setOpen] = useState(false)
  const onDelete = async () => {
    await deleteColor(row.original.color_id)
  }

  const handleUpdate = () => {
    if (!row.original) return;
    selectColor(row.original)
    navigate(`/colors/${row.original.color_id}`);
  }
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
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
            <Edit className="mr-2 h-4 w-4" />
            Actualizar
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" />
            Desactivar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}