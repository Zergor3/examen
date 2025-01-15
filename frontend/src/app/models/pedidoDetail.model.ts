import { Cliente } from './cliente.model';
import { Linea } from './linea.model';

export interface PedidoDetail {
  id: string;
  cliente: Cliente; // ID del cliente
  lineas: Linea[];
  total: number;
}
