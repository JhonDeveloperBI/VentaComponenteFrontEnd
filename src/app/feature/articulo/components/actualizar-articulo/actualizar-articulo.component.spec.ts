import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ArticuloService } from '@articulo/shared/service/articulo.service';
import { HttpService } from '@core/services/http.service';

import { ActualizarArticuloComponent } from './actualizar-articulo.component';

describe('ActualizarArticuloComponent', () => {
  let component: ActualizarArticuloComponent;
  let fixture: ComponentFixture<ActualizarArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

        declarations: [ ActualizarArticuloComponent ],
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
