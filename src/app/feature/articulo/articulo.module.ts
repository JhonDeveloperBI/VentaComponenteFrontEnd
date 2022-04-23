import { NgModule } from '@angular/core';

import { ArticuloRoutingModule } from './articulo-routing.module';
import { ListarArticuloComponent } from './components/listar-articulo/listar-articulo.component';
import { CrearArticuloComponent } from './components/crear-articulo/crear-articulo.component';
import { CrearVentaArticuloComponent } from './components/crear-venta-articulo/crear-venta-articulo.component';
import { BorrarArticuloComponent } from './components/borrar-articulo/borrar-articulo.component';

import { ArticuloComponent } from './components/articulo/articulo.component';
import { SharedModule } from '@shared/shared.module';
import { ArticuloService } from './shared/service/articulo.service';
import { UsuarioService } from '@usuario/shared/service/usuario.service';
import { ActualizarArticuloComponent } from './components/actualizar-articulo/actualizar-articulo.component';


@NgModule({
  declarations: [
    CrearArticuloComponent,
    ListarArticuloComponent,
    BorrarArticuloComponent,
    CrearVentaArticuloComponent,
    ArticuloComponent,
    ActualizarArticuloComponent
  ],
  imports: [
    ArticuloRoutingModule,
    SharedModule
  ],
  providers: [ArticuloService,UsuarioService]
})
export class ArticuloModule { }
