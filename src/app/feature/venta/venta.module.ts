import { NgModule } from '@angular/core';

import { VentaRoutingModule } from './venta-routing.module';
import { ListarVentaComponent } from './components/listar-venta/listar-venta.component';
import { CrearVentaComponent } from './components/crear-venta/crear-venta.component';
import { VentaComponent } from './components/venta/venta.component';
import { SharedModule } from '@shared/shared.module';
import { VentaService } from './shared/service/venta.service';


@NgModule({
  declarations: [
    CrearVentaComponent,
    ListarVentaComponent,
    VentaComponent
  ],
  imports: [
    VentaRoutingModule,
    SharedModule
  ],
  providers: [VentaService]
})
export class VentaModule { }