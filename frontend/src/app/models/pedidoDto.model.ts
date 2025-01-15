export interface PedidoDto {
  clienteId: number; // ID del cliente
  lineas: { productoId: number; cantidad: number }[]; // Línea de productos y cantidades
}
