import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UsuarioService } from './usuario.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Usuario } from '../model/usuario';
import { HttpResponse } from '@angular/common/http';

describe('UsuarioService', () => {
  let httpMock: HttpTestingController;
  let service: UsuarioService;
  const apiEndpointUsuarioConsulta = `${environment.endpoint}/usuarios`;
  const apiEndpointUsuarios = `${environment.endpoint}/usuarios`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuarioService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(UsuarioService);
  });

  it('should be created', () => {
    const usuarioService: UsuarioService = TestBed.inject(UsuarioService);
    expect(usuarioService).toBeTruthy();
  });

  it('deberia listar usuarios', () => {
    const dummyUsuarios = [
      new Usuario(1, 'usuario1', '123', '2020-01-04 00:00:00'), new Usuario(2, 'usuario2', '123ll', '2020-01-04 00:00:00')
    ];
    service.consultar().subscribe(usuarios => {
      expect(usuarios.length).toBe(2);
      expect(usuarios).toEqual(dummyUsuarios);
    });
    const req = httpMock.expectOne(apiEndpointUsuarioConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsuarios);
  });

  it('deberia crear un usuario', () => {
    const dummyUsuarios = new Usuario(1, 'usuario1', '123aaa', '2020-01-04 00:00:00');
    service.guardar(dummyUsuarios).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointUsuarios);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia actualizar un usuario', () => {
    const dummyUsuario = new Usuario(1, 'usuario1', '123aaa', '2020-01-04 00:00:00');
    service.actualizar(1, dummyUsuario).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointUsuarios}/1`);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia eliminar un usuario', () => {
    const dummyUsuarios = new Usuario(1, 'usuario1', '123', '2020-01-05 00:00:00');
    service.eliminar(dummyUsuarios).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointUsuarios}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});
