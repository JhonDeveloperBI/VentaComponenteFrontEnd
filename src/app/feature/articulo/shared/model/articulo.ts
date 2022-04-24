export class Articulo {

    idArticulo: number;
    nombreArticulo: string;
    unidades: number;
    precio: number;

    constructor(idArticulo: number, nombreArticulo: string, unidades: number, precio: number) {
        this.idArticulo = idArticulo;
        this.nombreArticulo = nombreArticulo;
        this.unidades = unidades;
        this.precio = precio;
    }
}
