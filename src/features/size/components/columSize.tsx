import type { ColumnDef } from "@tanstack/react-table";
import type { SizeType } from "../types/sizeType";
import { CellActionSize } from "./actionSize";

export const getColumnsSize = (): ColumnDef<SizeType>[] => {
  return [
    {
      id: "size_name",
      accessorFn: (row) => row.size_name,
      header: "Nombre",
      cell: ({ row }) =>
        <div className="text-left max-w-[100px] truncate">
          {row.original.size_name}
        </div>
    },
    {
      id: "sort_order",
      accessorFn: (row) => row.sort_order,
      header: "Orden",
      cell: ({ row }) =>
        <div className="text-left max-w-[100px] truncate">
          {row.original.sort_order}
        </div>
    },
    {
      id: "actions",
      cell: ({ row }) => <CellActionSize row={row}/>
    }
  ]
}