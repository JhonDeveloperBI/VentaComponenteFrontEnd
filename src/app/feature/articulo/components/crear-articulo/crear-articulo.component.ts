import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../shared/service/articulo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IAlertaService } from '@core/services/alerta.service';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 20;
const numericNumberReg= '^-?[0-9]\\d*(\\.\\d{1,2})?$';

@Component({
  selector: 'app-crear-articulo',
  templateUrl: './crear-articulo.component.html'
})
export class CrearArticuloComponent implements OnInit {
  articuloForm: FormGroup;

  constructor(protected articuloServices: ArticuloService, private alerta: IAlertaService ) { }

  ngOnInit() {
    this.construirFormularioArticulo();
  }

  crear() {
    /*
    this.articuloServices.guardar(this.articuloForm.value).subscribe(
      data => {if (data){
        this.success();
        this.articuloForm.reset();
      }},
      error => this.mostrarError(error.error.mensaje)
    );
    */
    this.articuloServices.guardar(this.articuloForm.value).subscribe(
      data => {if (data){
        this.alerta.exito("Se ha creado el artículo");
        this.articuloForm.reset();
      }}
    );

  }

  private construirFormularioArticulo() {
    this.articuloForm = new FormGroup({
      nombreArticulo: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
                                                             Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
      unidades: new FormControl('',[ Validators.required, Validators.pattern(numericNumberReg)]),
      precio: new FormControl('', [Validators.required, Validators.pattern(numericNumberReg)])
    });
  }

}
