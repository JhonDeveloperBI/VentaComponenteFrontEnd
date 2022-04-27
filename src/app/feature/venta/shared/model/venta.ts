export class Venta {

    idArticulo: number;
    idUsuario: number;
    unidadVenta: number;
    precioUnidad: number;
    totalVenta: number;
    detalleVentaArticulo: string;
    fechaVentaArticulo: string;


    constructor(idArticulo: number, idUsuario: number, unidadVenta: number, precioUnidad: number,
                totalVenta: number, detalleVentaArticulo: string, fechaVentaArticulo: string) {
        this.idArticulo = idArticulo;
        this.idUsuario = idUsuario;
        this.unidadVenta = unidadVenta;
        this.precioUnidad = precioUnidad;
        this.totalVenta = totalVenta;
        this.detalleVentaArticulo = detalleVentaArticulo;
        this.fechaVentaArticulo = fechaVentaArticulo;

    }
}
