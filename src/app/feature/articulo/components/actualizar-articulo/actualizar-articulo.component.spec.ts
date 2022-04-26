import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ArticuloService } from '@articulo/shared/service/articulo.service';
import { HttpService } from '@core/services/http.service';
//import Swal from 'sweetalert2';
import { of } from 'rxjs';

import { ActualizarArticuloComponent } from './actualizar-articulo.component';
import { ListarArticuloComponent } from '../listar-articulo/listar-articulo.component';
import { Articulo } from '@articulo/shared/model/articulo';

describe('ActualizarArticuloComponent', () => {
  let component: ActualizarArticuloComponent;
  let fixture: ComponentFixture<ActualizarArticuloComponent>;
  let articuloService: ArticuloService;
  const listaArticulos: Articulo[] = [new Articulo(1, 'Producto 1', 2, 1000), new Articulo(2, 'Producto 2', 10, 1000)];


  afterEach(() => { TestBed.resetTestingModule(); });
  afterAll(() => { TestBed.resetTestingModule(); });

  beforeEach(async () => {
    await TestBed.configureTestingModule({

        declarations: [ ActualizarArticuloComponent ],
        imports: [
          CommonModule,
          HttpClientModule,
          RouterTestingModule.withRoutes(
            [{path: 'articulo/listar', component: ListarArticuloComponent}]
          ),
          ReactiveFormsModule,
          FormsModule
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        providers: [ArticuloService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarArticuloComponent);
    component = fixture.componentInstance;
    articuloService = TestBed.inject(ArticuloService);

    fixture.detectChanges();
  });

  it('Debe crear un componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe consultar informacion del articulo', () => {
    spyOn(articuloService, 'consultar').and.returnValue(
      of( listaArticulos )
    );
    component.getIdArticulo = 1;
    component.ngOnInit();

    expect(component.articuloForm.valid).toBeFalse();
  });

  it('Debe actualizar componente electronico', () => {
    spyOn(articuloService, 'actualizar').and.returnValue(
      of(true)
    );

    expect(component.articuloForm.valid).toBeFalsy();
    component.articuloForm.controls.nombreArticulo.setValue('Componente actualizado');
    component.articuloForm.controls.unidades.setValue(10);
    component.articuloForm.controls.precio.setValue(1000);

    expect(component.articuloForm.valid).toBeTruthy();

    component.actualizarArticulo();

  });
/*
  it('Debe mostrar mensaje de exito cuando se este actualizando', (done) => {

    spyOn(articuloService, 'actualizar').and.callThrough();

    component.actualizarArticulo();

    setTimeout(() => {
      expect(Swal.getTitle().textContent).toEqual('Éxito');
      Swal.clickConfirm();
      done();
    });

  });

  it('Debe mostrar mensaje de error', (done) => {
    component.mostrarError('error');
    setTimeout(() => {
      expect(Swal.getTitle().textContent).toEqual('Error');
      Swal.clickConfirm();
      done();
    });
  });

  it('Debe mostrar mensaje de exito ', (done) => {
    component.success();
    setTimeout(() => {
      expect(Swal.getTitle().textContent).toEqual('Éxito');
      Swal.clickConfirm();
      done();
    });
  });
*/
});
