import { by, element } from 'protractor';

export class UsuarioPage {
    private linkCrearUsuario = element(by.xpath('//*[@id="linkCrearUsuario"]'));
    private linkListarUsuarios = element(by.xpath('//*[@id="linkListarUsuario"]'));
    private inputNombreUsuario = element(by.name('nombre'));
    private inputClave = element(by.name('clave'));
    private listaUsuarios = element.all(by.className('btn '));
    private botonBorrar = element(by.xpath('//*[@id="123_pass"]'));
    private botonGuardarArticulo =  element(by.id('guardar'));
    private botonConfirmacion = element(by.xpath('/html/body/div/div/div[7]/button[1]'));
    private botonActualizar = element(by.className('123_pass'));
    private botonActualizarUsuario = element(by.xpath('//*[@id="actualizar"]'));
    private botonConfirmacionSi = element(by.css('.swal2-confirm'));

    async mostroNotificacionInformativa(): Promise<boolean> {
        return element(by.css('.swal2-popup.swal2-modal.swal2-icon-success.swal2-show')).isPresent();
    }

    async mostroNotificacionError(): Promise<boolean>{
        return element(by.css('.swal2-popup.swal2-modal.swal2-icon-error.swal2-show')).isPresent();
    }

    async mostroNotificacionConfirmacion(): Promise<boolean> {
        return element(by.css('.swal2-popup.swal2-modal.swal2-icon-warning.swal2-show')).isPresent();
    }

    async clickBotonCrearUsuarios() {
        await this.linkCrearUsuario.click();
    }

    async clickBotonListarUsuarios() {
        await this.linkListarUsuarios.click();
    }

    async ingresarNombreUsuario(nombreUsuario) {
        await this.inputNombreUsuario.sendKeys(nombreUsuario);
    }

    async ingresarClaveUsuario(claveUsuario) {
        await this.inputClave.sendKeys(claveUsuario);
    }

    async limpiarInputNombreUsuario(){
        await this.inputNombreUsuario.clear();
    }

    async limpiarInputClaveUsuario(){
        await this.inputClave.clear();
    }

    async contarUsuarios() {
        return this.listaUsuarios.count();
    }

    async clickBotonBorrar(){
        await this.botonBorrar.click();
    }

    async clickBotonActualizar(){
        await this.botonActualizar.click();
    }

    async clickBotonActualizarUsuario(){
         await this.botonActualizarUsuario.click();
    }

    async clickBotonConfirmacion(){
        await this.botonConfirmacion.click();
    }

    async clickBotonGuardar() {
        await this.botonGuardarArticulo.click();
    }

    async clickBotonConfirmacionSi(){
        await this.botonConfirmacionSi.click();
    }
}

