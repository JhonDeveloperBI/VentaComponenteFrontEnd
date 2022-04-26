import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearVentaComponent } from './components/crear-venta/crear-venta.component';
import { ListarVentaComponent } from './components/listar-venta/listar-venta.component';
import { VentaComponent } from './components/venta/venta.component';


const routes: Routes = [ // NOSONAR
  {
    path: '',
    component: VentaComponent,
    children: [
      {
        path: 'listar',
        component: ListarVentaComponent
      },
        {
        path: 'crearventa/:id',
        component: CrearVentaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentaRoutingModule { }
