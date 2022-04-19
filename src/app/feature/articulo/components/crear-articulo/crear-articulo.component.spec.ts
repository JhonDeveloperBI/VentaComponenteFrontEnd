import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CrearArticuloComponent } from './crear-articulo.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ArticuloService } from '../../shared/service/articulo.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('CrearArticuloComponent', () => {
  let component: CrearArticuloComponent;
  let fixture: ComponentFixture<CrearArticuloComponent>;
  let articuloService: ArticuloService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearArticuloComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [ArticuloService, HttpService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearArticuloComponent);
    component = fixture.componentInstance;
    articuloService = TestBed.inject(ArticuloService);
    spyOn(articuloService, 'guardar').and.returnValue(
      of(true)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formulario es invalido cuando esta vacio', () => {
    expect(component.articuloForm.valid).toBeFalsy();
  });

  it('Registrando componente electronico', () => {
    expect(component.articuloForm.valid).toBeFalsy();
    component.articuloForm.controls.id.setValue('001');
    component.articuloForm.controls.descripcion.setValue('Componente test');
    expect(component.articuloForm.valid).toBeTruthy();

    component.crear();

    // Aca validamos el resultado esperado al enviar la petición
    // TODO adicionar expect
  });
});
