import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListarUsuarioComponent } from './listar-usuario.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UsuarioService } from '../../shared/service/usuario.service';
import { Usuario } from '../../shared/model/usuario';
import { HttpService } from 'src/app/core/services/http.service';
import {  CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA } from '@angular/core';

describe('ListarUsuarioComponent', () => {
  let component: ListarUsuarioComponent;
  let fixture: ComponentFixture<ListarUsuarioComponent>;
  let usuarioService: UsuarioService;
  const listaUsuarios: Usuario[] = [new Usuario(1, 'usuario 1', '123','2022-04-2017 00:00:00'), new Usuario(2, 'usuario 2', '2223ca','2020-02-09 00:00:00')];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListarUsuarioComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
      providers: [UsuarioService, HttpService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarUsuarioComponent);
    component = fixture.componentInstance;
    usuarioService = TestBed.inject(UsuarioService);
    spyOn(usuarioService, 'consultar').and.returnValue(
      of(listaUsuarios)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.listarUsuarios.subscribe(resultado => {
      expect(2).toBe(resultado.length);
  });
});

});