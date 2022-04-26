import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CrearVentaComponent } from './crear-venta.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { VentaService } from '@venta/shared/service/venta.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsuarioService } from '@usuario/shared/service/usuario.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Usuario } from '@usuario/shared/model/usuario';
import Swal from 'sweetalert2';

describe('CrearVentaComponent', () => {
  let component: CrearVentaComponent;
  let fixture: ComponentFixture<CrearVentaComponent>;
  let ventaService: VentaService;
  let usuarioService: UsuarioService;
  let usuarios: any[];

  afterEach(() => { TestBed.resetTestingModule(); });
  afterAll(() => { TestBed.resetTestingModule(); });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CrearVentaComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [VentaService, UsuarioService, HttpService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearVentaComponent);
    component = fixture.componentInstance;
    ventaService = TestBed.inject(VentaService);

    usuarios = [new Usuario(1, 'test', '2022-01-02 00:00:00', '1234_pass')];
    usuarioService = TestBed.inject(UsuarioService);
    spyOn(usuarioService, 'consultar').and.returnValue(
      of(usuarios)
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Registrando venta', () => {
    spyOn(ventaService, 'guardar').and.returnValue(
      of(true)
    );

    expect(component.ventaForm.valid).toBeFalsy();
    component.ventaForm.controls.idArticulo.setValue(1);
    component.ventaForm.controls.idUsuario.setValue(1);
    component.ventaForm.controls.nombreUsuario.setValue('usuario nombre');
    component.ventaForm.controls.unidadVenta.setValue(3);
    expect(component.ventaForm.valid).toBeTruthy();

    component.crear();

  });

  it('Debe mostrar el formulario invalido', () => {
    expect(component.ventaForm.valid).toBeFalsy();
    component.ventaForm.controls.idArticulo.setValue(1);
    component.ventaForm.controls.idUsuario.setValue(null);
    component.ventaForm.controls.nombreUsuario.setValue(null);
    component.ventaForm.controls.unidadVenta.setValue(3);
    expect(component.ventaForm.valid).toBeFalse();

  });

  it('Registrando venta mensaje error', () => {

    spyOn(ventaService, 'guardar').and.returnValue(
      of(null)
    );

    spyOn(component, 'mostrarError');
    component.mostrarError('error');

    expect(component.ventaForm.valid).toBeFalsy();
    component.ventaForm.controls.idArticulo.setValue(1);
    component.ventaForm.controls.idUsuario.setValue(1);
    component.ventaForm.controls.nombreUsuario.setValue('usuario nombre');
    component.ventaForm.controls.unidadVenta.setValue(3);
    expect(component.ventaForm.valid).toBeTruthy();

    component.crear();
  });


  it('Debe mostrar mensaje de error ', (done) => {
    component.mostrarError('error');
    setTimeout(() => {
      expect(Swal.getTitle().textContent).toEqual('Error');
      Swal.clickConfirm();
      done();
    });
  });
});
