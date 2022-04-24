import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ArticuloService } from './articulo.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Articulo } from '../model/articulo';
import { HttpResponse } from '@angular/common/http';

describe('ArticuloService', () => {
  let httpMock: HttpTestingController;
  let service: ArticuloService;
  const apiEndpointArticulosConsulta = `${environment.endpoint}/articulos`;
  const apiEndpointArticulos = `${environment.endpoint}/articulos`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticuloService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ArticuloService);
  });

  it('should be created', () => {
    const articuloService: ArticuloService = TestBed.inject(ArticuloService);
    expect(articuloService).toBeTruthy();
  });

  it('deberia listar articulos', () => {
    const dummyArticulos = [
      new Articulo(1, 'Producto 1',10,1000), new Articulo(2, 'Producto 2',11,2000)
    ];
    service.consultar().subscribe(articulos => {
      expect(articulos.length).toBe(2);
      expect(articulos).toEqual(dummyArticulos);
    });
    const req = httpMock.expectOne(apiEndpointArticulosConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyArticulos);
  });

  it('deberia crear un articulo', () => {
    const dummyArticulo = new Articulo(1, 'Producto 1',10,1000);
    service.guardar(dummyArticulo).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointArticulos);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia eliminar un articulo', () => {
    const dummyArticulo = new Articulo(1, 'Producto 1',100,2000);
    service.eliminar(dummyArticulo).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointArticulos}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});
