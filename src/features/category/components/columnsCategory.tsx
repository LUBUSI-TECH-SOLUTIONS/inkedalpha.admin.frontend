import type { ColumnDef } from "@tanstack/react-table";
import type { CategoryType } from "../types/categoryType";
import { CellActionCotegory } from "./actionCategory";

export const getColumnsCollection = (): ColumnDef<CategoryType>[] => {
  return [
    {
      id: "category_name",
      accessorFn: (row) => row.category_name,
      header: "Nombre",
      cell: ({ row }) =>
        <div className="text-left max-w-[100px]">
          {row.original.category_name}
        </div>
    },
    {
      id: "category_image",
      accessorFn: (row) => row.category_image,
      header: "Imagen",
      cell: ({ row }) => <img
        src={row.original.category_image}
        alt={row.original.category_name}
        className="w-10 h-10 object-cover rounded"
      />

    },
    {
      id: "parent_category_name",
      accessorFn: (row) => row.parent_category_name,
      header: "Fecha de inicio",
      cell: ({ row }) =>
        row.original.parent_category_name ? (
          row.original.parent_category_name
        ) : (
          "N/A"
        )
    },
    {
      id: "actions",
      cell: ({ row }) => <CellActionCotegory row={row} />,
    }
  ]
}