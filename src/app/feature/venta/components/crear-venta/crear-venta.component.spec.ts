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

import { IAlertaService } from '@core/services/alerta.service';
import { AlertaServiceMock } from '@core/services/alerta.service-mock';

describe('CrearVentaComponent', () => {
  let component: CrearVentaComponent;
  let fixture: ComponentFixture<CrearVentaComponent>;
  let ventaService: VentaService;
  let usuarioService: UsuarioService;
  let usuarios: any[];
  let alertaSpy: IAlertaService;

  afterEach(() => { TestBed.resetTestingModule(); });
  afterAll(() => { TestBed.resetTestingModule(); });

  beforeEach(waitForAsync(() => {
    alertaSpy = {
      informativa: jasmine.createSpy('informativa'),
      confirmacion: null,
      errorInesperado: jasmine.createSpy('errorInesperado'),
      exito: jasmine.createSpy('Se ha creado una venta')
    };
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
      providers: [VentaService, UsuarioService, HttpService,
        { provide: IAlertaService, useValue: new AlertaServiceMock(alertaSpy) }],
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


  it('Debe mostrar el formulario invalido', () => {
    expect(component.ventaForm.valid).toBeFalsy();
    component.ventaForm.controls.idArticulo.setValue(1);
    component.ventaForm.controls.idUsuario.setValue(null);
    component.ventaForm.controls.nombreUsuario.setValue(null);
    component.ventaForm.controls.unidadVenta.setValue(3);
    expect(component.ventaForm.valid).toBeFalse();

  });

  it('Debe mostrar el formulario valido', () => {
    component.getIdArticulo = 2;
    component.ngOnInit();

    component.ventaForm.controls['idUsuario'].setValue(1);
    component.ventaForm.controls['nombreUsuario'].setValue('test 1');
    component.ventaForm.controls['unidadVenta'].setValue(10);


    expect(component.ventaForm.valid).toBe(true);
  });

  it('Debe mostrar el formulario invalido', () => {
    component.ventaForm.controls['idUsuario'].setValue('');
    component.ventaForm.controls['nombreUsuario'].setValue('');
    component.ventaForm.controls['unidadVenta'].setValue('');
    component.ventaForm.controls['idArticulo'].setValue('');

    component.ngOnInit();
    expect(component.ventaForm.valid).toBe(false);

  });

  it('Debe registrar una venta', () => {
    spyOn(ventaService, 'guardar').and.returnValue(
      of(true)
    );

    expect(component.ventaForm.valid).toBeFalsy();
    component.ventaForm.controls.idArticulo.setValue(1);
    component.ventaForm.controls.idUsuario.setValue(1);
    component.ventaForm.controls.nombreUsuario.setValue('usuario');
    component.ventaForm.controls.unidadVenta.setValue(3);
    expect(component.ventaForm.valid).toBeTruthy();

    component.crear();

    expect(alertaSpy.exito).toHaveBeenCalled();

  });

});
