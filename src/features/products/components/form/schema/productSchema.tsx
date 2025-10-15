import { z } from "zod"

// Esquemas modulares para componentes individuales
const attributeSchema = z.object({
  attribute_name: z.string().min(1, {
    message: "El nombre del atributo es obligatorio"
  }).max(100, {
    message: "El nombre del atributo debe tener máximo 100 caracteres"
  }),
  attribute_value: z.string().min(1, {
    message: "El valor del atributo es obligatorio"
  }).max(200, {
    message: "El valor del atributo debe tener máximo 200 caracteres"
  })
})

const variationSchema = z.object({
  size_id: z.string().min(1, {
    message: "Debes seleccionar una talla"
  }),
  qty_in_stock: z.string().min(1, {
    message: "La cantidad en stock es obligatoria"
  }).refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "La cantidad debe ser un número mayor o igual a 0"
  })
})

const imageSchema = z.object({
  file: z.instanceof(File, {
    message: "Debe ser un archivo válido"
  }).refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "La imagen debe pesar menos de 5MB"
  }).refine((file) => ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type), {
    message: "Solo se permiten imágenes JPG, PNG o WebP"
  }),
  preview: z.string().url({
    message: "La URL de previsualización debe ser válida"
  })
})

const productItemSchema = z.object({
  color_id: z.string().min(1, {
    message: "Debes seleccionar un color"
  }),
  original_price: z.string().min(1, {
    message: "El precio original es obligatorio"
  }).refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "El precio original debe ser un número mayor a 0"
  }),
  sale_price: z.string().min(1, {
    message: "El precio de venta es obligatorio"
  }).refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "El precio de venta debe ser un número mayor a 0"
  }),
  images: z.array(imageSchema).min(1, {
    message: "Debes agregar al menos una imagen"
  }).max(10, {
    message: "Puedes agregar máximo 10 imágenes por color"
  }),
  variations: z.array(variationSchema).min(1, {
    message: "Debes agregar al menos una talla"
  })
}).refine((data) => Number(data.sale_price) <= Number(data.original_price), {
  message: "El precio de venta no puede ser mayor al precio original",
  path: ["sale_price"]
})

// Esquema principal del producto
const productFormSchema = z.object({
  product_category_id: z.string().min(1, {
    message: "Debes seleccionar una categoría"
  }),
  product_name: z.string().min(3, {
    message: "El nombre del producto debe tener al menos 3 caracteres"
  }).max(200, {
    message: "El nombre del producto debe tener máximo 200 caracteres"
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres"
  }).max(1000, {
    message: "La descripción debe tener máximo 1000 caracteres"
  }),
  model_height: z.string().optional(),
  model_wearing: z.string().optional(),
  care_instructions: z.string().optional(),
  story_time: z.string().optional(),
  attributes: z.array(attributeSchema)
    .optional()
    .default([]),
  items: z.array(productItemSchema).min(1, {
    message: "Debes agregar al menos una variante de color"
  }),
  collection_id: z.string().min(1, {
    message: "Debes seleccionar una colección"
  })
})

type ProductFormData = z.infer<typeof productFormSchema>

export { productFormSchema, type ProductFormData }