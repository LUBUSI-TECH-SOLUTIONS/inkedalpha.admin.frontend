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
      accessorFn: (row) => row.image,
      header: "Imagen",
      cell: ({ row }) => {
        const image = row.original.image;
        let src: string | undefined;
        if (typeof image === "string") {
          src = image;
        } else if (image instanceof File) {
          src = URL.createObjectURL(image);
        }
        return image ? (
          <img
            src={src}
            alt={row.original.collection_name}
            className="h-10 w-10 rounded-md object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-10 w-10 rounded-md bg-muted" />
        );
      }
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