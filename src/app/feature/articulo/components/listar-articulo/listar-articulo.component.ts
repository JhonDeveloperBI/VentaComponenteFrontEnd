import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ArticuloService } from 'src/app/feature/articulo/shared/service/articulo.service';
import { Articulo } from 'src/app/feature/articulo/shared/model/articulo';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-articulo',
  templateUrl: './listar-articulo.component.html',
  styleUrls: ['./listar-articulo.component.css']
})
export class ListarArticuloComponent implements OnInit {
  public listaArticulos: Observable<Articulo[]>;

  notificacion = Swal.mixin({
    toast: true,
    position: 'center'
  });

  constructor(protected articuloService: ArticuloService) { }

  ngOnInit() {
    this.listaArticulos = this.articuloService.consultar();
  }

  borrarArticulo(articulo):void{
    console.log(articulo)
 
    this.articuloService.eliminar(articulo).subscribe(
      data => {if (data){
        this.success();
      }},
      error => this.mostrarError(error.error.mensaje)
    );
    
    setTimeout(() => {
      window.location.reload()  
    }, 3000);
    
  }

  success(){
    this.notificacion.fire({
      title: 'Éxito',
      text: 'Se ha eliminado el artículo',
      icon: 'success'
    });
  }

    mostrarError(mensaje){
      this.notificacion.fire({
        title: 'Error',
        text: mensaje,
        icon: 'error'
      });
    }

}
