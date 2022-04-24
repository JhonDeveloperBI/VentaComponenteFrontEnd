import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { VentaService } from '@venta/shared/service/venta.service';
import { Venta } from '@venta/shared/model/venta';

@Component({
  selector: 'app-listar-venta',
  templateUrl: './listar-venta.component.html'
})
export class ListarVentaComponent implements OnInit {
  public listaVentas: Observable<Venta[]>;

  constructor(protected ventaService: VentaService) { }

  ngOnInit() {
    this.listaVentas = this.ventaService.consultar();
  }

}
