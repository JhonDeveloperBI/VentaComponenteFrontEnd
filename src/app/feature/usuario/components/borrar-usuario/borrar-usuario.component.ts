import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(protected usuarioServices: UsuarioService, private router: Router) { }

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
          data => {if (data){ //NOSONAR
          }},
          error => this.mostrarError(error.error.mensaje)
        );

        this.mostrarMensaje('Se ha eliminado el usuario');

        this.router.navigateByUrl('/usuario');
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
