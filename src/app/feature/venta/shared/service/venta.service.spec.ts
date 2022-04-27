import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { VentaService } from './venta.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/services/http.service';
import { Venta } from '../model/venta';
import { HttpResponse } from '@angular/common/http';

describe('VentaService', () => {
  let httpMock: HttpTestingController;
  let service: VentaService;
  const apiEndpointVentaConsulta = `${environment.endpoint}/ventas`;
  const apiEndpointVentas = `${environment.endpoint}/ventas`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VentaService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(VentaService);
  });

  it('should be created', () => {
    const ventaService: VentaService = TestBed.inject(VentaService);
    expect(ventaService).toBeTruthy();
  });

  it('deberia listar Ventas', () => {
    const dummyVentas = [
      new Venta(1, 1, 500, 10, 5000, 'sin descuento', '2022-02-01'), new Venta(1, 1, 200, 10, 2000, 'sin descuento', '2022-02-01')
    ];
    service.consultar().subscribe(ventas => {
      expect(ventas.length).toBe(2);
      expect(ventas).toEqual(dummyVentas);
    });
    const req = httpMock.expectOne(apiEndpointVentaConsulta);
    expect(req.request.method).toBe('GET');
    req.flush(dummyVentas);
  });

  it('deberia crear un venta', () => {
    const dummyVenta = new Venta(1, 1, 500, 10, 5000, 'sin descuento', '2022-02-01');
    service.guardar(dummyVenta).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointVentas);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({body: true}));
  });

});
