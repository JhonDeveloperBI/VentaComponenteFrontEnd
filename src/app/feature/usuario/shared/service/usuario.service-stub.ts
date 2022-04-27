import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { Usuario } from "../model/usuario";
import { UsuarioService } from "./usuario.service";

@Injectable()
export class UsuarioServiceStub extends UsuarioService {

    consultar(): Observable<Usuario[]> {
        if (!!this.error) {
            return throwError(this.error);
        }

        return of([{id: 63,
                nombre: 'jhon 2',
                clave: 'jhonaa',
                fechaCreacion: "2022-04-26 15:25:09"
        }]);

    }

    guardar(usuario: Usuario): Observable<Number> {
        if (!!this.error) {
            return throwError(this.error);
        }

        return of(usuario.id);
    }

    eliminar(usuario: Usuario): Observable<Number> {
        if (!!this.error) {
            return throwError(this.error);
        }
        return of(usuario.id);
    }

    actualizar(id: number, usuario: Usuario): Observable<Number> {
        if (!!this.error) {
            return throwError(this.error);
        }
        return of(id+usuario.id);
    }

    error: { error: { nombreExcepcion: string } };

}
