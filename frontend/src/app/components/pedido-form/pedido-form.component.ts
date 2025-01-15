import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { Cliente } from '../../models/cliente.model';
import { Producto } from '../../models/producto.model';
import { ClienteService } from '../../services/cliente.service';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { PedidoDto } from '../../models/pedidoDto.model';

@Component({
  selector: 'app-pedido-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './pedido-form.component.html',
  styleUrl: './pedido-form.component.css',
})
export class PedidoFormComponent implements OnInit {
  pedidoForm: FormGroup;
  clientes: Cliente[] = [];
  productos: Producto[] = [];
  selectedProduct: Producto | null = null;

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private productoService: ProductoService
  ) {
    this.pedidoForm = this.fb.group({
      cliente: [null, Validators.required],
      lineasDePedido: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadClientes();
    this.loadProductos();
  }

  loadClientes(): void {
    this.clienteService.getClientes().subscribe((data) => {
      this.clientes = data;
    });
  }

  loadProductos(): void {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  get lineasDePedido(): FormArray {
    return this.pedidoForm.get('lineasDePedido') as FormArray;
  }

  // Método para agregar una nueva línea de pedido
  addLineaDePedido(): void {
    this.lineasDePedido.push(
      this.fb.group({
        producto: [null, Validators.required], // Validación para asegurar que el producto no esté vacío
        cantidad: [1, [Validators.required, Validators.min(1)]],
      })
    );
  }

  // Método para eliminar una línea de pedido
  removeLineaDePedido(index: number): void {
    const lineas = this.pedidoForm.get('lineasDePedido') as FormArray;
    if (lineas) {
      lineas.removeAt(index);
    }
  }

  // Método para enviar el pedido
  submitPedido(): void {
    if (this.pedidoForm.valid) {
      const pedidoData: PedidoDto = {
        clienteId: this.pedidoForm.value.cliente, // ClienteId se toma directamente del formulario
        lineas: this.pedidoForm.value.lineasDePedido.map((linea: any) => ({
          productoId: linea.producto.id, // Asumiendo que el producto tiene un id
          cantidad: linea.cantidad,
        })),
      };

      // Ahora 'pedidoData' tiene la estructura esperada para el DTO de entrada
      this.pedidoService.createPedido(pedidoData).subscribe((response) => {
        console.log('Pedido creado:', response);
      });
    }
  }

  // Método para calcular el total del pedido
  calculateTotal(): number {
    const lineas = this.pedidoForm.value.lineasDePedido;
    let total = 0;
    lineas.forEach((linea: any) => {
      if (linea.producto && linea.producto.precio) {
        total += linea.producto.precio * linea.cantidad;
      } else {
        console.error('Producto o precio no definido en la línea de pedido');
      }
    });
    return total;
  }
}
