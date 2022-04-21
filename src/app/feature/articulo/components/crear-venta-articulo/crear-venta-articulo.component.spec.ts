import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CrearVentaArticuloComponent } from './crear-venta-articulo.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { VentaService } from '@venta/shared/service/venta.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsuarioService } from '@usuario/shared/service/usuario.service';
import {  CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA } from '@angular/core';

describe('CrearVentaArticuloComponent', () => {
  let component: CrearVentaArticuloComponent;
  let fixture: ComponentFixture<CrearVentaArticuloComponent>;
  let ventaService: VentaService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearVentaArticuloComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
      providers: [VentaService,UsuarioService, HttpService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearVentaArticuloComponent);
    component = fixture.componentInstance;
    ventaService = TestBed.inject(VentaService);
    spyOn(ventaService, 'guardar').and.returnValue(
      of(true)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Registrando venta', () => {
    expect(component.ventaForm.valid).toBeFalsy();
    component.ventaForm.controls.idArticulo.setValue(1);
    component.ventaForm.controls.idUsuario.setValue(1);
    component.ventaForm.controls.nombreUsuario.setValue("usuario nombre");
    component.ventaForm.controls.unidadVenta.setValue(3);
    expect(component.ventaForm.valid).toBeTruthy();

    component.crear();

  });
});