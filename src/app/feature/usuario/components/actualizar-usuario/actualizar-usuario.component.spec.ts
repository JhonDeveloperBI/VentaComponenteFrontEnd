import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IAlertaService } from '@core/services/alerta.service';
import { AlertaServiceMock } from '@core/services/alerta.service-mock';
import { HttpService } from '@core/services/http.service';
import { Usuario } from '@usuario/shared/model/usuario';
import { UsuarioService } from '@usuario/shared/service/usuario.service';
import { of } from 'rxjs';
import { UsuarioComponent } from '../usuario/usuario.component';

import { ActualizarUsuarioComponent } from './actualizar-usuario.component';

describe('ActualizarUsuarioComponent', () => {
  let component: ActualizarUsuarioComponent;
  let fixture: ComponentFixture<ActualizarUsuarioComponent>;
  let usuarioService: UsuarioService;
  let alertaSpy: IAlertaService;
  const listaUsuarios: Usuario[] = [new Usuario(1, 'test 1', '2022-04-05', '1222'), new Usuario(2, 'test 2', '2022-04-05', '12a22')];
  const id = 'id';
  const inputNombre = 'nombre';
  const inputClave = 'clave';


  afterEach(() => { TestBed.resetTestingModule(); });
  afterAll(() => { TestBed.resetTestingModule(); });

  beforeEach(async () => {
    alertaSpy = {
      informativa: jasmine.createSpy('informativa'),
      confirmacion: null,
      errorInesperado: jasmine.createSpy('error Inesperado'),
      exito: jasmine.createSpy('Se ha actualizado el usuario')
    };
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
        { provide: IAlertaService, useValue: new AlertaServiceMock(alertaSpy) }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarUsuarioComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService);
    spyOn(usuarioService, 'actualizar').and.returnValue(
      of(1)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Debe consultar informacion del usuario', () => {
    spyOn(usuarioService, 'consultar').and.returnValue(
      of( listaUsuarios )
    );
    component.getIdUsuario = 1;
    component.ngOnInit();

    component.usuarioForm.controls[id].setValue(1);
    component.usuarioForm.controls[inputNombre].setValue('test 1');
    component.usuarioForm.controls[inputClave].setValue('1222');

    expect(component.usuarioForm.valid).toBe(true);
  });

  it('Debe mostrar el formulario invalido', () => {
    spyOn(usuarioService, 'consultar').and.returnValue(
      of( listaUsuarios )
    );
    component.getIdUsuario = 10;
    component.ngOnInit();

    component.usuarioForm.controls[id].setValue('');
    component.usuarioForm.controls[inputNombre].setValue('');
    component.usuarioForm.controls[inputClave].setValue('');

    expect(component.usuarioForm.invalid).toBe(true);
  });

  it('Deberia actualizar un usuario', () => {

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


});
