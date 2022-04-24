import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../shared/service/articulo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 20;

@Component({
  selector: 'app-crear-articulo',
  templateUrl: './crear-articulo.component.html'
})
export class CrearArticuloComponent implements OnInit {
  articuloForm: FormGroup;

  notificacion = Swal.mixin({
    toast: true,
    position: 'center'
  });

  constructor(protected articuloServices: ArticuloService) { }

  ngOnInit() {
    this.construirFormularioArticulo();
  }

  crear() {
    this.articuloServices.guardar(this.articuloForm.value).subscribe(
      data => {if (data){
        this.success();
        this.articuloForm.reset();
      }},
      error => this.mostrarError(error.error.mensaje)
    );
  }

  private construirFormularioArticulo() {
    this.articuloForm = new FormGroup({
      nombreArticulo: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
                                                             Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
      unidades: new FormControl('',Validators.required),
      precio:new FormControl('',Validators.required)
    });
  }

  success(){
    this.notificacion.fire({
      title: 'Éxito',
      text: 'Se ha creado el artículo',
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
