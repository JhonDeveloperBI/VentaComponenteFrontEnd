import { NgModule } from '@angular/core';

import { ArticuloRoutingModule } from './articulo-routing.module';
import { ListarArticuloComponent } from './components/listar-articulo/listar-articulo.component';
import { CrearArticuloComponent } from './components/crear-articulo/crear-articulo.component';
import { BorrarArticuloComponent } from './components/borrar-articulo/borrar-articulo.component';

import { ArticuloComponent } from './components/articulo/articulo.component';
import { SharedModule } from '@shared/shared.module';
import { ArticuloService } from './shared/service/articulo.service';


@NgModule({
  declarations: [
    CrearArticuloComponent,
    ListarArticuloComponent,
    BorrarArticuloComponent,
    ArticuloComponent
  ],
  imports: [
    ArticuloRoutingModule,
    SharedModule
  ],
  providers: [ArticuloService]
})
export class ArticuloModule { }
