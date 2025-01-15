import { Cliente } from './cliente.model';
import { Producto } from './producto.model';

export interface Pedido {
  id: string;
  cliente: Cliente; // ID del cliente
  productos: Producto[];
  total: number;
}
