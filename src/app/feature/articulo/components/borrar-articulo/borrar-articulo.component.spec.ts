import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  RouterTestingModule
} from '@angular/router/testing';
import { BorrarArticuloComponent } from './borrar-articulo.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '@core/services/http.service';
import { ArticuloService } from '@articulo/shared/service/articulo.service';
import {  CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA } from '@angular/core';
import { Articulo } from '@articulo/shared/model/articulo';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { of } from 'rxjs';
import { ArticuloComponent } from '../articulo/articulo.component';

describe('BorrarArticuloComponent', () => {
  let component: BorrarArticuloComponent;
  let fixture: ComponentFixture<BorrarArticuloComponent>;
  let articuloService:ArticuloService;

  afterEach(() => { TestBed.resetTestingModule(); });
  afterAll(() => { TestBed.resetTestingModule(); });

  beforeEach(waitForAsync(() => {
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
      providers: [ArticuloService, HttpService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarArticuloComponent);
    component = fixture.componentInstance;
    component.articulo = new Articulo(1," articulo test",10,1000);
    articuloService = TestBed.inject(ArticuloService);
    spyOn(articuloService, 'eliminar').and.returnValue(
     of( true )
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe borrar un articulo', (done) => {

    component.borrarArticulo();

    component.success();

    setTimeout(() => {
      expect(Swal.getTitle().textContent).toEqual('Esta seguro de eliminar este artículo?');
      Swal.clickConfirm();
      done();
    });

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
    component.mostrarMensaje("se ha eliminado el articulo");
    setTimeout(() => {
      expect(Swal.getTitle().textContent).toEqual('Éxito');
      Swal.clickConfirm();
      done();
    });
  });
  

});
