export class Usuario {
    id: number;
    nombre: string;
    clave: string;
    fechaCreacion: string;

    constructor(id: number, nombre: string, fechaCreacion: string, clave: string) {
        this.id = id;
        this.nombre = nombre;
        this.fechaCreacion = fechaCreacion;
        this.clave = clave;
    }

}