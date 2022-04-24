import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ArticuloService } from 'src/app/feature/articulo/shared/service/articulo.service';
import { Articulo } from 'src/app/feature/articulo/shared/model/articulo';


@Component({
  selector: 'app-listar-articulo',
  templateUrl: './listar-articulo.component.html'
})
export class ListarArticuloComponent implements OnInit {
  public listaArticulos: Observable<Articulo[]>;


  constructor(protected articuloService: ArticuloService) { }

  ngOnInit() {
    this.listaArticulos = this.articuloService.consultar();
  }

  

}
