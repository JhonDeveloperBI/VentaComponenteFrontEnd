import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../shared/service/usuario.service';
import { Usuario } from '@usuario/shared/model/usuario';
import Swal from 'sweetalert2';
import { IAlertaService } from '@core/services/alerta.service';

const mensajePreguntaUsuario = 'Esta seguro de eliminar este usuario?';
const mensajeConfirmacionBorradoUsuario = 'Se ha eliminado el usuario';

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
  usuario: Usuario;

  constructor(protected usuarioServices: UsuarioService, private router: Router, protected alert: IAlertaService) { }

  ngOnInit() {
  }

  borrarUsuario() {
    this.success();
  }


  success() {

    this.alert.confirmacion(mensajePreguntaUsuario).subscribe(
      data => {
        if (data.confirmado) {
          this.usuarioServices.eliminar(this.usuario).subscribe(
            data => {
              if (data) {
                this.alert.exito(mensajeConfirmacionBorradoUsuario);
                this.router.navigateByUrl('/usuario');
              }
            }
          );
        }
      }
    )
  }


}
