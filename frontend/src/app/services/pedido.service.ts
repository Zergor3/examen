import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PedidoDto } from '../models/pedidoDto.model';
import { PedidoDetail } from '../models/pedidoDetail.model';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private apiUrl = `${environment.API_URL}/api/pedidos`;

  constructor(private http: HttpClient) {}

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  getPedidoById(id: string): Observable<PedidoDetail> {
    return this.http.get<PedidoDetail>(`${this.apiUrl}/${id}`);
  }

  createPedido(pedido: PedidoDto): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }

  updatePedido(id: string, pedido: PedidoDto): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/${id}`, pedido);
  }

  deletePedido(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
