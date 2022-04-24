import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../shared/service/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html'
})
export class ActualizarUsuarioComponent implements OnInit {

  getIdUsuario: number;
  usuarios : any = []; //NOSONAR


  notificacion = Swal.mixin({
    toast: true,
    position: 'center'
  });

  usuarioForm: FormGroup;
  constructor(protected usuarioService: UsuarioService, private activeRouter: ActivatedRoute, private router: Router) {
    this.getIdUsuario = parseInt(this.activeRouter.snapshot.paramMap.get('id'));  
   }

  ngOnInit() {
    this.usuarioService.consultar().subscribe(
        (data : any) =>{ //NOSONAR
           this.usuarios = data.map(u => u);
           let usuarioFilter = this.usuarios.filter(u => u.id = this.getIdUsuario );
           this.usuarioForm.controls['id'].setValue(usuarioFilter[0]?.id);
           this.usuarioForm.controls['nombre'].setValue(usuarioFilter[0]?.nombre);
           this.usuarioForm.controls['clave'].setValue(usuarioFilter[0]?.clave);
        }
      ); 
    
    this.construirFormularioUsuario();
  }

  actualizar() {
    this.usuarioService.actualizar(this.getIdUsuario,this.usuarioForm.value).subscribe(
      data => {if (data){
      }},
      error => this.mostrarError(error.error.mensaje)
    );
    this.success();
     this.router.navigateByUrl('/usuario/listar')
  }

  private construirFormularioUsuario() {
    this.usuarioForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      id:new FormControl('', [Validators.required]),
      clave: new FormControl('', [Validators.required])
    });
  }

  success(){
    this.notificacion.fire({
      title: 'Éxito',
      text: 'Se ha actualizado el usuario',
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