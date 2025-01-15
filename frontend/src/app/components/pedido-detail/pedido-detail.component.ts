import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../models/pedido.model';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { PedidoDetail } from '../../models/pedidoDetail.model';

@Component({
  selector: 'app-pedido-detail',
  imports: [CommonModule],
  templateUrl: './pedido-detail.component.html',
  styleUrl: './pedido-detail.component.css',
})
export class PedidoDetailComponent implements OnInit {
  pedidoId: string = '';
  pedido$: Observable<PedidoDetail | null> = of(null);

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.pedidoId = params.get('id') ?? '';
      if (this.pedidoId) {
        this.getPedidoDetail(); // Llamada al servicio si el id es válido
      } else {
        console.log('No se ha proporcionado un id de pedido válido.');
      }
    });
  }

  getPedidoDetail(): void {
    this.pedido$ = this.pedidoService.getPedidoById(this.pedidoId);
  }
}
