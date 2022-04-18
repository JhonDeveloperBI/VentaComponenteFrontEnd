import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../shared/service/venta.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-venta',
  templateUrl: './crear-venta.component.html'
})
export class CrearVentaComponent implements OnInit {
  ventaForm: FormGroup;
  constructor(protected ventaServices: VentaService) { }

  notificacion = Swal.mixin({
    toast: true,
    position: 'center'
  });

  ngOnInit() {
    this.construirFormularioVenta();
  }

  crear() {
    this.ventaServices.guardar(this.ventaForm.value).subscribe(
      data => {if (data){
        this.success();
        this.ventaForm.reset();
      }},
      error => this.mostrarError(error.error.mensaje)
    );
  }

  private construirFormularioVenta() {
    this.ventaForm = new FormGroup({
      idProducto: new FormControl('', [Validators.required]),
      idUsuario: new FormControl('', [Validators.required]),
      unidadVenta: new FormControl('', [Validators.required])
                                                            });
  }

  success(){
    this.notificacion.fire({
      title: 'Éxito',
      text: 'Se ha creado una venta',
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