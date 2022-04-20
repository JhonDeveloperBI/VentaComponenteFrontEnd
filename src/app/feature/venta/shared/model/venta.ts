export class Venta {

    idArticulo: number;
    idUsuario: number;
    unidadVenta: number;


    constructor(idArticulo: number, idUsuario: number, unidadVenta: number) {
        this.idArticulo = idArticulo;
        this.idUsuario = idUsuario;
        this.unidadVenta = unidadVenta;
    }
}