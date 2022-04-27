import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IAlertaService } from '@core/services/alerta.service';
import { AlertaServiceMock } from '@core/services/alerta.service-mock';
import { HttpService } from '@core/services/http.service';
import { UsuarioService } from '@usuario/shared/service/usuario.service';
import { UsuarioServiceStub } from '@usuario/shared/service/usuario.service-stub';
import { UsuarioComponent } from '../usuario/usuario.component';

import { ActualizarUsuarioComponent } from './actualizar-usuario.component';

describe('ActualizarUsuarioComponent', () => {
  let component: ActualizarUsuarioComponent;
  let fixture: ComponentFixture<ActualizarUsuarioComponent>;
  let alertaSpy: IAlertaService;
  let usuarioService: UsuarioServiceStub;

  afterEach(() => { TestBed.resetTestingModule(); });
  afterAll(() => { TestBed.resetTestingModule(); });

  beforeEach(async () => {
    alertaSpy = {
      informativa: jasmine.createSpy('informativa'),
      confirmacion: null,
      errorInesperado: jasmine.createSpy('error Inesperado'),
      exito: jasmine.createSpy('Se ha actualizado el usuario')
    };

    usuarioService = new UsuarioServiceStub();

    await TestBed.configureTestingModule({
      declarations: [ActualizarUsuarioComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(
          [{ path: 'usuario', component: UsuarioComponent }]
        ),
        ReactiveFormsModule,
        FormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [UsuarioService, HttpService,
        { provide: IAlertaService, useValue: new AlertaServiceMock(alertaSpy) },
        { provide: UsuarioService, useValue: usuarioService }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Deberia mostrar mensaje de exito', () => {

    expect(component.usuarioForm.valid).toBeFalsy();
    component.usuarioForm.controls.id.setValue('1');
    component.usuarioForm.controls.nombre.setValue('usuario actualizado');
    component.usuarioForm.controls.clave.setValue('123_passwor');
    expect(component.usuarioForm.valid).toBeTruthy();
    expect(component.usuarioForm).not.toBeNull();

    expect(component.usuarioForm.valid).toBeTruthy();

    component.actualizar();

    expect(alertaSpy.exito).toHaveBeenCalled();

  });

  it('Deberia mostrar mensaje de error', () => {
    usuarioService.error = { error: { nombreExcepcion: 'error Inesperado' } };

    expect(component.usuarioForm.valid).toBeFalsy();
    component.usuarioForm.controls.id.setValue('1');
    component.usuarioForm.controls.nombre.setValue('usuario actualizado');
    component.usuarioForm.controls.clave.setValue('123_passwor');
    expect(component.usuarioForm.valid).toBeTruthy();
    expect(component.usuarioForm).not.toBeNull();
    expect(component.usuarioForm.valid).toBeTruthy();

    component.actualizar();


    expect(alertaSpy.errorInesperado).toHaveBeenCalled();
  });

  /*
  it('Debe mostrar mensaje de error ', (done) => {
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
