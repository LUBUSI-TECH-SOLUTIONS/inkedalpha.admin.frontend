export const getFormTitles = (selectedProduct: any) => ({
  title: selectedProduct ? "Editar producto" : "Crear producto",
  description: selectedProduct
    ? "Editar un producto."
    : "Agregar un nuevo producto.",
  action: selectedProduct ? "Guardar cambios" : "Crear",
});
