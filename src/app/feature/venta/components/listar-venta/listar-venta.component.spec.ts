import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ListarVentaComponent } from './listar-venta.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { VentaService } from '../../shared/service/venta.service';
import { Venta } from '../../shared/model/venta';
import { HttpService } from 'src/app/core/services/http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ListarVentaComponent', () => {
  let component: ListarVentaComponent;
  let fixture: ComponentFixture<ListarVentaComponent>;
  let ventaService: VentaService;
  const listaVentas: Venta[] = [new Venta(1, 1, 500, 10, 5000, 'sin descuento', '2022-02-01'),
  new Venta(1, 1, 500, 10, 5000, 'sin descuento', '2022-02-01')];

  afterEach(() => { TestBed.resetTestingModule(); });
  afterAll(() => { TestBed.resetTestingModule(); });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListarVentaComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [VentaService, HttpService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarVentaComponent);
    component = fixture.componentInstance;
    ventaService = TestBed.inject(VentaService);
    spyOn(ventaService, 'consultar').and.returnValue(
      of(listaVentas)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.listaVentas.subscribe(resultado => {
      expect(2).toBe(resultado.length);
  });
});
});

