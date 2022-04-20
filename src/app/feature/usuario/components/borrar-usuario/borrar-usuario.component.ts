import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from '../../shared/service/usuario.service';
import { Usuario } from '@usuario/shared/model/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-borrar-usuario',
  templateUrl: './borrar-usuario.component.html'
})
export class BorrarUsuarioComponent implements OnInit {

  notificacion = Swal.mixin({
    toast: true,
    position: 'center'
  });

  @Input()
  usuario:Usuario;

  constructor(protected usuarioServices: UsuarioService) { }

  ngOnInit() {
  }

  borrarUsuario() { 
    this.success();
 
  }


  success(){
    this.notificacion.fire({
      title: 'Esta seguro de eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioServices.eliminar(this.usuario).subscribe(
          data => {if (data){
          }},
          error => this.mostrarError(error.error.mensaje)
        );
      
        this.notificacion.fire({
          title: 'Éxito',
          text: 'Se ha eliminado el usuario',
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