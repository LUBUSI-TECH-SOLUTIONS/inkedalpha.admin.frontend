import type { ColumnDef } from "@tanstack/react-table";
import type { CollectionType } from "../types/collectionType";
import { formaterDate } from "@/lib/utils";
import { CellActionCollection } from "./actionCollection";

export const getColumnsCollection = (): ColumnDef<CollectionType>[] => {
  return [
    {
      id: "collection_name",
      accessorFn: (row) => row.collection_name,
      header: "Nombre",
      cell: ({ row }) =>
        <div className="text-left max-w-[100px] truncate">
          {row.original.collection_name}
        </div>
    },
    {
      id: "collection_image",
      accessorFn: (row) => row.collection_image,
      header: "Imagen",
      cell: ({ row }) =>
        row.original.collection_image ? (
          <img
            src={row.original.collection_image}
            alt={row.original.collection_name}
            className="h-10 w-10 rounded-md object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-md bg-muted" />
        )
    },
    {
      id: "start_date",
      accessorFn: (row) => row.start_date,
      header: "Fecha de inicio",
      cell: ({ row }) =>
        row.original.start_date ? (
          formaterDate(row.original.start_date)
        ) : (
          "N/A"
        )
    },
    {
      id: "end_date",
      accessorFn: (row) => row.end_date,
      header: "Fecha de fin",
      cell: ({ row }) =>
        row.original.end_date ? (
          formaterDate(row.original.end_date)
        ) : ("N/A")
    },
    {
      id: "actions",
      cell: ({row}) => <CellActionCollection row={row}/>,
    }
  ]
}