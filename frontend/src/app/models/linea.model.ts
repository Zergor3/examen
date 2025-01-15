import { Producto } from './producto.model';

export interface Linea {
  producto: Producto; // ID del cliente
  cantidad: number;
}
