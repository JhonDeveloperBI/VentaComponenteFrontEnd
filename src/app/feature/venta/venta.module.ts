import { NgModule } from '@angular/core';

import { VentaRoutingModule } from './venta-routing.module';
import { ListarVentaComponent } from '@venta/components/listar-venta/listar-venta.component';
import { VentaComponent } from '@venta/components/venta/venta.component';
import { SharedModule } from '@shared/shared.module';
import { VentaService } from './shared/service/venta.service';
import { CrearVentaComponent } from './components/crear-venta/crear-venta.component';



@NgModule({
  declarations: [
    ListarVentaComponent,
    VentaComponent,
    CrearVentaComponent
  ],
  imports: [
    VentaRoutingModule,
    SharedModule
  ],
  providers: [VentaService]
})
export class VentaModule { }
