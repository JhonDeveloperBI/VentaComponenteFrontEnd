import { by, element } from 'protractor';

export class VentaPage {
private linkListarVentas = element(by.xpath('//*[@id="linkListarVenta"]'));
private listaVentas = element(by.className('table'));
private linkListarArticulos = element(by.id('linkListarArticulos'));
private botonCrearVenta = element(
    by.xpath('/html/body/app-root/app-articulo/app-listar-articulo/div/table/tbody/tr[2]/td[4]/button[2]'));
private inputUnidadVenta = element(by.xpath('//*[@id="unidadVenta"]'));
private botonGuardarVenta = element(by.xpath('//*[@id="crearVenta"]'));

async mostroNotificacionInformativa(): Promise<boolean> {
    return element(by.css('.swal2-popup.swal2-modal.swal2-icon-success.swal2-show')).isPresent();
}

async clickBotonListarVentas(){
    await this.linkListarVentas.click();
}

async mostroTabla(): Promise<boolean>{
    return (this.listaVentas).isPresent();
}

async clickBotonListarArticulos() {
    await this.linkListarArticulos.click();
}

async clickBotonCrearVenta(){
    await this.botonCrearVenta.click();
}

async ingresarUnidadVenta(unidadVenta){
    await this.inputUnidadVenta.sendKeys(unidadVenta);
}

async clickBotonGuardarVenta(){
    await this.botonGuardarVenta.click();
}

}
