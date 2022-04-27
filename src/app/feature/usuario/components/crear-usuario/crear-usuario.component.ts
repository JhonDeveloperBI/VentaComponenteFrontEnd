import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../shared/service/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IAlertaService } from '@core/services/alerta.service';


const mensajeExitoUsuario = 'Se ha creado el usuario';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html'
})
export class CrearUsuarioComponent implements OnInit {



  usuarioForm: FormGroup;
  constructor(protected usuarioServices: UsuarioService, protected alert: IAlertaService) { }

  ngOnInit() {
    this.construirFormularioUsuario();
  }

  crear() {
    this.usuarioServices.guardar(this.usuarioForm.value).subscribe(
      data => {if (data){
        this.alert.exito(mensajeExitoUsuario);
        this.usuarioForm.reset();
      }},
      error => this.alert.errorInesperado(error.error.mensaje)
    );
  }

  private construirFormularioUsuario() {
    this.usuarioForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      clave: new FormControl('', [Validators.required])
                                                            });
  }


}
