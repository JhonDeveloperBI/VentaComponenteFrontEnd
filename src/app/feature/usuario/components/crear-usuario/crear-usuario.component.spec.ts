import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CrearUsuarioComponent } from './crear-usuario.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UsuarioService } from '../../shared/service/usuario.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IAlertaService } from '@core/services/alerta.service';
import { AlertaServiceMock } from '@core/services/alerta.service-mock';

describe('CrearUsuarioComponent', () => {
  let component: CrearUsuarioComponent;
  let fixture: ComponentFixture<CrearUsuarioComponent>;
  let usuarioService: UsuarioService;
  let alertaSpy: IAlertaService;

  afterEach(() => { TestBed.resetTestingModule(); });
  afterAll(() => { TestBed.resetTestingModule(); });

  beforeEach(waitForAsync(() => {
    alertaSpy = {
      informativa: jasmine.createSpy('informativa'),
      confirmacion: null,
      errorInesperado: jasmine.createSpy('errorInesperado'),
      exito: jasmine.createSpy('Se ha creado el usuario')
    };
    TestBed.configureTestingModule({
      declarations: [ CrearUsuarioComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [UsuarioService, HttpService,
        { provide: IAlertaService, useValue: new AlertaServiceMock(alertaSpy) }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearUsuarioComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService);
    spyOn(usuarioService, 'guardar').and.returnValue(
      of(true)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.usuarioForm.valid).toBeFalsy();
  });

  it('Registrando usuario', () => {
    expect(component.usuarioForm.valid).toBeFalsy();
    component.usuarioForm.controls.nombre.setValue('usuario 1');
    component.usuarioForm.controls.clave.setValue('123_passwor');
    expect(component.usuarioForm.valid).toBeTruthy();
    expect(component.usuarioForm).not.toBeNull();

    component.crear();
    expect(alertaSpy.exito).toHaveBeenCalled();
  });

});
