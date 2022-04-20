import { Component,Input, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/feature/articulo/shared/service/articulo.service';
import { Articulo } from 'src/app/feature/articulo/shared/model/articulo';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-borrar-articulo',
  templateUrl: './borrar-articulo.component.html',
  styleUrls: ['./borrar-articulo.component.css']
})
export class BorrarArticuloComponent implements OnInit {

  @Input()
  articulo: Articulo;

  notificacion = Swal.mixin({
    toast: true,
    position: 'center'
  });


  constructor( protected articuloService: ArticuloService) { }

  ngOnInit() {
  }

  borrarArticulo():void{
    this.articuloService.eliminar(this.articulo).subscribe(
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
