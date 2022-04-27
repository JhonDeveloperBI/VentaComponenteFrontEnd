import { Component, Input, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/feature/articulo/shared/service/articulo.service';
import { Articulo } from 'src/app/feature/articulo/shared/model/articulo';
import { Router } from '@angular/router';

import { IAlertaService } from '@core/services/alerta.service';

const mensajeEliminarArticulo = 'Esta seguro de eliminar este artículo?';
const mensajeEliminacionArticulo = 'Se ha eliminado el artículo';

@Component({
  selector: 'app-borrar-articulo',
  templateUrl: './borrar-articulo.component.html'
})
export class BorrarArticuloComponent implements OnInit {

  @Input()
  articulo: Articulo;

  constructor(protected articuloService: ArticuloService, private router: Router,
              protected alert: IAlertaService) { }

  ngOnInit() {
  }

  borrarArticulo(): void {
    this.success();
  }

  success() {
    this.alert.confirmacion(mensajeEliminarArticulo).subscribe(
      confirm => {
        if (confirm.confirmado) {
          this.articuloService.eliminar(this.articulo).subscribe(
            data => {
              if (data) {
                this.alert.exito(mensajeEliminacionArticulo);
                this.router.navigateByUrl('/articulo');
              }
            });
        }
      });
  }

}
