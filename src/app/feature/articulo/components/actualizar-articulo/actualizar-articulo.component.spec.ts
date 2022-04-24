import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ArticuloService } from '@articulo/shared/service/articulo.service';
import { HttpService } from '@core/services/http.service';
import Swal from 'sweetalert2';
import { of } from 'rxjs';

import { ActualizarArticuloComponent } from './actualizar-articulo.component';

describe('ActualizarArticuloComponent', () => {
  let component: ActualizarArticuloComponent;
  let fixture: ComponentFixture<ActualizarArticuloComponent>;
  let articuloService: ArticuloService;

  afterEach(() => { TestBed.resetTestingModule(); });
  afterAll(() => { TestBed.resetTestingModule(); });

  beforeEach(async () => {
    await TestBed.configureTestingModule({

        declarations: [ ActualizarArticuloComponent ],
        imports: [
          CommonModule,
          HttpClientModule,
          RouterTestingModule,
          ReactiveFormsModule,
          FormsModule
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
        providers: [ArticuloService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarArticuloComponent);
    component = fixture.componentInstance;
    articuloService = TestBed.inject(ArticuloService);
    spyOn(articuloService, 'actualizar').and.returnValue(
      of(true)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('actualizando componente electronico', () => {
    expect(component.articuloForm.valid).toBeFalsy();
    component.articuloForm.controls.nombreArticulo.setValue('Componente actualizado');
    component.articuloForm.controls.unidades.setValue(10);
    component.articuloForm.controls.precio.setValue(1000);
    
    expect(component.articuloForm.valid).toBeTruthy();

    component.actualizarArticulo();

  });

  it('Debe mostrar mensaje de error ', (done) => {
    component.mostrarError("error");
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


});
