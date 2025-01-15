import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Cliente } from '../../models/cliente.model';
import { Producto } from '../../models/producto.model';
import { PedidoService } from '../../services/pedido.service';
import { ClienteService } from '../../services/cliente.service';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoDetail } from '../../models/pedidoDetail.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedido-editar',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pedido-editar.component.html',
  styleUrl: './pedido-editar.component.css',
})
export class PedidoEditarComponent implements OnInit {
  pedidoForm!: FormGroup;
  clientes: Cliente[] = [];
  productos: Producto[] = [];
  pedidoId!: string;

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID del pedido desde la ruta
    this.pedidoId = this.route.snapshot.paramMap.get('id') ?? '';
    console.log(this.pedidoId);
    if (!this.pedidoId) {
      console.error('ID de pedido no válido');
      this.router.navigate(['/pedidos']);
      return;
    }

    this.initForm(); // Inicializar formulario vacío
    this.loadPedido(); // Cargar datos del pedido
    this.loadClientes(); // Cargar lista de clientes
    this.loadProductos(); // Cargar lista de productos
  }

  private initForm(): void {
    this.pedidoForm = this.fb.group({
      cliente: [null, Validators.required], // Campo cliente
      lineasDePedido: this.fb.array([]), // Campo para líneas de pedido
    });
  }

  get lineasDePedido(): FormArray {
    return this.pedidoForm.get('lineasDePedido') as FormArray;
  }

  private loadPedido(): void {
    this.pedidoService.getPedidoById(this.pedidoId).subscribe({
      next: (pedido: PedidoDetail) => {
        // Cargar los datos del pedido en el formulario
        this.pedidoForm.patchValue({
          cliente: pedido.cliente.id,
        });

        // Agregar las líneas de pedido al formulario
        pedido.lineas.forEach((linea) => {
          this.lineasDePedido.push(
            this.fb.group({
              producto: [linea.producto.id, Validators.required],
              cantidad: [
                linea.cantidad,
                [Validators.required, Validators.min(1)],
              ],
            })
          );
        });
      },
      error: (err) => {
        console.error('Error al cargar el pedido:', err);
        this.router.navigate(['/pedidos']); // Redirigir en caso de error
      },
    });
  }

  private loadClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (clientes) => (this.clientes = clientes),
      error: (err) => console.error('Error al cargar los clientes:', err),
    });
  }

  private loadProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (productos) => (this.productos = productos),
      error: (err) => console.error('Error al cargar los productos:', err),
    });
  }

  addLineaDePedido(): void {
    this.lineasDePedido.push(
      this.fb.group({
        producto: [null, Validators.required],
        cantidad: [1, [Validators.required, Validators.min(1)]],
      })
    );
  }

  removeLineaDePedido(index: number): void {
    this.lineasDePedido.removeAt(index);
  }

  onSubmit(): void {
    if (this.pedidoForm.valid) {
      const updatedPedido = {
        clienteId: this.pedidoForm.value.cliente,
        lineas: this.pedidoForm.value.lineasDePedido.map((linea: any) => ({
          productoId: linea.producto,
          cantidad: linea.cantidad,
        })),
      };

      this.pedidoService.updatePedido(this.pedidoId, updatedPedido).subscribe({
        next: () => {
          console.log('Pedido actualizado');
          this.router.navigate(['/pedidos']);
        },
        error: (err) => console.error('Error al actualizar el pedido:', err),
      });
    } else {
      console.error('Formulario inválido');
    }
  }
}
