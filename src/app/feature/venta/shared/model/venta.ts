export class Venta {

    idProducto: number;
    idUsuario: number;
    unidadVenta: number;


    constructor(idProducto: number, idUsuario: number, unidadVenta: number) {
        this.idProducto = idProducto;
        this.idUsuario = idUsuario;
        this.unidadVenta = unidadVenta;
    }
}