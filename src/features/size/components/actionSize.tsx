import type { Row } from "@tanstack/react-table";
import type { SizeType } from "../types/sizeType";
import { useSizeStore } from "../store/sizeStore";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { AlertModal } from "@/components/mdoal/alertModal";
import { useState } from "react";

interface CellActionSizeProps {
  row: Row<SizeType>;
}

export const CellActionSize = ({
  row
}: CellActionSizeProps) => {
  const { selectSize, isLoading, deleteSize } = useSizeStore()
  const navigate = useNavigate();

  const [open, setOpen] = useState(false)
  const onDelete = async () => {
    deleteSize(row.original.size_id || "")
  }

  const handleUpdate = () => {
    if (!row.original) return;
    selectSize(row.original)
    navigate(`/sizes/${row.original.size_id}`);
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
            <Trash />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}