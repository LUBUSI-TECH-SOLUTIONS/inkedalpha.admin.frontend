import { Button } from "@/components/ui/button";
import type { ProductResponse } from "../types/productsType";
import { Edit, MoreVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/lib/utils";
import { AlertModal } from "@/components/mdoal/alertModal";
import { useState } from "react";
import { useProductStore } from "../store/productStore";
import { useNavigate } from "react-router-dom";

interface ProductCartProps {
  product: ProductResponse;
}

export const ProductCart = ({ product }: ProductCartProps) => {
  const firstItem = product.items?.[0];
  const image = firstItem?.images?.[0]?.image_filename || "./default.jpg";
  const colorName = firstItem?.color_name || "Sin color";
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();

  const onDelete = () => {
    console.log("Eliminado")
  }
  const { isLoading, fetchSingleProduct } = useProductStore()

  const handleSelectProduct = () => {
    fetchSingleProduct(product)
    navigate(`/products/${product.product_id}`);
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <div className="rounded shadow-md border p-2 max-w-[250px] w-full grid grid-cols-1 grid-rows-5 gap-4 items-center">
        <div className="row-span-3 group relative aspect-square overflow-hidden rounded border border-border">
          <img
            src={image}
            alt={colorName}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-1 top-1">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={handleSelectProduct}
              >
                <Edit className="h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setOpen(true)}
                variant="destructive">
                <Trash className="h-4 w-4" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="row-span-2 h-full w-full px-3">
          <h3 className="font-medium">{product.product_name}</h3>
          <p className="text-sm text-gray-600">{colorName}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center rounded bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
              {product.product_category_name}
            </span>
            {firstItem && (
              <div className="flex items-center gap-1">
                <div
                  className="h-4 w-4 rounded-full border border-border"
                  style={{ backgroundColor: firstItem.hexadecimal }}
                  title={colorName}
                />
              </div>
            )}
          </div>
          {/* Price Info */}
          {firstItem && (
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-lg font-bold text-foreground">{formatCurrency(firstItem.sale_price)}</span>
              {firstItem.original_price !== firstItem.sale_price && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatCurrency(firstItem.original_price)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
