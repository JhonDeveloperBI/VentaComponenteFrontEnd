import { NgModule } from '@angular/core';

import { ArticuloRoutingModule } from './articulo-routing.module';
import { ListarArticuloComponent } from './components/listar-articulo/listar-articulo.component';
import { CrearArticuloComponent } from './components/crear-articulo/crear-articulo.component';
import { BorrarArticuloComponent } from './components/borrar-articulo/borrar-articulo.component';

import { ArticuloComponent } from './components/articulo/articulo.component';
import { SharedModule } from '@shared/shared.module';
import { ArticuloService } from './shared/service/articulo.service';
import { UsuarioService, UsuarioServiceImpl } from '../usuario/shared/service/usuario.service';

import { ActualizarArticuloComponent } from './components/actualizar-articulo/actualizar-articulo.component';
import { AlertaService, IAlertaService } from '@core/services/alerta.service';


@NgModule({
  declarations: [
    CrearArticuloComponent,
    ListarArticuloComponent,
    BorrarArticuloComponent,
    ArticuloComponent,
    ActualizarArticuloComponent
  ],
  imports: [
    ArticuloRoutingModule,
    SharedModule
  ],
  providers: [ArticuloService, {provide: UsuarioService, useClass: UsuarioServiceImpl},
        {provide: IAlertaService, useClass: AlertaService}]
})
export class ArticuloModule { }
