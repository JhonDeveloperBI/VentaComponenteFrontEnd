import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticuloService } from '@articulo/shared/service/articulo.service';
import { IAlertaService } from '@core/services/alerta.service';

const numericNumberReg = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
const inputNombreArticulo = 'nombreArticulo';
const inputPrecio = 'precio';
const inputUnidades = 'unidades';
const idArticulo = 'id';
const mensajeActualizacion = 'Se ha actualizado correctamente el artículo';

@Component({
  selector: 'app-actualizar-articulo',
  templateUrl: './actualizar-articulo.component.html'
})
export class ActualizarArticuloComponent implements OnInit {

  getIdArticulo: any; // NOSONAR
  articulos: any = []; // NOSONAR

  articuloForm: FormGroup;
  constructor(protected articuloService: ArticuloService, private activeRouter: ActivatedRoute, private router: Router,
              protected alert: IAlertaService) {
    this.getIdArticulo = this.activeRouter.snapshot.paramMap.get(idArticulo);
   }

  ngOnInit(): void {
    this.articuloService.consultar().subscribe(
      (data: any) => { // NOSONAR
         this.articulos = data.map(u => u);
         const articuloFilter = this.articulos.filter(u => Number(u.idArticulo) === Number(this.getIdArticulo) )[0];
         this.articuloForm.controls[inputNombreArticulo].setValue(articuloFilter?.nombreArticulo);
         this.articuloForm.controls[inputPrecio].setValue(articuloFilter?.precio);
         this.articuloForm.controls[inputUnidades].setValue(articuloFilter?.unidades);
      }
    );
    this.construirFormularioArticulo();
  }

  private construirFormularioArticulo() {
    this.articuloForm = new FormGroup({
      nombreArticulo: new FormControl('', [Validators.required]),
      unidades: new FormControl('', [ Validators.required, Validators.pattern(numericNumberReg)]),
      precio: new FormControl('', [Validators.required, Validators.pattern(numericNumberReg)])
    });
  }

  actualizarArticulo(){
    this.articuloService.actualizar(this.getIdArticulo, this.articuloForm.value).subscribe(
      data => {if (data){
        this.alert.exito(mensajeActualizacion);
        this.router.navigateByUrl('/articulo/listar');
      }}
    );
  }


}
