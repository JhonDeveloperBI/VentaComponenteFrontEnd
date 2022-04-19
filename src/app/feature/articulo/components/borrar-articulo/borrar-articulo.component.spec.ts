import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  RouterTestingModule
} from '@angular/router/testing';
import { BorrarArticuloComponent } from './borrar-articulo.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

describe('BorrarArticuloComponent', () => {
  let component: BorrarArticuloComponent;
  let fixture: ComponentFixture<BorrarArticuloComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarArticuloComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
