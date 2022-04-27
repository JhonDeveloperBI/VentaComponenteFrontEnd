import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListarArticuloComponent } from './listar-articulo.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ArticuloService } from '../../shared/service/articulo.service';
import { Articulo } from '../../shared/model/articulo';
import { HttpService } from 'src/app/core/services/http.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ListarArticuloComponent', () => {
  let component: ListarArticuloComponent;
  let fixture: ComponentFixture<ListarArticuloComponent>;
  let articuloService: ArticuloService;
  const listaArticulos: Articulo[] = [new Articulo(1, 'Producto 1', 2, 1000), new Articulo(2, 'Producto 2', 10, 1000)];

  afterEach(() => { TestBed.resetTestingModule(); });
  afterAll(() => { TestBed.resetTestingModule(); });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListarArticuloComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [ArticuloService, HttpService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarArticuloComponent);
    component = fixture.componentInstance;
    articuloService = TestBed.inject(ArticuloService);
    spyOn(articuloService, 'consultar').and.returnValue(
      of(listaArticulos)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.listaArticulos.subscribe(resultado => {
      expect(2).toBe(resultado.length);
  });
});

});
