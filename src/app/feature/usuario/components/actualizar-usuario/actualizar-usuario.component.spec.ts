import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { UsuarioService } from '@usuario/shared/service/usuario.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

import { ActualizarUsuarioComponent } from './actualizar-usuario.component';

describe('ActualizarUsuarioComponent', () => {
  let component: ActualizarUsuarioComponent;
  let fixture: ComponentFixture<ActualizarUsuarioComponent>;
  let usuarioService : UsuarioService;

  afterEach(() => { TestBed.resetTestingModule(); });
  afterAll(() => { TestBed.resetTestingModule(); });

  beforeEach(async () => {
    await TestBed.configureTestingModule({

        declarations: [ ActualizarUsuarioComponent ],
        imports: [
          CommonModule,
          HttpClientModule,
          RouterTestingModule,
          ReactiveFormsModule,
          FormsModule
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
        providers: [UsuarioService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarUsuarioComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService);
    spyOn(usuarioService, 'actualizar').and.returnValue(
      of(true)
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


it('actualizando usuario', () => {
  expect(component.usuarioForm.valid).toBeFalsy();
    component.usuarioForm.controls.id.setValue('1');
    component.usuarioForm.controls.nombre.setValue('usuario actualizado');
    component.usuarioForm.controls.clave.setValue('123_passwor');
    expect(component.usuarioForm.valid).toBeTruthy();
    expect(component.usuarioForm).not.toBeNull();

    expect(component.usuarioForm.valid).toBeTruthy();

    component.actualizar();

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