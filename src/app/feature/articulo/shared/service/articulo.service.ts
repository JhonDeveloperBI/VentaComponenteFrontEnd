import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Articulo } from '../model/articulo';


@Injectable()
export class ArticuloService {

  constructor(protected http: HttpService) {}

  public consultar() {
    return this.http.doGet<Articulo[]>(`${environment.endpoint}/articulos`, this.http.optsName('consultar articulos'));
  }

  public guardar(articulo: Articulo) {
    return this.http.doPost<Articulo, boolean>(`${environment.endpoint}/articulos`, articulo,
                                                this.http.optsName('crear articulo'));
  }

  public eliminar(articulo: Articulo) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/articulos/${articulo.idArticulo}`,
                                                 this.http.optsName('eliminar articulo'));
  }

  public actualizar(id: number, articulo: Articulo){
    return this.http.doUpdate(`${environment.endpoint}/articulos/${id}`, articulo,
                                                  this.http.optsName('actualizar articulo'));
  }
}
