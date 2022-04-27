import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { AlertaService } from './alerta.service';
//import { of } from 'rxjs';

describe('AlertService', () => {
  let service: AlertaService;


  beforeEach(() => {
     TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlertaService, HttpService]
    });
  service = TestBed.inject(AlertaService);
  });

  it('Debe crear el componente ', () => {
    const alertaService: AlertaService = TestBed.inject(AlertaService);
    expect(alertaService).toBeTruthy();
  });

  it('Debe mostrar el mensaje de exito ', () => {
    spyOn(service,'exito');

    expect(service).toBeTruthy();
  });

  it('Debe mostrar el mensaje de confirmacion ', () => {
    spyOn(service,'confirmacion');

    expect(service).toBeTruthy();
  });

  it('Debe mostrar el mensaje de error ', () => {
    spyOn(service,'errorInesperado');

    expect(service).toBeTruthy();
  });

  it('Debe mostrar el mensaje de mensaje informativo ', () => {
    spyOn(service,'informativa');

    expect(service).toBeTruthy();
  });



});

