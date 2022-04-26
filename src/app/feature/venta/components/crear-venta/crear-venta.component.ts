import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { VentaService } from '@venta/shared/service/venta.service';
import { UsuarioService } from '@usuario/shared/service/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html'
})
export class CrearVentaComponent implements OnInit {


  inputIdArticulo = 'idArticulo';
  inputIdUsuario = 'idUsuario';
  inputnombreUsuario = 'nombreUsuario';

  getIdArticulo: number;
  ventaForm: FormGroup;

  constructor(protected ventaServices: VentaService, private activeRouter: ActivatedRoute,
    protected usuarioService: UsuarioService, private router: Router) {
    this.getIdArticulo = Number(this.activeRouter.snapshot.paramMap.get('id'));
  }

  notificacion = Swal.mixin({
    toast: true,
    position: 'center'
  });


  ngOnInit() {
    this.construirFormularioVenta();
    this.ventaForm.controls[this.inputIdArticulo].setValue(this.getIdArticulo);

    this.usuarioService.consultar().subscribe(
      res => {
        this.ventaForm.controls[this.inputIdUsuario].setValue(res[0]?.id);
        this.ventaForm.controls[this.inputnombreUsuario].setValue(res[0]?.nombre);
      }
    );
  }

  crear() {

    this.ventaServices.guardar(this.ventaForm.value).subscribe(
      data => {
        if (data) {
          this.success();
          this.ventaForm.reset();
          this.router.navigateByUrl('/');
        }
      }
    );
  }

  private construirFormularioVenta() {
    this.ventaForm = new FormGroup({
      idUsuario: new FormControl('', [Validators.required]),
      unidadVenta: new FormControl('', [Validators.required]),
      idArticulo: new FormControl('', [Validators.required]),
      nombreUsuario: new FormControl('', [Validators.required]),
    });
  }

  success() {
    this.notificacion.fire({
      title: 'Éxito',
      text: 'Se ha creado una venta',
      icon: 'success'
    });
  }

  mostrarError(mensaje) {
    this.notificacion.fire({
      title: 'Error',
      text: mensaje,
      icon: 'error'
    });
  }
}
