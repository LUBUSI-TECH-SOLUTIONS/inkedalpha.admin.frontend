import { useMemo } from "react"
import { useCategory } from "../store/useCategory"
import { getColumnsCollection } from "./columnsCollection"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2 } from "lucide-react"

export const CategoryTable = () => {
  const {
    isLoading,
    categories,
  } = useCategory()

  const columns = useMemo(() => {
    return getColumnsCollection()
  }, [isLoading])

  const table = useReactTable({
    data: categories,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  }
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {
            isLoading ? (
              <TableRow>
                <TableCell colSpan={
                  table.getVisibleLeafColumns().length
                } className="h-24 text-center">
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-4 animate-spin mr-2" />
                    Cargando productos...
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No se encontraron colecciones.
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </div>
  )
}