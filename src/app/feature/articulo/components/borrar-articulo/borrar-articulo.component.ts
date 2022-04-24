import { Component,Input, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/feature/articulo/shared/service/articulo.service';
import { Articulo } from 'src/app/feature/articulo/shared/model/articulo';
import { Router } from '@angular/router';

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


  constructor( protected articuloService: ArticuloService, private router: Router) { }

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
          data => {if (data){ //NOSONAR
          }},
          error => this.mostrarError(error.error.mensaje)
        );
      
        this.mostrarMensaje('Se ha eliminado el artículo');   

        this.router.navigateByUrl('/articulo');   
      }
    });
    
  }

   mostrarMensaje(mensaje){
    this.notificacion.fire({
      title: 'Éxito',
      text: mensaje,
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
