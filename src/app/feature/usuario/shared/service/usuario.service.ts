import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';


@Injectable()
export class UsuarioService {

  constructor(protected http: HttpService) {}

  public consultar() {
    return this.http.doGet<Usuario[]>(`${environment.endpoint}/usuarios`, this.http.optsName('consultar usuarios'));
  }

  public guardar(usuario: Usuario) {
    return this.http.doPost<Usuario, boolean>(`${environment.endpoint}/usuarios`, usuario,
                                                this.http.optsName('crear/actualizar usuarios'));
  }

  public eliminar(usuario: Usuario) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/usuarios/${usuario.id}`,
                                                 this.http.optsName('eliminar usuario'));
  }

  public actualizar(id:number, usuario:Usuario){
    return this.http.doUpdate(`${environment.endpoint}/usuarios/${id}`,usuario,
                                                  this.http.optsName('actualizar usuario'));
  }
}