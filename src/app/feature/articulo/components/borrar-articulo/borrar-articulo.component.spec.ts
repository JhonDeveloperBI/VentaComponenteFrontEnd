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

describe('BorrarArticuloComponent', () => {
  let component: BorrarArticuloComponent;
  let fixture: ComponentFixture<BorrarArticuloComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarArticuloComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
