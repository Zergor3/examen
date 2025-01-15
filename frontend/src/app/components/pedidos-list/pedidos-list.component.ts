import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../models/pedido.model';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pedidos-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './pedidos-list.component.html',
  styleUrl: './pedidos-list.component.css',
})
export class PedidosListComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.loadPedidos();
  }

  loadPedidos(): void {
    this.pedidoService.getPedidos().subscribe((data) => {
      this.pedidos = data;
    });
  }

  deletePedido(id: string): void {
    if (confirm('¿Estás seguro de eliminar este pedido?')) {
      this.pedidoService.deletePedido(id).subscribe(() => {
        this.loadPedidos(); // Recargar la lista después de eliminar
      });
    }
  }
}
