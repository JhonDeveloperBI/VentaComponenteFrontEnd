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
    const productService: ArticuloService = TestBed.inject(ArticuloService);
    expect(productService).toBeTruthy();
  });

  it('deberia listar productos', () => {
    const dummyProductos = [
      new Articulo('1', 'Producto 1'), new Articulo('2', 'Producto 2')
    ];
    service.consultar().subscribe(productos => {
      expect(productos.length).toBe(2);
      expect(productos).toEqual(dummyProductos);
    });
    const req = httpMock.expectOne(apiEndpointArticulosConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProductos);
  });

  it('deberia crear un producto', () => {
    const dummyProducto = new Articulo('1', 'Producto 1');
    service.guardar(dummyProducto).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointArticulos);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

  it('deberia eliminar un producto', () => {
    const dummyProducto = new Articulo('1', 'Producto 1');
    service.eliminar(dummyProducto).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointArticulos}/1`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({body: true}));
  });
});
