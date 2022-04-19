import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UsuarioService } from '@usuario/shared/service/usuario.service';
import { Usuario } from '@usuario/shared/model/usuario';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html'
})
export class ListarUsuarioComponent implements OnInit {

  notificacion = Swal.mixin({
    toast: true,
    position: 'center'
  });

  public listarUsuarios: Observable<Usuario[]>;

  constructor(protected usuarioService: UsuarioService) { }

  ngOnInit() {
    this.listarUsuarios = this.usuarioService.consultar();
  }

  borrarUsuario(usuario):void{
 
    this.usuarioService.eliminar(usuario).subscribe(
      data => {if (data){
      }},
      error => this.mostrarError(error.error.mensaje)
    );
    this.success();

    setTimeout(() => {
      window.location.reload()  
    }, 3000);
    
  }

  success(){
    this.notificacion.fire({
      title: 'Éxito',
      text: 'Se ha eliminado el usuario',
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