import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearArticuloComponent } from './components/crear-articulo/crear-articulo.component';
import { ListarArticuloComponent } from './components/listar-articulo/listar-articulo.component';
import { ArticuloComponent } from './components/articulo/articulo.component';


const routes: Routes = [
  {
    path: '',
    component: ArticuloComponent,
    children: [
      {
        path: 'crear',
        component: CrearArticuloComponent
      },
      {
        path: 'listar',
        component: ListarArticuloComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticuloRoutingModule { }
