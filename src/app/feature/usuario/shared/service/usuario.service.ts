import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';

export abstract class UsuarioService {
  abstract consultar(): Observable<Usuario[]>;
  abstract guardar(usuario: Usuario): Observable<Number>;
  abstract eliminar(usuario: Usuario): Observable<Number>;
  abstract actualizar(id: number, usuario: Usuario): Observable<Number>;
}

@Injectable()
export class UsuarioServiceImpl extends UsuarioService {

  constructor(private http: HttpService) {
    super();
}

  public consultar(): Observable<Usuario[]> {
    return this.http.doGet<Usuario[]>(`${environment.endpoint}/usuarios`, this.http.optsName('consultar usuarios'));
  }

  public guardar(usuario: Usuario): Observable<Number> {
    return this.http.doPost<Usuario, Number>(`${environment.endpoint}/usuarios`, usuario,
                                                this.http.optsName('crear/actualizar usuarios'));
  }

  public eliminar(usuario: Usuario): Observable<Number> {
    return this.http.doDelete<number>(`${environment.endpoint}/usuarios/${usuario.id}`,
                                                 this.http.optsName('eliminar usuario'));
  }

  public actualizar(id: number, usuario: Usuario): Observable<Number>{
    return this.http.doUpdate<Usuario,Number>(`${environment.endpoint}/usuarios/${id}`, usuario,
                                                  this.http.optsName('actualizar usuario'));
  }
}
