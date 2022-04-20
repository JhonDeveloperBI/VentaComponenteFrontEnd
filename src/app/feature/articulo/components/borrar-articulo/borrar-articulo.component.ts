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
    this.success();
  
  }

  success(){
    this.notificacion.fire({
      title: 'Esta seguro de eliminar este artículo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.articuloService.eliminar(this.articulo).subscribe(
          data => {if (data){
          }},
          error => this.mostrarError(error.error.mensaje)
        );
      
        this.notificacion.fire({
          title: 'Éxito',
          text: 'Se ha eliminado el artículo',
          icon: 'success'
        });

        setTimeout(() => {
          window.location.reload()  
        }, 3000);   
      }
    })
  }

    mostrarError(mensaje){
      this.notificacion.fire({
        title: 'Error',
        text: mensaje,
        icon: 'error'
      });
    }
}
