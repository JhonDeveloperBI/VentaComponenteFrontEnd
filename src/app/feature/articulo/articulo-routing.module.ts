import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearArticuloComponent } from './components/crear-articulo/crear-articulo.component';
import { ListarArticuloComponent } from './components/listar-articulo/listar-articulo.component';
import { BorrarArticuloComponent } from './components/borrar-articulo/borrar-articulo.component';
//import { CrearVentaArticuloComponent } from './components/crear-venta-articulo/crear-venta-articulo.component';
import { ArticuloComponent } from './components/articulo/articulo.component';
import { ActualizarArticuloComponent } from './components/actualizar-articulo/actualizar-articulo.component';


const routes: Routes = [
  {
    path: '',
    component: ArticuloComponent,
    children: [
      {
        path: 'crear',
        component: CrearArticuloComponent
      },
     /* {
        path: 'crearventa/:id',
        component: CrearVentaArticuloComponent
      },
      */
      {
        path: 'listar',
        component: ListarArticuloComponent
      },
      {
        path: 'actualizararticulo/:id',
        component: ActualizarArticuloComponent
      },
      {
        path: 'borrar',
        component: BorrarArticuloComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticuloRoutingModule { }

