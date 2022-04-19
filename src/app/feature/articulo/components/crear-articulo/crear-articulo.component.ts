import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../shared/service/articulo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 20;

@Component({
  selector: 'app-crear-articulo',
  templateUrl: './crear-articulo.component.html',
  styleUrls: ['./crear-articulo.component.css']
})
export class CrearArticuloComponent implements OnInit {
  articuloForm: FormGroup;
  constructor(protected articuloServices: ArticuloService) { }

  ngOnInit() {
    this.construirFormularioArticulo();
  }

  crear() {
    this.articuloServices.guardar(this.articuloForm.value);
  }

  private construirFormularioArticulo() {
    this.articuloForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
                                                             Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)])
    });
  }

}
