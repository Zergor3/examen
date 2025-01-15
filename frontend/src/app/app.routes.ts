import { Routes } from '@angular/router';
import { PedidosListComponent } from './components/pedidos-list/pedidos-list.component';
import { PedidoDetailComponent } from './components/pedido-detail/pedido-detail.component';
import { PedidoFormComponent } from './components/pedido-form/pedido-form.component';
import { PedidoEditarComponent } from './components/pedido-editar/pedido-editar.component';

export const routes: Routes = [
  { path: '', redirectTo: '/pedidos', pathMatch: 'full' },
  { path: 'pedidos', component: PedidosListComponent },
  { path: 'pedidos/:id', component: PedidoDetailComponent },
  { path: 'nuevo-pedido', component: PedidoFormComponent },
  { path: 'editar-pedido/:id', component: PedidoEditarComponent },
];
