import { by, element } from 'protractor';

export class ArticuloPage {
    private linkCrearArticulo = element(by.id('linkCrearArticulo'));

    private inputIdArticulo = element(by.id('idArticulo'));
    private inputNombreArticulo = element(by.id('nombreArticulo'));
    private inputUnidadesArticulo = element(by.id('unidades'));
    private inputPrecioArticulo = element(by.id('precio'));
    private botonActualizar = element(
        by.xpath('/html/body/app-root/app-articulo/app-listar-articulo/div/table/tbody/tr[3]/td[4]/button[1]'));
    private botonguardarArticulo = element(by.xpath('//*[@id="guardar"]'));
    private botonActualizarArticulo = element(by.xpath('//*[@id="actualizar"]'));
    private botonBorrar = element(by.className('articuloactualizado'));
    private listaArticulos = element.all(by.className('btn-success'));
    private linkListarArticulos = element(by.id('linkListarArticulos'));
    private botonConfirmacionSi = element(by.css('.swal2-confirm'));


    async mostroNotificacionConfirmacion(): Promise<boolean> {
        return element(by.css('.swal2-popup.swal2-modal.swal2-icon-warning.swal2-show')).isPresent();
    }

    async mostroNotificacionInformativa(): Promise<boolean> {
        return element(by.css('.swal2-popup.swal2-modal.swal2-icon-success.swal2-show')).isPresent();
    }

    async mostroNotificacionError(): Promise<boolean>{
        return element(by.css('.swal2-popup.swal2-modal.swal2-icon-error.swal2-show')).isPresent();
    }


    async clickBotonCrearArticulos() {
        await this.linkCrearArticulo.click();
    }

    async ingresarId(idArticulo) {
        await this.inputIdArticulo.sendKeys(idArticulo);
    }

    async ingresarNombreArticulo(descripcionArticulo) {
        await this.inputNombreArticulo.sendKeys(descripcionArticulo);
    }

    async ingresarUnidadesArticulo(unidadesArticulo) {
        await this.inputUnidadesArticulo.sendKeys(unidadesArticulo);
    }

    async ingresarPrecioArticulo(precioArticulo) {
        await this.inputPrecioArticulo.sendKeys(precioArticulo);
    }

    async limpiarInputNombreArticulo(){
        await this.inputNombreArticulo.clear();
    }

    async limpiarInputUnidadesArticulo(){
        await this.inputUnidadesArticulo.clear();
    }

    async limpiarInputPrecioArticulo(){
        await this.inputPrecioArticulo.clear();
    }

    async clickBotonActualizar(){
        await this.botonActualizar.click();
    }

    async clickBotonBorrar(){
        await this.botonBorrar.click();
    }

    async clickBotonActualizarArticulo(){
        await this.botonActualizarArticulo.click();
    }

    async clickBotonListarArticulos() {
        await this.linkListarArticulos.click();
    }

    async clickBotonGuardarArticulo(){
        await this.botonguardarArticulo.click();
    }

    async clickBotonConfirmacionSi(){
        await this.botonConfirmacionSi.click();
    }

    async contarArticulos() {
        return this.listaArticulos.count();
    }
}

