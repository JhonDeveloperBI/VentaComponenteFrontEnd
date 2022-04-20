import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  RouterTestingModule
} from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BorrarUsuarioComponent } from './borrar-usuario.component';
import { UsuarioService } from '../../shared/service/usuario.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('BorrarUsuarioComponent', () => {
  let component: BorrarUsuarioComponent;
  let fixture: ComponentFixture<BorrarUsuarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarUsuarioComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [UsuarioService, HttpService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});