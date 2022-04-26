import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../shared/service/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IAlertaService } from '@core/services/alerta.service';

const id = 'id';
const inputNombre = 'nombre';
const inputClave = 'clave';
const mensajeActualizacionUsuario = 'Se ha actualizado el usuario';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html'
})
export class ActualizarUsuarioComponent implements OnInit {

  getIdUsuario: number;
  usuarios: any = []; // NOSONAR

  usuarioForm: FormGroup;
  constructor(protected usuarioService: UsuarioService, private activeRouter: ActivatedRoute, private router: Router,
              protected alert: IAlertaService) {
    this.getIdUsuario = Number(this.activeRouter.snapshot.paramMap.get(id));
  }

  ngOnInit() {
    this.usuarioService.consultar().subscribe(
        (data: any) => { // NOSONAR
           this.usuarios = data.map(u => u);
           const usuarioFilter = this.usuarios.filter(u => Number(u.id) === Number(this.getIdUsuario) )[0];
           this.usuarioForm.controls[id].setValue(usuarioFilter?.id);
           this.usuarioForm.controls[inputNombre].setValue(usuarioFilter?.nombre);
           this.usuarioForm.controls[inputClave].setValue(usuarioFilter?.clave);
        }
      );
    this.construirFormularioUsuario();
  }

  actualizar() {
    this.usuarioService.actualizar(this.getIdUsuario, this.usuarioForm.value).subscribe(
      data => { if(data) {
        this.alert.exito(mensajeActualizacionUsuario);
        this.router.navigateByUrl('/usuario');
      }
      }
    );
  }

  private construirFormularioUsuario() {
    this.usuarioForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
      clave: new FormControl('', [Validators.required])
    });
  }

}
