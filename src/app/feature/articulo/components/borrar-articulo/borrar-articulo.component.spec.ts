import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  RouterTestingModule
} from '@angular/router/testing';
import { BorrarArticuloComponent } from './borrar-articulo.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '@core/services/http.service';
import { ArticuloService } from '@articulo/shared/service/articulo.service';
import {  CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA } from '@angular/core';
import { Articulo } from '@articulo/shared/model/articulo';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticuloComponent } from '../articulo/articulo.component';
import { IAlertaService } from '@core/services/alerta.service';
import { AlertaServiceMock } from '@core/services/alerta.service-mock';
import { of } from 'rxjs';

describe('BorrarArticuloComponent', () => {

  let component: BorrarArticuloComponent;
  let fixture: ComponentFixture<BorrarArticuloComponent>;
  let articuloService: ArticuloService;
  let alertaSpy: IAlertaService;

  afterEach(() => { TestBed.resetTestingModule(); });
  afterAll(() => { TestBed.resetTestingModule(); });

  beforeEach(waitForAsync(() => {
    alertaSpy = {
      informativa: jasmine.createSpy('informativa'),
      confirmacion: jasmine.createSpy('Esta seguro de eliminar este artículo?'),
      errorInesperado: jasmine.createSpy('errorInesperado'),
      exito: jasmine.createSpy('Se ha actualizado correctamente el artículo')
    };
    TestBed.configureTestingModule({
      declarations: [ BorrarArticuloComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(
          [{path: 'articulo', component: ArticuloComponent}]
        ),
        ReactiveFormsModule,
        FormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [ArticuloService, HttpService,
        { provide: IAlertaService, useValue: new AlertaServiceMock(alertaSpy)} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarArticuloComponent);
    component = fixture.componentInstance;
    component.articulo = new Articulo(1 , 'articulo test', 10, 1000);
    articuloService = TestBed.inject(ArticuloService);
    spyOn(articuloService, 'eliminar').and.returnValue(
      of( true )
     );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe borrar un articulo ', () => {
    component.borrarArticulo();
    expect(alertaSpy.confirmacion).toHaveBeenCalled();
  });

});

