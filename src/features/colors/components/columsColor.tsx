import type { ColumnDef } from "@tanstack/react-table";
import type { ColorType } from "../types/colorType";
import { CellActionColor } from "./actionsColor";

export const getColumnsColor = (): ColumnDef<ColorType>[] => {
  return [
    {
      id: "color_name",
      accessorFn: (row) => row.color_name,
      header: "Nombre",
      cell: ({ row }) =>
        <div className="text-left max-w-[100px] truncate">
          {row.original.color_name}
        </div>
    },
    {
      id: "hexadecimal",
      accessorFn: (row) => row.hexadecimal,
      header: "Hexadecimal",
      cell: ({ row }) =>
        <div className="flex items-center">
          <div
            className="h-6 w-6 rounded-md border mr-2"
            style={{ backgroundColor: row.original.hexadecimal }}
          />
          {row.original.hexadecimal?.toUpperCase()}
        </div>
    },
    {
      id: "actions",
      cell: ({ row }) => <CellActionColor row={row} />
    }
  ]
}